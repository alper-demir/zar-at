import { Pressable, StyleSheet, Text, View } from 'react-native';
import { themes } from '../../assets/themes/themes';
import { DiceTheme } from '../../store/settingsStore';
import { useI18n } from '../../lib/i18n';

interface ThemePickerProps {
  isPremium: boolean;
  selectedTheme: DiceTheme;
  onSelect: (theme: DiceTheme) => void;
}

export function ThemePicker({ isPremium, onSelect, selectedTheme }: ThemePickerProps) {
  const { t } = useI18n();
  const labels: Record<DiceTheme, string> = {
    classic: t('classic'),
    neon: t('neon'),
    sunset: t('sunset'),
    midnight: t('midnight'),
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('theme')}</Text>
      <View style={styles.row}>
        {themes.map((theme) => {
          const locked = theme.premium && !isPremium;
          return (
            <Pressable
              accessibilityLabel={`${labels[theme.id]}${locked ? `, ${t('premiumLocked')}` : ''}`}
              key={theme.id}
              onPress={() => !locked && onSelect(theme.id)}
              style={[
                styles.item,
                selectedTheme === theme.id && styles.selected,
                locked && styles.locked,
              ]}
            >
              <View style={[styles.swatch, { backgroundColor: theme.face }]} />
              <Text style={styles.label}>{locked ? '🔒' : labels[theme.id]}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: '#F7F8FF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    alignItems: 'center',
    borderColor: '#3A4265',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    padding: 8,
  },
  selected: {
    borderColor: '#F4C95D',
  },
  locked: {
    opacity: 0.48,
  },
  swatch: {
    borderRadius: 8,
    height: 30,
    marginBottom: 5,
    width: 30,
  },
  label: {
    color: '#C4C9DD',
    fontSize: 10,
    textAlign: 'center',
  },
});
