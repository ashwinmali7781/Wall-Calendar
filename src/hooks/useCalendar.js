import { useState, useCallback } from 'react';

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selecting, setSelecting] = useState(false); // false = picking start, true = picking end

  const goToPrev = useCallback(() => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }, [month]);

  const goToNext = useCallback(() => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }, [month]);

  const handleDayClick = useCallback((date) => {
    if (!selecting) {
      setRangeStart(date);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
      setSelecting(false);
    }
  }, [selecting, rangeStart]);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
    setHovered(null);
  }, []);

  return {
    today, year, month, rangeStart, rangeEnd, hovered, selecting,
    setHovered, goToPrev, goToNext, handleDayClick, clearRange,
  };
}

export function useNotes() {
  const [notes, setNotes] = useState({});
  // notes keyed by 'YYYY-MM' for month notes, or 'YYYY-MM-DD range' for range notes

  const setMonthNote = useCallback((year, month, text) => {
    const key = `${year}-${month}`;
    setNotes(n => ({ ...n, [key]: text }));
  }, []);

  const getMonthNote = useCallback((year, month, notes) => {
    return notes[`${year}-${month}`] || '';
  }, []);

  return { notes, setMonthNote, getMonthNote };
}
