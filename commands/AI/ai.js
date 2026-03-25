const axios = require("axios");
const chalk = require("chalk");
const readline = require("readline");

const OLLAMA_URL = "http://localhost:11434/api/generate";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function divider(char = "─") {
    const width = process.stdout.columns || 80;
    console.log(chalk.gray(char.repeat(width)));
}

async function streamOllama(prompt) {
    try {
        const res = await axios({
            method: "post",
            url: OLLAMA_URL,
            data: {
                model: "mistral",
                prompt: `You are a coding assistant.
                Rules:
                - Always format code with proper indentation
                - Always use new lines
                - Never write code in a single line
                - Do NOT explain unless asked
                - Output clean code
                            
                User request:
                ${prompt}`,
                stream: true
            },
            responseType: "stream"
        });

        let isCodeBlock = false;

        return new Promise((resolve) => {
            res.data.on("data", (chunk) => {
                const lines = chunk.toString().split("\n");

                lines.forEach((line) => {
                    if (!line) return;

                    try {
                        const parsed = JSON.parse(line);

                        if (parsed.response) {
                            let text = parsed.response;

                            if (text.includes("```")) {
                                isCodeBlock = !isCodeBlock;
                                process.stdout.write("\n");
                                return;
                            }

                            text = text.replace(/^\n+/, "");
                            text = text.replace(/\n{3,}/g, "\n\n");

                            if (isCodeBlock) {
                                process.stdout.write(chalk.green(text));
                            } else {
                                if (text.includes("#include") || text.includes("int main")) {
                                    text = text
                                      .replace(/;/g, ";\n")
                                      .replace(/{/g, "{\n")
                                      .replace(/}/g, "\n}")
                                      .replace(/</g, "<")
                                      .replace(/>/g, ">\n");
                                }
                          
                                process.stdout.write(text);
                            }
                        }
                    } catch { }
                });
            });

            res.data.on("end", () => {
                console.log("\n");
                resolve();
            });
        });
    } catch (err) {
        console.log(chalk.red("Error connecting to Ollama"));
    }
}

function aiChat() {
    console.clear();
    console.log(chalk.cyan("Dev CLI AI (Streaming Mode)"));
    console.log(chalk.gray("Type 'exit' to quit\n"));

    function ask() {
        divider();

        rl.question(chalk.yellow("Enter Your Prompt : "), async (input) => {
            if (input.toLowerCase() === "exit") {
                console.log(chalk.red("\nExiting AI...\n"));
                rl.close();
                return;
            }

            console.log(chalk.green("\nAI Response:"));
            await streamOllama(input);

            ask();
        });
    }

    ask();
}

module.exports = aiChat;