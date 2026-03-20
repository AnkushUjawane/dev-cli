const os = require("os");
const { exec } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");

async function systemInfo() {
  const spinner = ora("Fetching system info...").start();

  try {
    await new Promise(res => setTimeout(res, 800));

    spinner.succeed("System Info Loaded\n");

    // Basic Info
    console.log(chalk.cyan("🖥 System Info"));
    console.log("Platform:", os.platform());
    console.log("Architecture:", os.arch());
    console.log("Hostname:", os.hostname());

    // CPU Info
    console.log(chalk.green("\n⚙ CPU Info"));
    console.log("Cores:", os.cpus().length);
    console.log("Model:", os.cpus()[0].model);
    console.log("Load Avg:", os.loadavg().join(" | "));

    // Memory Info
    console.log(chalk.yellow("\n💾 Memory Info"));
    const total = os.totalmem() / 1024 / 1024 / 1024;
    const free = os.freemem() / 1024 / 1024 / 1024;

    console.log("Total RAM:", total.toFixed(2), "GB");
    console.log("Free RAM:", free.toFixed(2), "GB");
    console.log("Used RAM:", (total - free).toFixed(2), "GB");

    // Uptime
    console.log(chalk.magenta("\n⏱ Uptime"));
    const uptime = os.uptime();
    console.log("System Uptime:", Math.floor(uptime / 3600), "hours");

    // User Info
    console.log(chalk.blue("\n👤 User Info"));
    console.log("Username:", os.userInfo().username);
    console.log("Home Dir:", os.homedir());

    // Network Info
    console.log(chalk.white("\n🌐 Network"));
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === "IPv4" && !net.internal) {
          console.log(`${name}: ${net.address}`);
        }
      }
    }

    // Disk Info (Linux only)
    console.log(chalk.red("\n📀 Disk Usage"));
    exec("df -h /", (err, stdout) => {
      if (!err) {
        console.log(stdout);
      } else {
        console.log("Disk info not available");
      }
    });

  } catch (err) {
    spinner.fail("Error fetching system info");
    console.log(chalk.red(err.message));
  }
}

module.exports = systemInfo;