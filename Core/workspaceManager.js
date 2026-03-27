const fs = require("fs");
const path = require("path");

const WORKSPACE_DIR = path.join(process.cwd(), ".devcli/workspaces");

function ensureDir() {
  if (!fs.existsSync(WORKSPACE_DIR)) {
    fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
  }
}

function saveWorkspace(config) {
  ensureDir();
  const filePath = path.join(WORKSPACE_DIR, `${config.name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}

function getWorkspace(name) {
  const filePath = path.join(WORKSPACE_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error("Workspace not found");
  }
  return JSON.parse(fs.readFileSync(filePath));
}

module.exports = { saveWorkspace, getWorkspace };