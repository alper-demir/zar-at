import { useCallback, useRef, useState } from 'react';
import { playRollSettle, playRollStart } from '../lib/haptics';
import { rollD6 } from '../lib/rng';
import { getRollDurationMs } from '../lib/rollAnimation';
import { SoundEffect } from '../lib/sounds';

export type DiceMode = 'single' | 'pair';

export interface RollResult {
  dice: number[];
  id: number;
  total: number;
}

export function useDiceRoll(
  hapticsEnabled: boolean,
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
        void playRollStart(hapticsEnabled);
        playSound('roll');

        const dice = await Promise.all([rollD6(), ...(mode === 'pair' ? [rollD6()] : [])]);
        const result: RollResult = {
          dice,
          id: Date.now(),
          total: dice.reduce((sum, die) => sum + die, 0),
        };

        const rollDurationMs = getRollDurationMs(mode === 'pair' ? 2 : 1);
        await new Promise<void>((resolve) => setTimeout(resolve, rollDurationMs));

        setLastRoll(result);
        void playRollSettle(
          hapticsEnabled,
          dice.every((die) => die === 6),
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
    [hapticsEnabled, playSound],
  );

  return { isRolling, lastRoll, roll };
}
