import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type DiceTheme = 'classic' | 'neon' | 'sunset' | 'midnight';
export type EntitlementStatus = 'checking' | 'free' | 'premium';

const PREMIUM_THEMES: DiceTheme[] = ['neon', 'sunset', 'midnight'];

export interface SettingsState {
  entitlementStatus: EntitlementStatus;
  hapticsEnabled: boolean;
  premiumUnlocked: boolean;
  soundEnabled: boolean;
  theme: DiceTheme;
}

interface SettingsActions {
  setEntitlementStatus: (status: EntitlementStatus) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setPremiumUnlocked: (unlocked: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTheme: (theme: DiceTheme) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      entitlementStatus: 'checking',
      hapticsEnabled: true,
      premiumUnlocked: false,
      soundEnabled: true,
      theme: 'classic',
      setEntitlementStatus: (entitlementStatus) => set({ entitlementStatus }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      setPremiumUnlocked: (premiumUnlocked) =>
        set((state) => ({
          premiumUnlocked,
          theme: !premiumUnlocked && PREMIUM_THEMES.includes(state.theme) ? 'classic' : state.theme,
        })),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setTheme: (theme) =>
        set((state) => {
          if (PREMIUM_THEMES.includes(theme) && !state.premiumUnlocked) {
            return state;
          }
          return { theme };
        }),
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
