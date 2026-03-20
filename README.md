![Demo](demo.gif)
# 🚀 Dev CLI

> Ultimate Linux Developer CLI Tool for DevOps engineers, developers, and power users.

---

## ✨ Features

* 🖥️ System Information Dashboard
* 🐳 Docker Command Integration
* 📊 Interactive Terminal UI
* 🔌 Plugin-Based Architecture
* 🎨 Colored Output + Loading Spinners
* ⚡ Fast, Lightweight & Developer-Friendly

---

## 🎬 Demo

```bash
dev start
```

```bash
? Select action
> 🖥 System Info
  🐳 Docker
  ❌ Exit
```

---

## 📦 Installation

### 🔹 Global Install (Recommended)

```bash
npm install -g dev-cli
```

---

### 🔹 Local Development

```bash
git clone https://github.com/YOUR_USERNAME/dev-cli.git
cd dev-cli
npm install
npm link
```

---

## 🚀 Usage

### Start CLI

```bash
dev
```

---

### Interactive Dashboard

```bash
dev start
```

---

### Available Commands

```bash
dev hello        # Test command
dev sys          # Show system info
dev docker ps    # List containers
dev docker images
```

---

## 🐳 Docker Integration

Run Docker commands directly:

```bash
dev docker ps
dev docker images
dev docker start <container>
dev docker stop <container>
```

---

## 🧩 Plugin System

Extend CLI functionality using plugins.

### Example Plugin

Create a file inside `/plugins`:

```js
module.exports = (program) => {
  program
    .command("greet")
    .description("Custom plugin command")
    .action(() => {
      console.log("Hello from plugin 🚀");
    });
};
```

Run:

```bash
dev greet
```

---

## 📁 Project Structure

```
dev-cli
│
├── bin
├── commands
├── plugins
├── utils
├── config
└── README.md
```

---

## 🛠 Tech Stack

* Node.js
* Commander.js
* Inquirer.js
* Chalk
* Figlet
* Ora
* Execa

---

## 🔥 Roadmap

* [ ] Kubernetes Integration
* [ ] AI CLI Assistant
* [ ] SSH Manager
* [ ] Project Generator
* [ ] Plugin Marketplace
* [ ] Voice-Controlled CLI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Ankush Ujawane**

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub!
