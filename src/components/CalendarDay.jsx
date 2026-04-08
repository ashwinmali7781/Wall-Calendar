import React from 'react';
import { isSameDay, isBetween, getHolidayKey, HOLIDAYS } from '../utils/calendarUtils';
import styles from './CalendarDay.module.css';

export default function CalendarDay({ cell, rangeStart, rangeEnd, hovered, today, onMouseEnter, onClick }) {
  const { day, current, date } = cell;
  const isToday = current && isSameDay(date, today);
  const isStart = current && isSameDay(date, rangeStart);
  const isEnd = current && isSameDay(date, rangeEnd);
  const effectiveEnd = rangeEnd || hovered;
  const inRange = current && isBetween(date, rangeStart, effectiveEnd);
  const isHoliday = current && HOLIDAYS[getHolidayKey(date)];
  const holidayName = isHoliday ? HOLIDAYS[getHolidayKey(date)] : null;

  const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
  const isSat = dayOfWeek === 6;
  const isSun = dayOfWeek === 0;

  const cls = [
    styles.day,
    !current && styles.faded,
    isToday && styles.today,
    isStart && styles.start,
    isEnd && styles.end,
    inRange && styles.inRange,
    (isStart || isEnd) && styles.endpoint,
    isSat && current && styles.sat,
    isSun && current && styles.sun,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      onMouseEnter={() => current && onMouseEnter(date)}
      onClick={() => current && onClick(date)}
      title={holidayName || undefined}
    >
      <span className={styles.num}>{day}</span>
      {isHoliday && <span className={styles.dot} />}
    </div>
  );
}
