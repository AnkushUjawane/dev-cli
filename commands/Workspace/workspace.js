const { exec } = require("child_process");
const chalk = require("chalk");

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout);
    });
  });
}

async function workspace(action) {
  try {
    if (action === "start") {
      console.log(chalk.green("🚀 Starting Dev Workspace..."));

      await run("tmux new-session -d -s dev");

      await run("tmux split-window -h -t dev");
      await run("tmux split-window -v -t dev");
      await run("tmux select-pane -t 0");
      await run("tmux split-window -v -t dev");

      // Run commands in panes
      await run("tmux send-keys -t dev:0.0 'npm run dev' C-m");
      await run("tmux send-keys -t dev:0.1 'npm start' C-m");
      await run("tmux send-keys -t dev:0.2 'docker ps' C-m");
      await run("tmux send-keys -t dev:0.3 'dev monitor' C-m");

      console.log(chalk.blue("Attaching to workspace..."));
      exec("tmux attach -t dev");
    }

    if (action === "stop") {
      await run("tmux kill-session -t dev");
      console.log(chalk.red("Workspace stopped"));
    }

    if (action === "attach") {
      exec("tmux attach -t dev");
    }

  } catch (err) {
    console.log(chalk.red("Error:"), err);
  }
}

module.exports = workspace;