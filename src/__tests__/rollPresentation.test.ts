import { formatRollAnnouncement, formatRollResult } from '../lib/rollPresentation';
import { getReadablePipColor } from '../lib/personalization';
import { isSoundAllowed } from '../lib/sounds';

describe('roll presentation', () => {
  it('formats a pair with its total', () => {
    const result = { dice: [4, 2], id: 1, total: 6 };

    expect(formatRollResult(result)).toBe('4 + 2 = 6');
    expect(formatRollAnnouncement(result)).toContain('toplam 6');
  });

  it('formats a single result', () => {
    const result = { dice: [5], id: 2, total: 5 };

    expect(formatRollResult(result)).toBe('5');
    expect(formatRollAnnouncement(result)).toBe('Zar sonucu: 5.');
  });

  it('keeps pips readable when body and pip colors are too similar', () => {
    expect(getReadablePipColor('#FFFFFF', '#FFFFFF')).toBe('#101426');
    expect(getReadablePipColor('#6978FF', '#FFFFFF')).toBe('#FFFFFF');
  });

  it('keeps minimal feedback from triggering premium cinematic sounds', () => {
    expect(isSoundAllowed('minimal', 'roll')).toBe(true);
    expect(isSoundAllowed('minimal', 'sparkle')).toBe(false);
    expect(isSoundAllowed('cinematic', 'whoosh')).toBe(true);
  });
});
