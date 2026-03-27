const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const WORKSPACE_DIR = path.join(process.cwd(), ".devcli/workspaces");

function divider(char = "─") {
  const width = process.stdout.columns || 80;
  console.log(char.repeat(width));
}

function listWorkspaces() {
  if (!fs.existsSync(WORKSPACE_DIR)) {
    console.log(chalk.yellow("⚠️ No workspaces found"));
    return;
  }

  const files = fs.readdirSync(WORKSPACE_DIR);

  if (files.length === 0) {
    console.log(chalk.yellow("No workspaces available"));
    return;
  }

  console.log(chalk.green("\nYour Workspaces:"));

  files.forEach((file, index) => {
    const filePath = path.join(WORKSPACE_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath));

    console.log(chalk.cyan(`${index + 1}. ${data.name}`));
    console.log(`   Path: ${data.path}`);
    console.log(`   Terminals: ${data.terminals.length}`);
    console.log(`   Created: ${new Date(data.createdAt).toLocaleString()}`);
    divider();
  });
}

module.exports = listWorkspaces;