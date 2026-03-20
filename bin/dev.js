#!/usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const startDashboard = require("../commands/Start/start")
const systemInfo = require("../commands/system");
const dockerCommand = require("../commands/docker");
const loadPlugins = require("../utils/pluginLoader")

const program = new Command();

loadPlugins(program);

console.log(
  chalk.green(
    figlet.textSync("DEV CLI", { horizontalLayout: "full" })
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
    console.log("Updated CLI 🚀");
  });

program
  .command("sys")
  .description("Show system info")
  .action(systemInfo);

program
  .command("docker <cmd>")
  .description("Run docker commands")
  .action(dockerCommand);
program.parse(process.argv);