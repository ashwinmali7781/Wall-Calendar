import React, { useState, useEffect } from 'react';
import WallCalendar from './components/WallCalendar';
import styles from './App.module.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cal-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cal-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className={styles.app}>
      <div className={styles.bgDeco} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.brand}>
          <span className={styles.brandAccent}>Wall</span> Calendar
        </h1>
        <p className={styles.tagline}>Click to select · Drag to range · Jot your notes</p>
      </header>
      <main className={styles.main}>
        <WallCalendar theme={theme} onThemeToggle={toggleTheme} />
      </main>
      <footer className={styles.footer}>
        Built with React + Vite · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
