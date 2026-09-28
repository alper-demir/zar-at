import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button';
import { ThemePicker } from './ThemePicker';
import { DiceWorkshop } from '../workshop/DiceWorkshop';
import { FeedbackPicker } from '../workshop/feedback-picker';
import { DiceAppearance, HapticProfile, SoundProfile } from '../../lib/personalization';
import { DiceTheme } from '../../store/settingsStore';
import { LanguagePreference, useI18n } from '../../lib/i18n';

interface SettingsSheetProps {
  firstDiceAppearance: DiceAppearance;
  hapticProfile: HapticProfile;
  hapticsEnabled: boolean;
  languagePreference: LanguagePreference;
  reducedMotionEnabled: boolean;
  shakeToRollEnabled: boolean;
  isEntitlementChecking: boolean;
  isPurchasing: boolean;
  purchaseError: string | null;
  isVisible: boolean;
  premiumUnlocked: boolean;
  selectedTheme: DiceTheme;
  soundEnabled: boolean;
  soundProfile: SoundProfile;
  onClose: () => void;
  onFirstDiceAppearanceChange: (appearance: Partial<DiceAppearance>) => void;
  onHapticProfileChange: (profile: HapticProfile) => void;
  onLanguageChange: (preference: LanguagePreference) => void;
  onReducedMotionChange: (enabled: boolean) => void;
  onShakeToRollChange: (enabled: boolean) => void;
  onLockedCustomizationPress: () => void;
  onPurchase: () => void;
  onRestore: () => void;
  onSecondDiceAppearanceChange: (appearance: Partial<DiceAppearance>) => void;
  onSoundProfileChange: (profile: SoundProfile) => void;
  onSelectTheme: (theme: DiceTheme) => void;
  secondDiceAppearance: DiceAppearance;
  setHapticsEnabled: (value: boolean) => void;
  setSoundEnabled: (value: boolean) => void;
}

function TooltipRow({ label, hint }: { label: string; hint: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.tooltipWrap}>
      <View style={styles.tooltipLabelRow}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Pressable
          accessibilityLabel={`${label}: ${hint}`}
          onPress={() => setVisible((value) => !value)}
          style={styles.infoButton}
        >
          <Text style={styles.infoText}>?</Text>
        </Pressable>
      </View>
      {visible && <Text style={styles.tooltipText}>{hint}</Text>}
    </View>
  );
}

export function SettingsSheet({
  firstDiceAppearance,
  hapticProfile,
  hapticsEnabled,
  languagePreference,
  reducedMotionEnabled,
  shakeToRollEnabled,
  isEntitlementChecking,
  isPurchasing,
  purchaseError,
  isVisible,
  premiumUnlocked,
  selectedTheme,
  soundEnabled,
  soundProfile,
  onClose,
  onFirstDiceAppearanceChange,
  onHapticProfileChange,
  onLanguageChange,
  onReducedMotionChange,
  onShakeToRollChange,
  onLockedCustomizationPress,
  onPurchase,
  onRestore,
  onSecondDiceAppearanceChange,
  onSoundProfileChange,
  onSelectTheme,
  secondDiceAppearance,
  setHapticsEnabled,
  setSoundEnabled,
}: SettingsSheetProps) {
  const { t } = useI18n();
  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('settings')}</Text>
            <Pressable accessibilityLabel={t('close')} onPress={onClose}>
              <Text style={styles.close}>{t('close')}</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.option}>
              <TooltipRow label={t('sound')} hint={t('soundHint')} />
              <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
            </View>
            <View style={styles.option}>
              <TooltipRow label={t('haptics')} hint={t('hapticsHint')} />
              <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
            </View>
            <View style={styles.option}>
              <TooltipRow label={t('shake')} hint={t('shakeHint')} />
              <Switch value={shakeToRollEnabled} onValueChange={onShakeToRollChange} />
            </View>
            <View style={styles.option}>
              <TooltipRow label={t('reducedMotion')} hint={t('reducedMotionHint')} />
              <Switch value={reducedMotionEnabled} onValueChange={onReducedMotionChange} />
            </View>
            <View style={styles.languageSection}>
              <TooltipRow label={t('language')} hint={t('languageHint')} />
              <View style={styles.languageRow}>
                {(['auto', 'tr', 'en'] as LanguagePreference[]).map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => onLanguageChange(option)}
                    style={[
                      styles.languageButton,
                      languagePreference === option && styles.languageSelected,
                    ]}
                  >
                    <Text style={styles.languageLabel}>
                      {option === 'auto'
                        ? t('auto')
                        : option === 'tr'
                          ? t('turkish')
                          : t('english')}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <ThemePicker
              isPremium={premiumUnlocked}
              onSelect={onSelectTheme}
              selectedTheme={selectedTheme}
            />
            <DiceWorkshop
              firstDice={firstDiceAppearance}
              isPremium={premiumUnlocked}
              onFirstChange={onFirstDiceAppearanceChange}
              onLockedPress={onLockedCustomizationPress}
              onSecondChange={onSecondDiceAppearanceChange}
              secondDice={secondDiceAppearance}
            />
            <FeedbackPicker
              hapticProfile={hapticProfile}
              isPremium={premiumUnlocked}
              onHapticChange={onHapticProfileChange}
              onLockedPress={onLockedCustomizationPress}
              onSoundChange={onSoundProfileChange}
              soundProfile={soundProfile}
            />
            <View style={styles.premiumCard}>
              <Text style={styles.premiumTitle}>
                {premiumUnlocked ? t('premiumOpen') : t('premium')}
              </Text>
              <Text style={styles.premiumText}>
                {premiumUnlocked ? t('premiumOpenHint') : t('premiumHint')}
              </Text>
              {isEntitlementChecking ? (
                <Text style={styles.premiumText}>{t('checking')}</Text>
              ) : (
                !premiumUnlocked && (
                  <Button
                    disabled={isPurchasing}
                    label={isPurchasing ? t('checkingShort') : t('buyPremium')}
                    onPress={onPurchase}
                  />
                )
              )}
              {purchaseError && <Text style={styles.error}>{purchaseError}</Text>}
              <Pressable
                disabled={isPurchasing || isEntitlementChecking}
                onPress={onRestore}
                style={styles.restore}
              >
                <Text style={styles.restoreLabel}>{t('restore')}</Text>
              </Pressable>
            </View>
            <Text style={styles.legal}>{t('legal')}</Text>
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
  error: {
    color: '#FFB4B4',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  content: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  infoButton: {
    alignItems: 'center',
    borderColor: '#6873B5',
    borderRadius: 9,
    borderWidth: 1,
    height: 18,
    justifyContent: 'center',
    marginLeft: 8,
    width: 18,
  },
  infoText: { color: '#AEB8FF', fontSize: 12, fontWeight: '800' },
  languageButton: {
    alignItems: 'center',
    borderColor: '#3A4265',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  languageLabel: { color: '#C4C9DD', fontSize: 12, fontWeight: '700' },
  languageRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  languageSection: { borderBottomColor: '#2A3150', borderBottomWidth: 1, paddingVertical: 14 },
  languageSelected: { backgroundColor: '#303A70', borderColor: '#F4C95D' },
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
  tooltipLabelRow: { alignItems: 'center', flexDirection: 'row' },
  tooltipText: { color: '#9FA8CC', fontSize: 11, lineHeight: 16, marginTop: 5, maxWidth: 250 },
  tooltipWrap: { flex: 1 },
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
