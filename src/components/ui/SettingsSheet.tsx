import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button';
import { ThemePicker } from './ThemePicker';
import { DiceTheme } from '../../store/settingsStore';

interface SettingsSheetProps {
  hapticsEnabled: boolean;
  isPurchasing: boolean;
  isVisible: boolean;
  premiumUnlocked: boolean;
  selectedTheme: DiceTheme;
  soundEnabled: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onRestore: () => void;
  onSelectTheme: (theme: DiceTheme) => void;
  setHapticsEnabled: (value: boolean) => void;
  setSoundEnabled: (value: boolean) => void;
}

export function SettingsSheet({
  hapticsEnabled,
  isPurchasing,
  isVisible,
  premiumUnlocked,
  selectedTheme,
  soundEnabled,
  onClose,
  onPurchase,
  onRestore,
  onSelectTheme,
  setHapticsEnabled,
  setSoundEnabled,
}: SettingsSheetProps) {
  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Ayarlar</Text>
            <Pressable accessibilityLabel="Ayarları kapat" onPress={onClose}>
              <Text style={styles.close}>Kapat</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.option}>
              <Text style={styles.optionLabel}>Ses</Text>
              <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
            </View>
            <View style={styles.option}>
              <Text style={styles.optionLabel}>Haptik</Text>
              <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
            </View>
            <ThemePicker
              isPremium={premiumUnlocked}
              onSelect={onSelectTheme}
              selectedTheme={selectedTheme}
            />
            <View style={styles.premiumCard}>
              <Text style={styles.premiumTitle}>
                {premiumUnlocked ? 'Premium açık' : 'Zar Premium'}
              </Text>
              <Text style={styles.premiumText}>
                {premiumUnlocked
                  ? 'Tüm temalar ve gelişmiş efektler kullanılabilir.'
                  : 'Neon, gün batımı ve gece temalarının kilidini aç.'}
              </Text>
              {!premiumUnlocked && (
                <Button
                  disabled={isPurchasing}
                  label={isPurchasing ? 'Kontrol ediliyor…' : 'Premium’u Satın Al'}
                  onPress={onPurchase}
                />
              )}
              <Pressable disabled={isPurchasing} onPress={onRestore} style={styles.restore}>
                <Text style={styles.restoreLabel}>Satın alımları geri yükle</Text>
              </Pressable>
            </View>
            <Text style={styles.legal}>
              Zar, kumar veya bahis uygulaması değildir; gerçek parayla oynanan bir oyun içermez.
              Kişisel veri toplamaz.
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(4, 6, 15, 0.68)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#171C31',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
    paddingHorizontal: 22,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#2A3150',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  title: {
    color: '#F7F8FF',
    fontSize: 22,
    fontWeight: '800',
  },
  close: {
    color: '#AEB8FF',
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  option: {
    alignItems: 'center',
    borderBottomColor: '#2A3150',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionLabel: {
    color: '#E4E7F4',
    fontSize: 16,
  },
  premiumCard: {
    backgroundColor: '#232A49',
    borderRadius: 16,
    marginTop: 4,
    padding: 16,
  },
  premiumTitle: {
    color: '#F4C95D',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  premiumText: {
    color: '#C4C9DD',
    lineHeight: 20,
    marginBottom: 14,
  },
  restore: {
    alignItems: 'center',
    paddingTop: 15,
  },
  restoreLabel: {
    color: '#AEB8FF',
    fontSize: 14,
    fontWeight: '700',
  },
  legal: {
    color: '#858CA8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 22,
    textAlign: 'center',
  },
});
