const figlet = require("figlet");
const chalk = require("chalk");

function startDashboard() {
  console.log(
    chalk.green(figlet.textSync("DEV-CLI", { horizontalLayout: "full" }))
  );

  console.log("🚀 Welcome to Dev CLI Dashboard");
}

module.exports = startDashboard;