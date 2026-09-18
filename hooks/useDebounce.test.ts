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

import { useDebounce } from './useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    stateValue = undefined;
    effectFn = undefined;
    cleanupFn = undefined;
  });

  afterEach(() => {
    if (cleanupFn) cleanupFn();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('returns initial value immediately upon first call', () => {
    const result = useDebounce('hello', 300);
    expect(result).toBe('hello');
    if (effectFn) cleanupFn = effectFn();
  });

  it('updates debounced value only after the specified delay', () => {
    let result = useDebounce('first', 300);
    expect(result).toBe('first');
    if (effectFn) cleanupFn = effectFn();

    // Trigger update
    if (cleanupFn) cleanupFn();
    result = useDebounce('second', 300);
    if (effectFn) cleanupFn = effectFn();

    // Value should still be old before timer completes
    vi.advanceTimersByTime(200);
    expect(stateValue).toBe('first');

    // Value should update once full delay passes
    vi.advanceTimersByTime(100);
    expect(stateValue).toBe('second');
  });

  it('uses default delay of 300ms when delay parameter is omitted', () => {
    useDebounce('default-delay');
    if (effectFn) cleanupFn = effectFn();

    // Trigger update with default delay
    if (cleanupFn) cleanupFn();
    useDebounce('new-default-delay');
    if (effectFn) cleanupFn = effectFn();

    vi.advanceTimersByTime(299);
    expect(stateValue).toBe('default-delay');

    vi.advanceTimersByTime(1);
    expect(stateValue).toBe('new-default-delay');
  });

  it('clears previous timeout when value changes before timer fires', () => {
    useDebounce('v1', 500);
    if (effectFn) cleanupFn = effectFn();

    vi.advanceTimersByTime(300);

    // Cancel previous and start new
    if (cleanupFn) cleanupFn();
    useDebounce('v2', 500);
    if (effectFn) cleanupFn = effectFn();

    // Advance past initial timer total (500ms) but not new timer (needs 500ms from reset)
    vi.advanceTimersByTime(300);
    expect(stateValue).toBe('v1');

    vi.advanceTimersByTime(200);
    expect(stateValue).toBe('v2');
  });
});
