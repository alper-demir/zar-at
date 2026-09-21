import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  DEFAULT_DICE_APPEARANCE,
  DiceAppearance,
  DicePreset,
  TableAppearance,
} from '../lib/personalization';

export type DiceTheme = 'classic' | 'neon' | 'sunset' | 'midnight';
export type EntitlementStatus = 'checking' | 'free' | 'premium';

const PREMIUM_THEMES: DiceTheme[] = ['neon', 'sunset', 'midnight'];

export interface SettingsState {
  firstDiceAppearance: DiceAppearance;
  entitlementStatus: EntitlementStatus;
  hapticsEnabled: boolean;
  premiumUnlocked: boolean;
  presets: DicePreset[];
  secondDiceAppearance: DiceAppearance;
  schemaVersion: number;
  soundEnabled: boolean;
  tableAppearance: TableAppearance;
  theme: DiceTheme;
}

interface SettingsActions {
  addPreset: (preset: DicePreset) => void;
  deletePreset: (id: string) => void;
  setFirstDiceAppearance: (appearance: Partial<DiceAppearance>) => void;
  setSecondDiceAppearance: (appearance: Partial<DiceAppearance>) => void;
  setTableAppearance: (appearance: TableAppearance) => void;
  setEntitlementStatus: (status: EntitlementStatus) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setPremiumUnlocked: (unlocked: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTheme: (theme: DiceTheme) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      firstDiceAppearance: DEFAULT_DICE_APPEARANCE,
      entitlementStatus: 'checking',
      hapticsEnabled: true,
      premiumUnlocked: false,
      presets: [],
      secondDiceAppearance: DEFAULT_DICE_APPEARANCE,
      schemaVersion: 2,
      soundEnabled: true,
      tableAppearance: {
        accentColor: '#F4C95D',
        backgroundColor: '#101426',
      },
      theme: 'classic',
      addPreset: (preset) => set((state) => ({ presets: [preset, ...state.presets].slice(0, 8) })),
      deletePreset: (id) =>
        set((state) => ({ presets: state.presets.filter((item) => item.id !== id) })),
      setFirstDiceAppearance: (appearance) =>
        set((state) => ({ firstDiceAppearance: { ...state.firstDiceAppearance, ...appearance } })),
      setSecondDiceAppearance: (appearance) =>
        set((state) => ({
          secondDiceAppearance: { ...state.secondDiceAppearance, ...appearance },
        })),
      setTableAppearance: (tableAppearance) => set({ tableAppearance }),
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
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<SettingsState>;
        return {
          ...state,
          firstDiceAppearance: state.firstDiceAppearance ?? DEFAULT_DICE_APPEARANCE,
          presets: state.presets ?? [],
          secondDiceAppearance: state.secondDiceAppearance ?? DEFAULT_DICE_APPEARANCE,
          schemaVersion: 2,
          tableAppearance: state.tableAppearance ?? {
            accentColor: '#F4C95D',
            backgroundColor: '#101426',
          },
        } as SettingsState & SettingsActions;
      },
      partialize: (state) => ({
        firstDiceAppearance: state.firstDiceAppearance,
        hapticsEnabled: state.hapticsEnabled,
        premiumUnlocked: state.premiumUnlocked,
        presets: state.presets,
        secondDiceAppearance: state.secondDiceAppearance,
        schemaVersion: state.schemaVersion,
        soundEnabled: state.soundEnabled,
        tableAppearance: state.tableAppearance,
        theme: state.theme,
      }),
    },
  ),
);
