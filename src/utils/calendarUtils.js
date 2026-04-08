export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const DAYS_SHORT = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

export const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80', label: 'Winter Peaks' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80', label: 'Spring Alps' },
  { url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=900&q=80', label: 'Wildflowers' },
  { url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80', label: 'Forest Path' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', label: 'Valley Vista' },
  { url: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=900&q=80', label: 'Summer Lake' },
  { url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80', label: 'Desert Dusk' },
  { url: 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=900&q=80', label: 'Autumn Road' },
  { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&q=80', label: 'Misty Cove' },
  { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80', label: 'City Fog' },
  { url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80', label: 'Frost Fields' },
  { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80', label: 'Snowy Night' },
];

export const HOLIDAYS = {
  '1-1': "New Year's Day",
  '1-26': 'Republic Day',
  '3-25': 'Holi',
  '4-14': 'Dr. Ambedkar Jayanti',
  '4-18': 'Good Friday',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '10-20': 'Dussehra',
  '10-20': 'Dussehra',
  '11-1': 'Diwali',
  '12-25': 'Christmas',
};

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  // 0=Sun, shift so Mon=0
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function buildCalendarGrid(year, month) {
  const totalDays = getDaysInMonth(year, month);
  const startOffset = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const cells = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false, date: new Date(year, month - 1, prevMonthDays - i) });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, current: true, date: new Date(year, month, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, date: new Date(year, month + 1, d) });
  }
  return cells;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isBetween(date, start, end) {
  if (!start || !end) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

export function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getHolidayKey(date) {
  return `${date.getMonth() + 1}-${date.getDate()}`;
}
