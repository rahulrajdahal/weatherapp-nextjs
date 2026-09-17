import { describe, expect, it } from 'vitest';
import {
  formatCalendarDay,
  formatHour,
  formatTime,
  isSameHour,
  parseDate,
} from './dateTime';

describe('dateTime utilities', () => {
  describe('parseDate', () => {
    it('returns a current Date when input is empty or undefined', () => {
      const now = new Date();
      const res = parseDate();
      expect(res).toBeInstanceOf(Date);
      expect(Math.abs(res.getTime() - now.getTime())).toBeLessThan(1000);
    });

    it('correctly parses standard ISO strings', () => {
      const iso = '2026-09-17T14:30:00';
      const res = parseDate(iso);
      expect(res.getFullYear()).toBe(2026);
      expect(res.getMonth()).toBe(8); // September (0-indexed)
      expect(res.getDate()).toBe(17);
      expect(res.getHours()).toBe(14);
      expect(res.getMinutes()).toBe(30);
    });

    it('replaces space with T to parse "YYYY-MM-DD HH:mm"', () => {
      const spaceDate = '2026-09-17 10:15';
      const res = parseDate(spaceDate);
      expect(res.getFullYear()).toBe(2026);
      expect(res.getHours()).toBe(10);
      expect(res.getMinutes()).toBe(15);
    });

    it('falls back to a new Date on invalid date string', () => {
      const res = parseDate('not-a-valid-date');
      expect(res).toBeInstanceOf(Date);
      expect(isNaN(res.getTime())).toBe(false);
    });
  });

  describe('formatTime', () => {
    it('returns empty string when dateStr is undefined', () => {
      expect(formatTime()).toBe('');
    });

    it('formats valid date string into 12-hour AM/PM format', () => {
      const formatted = formatTime('2026-09-17 14:30');
      // e.g. "2:30 PM"
      expect(formatted).toMatch(/2:30\s*PM/i);
    });

    it('formats midnight correctly into AM', () => {
      const formatted = formatTime('2026-09-17 00:05');
      expect(formatted).toMatch(/12:05\s*AM/i);
    });
  });

  describe('formatHour', () => {
    it('returns empty string when dateStr is undefined', () => {
      expect(formatHour()).toBe('');
    });

    it('extracts "H:mm" directly from WeatherAPI "YYYY-MM-DD HH:mm" string', () => {
      expect(formatHour('2026-09-17 15:00')).toBe('15:00');
      expect(formatHour('2026-09-17 08:30')).toBe('8:30');
      expect(formatHour('2026-09-17 00:00')).toBe('0:00');
    });

    it('falls back to Date parsing when string does not contain space', () => {
      const formatted = formatHour('2026-09-17T09:05:00');
      expect(formatted).toBe('9:05');
    });
  });

  describe('formatCalendarDay', () => {
    it('returns empty string for undefined input', () => {
      expect(formatCalendarDay()).toBe('');
    });

    it('returns "Today" for current date', () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const todayStr = `${y}-${m}-${d} 12:00`;
      expect(formatCalendarDay(todayStr)).toBe('Today');
    });

    it('returns "Tomorrow" for next day', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const y = tomorrow.getFullYear();
      const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const d = String(tomorrow.getDate()).padStart(2, '0');
      const tomorrowStr = `${y}-${m}-${d} 12:00`;
      expect(formatCalendarDay(tomorrowStr)).toBe('Tomorrow');
    });

    it('returns weekday name for days within 2-6 days from today', () => {
      const inThreeDays = new Date();
      inThreeDays.setDate(inThreeDays.getDate() + 3);
      const y = inThreeDays.getFullYear();
      const m = String(inThreeDays.getMonth() + 1).padStart(2, '0');
      const d = String(inThreeDays.getDate()).padStart(2, '0');
      const dayStr = `${y}-${m}-${d} 12:00`;
      const expectedWeekday = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
      }).format(inThreeDays);
      expect(formatCalendarDay(dayStr)).toBe(expectedWeekday);
    });

    it('returns short formatted date for dates beyond 6 days', () => {
      const inTenDays = new Date();
      inTenDays.setDate(inTenDays.getDate() + 10);
      const y = inTenDays.getFullYear();
      const m = String(inTenDays.getMonth() + 1).padStart(2, '0');
      const d = String(inTenDays.getDate()).padStart(2, '0');
      const dayStr = `${y}-${m}-${d} 12:00`;
      const expected = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(inTenDays);
      expect(formatCalendarDay(dayStr)).toBe(expected);
    });
  });

  describe('isSameHour', () => {
    it('returns false when either argument is missing', () => {
      expect(isSameHour(undefined, '2026-09-17 12:00')).toBe(false);
      expect(isSameHour('2026-09-17 12:00', undefined)).toBe(false);
      expect(isSameHour()).toBe(false);
    });

    it('returns true when dates and hours match in "YYYY-MM-DD HH:mm" format', () => {
      expect(isSameHour('2026-09-17 14:10', '2026-09-17 14:55')).toBe(true);
    });

    it('returns false when hours differ on the same day', () => {
      expect(isSameHour('2026-09-17 14:00', '2026-09-17 15:00')).toBe(false);
    });

    it('returns false when hours match but dates differ', () => {
      expect(isSameHour('2026-09-17 14:00', '2026-09-18 14:00')).toBe(false);
    });

    it('supports ISO date string comparison', () => {
      expect(isSameHour('2026-09-17T14:15:00', '2026-09-17T14:45:00')).toBe(true);
      expect(isSameHour('2026-09-17T14:15:00', '2026-09-17T16:45:00')).toBe(false);
    });
  });
});
