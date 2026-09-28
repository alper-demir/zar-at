import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import {
  DICE_BODY_OPTIONS,
  DICE_FINISH_OPTIONS,
  DICE_MATERIAL_OPTIONS,
  DICE_PIP_OPTIONS,
  DiceAppearance,
} from '../../lib/personalization';
import { useI18n } from '../../lib/i18n';

interface DiceWorkshopProps {
  firstDice: DiceAppearance;
  isPremium: boolean;
  onFirstChange: (appearance: Partial<DiceAppearance>) => void;
  onLockedPress: () => void;
  onSecondChange: (appearance: Partial<DiceAppearance>) => void;
  secondDice: DiceAppearance;
}

type DiceTarget = 'first' | 'second';

export function DiceWorkshop({
  firstDice,
  isPremium,
  onFirstChange,
  onLockedPress,
  onSecondChange,
  secondDice,
}: DiceWorkshopProps) {
  const { t } = useI18n();
  const optionLabel = (label: string) =>
    ({
      Klasik: t('classic'),
      Fildişi: t('ivory'),
      Neon: t('neon'),
      Mercan: t('coral'),
      Buz: t('ice'),
      Beyaz: t('white'),
      Gece: t('night'),
      Mint: t('mint'),
      Altın: t('gold'),
      Mat: t('matte'),
      Parlak: t('glossy'),
      'Neon glow': t('neonGlow'),
      Düz: t('solid'),
      Ahşap: t('wood'),
      Mermer: t('marble'),
      Cam: t('glass'),
    })[label] ?? label;
  const [target, setTarget] = useState<DiceTarget>('first');
  const selected = target === 'first' ? firstDice : secondDice;
  const update = target === 'first' ? onFirstChange : onSecondChange;

  const select = (premium: boolean, change: Partial<DiceAppearance>) => {
    if (premium && !isPremium) {
      onLockedPress();
      return;
    }
    update(change);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('workshop')}</Text>
      <Text style={styles.subtitle}>{t('workshopSubtitle')}</Text>
      <View style={styles.targetRow}>
        {(['first', 'second'] as DiceTarget[]).map((item) => (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: target === item }}
            key={item}
            onPress={() => setTarget(item)}
            style={[styles.target, target === item && styles.targetSelected]}
          >
            <Text style={styles.targetLabel}>{item === 'first' ? t('die1') : t('die2')}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{t('bodyColor')}</Text>
      <View style={styles.optionRow}>
        {DICE_BODY_OPTIONS.map((option) => (
          <Pressable
            accessibilityLabel={`${optionLabel(option.label)}${option.premium && !isPremium ? `, ${t('premiumLocked')}` : ''}`}
            key={option.color}
            onPress={() => select(option.premium, { bodyColor: option.color })}
            style={[styles.swatchButton, selected.bodyColor === option.color && styles.selected]}
          >
            <View style={[styles.swatch, { backgroundColor: option.color }]} />
            <Text style={styles.optionLabel}>
              {option.premium && !isPremium ? '🔒' : optionLabel(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{t('pipColor')}</Text>
      <View style={styles.optionRow}>
        {DICE_PIP_OPTIONS.map((option) => (
          <Pressable
            accessibilityLabel={`${optionLabel(option.label)}${option.premium && !isPremium ? `, ${t('premiumLocked')}` : ''}`}
            key={option.color}
            onPress={() => select(option.premium, { pipColor: option.color })}
            style={[styles.swatchButton, selected.pipColor === option.color && styles.selected]}
          >
            <View style={[styles.swatch, { backgroundColor: option.color }]} />
            <Text style={styles.optionLabel}>
              {option.premium && !isPremium ? '🔒' : optionLabel(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{t('finish')}</Text>
      <View style={styles.finishRow}>
        {DICE_FINISH_OPTIONS.map((option) => (
          <Pressable
            accessibilityLabel={`${optionLabel(option.label)}${option.premium && !isPremium ? `, ${t('premiumLocked')}` : ''}`}
            key={option.id}
            onPress={() => select(option.premium, { finish: option.id })}
            style={[styles.finish, selected.finish === option.id && styles.selected]}
          >
            <Text style={styles.optionLabel}>
              {option.premium && !isPremium ? '🔒 ' : ''}
              {optionLabel(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{t('material')}</Text>
      <View style={styles.finishRow}>
        {DICE_MATERIAL_OPTIONS.map((option) => (
          <Pressable
            accessibilityLabel={`${optionLabel(option.label)}${option.premium && !isPremium ? `, ${t('premiumLocked')}` : ''}`}
            key={option.id}
            onPress={() => select(option.premium, { material: option.id })}
            style={[styles.finish, selected.material === option.id && styles.selected]}
          >
            <Text style={styles.optionLabel}>
              {option.premium && !isPremium ? '🔒 ' : ''}
              {optionLabel(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  finish: {
    alignItems: 'center',
    borderColor: '#3A4265',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  finishRow: { flexDirection: 'row', gap: 8 },
  optionLabel: { color: '#C4C9DD', fontSize: 10, textAlign: 'center' },
  optionRow: { flexDirection: 'row', gap: 7 },
  sectionLabel: {
    color: '#AEB8FF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 14,
  },
  selected: { borderColor: '#F4C95D' },
  subtitle: { color: '#858CA8', fontSize: 12, marginBottom: 10 },
  swatch: { borderRadius: 9, height: 30, marginBottom: 5, width: 30 },
  swatchButton: {
    alignItems: 'center',
    borderColor: '#3A4265',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    padding: 6,
  },
  target: { alignItems: 'center', borderRadius: 8, flex: 1, paddingVertical: 8 },
  targetLabel: { color: '#C4C9DD', fontSize: 12, fontWeight: '700' },
  targetRow: { backgroundColor: '#101426', borderRadius: 10, flexDirection: 'row', padding: 3 },
  targetSelected: { backgroundColor: '#303A70' },
  title: { color: '#F7F8FF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
});
