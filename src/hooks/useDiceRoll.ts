import { useCallback, useState } from 'react';
import { playRollSettle, playRollStart } from '../lib/haptics';
import { rollD6 } from '../lib/rng';
import { SoundEffect } from '../lib/sounds';

export type DiceMode = 'single' | 'pair';

export interface RollResult {
  dice: number[];
  id: number;
  total: number;
}

const ROLL_DURATION_MS = 980;

export function useDiceRoll(
  hapticsEnabled: boolean,
  playSound: (effect: SoundEffect) => void,
): {
  isRolling: boolean;
  lastRoll: RollResult | null;
  roll: (mode: DiceMode) => Promise<RollResult | null>;
  rollDurationMs: number;
} {
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<RollResult | null>(null);

  const roll = useCallback(
    async (mode: DiceMode): Promise<RollResult | null> => {
      if (isRolling) return null;

      setIsRolling(true);
      void playRollStart(hapticsEnabled);
      playSound('roll');

      const dice = await Promise.all([rollD6(), ...(mode === 'pair' ? [rollD6()] : [])]);
      const result: RollResult = {
        dice,
        id: Date.now(),
        total: dice.reduce((sum, die) => sum + die, 0),
      };

      await new Promise<void>((resolve) => setTimeout(resolve, ROLL_DURATION_MS));
      setLastRoll(result);
      setIsRolling(false);
      void playRollSettle(
        hapticsEnabled,
        dice.every((die) => die === 6),
      );
      playSound('impact');
      if (dice.every((die) => die === 6)) {
        setTimeout(() => playSound('sparkle'), 140);
      }
      return result;
    },
    [hapticsEnabled, isRolling, playSound],
  );

  return { isRolling, lastRoll, roll, rollDurationMs: ROLL_DURATION_MS };
}
