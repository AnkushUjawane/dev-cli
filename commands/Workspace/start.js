const { getWorkspace } = require("../../Core/workspaceManager");
const { exec } = require("child_process");
const chalk = require("chalk");

// 🔥 Convert WSL path → Windows path
function toWindowsPath(wslPath) {
  // Example: /home/ankush/project → C:\Users\ankush\project
  return wslPath
    .replace("/home/ankush", "C:\\Users\\ankush")
    .replace(/\//g, "\\");
}

function startWorkspace(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide workspace name"));
    return;
  }

  let workspace;

  try {
    workspace = getWorkspace(name);
  } catch (err) {
    console.log(chalk.red("❌ Workspace not found"));
    return;
  }

  console.log(chalk.green(`🚀 Starting workspace: ${name}\n`));

  // 🔥 Convert path for Windows terminal
  const winPath = toWindowsPath(workspace.path);

  workspace.terminals.forEach((term, index) => {
    console.log(`Opening terminal ${index + 1} (${term.name})...`);

    const cmd = `cmd.exe /c start cmd.exe /k "cd ${winPath} && echo 🖥️ ${term.name} && ${term.cmd}"`;

    setTimeout(() => {
      exec(cmd, (err) => {
        if (err) {
          console.log(chalk.red(`❌ Failed to open terminal ${index + 1}`));
          console.log(err.message);
        }
      });
    }, index * 500); // delay to avoid crash
  });
}

module.exports = startWorkspace;