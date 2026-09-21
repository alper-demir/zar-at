import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HapticProfile, SoundProfile } from '../../lib/personalization';

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
  const choose = (premium: boolean, callback: () => void) => {
    if (premium && !isPremium) {
      onLockedPress();
      return;
    }
    callback();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ses ve his profili</Text>
      <Text style={styles.subtitle}>Atışın ritmini ve titreşim gücünü seç.</Text>
      <Text style={styles.label}>Ses karakteri</Text>
      <View style={styles.row}>
        <Pressable
          accessibilityLabel="Sinematik ses"
          onPress={() => onSoundChange('cinematic')}
          style={[styles.option, soundProfile === 'cinematic' && styles.selected]}
        >
          <Text style={styles.optionText}>Sinematik</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Minimal ses, premium"
          onPress={() => choose(true, () => onSoundChange('minimal'))}
          style={[styles.option, soundProfile === 'minimal' && styles.selected]}
        >
          <Text style={styles.optionText}>{!isPremium ? '🔒 ' : ''}Minimal</Text>
        </Pressable>
      </View>
      <Text style={styles.label}>Haptik gücü</Text>
      <View style={styles.row}>
        {(['soft', 'standard', 'strong'] as HapticProfile[]).map((profile) => {
          const premium = profile === 'strong';
          return (
            <Pressable
              accessibilityLabel={`${profile}${premium && !isPremium ? ', premium' : ''}`}
              key={profile}
              onPress={() => choose(premium, () => onHapticChange(profile))}
              style={[styles.option, hapticProfile === profile && styles.selected]}
            >
              <Text style={styles.optionText}>
                {premium && !isPremium ? '🔒 ' : ''}
                {profile === 'soft' ? 'Yumuşak' : profile === 'standard' ? 'Standart' : 'Güçlü'}
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
