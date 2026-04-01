const { execSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const net = require("net");
const inquirer = require("inquirer");

// 🔧 Run command
function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {}
}

// 🔧 Get output
function getOutput(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

// 🔥 Docker check
function checkDocker() {
  try {
    execSync("docker info", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// 🔍 Check port
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => resolve(true));
    server.once("listening", () => {
      server.close();
      resolve(false);
    });

    server.listen(port);
  });
}

// 🔥 Kill port
function killPort(port) {
  try {
    execSync(`fuser -k ${port}/tcp`, { stdio: "ignore" });
    console.log(chalk.green(`✅ Killed process on port ${port}`));
  } catch {
    console.log(chalk.red(`❌ Failed to kill port ${port}`));
  }
}

async function doctor(options = {}) {
  const fixMode = options.fix;

  console.log(chalk.cyan("Running Dev Doctor..."));

  // 🔥 Node
  const nodeVer = getOutput("node -v");
  console.log(nodeVer ? chalk.green(`✅ Node.js: ${nodeVer}`) : chalk.red("❌ Node.js not found"));

  // 🔥 npm
  const npmVer = getOutput("npm -v");
  console.log(npmVer ? chalk.green(`✅ npm: ${npmVer}`) : chalk.red("❌ npm not found"));

  // 🔥 Git
  const gitVer = getOutput("git --version");
  console.log(gitVer ? chalk.green(`✅ ${gitVer}`) : chalk.red("❌ Git not found"));

  // 🔥 Docker
  const dockerVer = getOutput("docker -v");
  if (dockerVer) console.log(chalk.green(`✅ ${dockerVer}`));

  if (!checkDocker()) {
    console.log(chalk.yellow("⚠️ Docker not running"));

    if (fixMode) {
      const ans = await inquirer.prompt([
        { type: "confirm", name: "fix", message: "Start Docker?", default: true }
      ]);

      if (ans.fix) {
        run("sudo systemctl start docker");
      }
    }
  } else {
    console.log(chalk.green("✅ Docker running"));
  }

  // 📁 Project
  console.log(chalk.cyan("\nProject Check:"));

  if (fs.existsSync("package.json")) {
    console.log(chalk.green("✅ Node.js project detected"));

    if (!fs.existsSync("node_modules")) {
      console.log(chalk.yellow("⚠️ node_modules missing"));

      if (fixMode) {
        const ans = await inquirer.prompt([
          { type: "confirm", name: "fix", message: "Run npm install?", default: true }
        ]);

        if (ans.fix) run("npm install");
      }
    }
  }

  // 🔥 Git repo
  if (!fs.existsSync(".git")) {
    console.log(chalk.yellow("⚠️ Not a Git repository"));

    if (fixMode) {
      const ans = await inquirer.prompt([
        { type: "confirm", name: "fix", message: "Initialize git repo?", default: true }
      ]);

      if (ans.fix) run("git init");
    }
  } else {
    console.log(chalk.green("✅ Git repository detected"));
  }

  // 🌐 Ports
  console.log(chalk.cyan("\nPort Check:"));

  const ports = [3000, 5000, 8000];

  for (let port of ports) {
    const used = await isPortInUse(port);

    if (used) {
      console.log(chalk.yellow(`⚠️ Port ${port} is in use`));

      if (fixMode) {
        const ans = await inquirer.prompt([
          { type: "confirm", name: "fix", message: `Kill port ${port}?`, default: false }
        ]);

        if (ans.fix) killPort(port);
      }
    } else {
      console.log(chalk.green(`✅ Port ${port} is free`));
    }
  }

  console.log(chalk.cyan("\nDiagnosis Complete"));
}

module.exports = doctor;