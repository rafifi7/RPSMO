# RPSMO - Rock Paper Scissors Minus One
## Created using Node.js, React, and TypeScript

A thrilling twist on the classic Rock Paper Scissors game. Test your luck and strategy in this intense single-player experience!

## 🎮 Game Overview

Each round consists of:
1. **Hand Selection** (5 seconds) - Choose Rock, Paper, or Scissors for both hands
2. **Hand Reveal** - See what you and the computer selected
3. **Minus One Phase** (3 seconds) - Remove one of your hands
4. **Showdown** - Compare remaining hands
5. **Wheel of Fate** - Losers spin for survival (5/6 chance to live)

## ✨ Features

- Timed rounds with dramatic UI
- Visual hand selection with images
- Wheel spin survival mechanic
- Round tracking
- Game over screen with stats

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd rpsmo
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🎲 How to Play

1. Select both hands before time runs out
2. Watch the reveal
3. Choose which hand to remove
4. Win/lose based on standard Rock Paper Scissors rules
5. Losers spin the wheel - survive to continue!

## ⚠️ Rules

- Not selecting both hands = disqualification
- Disqualified or lose = spin the wheel
- Landing on "DEATH" = Game Over
- Ties restart the round
- The computer spins when they lose too!

## 🛠️ Built With

- React + TypeScript
- Vite
- React Router
- react-custom-roulette
- Tailwind CSS

## 📦 Future Plans

- Multiplayer mode
- Sound effects
- Statistics tracking
- Difficulty levels

## 👤 Author

[Your Name]

---

**Currently single-player only. Multiplayer coming soon!**
