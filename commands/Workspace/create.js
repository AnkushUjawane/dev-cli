const inquirer = require("inquirer");
const chalk = require("chalk");
const { saveWorkspace } = require("../../Core/workspaceManager");

async function createWorkspace(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide workspace name"));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "Enter project path: ",
      default: process.cwd()
    },
    {
      type: "number",
      name: "terminals",
      message: "Number of terminals:",
      default: 2
    }
  ]);

  const terminals = [];

  for (let i = 0; i < answers.terminals; i++) {
    const cmd = await inquirer.prompt([
      {
        type: "input",
        name: "command",
        message: `Command for terminal ${i + 1}:`
      }
    ]);

    terminals.push({
      name: `terminal-${i + 1}`,
      cmd: cmd.command
    });
  }

  const config = {
    name,
    path: answers.path,
    terminals,
    createdAt: new Date().toISOString()
  };

  saveWorkspace(config);

  console.log(chalk.green(`✅ Workspace '${name}' created`));
}

module.exports = createWorkspace;