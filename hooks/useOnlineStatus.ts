'use client';

import { useEffect, useState } from 'react';

/**
 * Resolves initial connectivity state safely across SSR and browser environments.
 */
export function getInitialOnlineStatus(nav?: { onLine?: boolean }): boolean {
  if (typeof nav !== 'undefined' && typeof nav.onLine === 'boolean') {
    return nav.onLine;
  }
  return true;
}

/**
 * Hook to track the browser's online/offline connectivity status in an SSR-safe manner.
 * @returns boolean indicating whether the client is currently online
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return getInitialOnlineStatus(
      typeof navigator !== 'undefined' ? navigator : undefined
    );
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
