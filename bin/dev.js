#!/usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");

const program = new Command();

console.log(
  chalk.green(
    figlet.textSync("DEV CLI", { horizontalLayout: "full" })
  )
);

program
  .name("dev")
  .description("Ultimate Linux Developer CLI")
  .version("1.0.0");

  
program
  .command("hello")
  .description("Test command")
  .action(() => {
    console.log("Hello Ankush 🚀");
  });
program.parse(process.argv);