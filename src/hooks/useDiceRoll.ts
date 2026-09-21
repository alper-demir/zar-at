import { useCallback, useRef, useState } from 'react';
import { playRollSettle, playRollStart } from '../lib/haptics';
import { rollD6 } from '../lib/rng';
import { getRollDurationMs } from '../lib/rollAnimation';
import { SoundEffect } from '../lib/sounds';
import { HapticProfile } from '../lib/personalization';

export type DiceMode = 'single' | 'pair';

export interface RollResult {
  dice: number[];
  id: number;
  total: number;
}

export function useDiceRoll(
  hapticsEnabled: boolean,
  hapticProfile: HapticProfile,
  reducedMotionEnabled: boolean,
  playSound: (effect: SoundEffect) => void,
): {
  isRolling: boolean;
  lastRoll: RollResult | null;
  roll: (mode: DiceMode) => Promise<RollResult | null>;
} {
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<RollResult | null>(null);
  const rollingRef = useRef(false);

  const roll = useCallback(
    async (mode: DiceMode): Promise<RollResult | null> => {
      if (rollingRef.current) return null;

      rollingRef.current = true;
      setIsRolling(true);
      try {
        void playRollStart(hapticsEnabled, hapticProfile);
        playSound('roll');

        const dice = await Promise.all([rollD6(), ...(mode === 'pair' ? [rollD6()] : [])]);
        const result: RollResult = {
          dice,
          id: Date.now(),
          total: dice.reduce((sum, die) => sum + die, 0),
        };

        const rollDurationMs = reducedMotionEnabled
          ? 120
          : getRollDurationMs(mode === 'pair' ? 2 : 1);
        await new Promise<void>((resolve) => setTimeout(resolve, rollDurationMs));

        setLastRoll(result);
        void playRollSettle(
          hapticsEnabled,
          dice.every((die) => die === 6),
          hapticProfile,
        );
        playSound('impact');
        if (dice.every((die) => die === 6)) {
          setTimeout(() => playSound('sparkle'), 140);
        }
        return result;
      } catch {
        return null;
      } finally {
        rollingRef.current = false;
        setIsRolling(false);
      }
    },
    [hapticProfile, hapticsEnabled, playSound, reducedMotionEnabled],
  );

  return { isRolling, lastRoll, roll };
}
