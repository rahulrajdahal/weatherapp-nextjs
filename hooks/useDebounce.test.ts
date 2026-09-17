import { describe, expect, it, vi } from 'vitest';

describe('debounce timer mechanics', () => {
  it('delays callback invocation until timer expires', () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const triggerDebounce = (val: string, delay: number = 300) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        spy(val);
      }, delay);
    };

    triggerDebounce('search 1', 300);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();

    triggerDebounce('search 2', 300);
    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('search 2');

    vi.useRealTimers();
  });
});
