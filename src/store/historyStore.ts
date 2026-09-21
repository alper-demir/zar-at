import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { RollResult } from '../hooks/useDiceRoll';

const MAX_HISTORY = 50;

interface HistoryState {
  history: RollResult[];
  addRoll: (roll: RollResult) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addRoll: (roll) =>
        set((state) => ({ history: [roll, ...state.history].slice(0, MAX_HISTORY) })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'zar-history', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export { MAX_HISTORY };
