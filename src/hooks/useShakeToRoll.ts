import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef } from 'react';

const SHAKE_THRESHOLD = 2.2;
const SHAKE_COOLDOWN_MS = 1200;

export function useShakeToRoll(enabled: boolean, onShake: () => void): void {
  const lastShakeAt = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    Accelerometer.setUpdateInterval(120);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (magnitude < SHAKE_THRESHOLD || now - lastShakeAt.current < SHAKE_COOLDOWN_MS) return;

      lastShakeAt.current = now;
      onShake();
    });

    return () => subscription.remove();
  }, [enabled, onShake]);
}

export const SHAKE_ROLL_CONFIG = {
  cooldownMs: SHAKE_COOLDOWN_MS,
  threshold: SHAKE_THRESHOLD,
};
