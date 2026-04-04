const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

const WORKSPACE_DIR = path.join(process.cwd(), ".devcli/workspaces");

async function deleteWorkspace(name) {
  if (!name) {
    console.log(chalk.red("Please provide workspace name"));
    return;
  }

  const filePath = path.join(WORKSPACE_DIR, `${name}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("Workspace not found"));
    return;
  }

  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to delete '${name}'?`,
      default: false
    }
  ]);

  if (!answer.confirm) {
    console.log(chalk.red("❌ Cancelled"));
    return;
  }

  fs.unlinkSync(filePath);
  console.log(chalk.green(`Workspace '${name}' deleted`));
}

module.exports = deleteWorkspace;