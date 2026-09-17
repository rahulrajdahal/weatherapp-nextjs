/**
 * Lightweight, zero-dependency date formatting utilities
 * replacing heavyweight moment.js (~70KB).
 */

export function parseDate(dateStr?: string): Date {
  if (!dateStr) return new Date();
  // Standardize "YYYY-MM-DD HH:mm" to ISO string "YYYY-MM-DDTHH:mm:ss"
  const normalized = dateStr.includes('T')
    ? dateStr
    : dateStr.replace(' ', 'T');
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? new Date() : d;
}

export function formatTime(dateStr?: string): string {
  if (!dateStr) return '';
  const d = parseDate(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}

export function formatHour(dateStr?: string): string {
  if (!dateStr) return '';
  // WeatherAPI hourly times format is "YYYY-MM-DD HH:mm"
  const parts = dateStr.split(' ');
  if (parts.length > 1 && parts[1]) {
    const timePart = parts[1]; // "15:00"
    const [h, m] = timePart.split(':');
    const hourNum = parseInt(h, 10);
    return `${hourNum}:${m}`;
  }
  const d = parseDate(dateStr);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatCalendarDay(dateStr?: string): string {
  if (!dateStr) return '';
  const target = parseDate(dateStr);
  const today = new Date();

  // Reset to midnight for clean day comparison
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffDays = Math.round(
    (targetMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays < 7) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(target);
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(target);
}

export function isSameHour(timeA?: string, timeB?: string): boolean {
  if (!timeA || !timeB) return false;
  const partsA = timeA.split(' ');
  const partsB = timeB.split(' ');

  if (partsA.length > 1 && partsB.length > 1) {
    const dayMatch = partsA[0] === partsB[0];
    const hourA = partsA[1].split(':')[0];
    const hourB = partsB[1].split(':')[0];
    return dayMatch && hourA === hourB;
  }

  const dA = parseDate(timeA);
  const dB = parseDate(timeB);
  return (
    dA.getFullYear() === dB.getFullYear() &&
    dA.getMonth() === dB.getMonth() &&
    dA.getDate() === dB.getDate() &&
    dA.getHours() === dB.getHours()
  );
}
