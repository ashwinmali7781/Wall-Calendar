# 🗓️ Wall Calendar

A polished, interactive wall calendar built with **React + Vite**, inspired by a physical wall calendar aesthetic. Features a day-range selector, integrated notes, dark/light mode, page-flip animations, and full mobile responsiveness.

---

## 🔗 Live Demo

> Deployed on Render: `https://wall-calendar-1.onrender.com`

---

## ✨ Features

| Feature | Details |
|---|---|
| **Wall Calendar Aesthetic** | Hero landscape image per month with diagonal wave overlay and spiral binding |
| **Day Range Selector** | Click a start date → click an end date; live hover preview with color states for start, end, and in-between days |
| **Integrated Notes** | Per-month notes textarea; updates placeholder and range display when a date range is selected |
| **Dark / Light Theme** | Toggle via the ☽/☀︎ button; preference persisted in `localStorage` |
| **Page Flip Animation** | Subtle 3D perspective flip animation on month navigation |
| **Holiday Markers** | Dot indicator on holiday dates + banner for today's holiday (Indian public holidays) |
| **Dynamic Hero Images** | Each of the 12 months has a unique Unsplash landscape photo |
| **Fully Responsive** | Desktop: side-by-side calendar + notes panel. Mobile: tab-based switcher between calendar and notes |

---

## 🚀 Local Setup

### Prerequisites
- **Node.js** 20.x or higher
- **npm** 9+

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ashwinmali7781/Wall-Calendar.git
cd Wall-Calendar

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview   # → http://localhost:4173
```

---

## ☁️ Deploying to Render

### Static Site Setup

1. Go to [render.com](https://render.com) → **New** → **Static Site**
2. Connect your GitHub repo
3. Set the following:

| Field | Value |
|---|---|
| **Build Command** | `npm cache clean --force && rm -rf node_modules && npm install && ./node_modules/.bin/vite build` |
| **Publish Directory** | `dist` |
| **Node Version** | `20.x` (set via `engines` in `package.json`) |

4. Click **Create Static Site**
5. Your app will be live at `https://<your-site-name>.onrender.com`

> Auto-deploy is enabled by default — every push to `main` triggers a new deploy.

---

## 📁 Project Structure

```
wall-calendar/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── render.yaml                 # Render deploy config
└── src/
    ├── main.jsx                # React entry point
    ├── index.css               # Global styles & CSS variables
    ├── App.jsx                 # Root component (theme management)
    ├── App.module.css
    ├── hooks/
    │   └── useCalendar.js      # Calendar state, range selection & notes state
    ├── utils/
    │   └── calendarUtils.js    # Grid builder, date helpers, holiday data, images
    └── components/
        ├── WallCalendar.jsx         # Main layout: hero, spiral, nav, body
        ├── WallCalendar.module.css
        ├── CalendarDay.jsx          # Individual day cell with all visual states
        ├── CalendarDay.module.css
        ├── NotesPanel.jsx           # Notes textarea + range info
        └── NotesPanel.module.css
```

---

## 🎨 Design & Architecture Decisions

- **CSS Modules** — Fully scoped styles with zero runtime overhead; no CSS-in-JS library needed
- **No external UI library** — Every component is hand-crafted for full pixel control
- **CSS Variables** — All colors and spacing use CSS custom properties, making dark/light theming a single attribute swap on `<html>`
- **Custom hooks** — `useCalendar` manages all calendar navigation and range selection state; `useNotes` manages per-month note storage
- **localStorage** — Theme preference is the only thing persisted; all other state (notes, selection) lives in React state per session
- **Responsive strategy** — Desktop uses a 3-column CSS Grid (calendar | divider | notes). Mobile collapses to a single column with a tab switcher so both panels remain fully usable on touch screens

---

## 🧪 How to Use

| Action | How |
|---|---|
| Navigate months | Click **‹** / **›** arrows in the pill at the top of the image |
| Select a date range | Click a **start date** → hover to preview → click an **end date** |
| Clear selection | Click **✕** in the Notes panel header |
| Add notes | Type in the notes textarea (saved per month in session) |
| Toggle dark mode | Click **☽** / **☀︎** button on the hero image |
| View holidays | Hover over any date with a dot; today's holiday shows a banner |

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- CSS Modules
- [Unsplash](https://unsplash.com/) — monthly hero images
- [Render](https://render.com/) — hosting

---

## 📄 License

MIT — free to use and modify.
