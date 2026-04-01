const { execa } = require("execa");

async function dockerCommand(cmd) {
  const { stdout } = await execa("docker", [cmd]);
  console.log(stdout);
}

module.exports = dockerCommand;const { execSync } = require("child_process");
const chalk = require("chalk");
const net = require("net");

function checkCommand(cmd) {
  try {
    execSync(cmd, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// 🔍 Check port usage
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

async function doctor() {
  console.log(chalk.cyan("\n🔍 Running Dev Doctor...\n"));

  // Node
  if (checkCommand("node -v")) {
    console.log(chalk.green("✅ Node.js is installed"));
  } else {
    console.log(chalk.red("❌ Node.js not found"));
  }

  // npm
  if (checkCommand("npm -v")) {
    console.log(chalk.green("✅ npm is installed"));
  } else {
    console.log(chalk.red("❌ npm not found"));
  }

  // Git
  if (checkCommand("git --version")) {
    console.log(chalk.green("✅ Git is installed"));
  } else {
    console.log(chalk.red("❌ Git not found"));
  }

  // Docker
  if (checkCommand("docker info")) {
    console.log(chalk.green("✅ Docker is running"));
  } else {
    console.log(chalk.yellow("⚠️ Docker not running or not installed"));
  }

  // Port 3000
  const portUsed = await isPortInUse(3000);
  if (portUsed) {
    console.log(chalk.yellow("⚠️ Port 3000 is already in use"));
  } else {
    console.log(chalk.green("✅ Port 3000 is free"));
  }

  console.log(chalk.cyan("\n🩺 Diagnosis Complete\n"));
}

module.exports = doctor;