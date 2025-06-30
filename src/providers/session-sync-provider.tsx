'use client';

import { useSessionSync } from '@/hooks/use-session-sync';

interface SessionSyncProviderProps {
  children: React.ReactNode;
}

export default function SessionSyncProvider({ children }: SessionSyncProviderProps) {
  useSessionSync();
  return children;
}
