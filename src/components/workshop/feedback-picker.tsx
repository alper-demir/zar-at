import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HapticProfile, SoundProfile } from '../../lib/personalization';
import { useI18n } from '../../lib/i18n';

interface FeedbackPickerProps {
  hapticProfile: HapticProfile;
  isPremium: boolean;
  onHapticChange: (profile: HapticProfile) => void;
  onLockedPress: () => void;
  onSoundChange: (profile: SoundProfile) => void;
  soundProfile: SoundProfile;
}

export function FeedbackPicker({
  hapticProfile,
  isPremium,
  onHapticChange,
  onLockedPress,
  onSoundChange,
  soundProfile,
}: FeedbackPickerProps) {
  const { t } = useI18n();
  const choose = (premium: boolean, callback: () => void) => {
    if (premium && !isPremium) {
      onLockedPress();
      return;
    }
    callback();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('feedback')}</Text>
      <Text style={styles.subtitle}>{t('feedbackHint')}</Text>
      <Text style={styles.label}>{t('soundCharacter')}</Text>
      <View style={styles.row}>
        <Pressable
          accessibilityLabel={t('cinematic')}
          onPress={() => onSoundChange('cinematic')}
          style={[styles.option, soundProfile === 'cinematic' && styles.selected]}
        >
          <Text style={styles.optionText}>{t('cinematic')}</Text>
        </Pressable>
        <Pressable
          accessibilityLabel={`${t('minimal')}, ${t('premiumLocked')}`}
          onPress={() => choose(true, () => onSoundChange('minimal'))}
          style={[styles.option, soundProfile === 'minimal' && styles.selected]}
        >
          <Text style={styles.optionText}>
            {!isPremium ? '🔒 ' : ''}
            {t('minimal')}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.label}>{t('hapticStrength')}</Text>
      <View style={styles.row}>
        {(['soft', 'standard', 'strong'] as HapticProfile[]).map((profile) => {
          const premium = profile === 'strong';
          return (
            <Pressable
              accessibilityLabel={`${profile}${premium && !isPremium ? `, ${t('premiumLocked')}` : ''}`}
              key={profile}
              onPress={() => choose(premium, () => onHapticChange(profile))}
              style={[styles.option, hapticProfile === profile && styles.selected]}
            >
              <Text style={styles.optionText}>
                {premium && !isPremium ? '🔒 ' : ''}
                {profile === 'soft'
                  ? t('soft')
                  : profile === 'standard'
                    ? t('standard')
                    : t('strong')}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { color: '#AEB8FF', fontSize: 12, fontWeight: '800', marginBottom: 8, marginTop: 14 },
  option: {
    alignItems: 'center',
    borderColor: '#3A4265',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  optionText: { color: '#C4C9DD', fontSize: 11, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
  selected: { borderColor: '#F4C95D', backgroundColor: '#252B46' },
  subtitle: { color: '#858CA8', fontSize: 12, marginTop: 4 },
  title: { color: '#F7F8FF', fontSize: 16, fontWeight: '700' },
});
