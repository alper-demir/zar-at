jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// eslint-disable-next-line import/first
import { useSettingsStore } from '../store/settingsStore';

describe('settings store entitlement guards', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      entitlementStatus: 'free',
      hapticsEnabled: true,
      premiumUnlocked: false,
      soundEnabled: true,
      theme: 'classic',
    });
  });

  it('does not allow a free user to select a premium theme', () => {
    useSettingsStore.getState().setTheme('neon');

    expect(useSettingsStore.getState().theme).toBe('classic');
  });

  it('falls back to classic when premium is removed', () => {
    useSettingsStore.getState().setPremiumUnlocked(true);
    useSettingsStore.getState().setTheme('neon');
    useSettingsStore.getState().setPremiumUnlocked(false);

    expect(useSettingsStore.getState().theme).toBe('classic');
  });

  it('keeps two dice appearances independent and supports preset CRUD', () => {
    useSettingsStore.getState().setFirstDiceAppearance({ bodyColor: '#FFFFFF' });
    useSettingsStore.getState().setSecondDiceAppearance({ bodyColor: '#27B7D8' });
    const preset = {
      firstDice: useSettingsStore.getState().firstDiceAppearance,
      id: 'preset-1',
      name: 'Buz gecesi',
      secondDice: useSettingsStore.getState().secondDiceAppearance,
      table: useSettingsStore.getState().tableAppearance,
    };
    useSettingsStore.getState().addPreset(preset);

    expect(useSettingsStore.getState().firstDiceAppearance.bodyColor).toBe('#FFFFFF');
    expect(useSettingsStore.getState().secondDiceAppearance.bodyColor).toBe('#27B7D8');
    expect(useSettingsStore.getState().presets).toHaveLength(1);

    useSettingsStore.getState().deletePreset('preset-1');
    expect(useSettingsStore.getState().presets).toHaveLength(0);
  });

  it('stores premium feedback profiles without changing core settings', () => {
    useSettingsStore.getState().setSoundProfile('minimal');
    useSettingsStore.getState().setHapticProfile('soft');

    expect(useSettingsStore.getState().soundProfile).toBe('minimal');
    expect(useSettingsStore.getState().hapticProfile).toBe('soft');
    expect(useSettingsStore.getState().soundEnabled).toBe(true);
  });
});
