import {
  DICE_PAIR_STAGGER_MS,
  DICE_ROLL_DURATION_MS,
  getDiceMotionProfile,
  getRollDurationMs,
} from '../lib/rollAnimation';

describe('roll animation timing', () => {
  it('uses the base duration for one die', () => {
    expect(getRollDurationMs(1)).toBe(DICE_ROLL_DURATION_MS);
  });

  it('adds the stagger delay for two dice', () => {
    expect(getRollDurationMs(2)).toBe(DICE_ROLL_DURATION_MS + DICE_PAIR_STAGGER_MS);
  });

  it('gives the two dice visibly different trajectories', () => {
    const first = getDiceMotionProfile(7, 0);
    const second = getDiceMotionProfile(7, 1);

    expect(first.driftX).not.toBe(second.driftX);
    expect(Math.sign(first.rotationY)).not.toBe(Math.sign(second.rotationY));
  });

  it('keeps motion deterministic without affecting result randomness', () => {
    expect(getDiceMotionProfile(12, 0)).toEqual(getDiceMotionProfile(12, 0));
  });
});
