const { exec, spawn } = require("child_process");
const chalk = require("chalk");
const { stdout, stderr } = require("process");

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

            // Create session
            await run("tmux new-session -d -s dev");

            // Create layout (4 panes)
            await run("tmux split-window -h -t dev");
            await run("tmux split-window -v -t dev");
            await run("tmux select-pane -t 0");
            await run("tmux split-window -v -t dev");

            // Run YOUR CLI inside panes
            await run("tmux send-keys -t dev:0.0 'dev start' C-m");     // Dashboard
            await run("tmux send-keys -t dev:0.1 'dev monitor' C-m");   // Monitor
            await run("tmux send-keys -t dev:0.2 'docker ps' C-m");     // Logs/docker
            await run("tmux send-keys -t dev:0.3 'bash' C-m");          // Free shell

            console.log(chalk.blue("Launching workspace..."));

            const tmux = spawn("tmux", ["attach", "-t", "dev"], {
                stdio: "inherit"
            });

            tmux.on("exit", () => {
                console.log("Exited workspace");
            });
        }

        if (action === "stop") {
            await run("tmux kill-session -t dev");
            console.log(chalk.red("Workspace stopped"));
        }

        if (action === "attach") {
            exec("tmux attach -t dev");
        }

        if(action === "ls"){
            exec("tmux ls", (err, stdout, stderr) => {
                if(err){
                    console.log(chalk.red("No Active Tmux Sessions"));
                    return;
                }
                console.log("Active Workspaces:");

                console.log(chalk.green(stdout));
            });
        }

    } catch (err) {
        console.log(chalk.red("Error:"), err);
    }
}

module.exports = workspace;