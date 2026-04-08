import React from 'react';
import { formatDate } from '../utils/calendarUtils';
import styles from './NotesPanel.module.css';

export default function NotesPanel({ year, month, rangeStart, rangeEnd, note, onNoteChange, onClearRange }) {
  const hasRange = rangeStart && rangeEnd;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.icon}>✎</div>
        <span className={styles.title}>Notes</span>
        {hasRange && (
          <button className={styles.clear} onClick={onClearRange} title="Clear selection">✕</button>
        )}
      </div>

      {hasRange && (
        <div className={styles.rangeTag}>
          <span className={styles.rangeLabel}>Selected Range</span>
          <span className={styles.rangeDates}>
            {formatDate(rangeStart)} — {formatDate(rangeEnd)}
          </span>
        </div>
      )}

      {!hasRange && (
        <p className={styles.hint}>Click a start date, then click an end date to select a range.</p>
      )}

      <textarea
        className={styles.textarea}
        value={note}
        onChange={e => onNoteChange(e.target.value)}
        placeholder={hasRange
          ? `Add notes for ${formatDate(rangeStart)} – ${formatDate(rangeEnd)}…`
          : 'Add monthly notes here…'
        }
        rows={6}
      />

      <div className={styles.footer}>
        <span className={styles.chars}>{note.length} chars</span>
      </div>
    </div>
  );
}
