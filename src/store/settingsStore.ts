import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  DEFAULT_DICE_APPEARANCE,
  DiceAppearance,
  DicePreset,
  HapticProfile,
  normalizeDiceAppearance,
  SoundProfile,
  TableAppearance,
} from '../lib/personalization';

export type DiceTheme = 'classic' | 'neon' | 'sunset' | 'midnight';
export type EntitlementStatus = 'checking' | 'free' | 'premium';

const PREMIUM_THEMES: DiceTheme[] = ['neon', 'sunset', 'midnight'];

export interface SettingsState {
  firstDiceAppearance: DiceAppearance;
  entitlementStatus: EntitlementStatus;
  favoritePresetId: string | null;
  hapticProfile: HapticProfile;
  hapticsEnabled: boolean;
  reducedMotionEnabled: boolean;
  shakeToRollEnabled: boolean;
  premiumUnlocked: boolean;
  presets: DicePreset[];
  secondDiceAppearance: DiceAppearance;
  schemaVersion: number;
  soundEnabled: boolean;
  soundProfile: SoundProfile;
  tableAppearance: TableAppearance;
  theme: DiceTheme;
}

interface SettingsActions {
  addPreset: (preset: DicePreset) => void;
  deletePreset: (id: string) => void;
  setFirstDiceAppearance: (appearance: Partial<DiceAppearance>) => void;
  setHapticProfile: (profile: HapticProfile) => void;
  setSecondDiceAppearance: (appearance: Partial<DiceAppearance>) => void;
  setTableAppearance: (appearance: TableAppearance) => void;
  setEntitlementStatus: (status: EntitlementStatus) => void;
  setFavoritePreset: (id: string | null) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setReducedMotionEnabled: (enabled: boolean) => void;
  setShakeToRollEnabled: (enabled: boolean) => void;
  setPremiumUnlocked: (unlocked: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundProfile: (profile: SoundProfile) => void;
  setTheme: (theme: DiceTheme) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      firstDiceAppearance: DEFAULT_DICE_APPEARANCE,
      entitlementStatus: 'checking',
      favoritePresetId: null,
      hapticProfile: 'standard',
      hapticsEnabled: true,
      reducedMotionEnabled: false,
      shakeToRollEnabled: false,
      premiumUnlocked: false,
      presets: [],
      secondDiceAppearance: DEFAULT_DICE_APPEARANCE,
      schemaVersion: 4,
      soundEnabled: true,
      soundProfile: 'cinematic',
      tableAppearance: {
        accentColor: '#F4C95D',
        backgroundColor: '#101426',
      },
      theme: 'classic',
      addPreset: (preset) => set((state) => ({ presets: [preset, ...state.presets].slice(0, 8) })),
      deletePreset: (id) =>
        set((state) => ({ presets: state.presets.filter((item) => item.id !== id) })),
      setFirstDiceAppearance: (appearance) =>
        set((state) => ({
          firstDiceAppearance: normalizeDiceAppearance({
            ...state.firstDiceAppearance,
            ...appearance,
          }),
        })),
      setHapticProfile: (hapticProfile) => set({ hapticProfile }),
      setSecondDiceAppearance: (appearance) =>
        set((state) => ({
          secondDiceAppearance: normalizeDiceAppearance({
            ...state.secondDiceAppearance,
            ...appearance,
          }),
        })),
      setTableAppearance: (tableAppearance) => set({ tableAppearance }),
      setEntitlementStatus: (entitlementStatus) => set({ entitlementStatus }),
      setFavoritePreset: (favoritePresetId) => set({ favoritePresetId }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      setReducedMotionEnabled: (reducedMotionEnabled) => set({ reducedMotionEnabled }),
      setShakeToRollEnabled: (shakeToRollEnabled) => set({ shakeToRollEnabled }),
      setPremiumUnlocked: (premiumUnlocked) =>
        set((state) => ({
          premiumUnlocked,
          theme: !premiumUnlocked && PREMIUM_THEMES.includes(state.theme) ? 'classic' : state.theme,
        })),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setSoundProfile: (soundProfile) => set({ soundProfile }),
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
      version: 4,
      migrate: (persistedState) => {
        const state = persistedState as Partial<SettingsState>;
        return {
          ...state,
          firstDiceAppearance: normalizeDiceAppearance(state.firstDiceAppearance),
          favoritePresetId: state.favoritePresetId ?? null,
          hapticProfile: state.hapticProfile ?? 'standard',
          reducedMotionEnabled: state.reducedMotionEnabled ?? false,
          shakeToRollEnabled: state.shakeToRollEnabled ?? false,
          presets: state.presets ?? [],
          secondDiceAppearance: normalizeDiceAppearance(state.secondDiceAppearance),
          schemaVersion: 4,
          soundProfile: state.soundProfile ?? 'cinematic',
          tableAppearance: state.tableAppearance ?? {
            accentColor: '#F4C95D',
            backgroundColor: '#101426',
          },
        } as SettingsState & SettingsActions;
      },
      partialize: (state) => ({
        firstDiceAppearance: state.firstDiceAppearance,
        favoritePresetId: state.favoritePresetId,
        hapticProfile: state.hapticProfile,
        hapticsEnabled: state.hapticsEnabled,
        reducedMotionEnabled: state.reducedMotionEnabled,
        shakeToRollEnabled: state.shakeToRollEnabled,
        premiumUnlocked: state.premiumUnlocked,
        presets: state.presets,
        secondDiceAppearance: state.secondDiceAppearance,
        schemaVersion: state.schemaVersion,
        soundEnabled: state.soundEnabled,
        soundProfile: state.soundProfile,
        tableAppearance: state.tableAppearance,
        theme: state.theme,
      }),
    },
  ),
);
