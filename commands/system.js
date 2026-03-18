const os = require("os");

function systemInfo() {
  console.log("Platform:", os.platform());
  console.log("CPU Cores:", os.cpus().length);
  console.log("RAM:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
}

module.exports = systemInfo;