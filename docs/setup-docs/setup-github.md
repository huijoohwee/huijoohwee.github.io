

Perfect. Here is a **single-path setup** for your Mac, end to end:

**1) Install Apple Command Line Tools (gives you Git)**
```bash
xcode-select --install
```
- Complete the macOS popup installer.
- Then verify:
```bash
git --version
```

**2) Install Node.js (includes npm)**
- Go to [https://nodejs.org](https://nodejs.org)
- Download and install the **LTS** macOS installer (`.pkg`)

Then verify:
```bash
node -v
npm -v
```

**3) Run your project**
```bash
cd /Users/katrina/Documents/GitHub/huijoohwee.github.io
npm install
npm run dev
```

If any command fails, paste the exact output and I’ll fix it step by step.