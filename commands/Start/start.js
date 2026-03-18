const inquirer = require("inquirer");
const systemInfo = require("../system");
const dockerCommand = require("../docker");

async function startDashboard() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select action",
        choices: ["System Info", "Docker", "Exit"]
      }
    ]);

    if (action === "System Info") {
      systemInfo();
    }

    if (action === "Docker") {
      const { cmd } = await inquirer.prompt([
        {
          type: "input",
          name: "cmd",
          message: "Enter docker command (ps, images, etc):"
        }
      ]);

      await dockerCommand(cmd);
    }

    if (action === "Exit") {
      console.log("Have A Nice Day!");
      process.exit();
    }
  }
}

module.exports = startDashboard;