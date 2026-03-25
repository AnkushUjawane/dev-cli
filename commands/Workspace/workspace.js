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

async function workspace(action, name = "dev", num = 4) {
    try {
        if (action === "start") {
            const panes = parseInt(num) || 4;
            const session = name;

            console.log(chalk.green(`Starting Workspace : ${session}`));
            console.log(chalk.yellow(`Creating ${panes} panes... \n`))

            await run(`tmux kill-session -t ${session} || true`);

            await run(`tmux new-session -d -s ${session}`);

            for (let i = 1; i < panes; i++){
                await run(`tmux split-window -t ${session}`);
                await run(`tmux select-layout -t ${session} tiled`);
            }

            console.log(chalk.blue("Launching workspace..."));

            const tmux = spawn("tmux", ["attach", "-t", session], {
                stdio: "inherit"
            });

            tmux.on("exit", () => {
                console.log("Exited workspace");
            });
        }

        if (action === "stop") {
            await run(`tmux kill-session -t ${name}`);
            console.log(chalk.red("Workspace stopped"));
        }

        if (action === "attach") {
            spawn("tmux", ["attach", "-t", name], {
                stdio: "inherit"
            });
        }

        if(action === "ls"){
            exec("tmux ls", (err, stdout) => {
                if(err){
                    console.log(chalk.red("No Active Workspaces"));
                    return;
                }
                const sessions = stdout.trim().split("\n");
                console.log(chalk.cyan("Active Workspaces:\n"));

                sessions.forEach((s, i) => {
                    const sessionName = s.split(":")[0];
                    console.log(chalk.green(`${i+1}. ${chalk.greenBright(sessionName)}`))
                })
            });
        }
    } catch (err) {
        console.log(chalk.red("Error:"), err);
    }
}

module.exports = workspace;