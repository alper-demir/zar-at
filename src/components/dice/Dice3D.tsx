import { useEffect, useRef, useState } from 'react';
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
import { DiceAppearance, getReadablePipColor } from '../../lib/personalization';
import {
  DICE_FALL_DURATION_MS,
  DICE_LIFT_DURATION_MS,
  DICE_SETTLE_DURATION_MS,
  DICE_TAKEOFF_DURATION_MS,
  DICE_WIND_UP_DURATION_MS,
  getDiceMotionProfile,
} from '../../lib/rollAnimation';

interface Dice3DProps {
  appearance?: DiceAppearance;
  delayMs?: number;
  diceIndex?: number;
  disabled?: boolean;
  onPress?: () => void;
  reducedMotion?: boolean;
  rollId: number;
  size?: number;
  targetValue?: number;
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

function DicePips({ color, size, value }: { color: string; size: number; value: number }) {
  const activePips = PIP_POSITIONS[value] ?? PIP_POSITIONS[1];
  return (
    <View style={[styles.pipGrid, { height: size * 0.56, width: size * 0.56 }]}>
      {Array.from({ length: 9 }, (_, index) => (
        <View key={index} style={styles.pipCell}>
          {activePips.includes(index) && (
            <View
              style={[
                styles.pip,
                {
                  backgroundColor: color,
                  borderRadius: size * 0.06,
                  height: size * 0.12,
                  width: size * 0.12,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

export function Dice3D({
  appearance,
  delayMs = 0,
  diceIndex = 0,
  disabled = false,
  onPress,
  reducedMotion = false,
  rollId,
  size = 154,
  targetValue,
  theme,
  value,
}: Dice3DProps) {
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const rotationZ = useSharedValue(0);
  const lift = useSharedValue(0);
  const drift = useSharedValue(0);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.32);
  const shadowScale = useSharedValue(1);
  const previousRollId = useRef(rollId);
  const hasMounted = useRef(false);
  const targetValueRef = useRef(targetValue);
  const [rollingFace, setRollingFace] = useState<number | null>(null);

  useEffect(() => {
    targetValueRef.current = targetValue;
  }, [targetValue]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      previousRollId.current = rollId;
      return;
    }
    if (rollId === 0 || rollId === previousRollId.current) return;
    previousRollId.current = rollId;

    if (reducedMotion) {
      lift.value = withSequence(withTiming(-4, { duration: 55 }), withTiming(0, { duration: 65 }));
      scale.value = withSequence(
        withTiming(0.97, { duration: 55 }),
        withTiming(1, { duration: 65 }),
      );
      return;
    }

    const profile = getDiceMotionProfile(rollId, diceIndex);
    const startX = rotationX.value;
    const startY = rotationY.value;
    const startZ = rotationZ.value;
    const flightEase = Easing.out(Easing.cubic);
    const fallEase = Easing.in(Easing.quad);

    rotationX.value = withDelay(
      delayMs,
      withSequence(
        withTiming(startX + profile.windUpX, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(startX + profile.rotationX * 0.62, {
          duration: DICE_TAKEOFF_DURATION_MS,
          easing: flightEase,
        }),
        withTiming(startX + profile.rotationX, {
          duration: DICE_FALL_DURATION_MS,
          easing: fallEase,
        }),
        withTiming(startX + profile.rotationX + profile.landingTiltX, {
          duration: DICE_SETTLE_DURATION_MS,
          easing: Easing.out(Easing.back(1.15)),
        }),
      ),
    );
    rotationY.value = withDelay(
      delayMs,
      withSequence(
        withTiming(startY + profile.windUpY, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(startY + profile.rotationY * 0.62, {
          duration: DICE_TAKEOFF_DURATION_MS,
          easing: flightEase,
        }),
        withTiming(startY + profile.rotationY, {
          duration: DICE_FALL_DURATION_MS,
          easing: fallEase,
        }),
        withTiming(startY + profile.rotationY + profile.landingTiltY, {
          duration: DICE_SETTLE_DURATION_MS,
          easing: Easing.out(Easing.back(1.15)),
        }),
      ),
    );
    rotationZ.value = withDelay(
      delayMs,
      withSequence(
        withTiming(startZ - profile.windUpY * 0.5, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(startZ + profile.rotationZ * 0.68, {
          duration: DICE_TAKEOFF_DURATION_MS,
          easing: flightEase,
        }),
        withTiming(startZ + profile.rotationZ, {
          duration: DICE_FALL_DURATION_MS,
          easing: fallEase,
        }),
        withTiming(startZ + profile.rotationZ, { duration: DICE_SETTLE_DURATION_MS }),
      ),
    );
    lift.value = withDelay(
      delayMs,
      withSequence(
        withTiming(3, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(-68, { duration: DICE_TAKEOFF_DURATION_MS, easing: flightEase }),
        withTiming(0, { duration: DICE_FALL_DURATION_MS, easing: fallEase }),
        withTiming(-9, { duration: 80, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: DICE_SETTLE_DURATION_MS - 80, easing: fallEase }),
      ),
    );
    drift.value = withDelay(
      delayMs,
      withSequence(
        withTiming(-profile.driftX * 0.18, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(profile.driftX, {
          duration: DICE_TAKEOFF_DURATION_MS,
          easing: flightEase,
        }),
        withTiming(profile.driftX * 0.35, {
          duration: DICE_FALL_DURATION_MS,
          easing: Easing.inOut(Easing.quad),
        }),
        withTiming(0, { duration: DICE_SETTLE_DURATION_MS, easing: flightEase }),
      ),
    );
    scale.value = withDelay(
      delayMs,
      withSequence(
        withTiming(0.96, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(1.055, { duration: DICE_TAKEOFF_DURATION_MS, easing: flightEase }),
        withTiming(1.01, { duration: DICE_FALL_DURATION_MS }),
        withTiming(1, { duration: DICE_SETTLE_DURATION_MS }),
      ),
    );
    shadowScale.value = withDelay(
      delayMs,
      withSequence(
        withTiming(1.06, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(0.55, { duration: DICE_TAKEOFF_DURATION_MS, easing: flightEase }),
        withTiming(1, { duration: DICE_FALL_DURATION_MS, easing: fallEase }),
        withTiming(0.9, { duration: 80 }),
        withTiming(1, { duration: DICE_SETTLE_DURATION_MS - 80 }),
      ),
    );
    shadowOpacity.value = withDelay(
      delayMs,
      withSequence(
        withTiming(0.36, { duration: DICE_WIND_UP_DURATION_MS }),
        withTiming(0.1, { duration: DICE_TAKEOFF_DURATION_MS, easing: flightEase }),
        withTiming(0.32, { duration: DICE_FALL_DURATION_MS, easing: fallEase }),
        withTiming(0.32, { duration: DICE_SETTLE_DURATION_MS }),
      ),
    );

    let faceTimer: ReturnType<typeof setInterval> | undefined;
    const faceStartTimer = setTimeout(() => {
      setRollingFace(((rollId * 3 + diceIndex * 2) % 6) + 1);
      faceTimer = setInterval(() => {
        setRollingFace((current) => ((current ?? 1) % 6) + 1);
      }, 85);
    }, delayMs + DICE_WIND_UP_DURATION_MS);
    const faceStopTimer = setTimeout(
      () => {
        if (faceTimer) clearInterval(faceTimer);
        setRollingFace(targetValueRef.current ?? value);
      },
      delayMs + DICE_LIFT_DURATION_MS - 140,
    );

    return () => {
      clearTimeout(faceStartTimer);
      clearTimeout(faceStopTimer);
      if (faceTimer) clearInterval(faceTimer);
    };
  }, [
    delayMs,
    diceIndex,
    drift,
    lift,
    reducedMotion,
    rollId,
    rotationX,
    rotationY,
    rotationZ,
    scale,
    shadowOpacity,
    shadowScale,
    value,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 720 },
      { translateX: drift.value },
      { translateY: lift.value },
      { rotateX: `${rotationX.value}deg` },
      { rotateY: `${rotationY.value}deg` },
      { rotateZ: `${rotationZ.value}deg` },
      { scale: scale.value },
    ],
  }));
  const shadowStyle = useAnimatedStyle(() => ({
    opacity: shadowOpacity.value,
    transform: [{ translateX: drift.value * 0.28 }, { scaleX: shadowScale.value }],
  }));

  const diceStyle: ViewStyle = {
    backgroundColor: appearance?.bodyColor ?? theme.face,
    borderRadius: size * 0.18,
    borderColor:
      appearance?.material === 'wood'
        ? '#8C5A35'
        : appearance?.material === 'marble'
          ? '#E8E8F2'
          : appearance?.material === 'glass'
            ? 'rgba(255, 255, 255, 0.7)'
            : 'transparent',
    borderWidth: appearance?.material === 'solid' || !appearance?.material ? 0 : 2,
    height: size,
    opacity: appearance?.material === 'glass' ? 0.86 : 1,
    shadowColor: appearance?.finish === 'neon' ? appearance.bodyColor : '#000000',
    shadowOpacity: appearance?.finish === 'neon' ? 0.7 : 0.32,
    shadowRadius: appearance?.finish === 'neon' ? 24 : 18,
    width: size,
  };

  return (
    <View style={[styles.stage, { height: size + 92, width: size + 14 }]}>
      <Animated.View
        pointerEvents="none"
        style={[styles.groundShadow, { height: size * 0.1, width: size * 0.72 }, shadowStyle]}
      />
      <Animated.View style={[styles.motionLayer, { bottom: 20 }, animatedStyle]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Zar ${value}, tekrar atmak için dokun`}
          disabled={disabled}
          onPress={onPress}
          style={({ pressed }) => [styles.dice, diceStyle, pressed && styles.pressed]}
        >
          <View style={[styles.gloss, appearance?.finish === 'matte' && styles.matteGloss]} />
          {appearance?.material === 'wood' && (
            <View pointerEvents="none" style={styles.woodGrain} />
          )}
          {appearance?.material === 'marble' && (
            <View pointerEvents="none" style={styles.marbleVein} />
          )}
          <View pointerEvents="none" style={styles.topHighlight} />
          <View pointerEvents="none" style={styles.rightBevel} />
          <View pointerEvents="none" style={styles.bottomBevel} />
          <DicePips
            color={getReadablePipColor(
              appearance?.bodyColor ?? theme.face,
              appearance?.pipColor ?? '#FFFFFF',
            )}
            size={size}
            value={rollingFace ?? value}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  motionLayer: {
    position: 'absolute',
  },
  groundShadow: {
    backgroundColor: '#000000',
    borderRadius: 999,
    bottom: 5,
    position: 'absolute',
  },
  dice: {
    alignItems: 'center',
    elevation: 12,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 16 },
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
  matteGloss: {
    opacity: 0.04,
  },
  topHighlight: {
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderLeftWidth: 2,
    borderRadius: 22,
    borderTopWidth: 3,
    bottom: 4,
    left: 4,
    position: 'absolute',
    right: 4,
    top: 4,
  },
  rightBevel: {
    backgroundColor: 'rgba(0, 0, 0, 0.13)',
    bottom: 0,
    position: 'absolute',
    right: 0,
    top: 5,
    width: 8,
  },
  bottomBevel: {
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    bottom: 0,
    height: 8,
    left: 5,
    position: 'absolute',
    right: 0,
  },
  marbleVein: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    height: 12,
    left: -10,
    position: 'absolute',
    top: 76,
    transform: [{ rotate: '-24deg' }],
    width: 190,
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
  woodGrain: {
    backgroundColor: 'rgba(72, 36, 18, 0.18)',
    height: 8,
    left: -10,
    position: 'absolute',
    top: 56,
    transform: [{ rotate: '18deg' }],
    width: 190,
  },
});
