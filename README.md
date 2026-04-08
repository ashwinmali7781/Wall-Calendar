# 🗓️ Wall Calendar — React + Vite

A polished, interactive wall calendar component inspired by a physical desk calendar aesthetic. Features a day-range selector, integrated notes, dark mode, and smooth page-flip animations.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Wall Calendar Aesthetic** | Hero image panel with diagonal wave overlay; spiral binding visual |
| **Day Range Selector** | Click start → click end; live hover preview; start/end/in-between visual states |
| **Integrated Notes** | Per-month notes textarea with selected range display |
| **Dark / Light Theme** | Persisted to `localStorage`; toggle button on the hero image |
| **Page Flip Animation** | Subtle 3D perspective flip on month navigation |
| **Holiday Markers** | Dot indicator + banner for public holidays |
| **Fully Responsive** | Desktop: side-by-side grid + notes. Mobile: tab-based switcher |
| **Dynamic Hero Images** | Each month has a unique Unsplash landscape photo |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm **9+**

### Installation

```bash
# 1. Clone / unzip the project
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open your browser at **http://localhost:5173**

### Build for production

```bash
npm run build
# Output is in the /dist folder
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
wall-calendar/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global styles + CSS variables
│   ├── App.jsx             # Root component (theme management)
│   ├── App.module.css
│   ├── hooks/
│   │   └── useCalendar.js  # Calendar state + notes state
│   ├── utils/
│   │   └── calendarUtils.js  # Grid builder, date helpers, data
│   └── components/
│       ├── WallCalendar.jsx        # Main calendar layout
│       ├── WallCalendar.module.css
│       ├── CalendarDay.jsx         # Single day cell
│       ├── CalendarDay.module.css
│       ├── NotesPanel.jsx          # Notes area
│       └── NotesPanel.module.css
```

---

## 🎨 Design Decisions

- **CSS Modules** — Scoped styles, no runtime CSS-in-JS overhead
- **No external UI library** — Full control over every pixel
- **CSS Variables** — Clean dark/light theming with zero JS overhead
- **localStorage** — Theme preference persisted across sessions
- **Responsive strategy** — Desktop uses CSS Grid side-by-side layout; Mobile uses a tab switcher for calendar/notes

---

## 🧪 Interaction Guide

1. **Navigate months** — Use the ‹ / › arrows in the navigation pill
2. **Select a range** — Click a start date (highlighted in blue), then click an end date
3. **Hover preview** — While selecting, hover over dates to preview the range
4. **Clear selection** — Click the ✕ in the Notes panel header
5. **Add notes** — Type in the textarea; notes are saved per month
6. **Toggle theme** — Click the ☽ / ☀︎ button on the hero image
7. **Holidays** — Dates with a dot indicator are public holidays (hover for name)
