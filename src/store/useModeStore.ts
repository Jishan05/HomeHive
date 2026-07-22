import { create } from 'zustand';

export type AppMode = 'Buy' | 'Rent';

interface ModeState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>((set) => ({
  mode: 'Buy',
  setMode: (mode: AppMode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'Buy' ? 'Rent' : 'Buy' })),
}));
