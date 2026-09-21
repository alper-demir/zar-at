import { DICE_ROLL_DURATION_MS, getRollDurationMs } from '../lib/rollAnimation';

describe('roll animation timing', () => {
  it('uses the base duration for one die', () => {
    expect(getRollDurationMs(1)).toBe(DICE_ROLL_DURATION_MS);
  });

  it('adds the stagger delay for two dice', () => {
    expect(getRollDurationMs(2)).toBeGreaterThan(DICE_ROLL_DURATION_MS);
  });
});
