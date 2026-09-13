# 🐘 Bappa's Modak & Laddoo

> **Pick it. Eat it. Score it. 🙏🍡**

A festive, interactive **Ganesh Chaturthi web game** where you use your **own hand in first-person POV** to pick up digital Modaks and Laddoos from a traditional thali and bring them to your mouth.

Eat as many sweets as you can, track your score, unlock achievements, generate a festive scorecard, and challenge your friends! 😋

**Ganpati Bappa Morya! 🙏**

---

## 🎮 How to Play

### 1. Enter the Celebration 🪔

Open the game and enter the festive Ganesh Chaturthi environment.

You'll see:

* 🐘 Ganpati
* 🌼 Marigold decorations
* 🪔 Diyas
* 🎨 Rangoli
* 🍽️ A festive thali
* 🥁 Dhol-Tasha ambience

---

### 2. Choose Your Prasad 🍡

Select what you want to eat:

| Mode                | Description                 |
| ------------------- | --------------------------- |
| 🍥 **Modak**        | Eat only Modaks             |
| 🟠 **Laddoo**       | Eat only Laddoos            |
| 🍡 **Mixed Prasad** | Eat both Modaks and Laddoos |

Then press **Let's Eat! 🙏**

---

### 3. Pick a Sweet 👆

You'll see sweets arranged on your thali.

Tap/click the sweet you want.

**Important:** You're not controlling another character.

The hand you see is **your own hand**, represented from a first-person perspective.

---

### 4. Reach for It 🤚

After selecting a sweet:

```text
Tap Sweet
   ↓
Your Hand Reaches
   ↓
Hand Grabs Sweet
   ↓
Sweet Lifts From Plate
```

The hand dynamically reaches the sweet you selected.

---

### 5. Eat It 😋

Your hand brings the sweet toward your point of view:

```text
Plate
  ↓
Pick Up
  ↓
Lift
  ↓
Bring Toward Camera
  ↓
Mouth
  ↓
🍡 EAT!
```

The sweet disappears when you've eaten it.

Your score then increases by **+1**.

---

### 6. Keep Eating 🔥

Continue selecting sweets from the plate.

Your plate automatically refills as you eat.

You can also switch between Modaks and Laddoos during a mixed session.

Your scoreboard tracks:

* 🍥 Modaks eaten
* 🟠 Laddoos eaten
* ❤️ Total sweets
* ⏱️ Session duration
* 🏆 Achievements
* 👑 Personal best

---

### 7. Finish Your Session 🏆

When you're done, press:

**Finish Eating**

You'll receive your final results.

Your result screen shows:

```text
🍥 Modaks
🟠 Laddoos
❤️ Total Sweets
⏱️ Duration
📅 Date
🏆 Achievements
👑 Personal Best
```

---

### 8. Generate Your Scorecard 📸

Create a festive **1080 × 1350** scorecard containing your final results.

You can:

* 📥 Download it as PNG
* 📤 Share it using Web Share
* 📋 Copy your score
* 🔗 Share your score URL where supported

Challenge your friends:

> **Can you beat my score? 😏**

---

# 🥁 Dhol-Tasha Experience

The game includes a **royalty-free / appropriately licensed Dhol-Tasha instrumental** as background ambience.

The music:

* Loops during the experience
* Starts after user interaction
* Can be muted/unmuted
* Fades smoothly
* Remembers your audio preference

Interaction sounds such as bells, pickup sounds and eating sounds are handled separately.

---

# ✨ Features

* 🐘 Ganesh Chaturthi themed experience
* 🍥 Modak mode
* 🟠 Laddoo mode
* 🍡 Mixed Prasad mode
* 🤚 First-person hand interaction
* 👆 Touch/click sweet selection
* 🫴 Realistic pickup animation
* 😋 Bring-to-mouth eating animation
* 🍽️ Dynamic thali refill
* 📊 Live scoreboard
* ⏱️ Session timer
* 🏆 Achievement system
* 👑 Personal best
* 🥁 Dhol-Tasha background ambience
* 🔔 Interactive sound effects
* 🎉 Celebration effects
* 📸 1080×1350 scorecard
* 📥 PNG download
* 📤 Web Share API
* 📋 Copy score
* 🔗 Shareable score URL
* 💾 LocalStorage persistence
* 📱 Mobile-first responsive design
* 🖥️ Desktop support
* ♿ Reduced-motion consideration
* 🌐 No account required

---

# 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Framer Motion / Motion**
* **HTML5 Canvas**
* **Web Audio API**
* **HTML5 Audio**
* **Canvas Confetti**
* **LocalStorage**
* **Web Share API**

The project is designed to run primarily on the client side.

---

# 🚀 Run Locally

## Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

Check your versions:

```bash
node -v
npm -v
git --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Enter the project:

```bash
cd YOUR-REPOSITORY
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start the Development Server

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## 4. Build for Production

Before submitting changes or deploying:

```bash
npm run build
```

If the build succeeds, the project is ready for deployment.

---

## 5. Preview the Production Build

```bash
npm run preview
```

---

# 🍡 Project Structure

```text
.
├── public/
│   └── audio/
│       └── dhol-tasha.mp3
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── data/
│   ├── types/
│   ├── utils/
│   └── assets/
│
├── PRD.md
├── ARCHITECTURE.md
├── RULES.md
├── PHASES.md
├── DESIGN.md
├── MEMORY.md
├── README.md
├── package.json
└── vite.config.*
```

---

# 🌱 Open Source Contribution Guide

Want to contribute? **You're welcome! 🙏**

Whether you're fixing a bug, improving animations, adding accessibility, improving the UI, or adding a new festive feature, contributions are appreciated.

---

# 🍴 Fork the Repository

### Step 1 — Open the Repository

Go to the GitHub repository.

### Step 2 — Click Fork

Click:

**Fork → Create fork**

This creates your own copy of the project under your GitHub account.

---

# 💻 Clone Your Fork

Copy the URL of **your fork**, then:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORK.git
```

Enter the project:

```bash
cd YOUR-FORK
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🌿 Create a Feature Branch

Do not work directly on `main`.

Create a branch:

```bash
git checkout -b feature/your-feature-name
```

Examples:

```bash
git checkout -b feature/improve-scorecard
```

```bash
git checkout -b fix/mobile-hand-position
```

```bash
git checkout -b feat/new-achievement
```

---

# 🧑‍💻 Make Your Changes

Run the development server:

```bash
npm run dev
```

Make your changes and test them locally.

For this project, pay particular attention to:

* Mobile responsiveness
* Touch interactions
* Hand positioning
* Animation timing
* Score accuracy
* Audio behaviour
* Accessibility
* Performance

---

# 🧪 Test Before Committing

Run:

```bash
npm run build
```

Make sure there are no build errors.

Also manually test:

* 📱 360×800
* 📱 375×812
* 📱 390×844
* 📱 414×896
* 💻 Desktop
* 👆 Touch
* 🖱️ Mouse
* 🔊 Audio on/off
* 🔄 Repeated sessions

---

# 💾 Commit Your Changes

Use a clear commit message:

```bash
git add .
git commit -m "feat: improve sweet pickup animation"
```

Other examples:

```bash
git commit -m "fix: correct hand positioning on mobile"
```

```bash
git commit -m "feat: add new achievement"
```

```bash
git commit -m "docs: improve contribution guide"
```

---

# 🚀 Push Your Branch

```bash
git push origin feature/your-feature-name
```

---

# 🔀 Create a Pull Request

Go to your fork on GitHub.

You should see an option to:

**Compare & pull request**

Click it.

Select:

```text
base repository: ORIGINAL-OWNER/ORIGINAL-REPOSITORY
base branch: main
compare branch: YOUR-USERNAME:feature/your-feature-name
```

Then create your Pull Request.

---

# 📝 Pull Request Guidelines

A good PR should explain:

### What did you change?

Example:

> Improved the first-person hand animation so it dynamically targets sweets on smaller mobile screens.

### Why did you change it?

Example:

> The previous positioning could miss sweets on 360px-wide screens.

### How did you test it?

Example:

> Tested on 360×800, 390×844 and desktop Chrome.

---

# ✅ PR Checklist

Before opening a PR:

* [ ] My code builds successfully
* [ ] I tested the feature locally
* [ ] I tested mobile responsiveness
* [ ] I did not break existing gameplay
* [ ] I did not introduce unnecessary dependencies
* [ ] I followed the project architecture
* [ ] I followed `RULES.md`
* [ ] I updated documentation if necessary
* [ ] I used original/licensed assets
* [ ] I did not add copyrighted music
* [ ] My commit messages are clear
* [ ] My PR explains the change

---

# 🐛 Reporting Bugs

When reporting a bug, include:

**Browser:** Chrome / Firefox / Safari / Edge

**Device:** Mobile / Tablet / Desktop

**Screen size:** e.g. `390×844`

**What happened?**

Describe the issue.

**Expected behaviour:**

Describe what should have happened.

**Steps to reproduce:**

```text
1. Open the game
2. Select Mixed Prasad
3. Tap a Laddoo
4. Observe hand animation
```

Screenshots or screen recordings are highly appreciated.

---

# 💡 Suggesting Features

Have an idea?

Open a feature request and explain:

1. What should be added?
2. Why would it improve the game?
3. How would users interact with it?
4. Does it fit the Ganesh Chaturthi theme?

Examples:

* New sweets
* New achievements
* Better animations
* Accessibility improvements
* New scorecard styles
* New festive sound effects

---

# 📜 Project Guidelines

Before contributing, read:

* [`PRD.md`](./PRD.md) — Product requirements
* [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Technical architecture
* [`RULES.md`](./RULES.md) — Development rules
* [`PHASES.md`](./PHASES.md) — Implementation roadmap
* [`DESIGN.md`](./DESIGN.md) — Design system
* [`MEMORY.md`](./MEMORY.md) — Current project state

These documents are the project's source of truth.

---

# 🙏 Important Cultural Guidelines

This project is inspired by Ganesh Chaturthi and should remain respectful.

Please do not contribute:

* Disrespectful Ganpati imagery
* Offensive jokes involving Ganpati
* Grotesque transformations
* Content that depicts Ganpati eating/feeding the player
* Inappropriate animations involving religious figures

The playful interaction is centered around **the user eating digital Prasad**, not Ganpati being treated as a game character.

---

# 📄 License

Add the project's chosen open-source license here.

For example:

```text
MIT License
```

If the repository uses another license, follow that license instead.

---

# ❤️ Contributing

Every contribution counts — whether it's a tiny bug fix, a better animation, an accessibility improvement, a new achievement, or a major feature.

Fork it. Build it. Improve it. Share it.

And most importantly...

## 🐘 Ganpati Bappa Morya! 🙏

**Now go eat some Modaks. 🍥😋**