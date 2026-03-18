const { execa } = require("execa");

async function dockerCommand(cmd) {
  const { stdout } = await execa("docker", [cmd]);
  console.log(stdout);
}

module.exports = dockerCommand;