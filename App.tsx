import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from './src/assets/themes/themes';
import { Dice3D } from './src/components/dice/Dice3D';
import { Button } from './src/components/ui/Button';
import { SettingsSheet } from './src/components/ui/SettingsSheet';
import { useDiceRoll, DiceMode, RollResult } from './src/hooks/useDiceRoll';
import { prepareSounds } from './src/lib/sounds';
import { usePurchase } from './src/hooks/usePurchase';
import { useSettingsStore } from './src/store/settingsStore';

const INITIAL_DICE = [1, 1];

export default function App() {
  const [mode, setMode] = useState<DiceMode>('single');
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [rollId, setRollId] = useState(0);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [lastSettled, setLastSettled] = useState<RollResult | null>(null);

  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const premiumUnlocked = useSettingsStore((state) => state.premiumUnlocked);
  const selectedTheme = useSettingsStore((state) => state.theme);
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const setHapticsEnabled = useSettingsStore((state) => state.setHapticsEnabled);
  const setSoundEnabled = useSettingsStore((state) => state.setSoundEnabled);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const theme = getTheme(selectedTheme);
  // Dynamic Expo Audio players trigger an ANR in the current Expo Go Android runtime.
  // Keep the main gameplay responsive until the sound layer is rebuilt with persistent players.
  const { isRolling, roll } = useDiceRoll(hapticsEnabled, false);
  const { isPurchasing, purchasePremium, restorePurchases } = usePurchase();

  const displayedDice = lastSettled?.dice ?? INITIAL_DICE.slice(0, mode === 'pair' ? 2 : 1);
  const total = lastSettled?.total ?? null;
  const isCritical = lastSettled?.dice.every((die) => die === 6) ?? false;

  useEffect(() => {
    void prepareSounds();
  }, []);

  const handleRoll = async () => {
    if (isRolling) return;
    setRollId((current) => current + 1);
    const result = await roll(mode);
    if (result) {
      setLastSettled(result);
      setHistory((current) => [result, ...current].slice(0, 5));
    }
  };

  const handleModeChange = (nextMode: DiceMode) => {
    if (isRolling) return;
    setMode(nextMode);
    if (lastSettled && lastSettled.dice.length !== (nextMode === 'pair' ? 2 : 1)) {
      setLastSettled(null);
    }
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
              <Text style={[styles.eyebrow, { color: theme.accent }]}>ZAR • FAIR RNG</Text>
              <Text style={[styles.title, { color: theme.text }]}>Şansını dene</Text>
              <Text style={styles.subtitle}>Reklamsız, hızlı ve adil.</Text>
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
            <View style={[styles.shadow, isRolling && styles.shadowInFlight]} />
            <View style={styles.diceRow}>
              {displayedDice.map((value, index) => (
                <Dice3D
                  delayMs={index * 100}
                  disabled={isRolling}
                  key={`${index}-${mode}`}
                  onPress={() => void handleRoll()}
                  rollId={rollId}
                  size={mode === 'pair' ? 132 : 160}
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
            <Text style={[styles.status, { color: theme.text }]}>{statusText}</Text>
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
                {history.map((item) => (
                  <View key={item.id} style={styles.historyChip}>
                    <Text style={styles.historyChipText}>
                      {item.dice.length === 2 ? `${item.dice[0]} + ${item.dice[1]}` : item.total}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.historyValues}>Henüz kayıt yok</Text>
            )}
          </View>
        </View>

        <SettingsSheet
          hapticsEnabled={hapticsEnabled}
          isPurchasing={isPurchasing}
          isVisible={isSettingsVisible}
          onClose={() => setSettingsVisible(false)}
          onPurchase={() => void purchasePremium()}
          onRestore={() => void restorePurchases()}
          onSelectTheme={setTheme}
          premiumUnlocked={premiumUnlocked}
          selectedTheme={selectedTheme}
          setHapticsEnabled={setHapticsEnabled}
          setSoundEnabled={setSoundEnabled}
          soundEnabled={soundEnabled}
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
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 5,
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
  shadow: {
    backgroundColor: '#000000',
    borderRadius: 60,
    bottom: 44,
    height: 20,
    opacity: 0.3,
    position: 'absolute',
    width: 200,
  },
  shadowInFlight: {
    opacity: 0.14,
    transform: [{ scaleX: 0.72 }],
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
