import { useEffect, useState } from 'react';

export interface Contribution {
  date: string;
  count: number;
  level: number; // 0..4
}

export interface ContribState {
  total: number;
  days: Contribution[];
  loading: boolean;
  error: boolean;
  syncedAt: Date | null;
}

const BOOT_STATE: ContribState = { total: 0, days: [], loading: true, error: false, syncedAt: null };

let state: ContribState = BOOT_STATE;
let inflight: Promise<void> | null = null;
const subs = new Set<() => void>();

function emit() {
  subs.forEach((fn) => fn());
}

function load(): Promise<void> {
  if (inflight) return inflight;
  if (state.error === false && state.days.length > 0) return Promise.resolve();

  inflight = (async () => {
    try {
      const res = await fetch('https://github-contributions-api.jogruber.de/v4/hmmlavi?y=last');
      if (!res.ok) throw new Error('contrib api failed');
      const data = (await res.json()) as {
        total: Record<string, number>;
        contributions: Contribution[];
      };
      state = {
        total: data.total?.lastYear ?? 0,
        days: data.contributions ?? [],
        loading: false,
        error: false,
        syncedAt: new Date(),
      };
    } catch {
      state = { ...BOOT_STATE, loading: false, error: true };
    }
    inflight = null;
    emit();
  })();
  return inflight;
}

/** Live daily contribution data for @hmmlavi (public info, fetched client-side). */
export function useContributions(): ContribState {
  const [s, setS] = useState<ContribState>(state);

  useEffect(() => {
    const cb = () => setS({ ...state });
    subs.add(cb);
    load();
    return () => {
      subs.delete(cb);
    };
  }, []);

  return s;
}
