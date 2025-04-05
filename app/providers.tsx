'use client';

import { useEffect } from 'react';
import { register } from './sw';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    register();
  }, []);

  return <>{children}</>;
}