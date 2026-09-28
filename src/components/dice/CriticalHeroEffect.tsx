import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useI18n } from '../../lib/i18n';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface CriticalHeroEffectProps {
  accentColor: string;
  visible: boolean;
}

export function CriticalHeroEffect({ accentColor, visible }: CriticalHeroEffectProps) {
  const { t } = useI18n();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);

  useEffect(() => {
    if (!visible) return;
    opacity.value = withSequence(
      withTiming(1, { duration: 160, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 950, easing: Easing.in(Easing.quad) }),
    );
    scale.value = withSequence(
      withTiming(1.12, { duration: 180, easing: Easing.out(Easing.back(1.4)) }),
      withTiming(1, { duration: 850, easing: Easing.out(Easing.quad) }),
    );
  }, [opacity, scale, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.container, animatedStyle]}>
      <Text style={[styles.label, { color: accentColor }]}>{t('criticalTitle')}</Text>
      <Text style={styles.subtitle}>{t('criticalSubtitle')}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', position: 'absolute', top: '19%', width: '100%' },
  label: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 3,
    textShadowColor: '#FFFFFF',
    textShadowRadius: 10,
  },
  subtitle: { color: '#F7F8FF', fontSize: 12, fontWeight: '700', marginTop: 4 },
});
