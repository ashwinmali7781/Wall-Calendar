import React, { useState, useEffect } from 'react';
import { buildCalendarGrid, MONTHS, DAYS_SHORT, MONTH_IMAGES, HOLIDAYS, getHolidayKey } from '../utils/calendarUtils';
import { useCalendar, useNotes } from '../hooks/useCalendar';
import CalendarDay from './CalendarDay';
import NotesPanel from './NotesPanel';
import styles from './WallCalendar.module.css';

export default function WallCalendar({ theme, onThemeToggle }) {
  const cal = useCalendar();
  const { notes, setMonthNote, getMonthNote } = useNotes();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [prevMonth, setPrevMonth] = useState(cal.month);
  const [flipping, setFlipping] = useState(false);
  const [mobileTab, setMobileTab] = useState('calendar'); // 'calendar' | 'notes'

  const img = MONTH_IMAGES[cal.month];
  const grid = buildCalendarGrid(cal.year, cal.month);
  const noteKey = `${cal.year}-${cal.month}`;
  const currentNote = notes[noteKey] || '';

  // Page flip animation on month change
  useEffect(() => {
    if (prevMonth !== cal.month) {
      setFlipping(true);
      setImgLoaded(false);
      const t = setTimeout(() => { setFlipping(false); setPrevMonth(cal.month); }, 380);
      return () => clearTimeout(t);
    }
  }, [cal.month]);

  const handleNav = (dir) => {
    if (dir === -1) cal.goToPrev();
    else cal.goToNext();
  };

  const todayHoliday = HOLIDAYS[getHolidayKey(cal.today)];

  return (
    <div className={styles.shell}>
      {/* Binding / spiral */}
      <div className={styles.spiral}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={styles.ring} />
        ))}
      </div>

      <div className={`${styles.card} ${flipping ? styles.flipping : ''}`}>
        {/* ── HERO IMAGE ── */}
        <div className={styles.hero}>
          <img
            key={cal.month}
            src={img.url}
            alt={img.label}
            className={`${styles.heroImg} ${imgLoaded ? styles.heroLoaded : ''}`}
            onLoad={() => setImgLoaded(true)}
          />
          <div className={styles.heroOverlay} />

          {/* Month / Year badge */}
          <div className={styles.badge}>
            <span className={styles.badgeYear}>{cal.year}</span>
            <span className={styles.badgeMonth}>{MONTHS[cal.month].toUpperCase()}</span>
          </div>

          {/* Navigation */}
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={() => handleNav(-1)} aria-label="Previous month">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={styles.navToday} onClick={() => { /* reset to today */ }} title="Go to today">
              {MONTHS[cal.month].slice(0, 3)} {cal.year}
            </button>
            <button className={styles.navBtn} onClick={() => handleNav(1)} aria-label="Next month">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Theme toggle */}
          <button className={styles.themeBtn} onClick={onThemeToggle} title="Toggle theme">
            {theme === 'dark' ? '☀︎' : '☽'}
          </button>
        </div>

        {/* ── BODY ── */}
        <div className={styles.body}>
          {/* Mobile tab bar */}
          <div className={styles.mobileTabs}>
            <button
              className={`${styles.mTab} ${mobileTab === 'calendar' ? styles.mTabActive : ''}`}
              onClick={() => setMobileTab('calendar')}
            >Calendar</button>
            <button
              className={`${styles.mTab} ${mobileTab === 'notes' ? styles.mTabActive : ''}`}
              onClick={() => setMobileTab('notes')}
            >Notes</button>
          </div>

          {/* Calendar panel */}
          <div className={`${styles.calPanel} ${mobileTab !== 'calendar' ? styles.mobileHidden : ''}`}>
            {/* Holiday banner */}
            {todayHoliday && (
              <div className={styles.holidayBanner}>
                <span className={styles.holidayDot} />
                Today: {todayHoliday}
              </div>
            )}

            {/* Day headers */}
            <div className={styles.dayHeaders}>
              {DAYS_SHORT.map((d, i) => (
                <div key={d} className={`${styles.dayHeader} ${i === 5 ? styles.satH : ''} ${i === 6 ? styles.sunH : ''}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div
              className={styles.grid}
              onMouseLeave={() => cal.setHovered(null)}
            >
              {grid.map((cell, idx) => (
                <CalendarDay
                  key={idx}
                  cell={cell}
                  rangeStart={cal.rangeStart}
                  rangeEnd={cal.rangeEnd}
                  hovered={cal.selecting ? cal.hovered : null}
                  today={cal.today}
                  onMouseEnter={cal.setHovered}
                  onClick={cal.handleDayClick}
                />
              ))}
            </div>

            {/* Selecting hint */}
            {cal.selecting && (
              <div className={styles.selectingHint}>
                <span className={styles.pulse} /> Now click an end date
              </div>
            )}
          </div>

          {/* Divider (desktop only) */}
          <div className={styles.divider} />

          {/* Notes panel */}
          <div className={`${styles.notesPanel} ${mobileTab !== 'notes' ? styles.mobileHidden : ''}`}>
            <NotesPanel
              year={cal.year}
              month={cal.month}
              rangeStart={cal.rangeStart}
              rangeEnd={cal.rangeEnd}
              note={currentNote}
              onNoteChange={(text) => setMonthNote(cal.year, cal.month, text)}
              onClearRange={cal.clearRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
