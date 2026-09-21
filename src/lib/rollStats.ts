import type { RollResult } from '../hooks/useDiceRoll';

export interface RollStats {
  average: number;
  counts: number[];
  totalRolls: number;
}

export function calculateRollStats(history: RollResult[]): RollStats {
  const counts = [0, 0, 0, 0, 0, 0];
  let sum = 0;
  let totalValues = 0;

  history.forEach((roll) => {
    roll.dice.forEach((value) => {
      counts[value - 1] += 1;
      sum += value;
      totalValues += 1;
    });
  });

  return {
    average: totalValues ? sum / totalValues : 0,
    counts,
    totalRolls: history.length,
  };
}
