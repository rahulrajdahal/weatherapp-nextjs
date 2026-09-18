import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let stateValue: any = undefined;
let effectFn: (() => void | (() => void)) | undefined = undefined;
let cleanupFn: void | (() => void) = undefined;

vi.mock('react', () => ({
  useState: (initial: any) => {
    if (stateValue === undefined) {
      stateValue = typeof initial === 'function' ? initial() : initial;
    }
    const setState = (newVal: any) => {
      stateValue = typeof newVal === 'function' ? newVal(stateValue) : newVal;
    };
    return [stateValue, setState];
  },
  useEffect: (cb: () => void | (() => void)) => {
    effectFn = cb;
  },
}));

import { getInitialOnlineStatus, useOnlineStatus } from './useOnlineStatus';

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

describe('useOnlineStatus hook', () => {
  beforeEach(() => {
    stateValue = undefined;
    effectFn = undefined;
    cleanupFn = undefined;
  });

  afterEach(() => {
    if (cleanupFn) cleanupFn();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('bails out safely during SSR when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    const status = useOnlineStatus();
    expect(status).toBe(true);

    if (effectFn) {
      cleanupFn = effectFn();
    }
    expect(cleanupFn).toBeUndefined();
  });

  it('attaches online and offline event listeners and updates state on browser events', () => {
    const listeners: Record<string, () => void> = {};
    const mockWindow = {
      addEventListener: vi.fn((event: string, handler: () => void) => {
        listeners[event] = handler;
      }),
      removeEventListener: vi.fn((event: string) => {
        delete listeners[event];
      }),
    };

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('navigator', { onLine: true });

    const status = useOnlineStatus();
    expect(status).toBe(true);

    if (effectFn) {
      cleanupFn = effectFn();
    }

    expect(mockWindow.addEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('offline', expect.any(Function));

    // Simulate going offline
    listeners['offline']?.();
    expect(stateValue).toBe(false);

    // Simulate coming back online
    listeners['online']?.();
    expect(stateValue).toBe(true);

    // Simulate unmount cleanup
    if (cleanupFn) cleanupFn();
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
  });
});
