# CineTrack 🎬

CineTrack is a modern, responsive, frontend-only movie watchlist management application. Built using **React 19**, **Tailwind CSS v4**, and **DaisyUI**, it allows users to discover, add, rate, and track their favorite movies directly from their browser using local storage persistence.

---

## 🚀 Live Demo & Repository
* **Vercel Deployment URL:** [Insert Your Live Vercel Link Here]
* **GitHub Repository:** [Insert Your GitHub Repo Link Here]

---

## ✨ Features

* **Dashboard Grid:** Beautiful, responsive layout display for both mobile and desktop views.
* **Persistent Storage:** Zero backend needed; your tracking configuration persists across page reloads via custom `localStorage` hooks.
* **Advanced Control Flow:** Real-time search processing by movie title alongside categorical state filtering (*All*, *Watched*, *Unwatched*).
* **Rich Metadata:** Track critical data fields including Title, Genre, Release Year, Star Ratings, and Personal Review Notes.
* **Dynamic UX Framework:** Integrated initial page skeleton states, fallback poster rendering for broken image links, and custom micro-interactions.

---

## 🛠️ Tech Stack & Dependencies

The application relies on the following key frameworks and package variations:

* **React:** `^19.2.7` (Latest UI component capabilities)
* **Tailwind CSS (Vite Architecture):** `^4.3.2` using `@tailwindcss/vite`
* **Toast Notifications:** `react-toastify ^11.1.0`
* **UI Components:** `daisyui@latest`
* **Bundler:** Vite (Optimized production compilation)

---

## 💻 Local Environment Setup

Follow these exact steps to clone, configure, and launch the development container environment locally.

### 1. Prerequisites
Ensure you have **Node.js** installed on your workstation.
* Recommended version: Node.js `20.x` or higher.
* Verify your local installation:
    ```bash
    node -v
    npm -v
    ```

### 2. Clone the Repository
Pull the workspace code down to your local directory setup:
```bash
git clone <your-github-repo-url>
cd cinetrack
