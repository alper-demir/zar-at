import { useEffect } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ThemeDefinition } from '../../assets/themes/themes';
import {
  DICE_FLIGHT_DURATION_MS,
  DICE_LIFT_DURATION_MS,
  DICE_SCALE_DURATION_MS,
  DICE_WIND_UP_DURATION_MS,
} from '../../lib/rollAnimation';

interface Dice3DProps {
  delayMs?: number;
  disabled?: boolean;
  onPress?: () => void;
  rollId: number;
  size?: number;
  theme: ThemeDefinition;
  value: number;
}

const PIP_POSITIONS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function DicePips({ size, value }: { size: number; value: number }) {
  const activePips = PIP_POSITIONS[value] ?? PIP_POSITIONS[1];
  return (
    <View style={[styles.pipGrid, { height: size * 0.56, width: size * 0.56 }]}>
      {Array.from({ length: 9 }, (_, index) => (
        <View key={index} style={styles.pipCell}>
          {activePips.includes(index) && (
            <View
              style={[
                styles.pip,
                { borderRadius: size * 0.06, height: size * 0.12, width: size * 0.12 },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

export function Dice3D({
  delayMs = 0,
  disabled = false,
  onPress,
  rollId,
  size = 154,
  theme,
  value,
}: Dice3DProps) {
  const rotation = useSharedValue(0);
  const lift = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (rollId === 0) return;
    const config = { duration: DICE_FLIGHT_DURATION_MS, easing: Easing.out(Easing.cubic) };
    rotation.value = withDelay(
      delayMs,
      withSequence(
        withTiming(rotation.value + 250, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(rotation.value + 720, config),
      ),
    );
    lift.value = withDelay(
      delayMs,
      withSequence(
        withTiming(-30, { duration: 280 }),
        withTiming(0, {
          duration: DICE_LIFT_DURATION_MS - 280,
          easing: Easing.out(Easing.quad),
        }),
      ),
    );
    scale.value = withDelay(
      delayMs,
      withSequence(
        withTiming(1.05, { duration: 320 }),
        withTiming(1, { duration: DICE_SCALE_DURATION_MS - 320 }),
      ),
    );
  }, [delayMs, lift, rollId, rotation, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${rotation.value}deg` },
      { translateY: lift.value },
      { scale: scale.value },
    ],
  }));

  const diceStyle: ViewStyle = {
    backgroundColor: theme.face,
    borderRadius: size * 0.18,
    height: size,
    width: size,
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Zar ${value}, tekrar atmak için dokun`}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [styles.dice, diceStyle, pressed && styles.pressed]}
      >
        <View style={styles.gloss} />
        <DicePips size={size} value={value} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dice: {
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
  },
  gloss: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 60,
    height: 48,
    left: 18,
    position: 'absolute',
    top: 14,
    transform: [{ rotate: '-28deg' }],
    width: 92,
  },
  pipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
  },
  pipCell: {
    alignItems: 'center',
    height: '33.33%',
    justifyContent: 'center',
    width: '33.33%',
  },
  pip: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.45,
    shadowRadius: 5,
  },
  pressed: {
    opacity: 0.84,
  },
});
