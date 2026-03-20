module.exports = (program) => {
    program
        .command("plugin-hello")
        .description("Test command")
        .action(() => {
            console.log("Hello from plugin! 🚀");
    });
};