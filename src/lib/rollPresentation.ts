import type { RollResult } from '../hooks/useDiceRoll';

export function formatRollResult(result: RollResult): string {
  return result.dice.length === 2
    ? `${result.dice[0]} + ${result.dice[1]} = ${result.total}`
    : `${result.total}`;
}

export function formatRollAnnouncement(result: RollResult): string {
  return result.dice.length === 2
    ? `Çift zar sonucu: ${result.dice[0]} artı ${result.dice[1]}, toplam ${result.total}.`
    : `Zar sonucu: ${result.total}.`;
}

export function isCriticalRoll(result: RollResult): boolean {
  return result.dice.length === 2 && result.dice.every((die) => die === 6);
}
