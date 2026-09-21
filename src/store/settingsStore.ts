import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type DiceTheme = 'classic' | 'neon' | 'sunset' | 'midnight';

export interface SettingsState {
  hapticsEnabled: boolean;
  premiumUnlocked: boolean;
  soundEnabled: boolean;
  theme: DiceTheme;
}

interface SettingsActions {
  setHapticsEnabled: (enabled: boolean) => void;
  setPremiumUnlocked: (unlocked: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTheme: (theme: DiceTheme) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      hapticsEnabled: true,
      premiumUnlocked: false,
      soundEnabled: true,
      theme: 'classic',
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      setPremiumUnlocked: (premiumUnlocked) => set({ premiumUnlocked }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'zar-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hapticsEnabled: state.hapticsEnabled,
        premiumUnlocked: state.premiumUnlocked,
        soundEnabled: state.soundEnabled,
        theme: state.theme,
      }),
    },
  ),
);
