import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from './src/assets/themes/themes';
import { Dice3D } from './src/components/dice/Dice3D';
import { CriticalHeroEffect } from './src/components/dice/CriticalHeroEffect';
import { Button } from './src/components/ui/Button';
import { SettingsSheet } from './src/components/ui/SettingsSheet';
import { HistorySheet } from './src/components/ui/HistorySheet';
import { useDiceRoll, DiceMode, RollResult } from './src/hooks/useDiceRoll';
import { useEntitlement } from './src/hooks/useEntitlement';
import { useSoundEffects } from './src/hooks/useSoundEffects';
import { useShakeToRoll } from './src/hooks/useShakeToRoll';
import { usePurchase } from './src/hooks/usePurchase';
import { DICE_PAIR_STAGGER_MS } from './src/lib/rollAnimation';
import { formatRollAnnouncement, formatRollResult } from './src/lib/rollPresentation';
import { calculateRollStats } from './src/lib/rollStats';
import { useSettingsStore } from './src/store/settingsStore';
import { useHistoryStore } from './src/store/historyStore';

const INITIAL_DICE = [1, 1];

export default function App() {
  const [mode, setMode] = useState<DiceMode>('single');
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const [rollId, setRollId] = useState(0);
  const [lastSettled, setLastSettled] = useState<RollResult | null>(null);

  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const firstDiceAppearance = useSettingsStore((state) => state.firstDiceAppearance);
  const hapticProfile = useSettingsStore((state) => state.hapticProfile);
  const reducedMotionEnabled = useSettingsStore((state) => state.reducedMotionEnabled);
  const shakeToRollEnabled = useSettingsStore((state) => state.shakeToRollEnabled);
  const secondDiceAppearance = useSettingsStore((state) => state.secondDiceAppearance);
  const tableAppearance = useSettingsStore((state) => state.tableAppearance);
  const selectedTheme = useSettingsStore((state) => state.theme);
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const soundProfile = useSettingsStore((state) => state.soundProfile);
  const setHapticsEnabled = useSettingsStore((state) => state.setHapticsEnabled);
  const setSoundEnabled = useSettingsStore((state) => state.setSoundEnabled);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setFirstDiceAppearance = useSettingsStore((state) => state.setFirstDiceAppearance);
  const setHapticProfile = useSettingsStore((state) => state.setHapticProfile);
  const setReducedMotionEnabled = useSettingsStore((state) => state.setReducedMotionEnabled);
  const setShakeToRollEnabled = useSettingsStore((state) => state.setShakeToRollEnabled);
  const setSecondDiceAppearance = useSettingsStore((state) => state.setSecondDiceAppearance);
  const setSoundProfile = useSettingsStore((state) => state.setSoundProfile);
  const setTableAppearance = useSettingsStore((state) => state.setTableAppearance);
  const { isPremium, status: entitlementStatus } = useEntitlement();
  const history = useHistoryStore((state) => state.history);
  const addRoll = useHistoryStore((state) => state.addRoll);
  const clearHistory = useHistoryStore((state) => state.clearHistory);
  const selectedThemeDefinition = getTheme(selectedTheme);
  const theme =
    selectedThemeDefinition.premium && !isPremium
      ? getTheme('classic')
      : { ...selectedThemeDefinition, ...tableAppearance };
  const playSound = useSoundEffects(soundEnabled, soundProfile);
  const { isRolling, pendingDice, roll } = useDiceRoll(
    hapticsEnabled,
    hapticProfile,
    reducedMotionEnabled,
    playSound,
  );
  const { isPurchasing, purchaseError, purchasePremium, restorePurchases } = usePurchase();
  const [heroDismissedRollId, setHeroDismissedRollId] = useState<number | null>(null);

  const displayedDice = lastSettled?.dice ?? INITIAL_DICE.slice(0, mode === 'pair' ? 2 : 1);
  const total = lastSettled?.total ?? null;
  const isCritical = lastSettled?.dice.every((die) => die === 6) ?? false;
  const stats = calculateRollStats(history);

  useEffect(() => {
    if (!isPremium || !isCritical || !lastSettled) return;
    const timeout = setTimeout(() => setHeroDismissedRollId(lastSettled.id), 1300);
    return () => clearTimeout(timeout);
  }, [isCritical, isPremium, lastSettled]);

  const handleRoll = useCallback(async () => {
    if (isRolling) return;
    setRollId((current) => current + 1);
    const result = await roll(mode);
    if (result) {
      setLastSettled(result);
      addRoll(result);
      AccessibilityInfo.announceForAccessibility(formatRollAnnouncement(result));
    }
  }, [addRoll, isRolling, mode, roll]);

  useShakeToRoll(shakeToRollEnabled, () => void handleRoll());

  const handleModeChange = (nextMode: DiceMode) => {
    if (isRolling) return;
    setMode(nextMode);
    if (lastSettled && lastSettled.dice.length !== (nextMode === 'pair' ? 2 : 1)) {
      setLastSettled(null);
    }
  };

  const handleThemeChange = (nextTheme: typeof selectedTheme) => {
    const nextThemeDefinition = getTheme(nextTheme);
    setTheme(nextTheme);
    setTableAppearance({
      accentColor: nextThemeDefinition.accent,
      backgroundColor: nextThemeDefinition.background,
    });
  };

  const statusText = isRolling
    ? 'Zarlar dönüyor…'
    : isCritical
      ? 'Çift altı! Şans senden yana.'
      : total
        ? mode === 'pair'
          ? `Toplam ${total}`
          : `Sonuç ${total}`
        : 'Zar atmaya hazır';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <Text style={[styles.title, { color: theme.text }]}>Zar At</Text>
              <Text style={styles.subtitle}>Tek veya çift zar seç.</Text>
            </View>
            <Pressable
              accessibilityLabel="Ayarları aç"
              onPress={() => setSettingsVisible(true)}
              style={styles.settingsButton}
            >
              <Text style={styles.settingsIcon}>⚙</Text>
            </Pressable>
          </View>

          <View style={styles.modeRow}>
            {(['single', 'pair'] as DiceMode[]).map((item) => (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: mode === item }}
                key={item}
                onPress={() => handleModeChange(item)}
                style={[styles.mode, mode === item && { backgroundColor: theme.face }]}
              >
                <Text style={[styles.modeLabel, mode === item && styles.selectedModeLabel]}>
                  {item === 'single' ? 'Tek zar' : 'Çift zar'}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.diceArea}>
            <CriticalHeroEffect
              accentColor={theme.accent}
              visible={
                isPremium &&
                isCritical &&
                lastSettled !== null &&
                heroDismissedRollId !== lastSettled.id
              }
            />
            <View style={styles.diceRow}>
              {displayedDice.map((value, index) => (
                <Dice3D
                  appearance={index === 0 ? firstDiceAppearance : secondDiceAppearance}
                  delayMs={reducedMotionEnabled ? 0 : index * DICE_PAIR_STAGGER_MS}
                  diceIndex={index}
                  disabled={isRolling}
                  key={`${index}-${mode}`}
                  onPress={() => void handleRoll()}
                  reducedMotion={reducedMotionEnabled}
                  rollId={rollId}
                  size={mode === 'pair' ? 132 : 160}
                  targetValue={pendingDice?.[index]}
                  theme={theme}
                  value={value}
                />
              ))}
            </View>
          </View>

          <View style={styles.resultCard}>
            <Text style={[styles.resultLabel, { color: theme.accent }]}>
              {isRolling ? 'ATIŞ SÜRÜYOR' : total ? 'SONUÇ' : 'HAZIR'}
            </Text>
            <Text
              accessibilityLiveRegion="polite"
              accessibilityRole="text"
              style={[styles.status, { color: theme.text }]}
            >
              {statusText}
            </Text>
            {mode === 'pair' && (
              <Text style={styles.helper}>İki zarın toplamı burada gösterilir</Text>
            )}
          </View>

          <Button
            disabled={isRolling}
            label={isRolling ? 'Atılıyor…' : 'Zar At'}
            onPress={() => void handleRoll()}
            style={styles.rollButton}
          />

          <View style={styles.history}>
            <Text style={styles.historyTitle}>Son atışlar</Text>
            {history.length ? (
              <View style={styles.historyRow}>
                {history.slice(0, 5).map((item) => (
                  <View key={item.id} style={styles.historyChip}>
                    <Text style={styles.historyChipText}>{formatRollResult(item)}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.historyValues}>Henüz kayıt yok</Text>
            )}
            {history.length > 0 && (
              <View style={styles.statsRow}>
                <Text style={styles.statsText}>{stats.totalRolls} atış</Text>
                <Text style={styles.statsText}>Ort. {stats.average.toFixed(1)}</Text>
                <Pressable accessibilityLabel="Geçmişi aç" onPress={() => setHistoryVisible(true)}>
                  <Text style={styles.clearLabel}>Tümünü aç</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <SettingsSheet
          hapticsEnabled={hapticsEnabled}
          reducedMotionEnabled={reducedMotionEnabled}
          shakeToRollEnabled={shakeToRollEnabled}
          firstDiceAppearance={firstDiceAppearance}
          hapticProfile={hapticProfile}
          isPurchasing={isPurchasing}
          purchaseError={purchaseError}
          isEntitlementChecking={entitlementStatus === 'checking'}
          isVisible={isSettingsVisible}
          onClose={() => setSettingsVisible(false)}
          onFirstDiceAppearanceChange={setFirstDiceAppearance}
          onHapticProfileChange={setHapticProfile}
          onReducedMotionChange={setReducedMotionEnabled}
          onShakeToRollChange={setShakeToRollEnabled}
          onLockedCustomizationPress={() => void purchasePremium()}
          onPurchase={() => void purchasePremium()}
          onRestore={() => void restorePurchases()}
          onSecondDiceAppearanceChange={setSecondDiceAppearance}
          onSoundProfileChange={setSoundProfile}
          onSelectTheme={handleThemeChange}
          premiumUnlocked={isPremium}
          selectedTheme={selectedTheme}
          secondDiceAppearance={secondDiceAppearance}
          soundProfile={soundProfile}
          setHapticsEnabled={setHapticsEnabled}
          setSoundEnabled={setSoundEnabled}
          soundEnabled={soundEnabled}
        />
        <HistorySheet
          history={history}
          isPremium={isPremium}
          isVisible={isHistoryVisible}
          onClear={clearHistory}
          onClose={() => setHistoryVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  brandBlock: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#858CA8',
    fontSize: 13,
    marginTop: 4,
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: '#252B46',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  settingsIcon: {
    color: '#D9DDF0',
    fontSize: 22,
  },
  modeRow: {
    alignSelf: 'center',
    backgroundColor: '#1C223B',
    borderRadius: 14,
    flexDirection: 'row',
    marginTop: 30,
    padding: 4,
  },
  mode: {
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  modeLabel: {
    color: '#A9B0C8',
    fontSize: 13,
    fontWeight: '700',
  },
  selectedModeLabel: {
    color: '#FFFFFF',
  },
  diceArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 270,
  },
  diceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    justifyContent: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  resultCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(37, 43, 70, 0.68)',
    borderColor: 'rgba(141, 155, 255, 0.12)',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    width: '100%',
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  helper: {
    color: '#858CA8',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  rollButton: {
    alignSelf: 'center',
    marginTop: 22,
    minWidth: 220,
  },
  history: {
    alignItems: 'center',
    minHeight: 72,
    paddingTop: 22,
  },
  historyTitle: {
    color: '#858CA8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },
  historyValues: {
    color: '#A9B0C8',
    fontSize: 13,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 7,
  },
  statsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  statsText: {
    color: '#858CA8',
    fontSize: 11,
  },
  clearLabel: {
    color: '#AEB8FF',
    fontSize: 11,
    fontWeight: '700',
  },
  historyChip: {
    alignItems: 'center',
    backgroundColor: '#202640',
    borderColor: '#313A60',
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 42,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  historyChipText: {
    color: '#D9DDF0',
    fontSize: 12,
    fontWeight: '700',
  },
});
