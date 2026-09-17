import { describe, expect, it } from 'vitest';
import { getInitialOnlineStatus } from './useOnlineStatus';

describe('useOnlineStatus domain logic', () => {
  it('resolves navigator.onLine value when navigator is defined', () => {
    expect(getInitialOnlineStatus({ onLine: true })).toBe(true);
    expect(getInitialOnlineStatus({ onLine: false })).toBe(false);
  });

  it('falls back to true during SSR or when navigator is undefined', () => {
    expect(getInitialOnlineStatus(undefined)).toBe(true);
  });

  it('falls back to true when onLine property is not boolean', () => {
    expect(getInitialOnlineStatus({})).toBe(true);
  });
});
