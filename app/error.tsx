'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AuthError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error, 'error');
  }, [error]);

  useEffect(() => {
    const errorToast = toast.error(error.message);

    () => toast.dismiss(errorToast);
  }, [error.message]);

  return <button onClick={() => reset()}>Try again</button>;
}
