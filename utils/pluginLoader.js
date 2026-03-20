const fs = require("fs");
const path = require("path");

function loadPlugins(program) {
  const pluginDir = path.join(__dirname, "../plugins");

  if (!fs.existsSync(pluginDir)) return;

  const files = fs.readdirSync(pluginDir);

  files.forEach(file => {
    const plugin = require(path.join(pluginDir, file));
    plugin(program);
  });
}

module.exports = loadPlugins;