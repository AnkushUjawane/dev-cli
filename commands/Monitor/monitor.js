const si = require("systeminformation");
const chalk = require("chalk");

async function startMonitor() {
  console.clear();

  console.log(chalk.cyan.bold("🚀 LIVE SYSTEM MONITOR\n"));
  console.log(chalk.gray("Press CTRL + C to exit\n"));

  setInterval(async () => {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const time = await si.time();

    console.clear();

    console.log(chalk.cyan.bold("🚀 LIVE SYSTEM MONITOR\n"));
    console.log(chalk.green("⚙ CPU Usage: "), cpu.currentLoad.toFixed(2), "%");

    const total = mem.total / 1024 / 1024 / 1024;
    const used = mem.used / 1024 / 1024 / 1024;

    console.log(chalk.yellow("💾 RAM Usage: "), ((used / total) * 100).toFixed(2), "%");
    console.log(chalk.yellow("Used RAM: "), used.toFixed(2), "GB");
    console.log(chalk.yellow("Free RAM: "), (total - used).toFixed(2), "GB");

    console.log(chalk.magenta("⏱ Uptime: "), Math.floor(time.uptime / 3600), "hours");

  }, 1000);
}

module.exports = startMonitor;