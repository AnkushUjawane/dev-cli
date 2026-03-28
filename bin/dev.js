#!/usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const startDashboard = require("../commands/Start/start")
const systemInfo = require("../commands/system");
const dockerCommand = require("../commands/docker");
const loadPlugins = require("../utils/pluginLoader")
const startMonitor = require("../commands/Monitor/monitor")
const createWorkspace = require("../commands/Workspace/create")
<<<<<<< Updated upstream
const listWorkspaces = require("../commands/Workspace/list")
=======
const listWorkspaces = require("../commands/Workspace/list");
const { act } = require("react");
>>>>>>> Stashed changes

const program = new Command();

loadPlugins(program);

console.log(
  chalk.green(
    console.log(" "),
    figlet.textSync("DEV-CLI", { horizontalLayout: "full" })
  )
);

program
  .command("start")
  .description("Interactive Dev Dashboard")
  .action(startDashboard);

program
  .name("dev")
  .description("Ultimate Linux Developer CLI")
  .version("1.0.0");

program
  .command("hello")
  .description("Test command")
  .action(() => {
    console.log("Welcome To Dev CLI");
  });

program
  .command("sys")
  .description("Show system info")
  .action(systemInfo);

program
  .command("docker <cmd>")
  .description("Run docker commands")
  .action(dockerCommand);

program
  .command("monitor")
  .description("Live system monitor")
  .action(startMonitor);

program
  .command("workspace <action> [name]")
  .description("Manage dev workspace")
  .action((action, name) => {
    if(action === "create"){
      createWorkspace(name);
    }
    else if(action === "list" || action === "ls"){
      listWorkspaces();
    }
    else{
      console.log(chalk.red("Unknown Workspace Action"))
    }
  });

program.parse(process.argv);