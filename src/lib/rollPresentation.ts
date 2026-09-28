import type { RollResult } from '../hooks/useDiceRoll';
import type { Language } from './i18n';

export function formatRollResult(result: RollResult): string {
  return result.dice.length === 2
    ? `${result.dice[0]} + ${result.dice[1]} = ${result.total}`
    : `${result.total}`;
}

export function formatRollAnnouncement(result: RollResult, language: Language = 'tr'): string {
  const pair =
    language === 'en'
      ? 'Two dice result: {a} plus {b}, total {total}.'
      : 'Çift zar sonucu: {a} artı {b}, toplam {total}.';
  const single = language === 'en' ? 'Dice result: {total}.' : 'Zar sonucu: {total}.';
  return result.dice.length === 2
    ? pair
        .replace('{a}', String(result.dice[0]))
        .replace('{b}', String(result.dice[1]))
        .replace('{total}', String(result.total))
    : single.replace('{total}', String(result.total));
}

export function isCriticalRoll(result: RollResult): boolean {
  return result.dice.length === 2 && result.dice.every((die) => die === 6);
}
