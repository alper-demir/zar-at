export const DICE_WIND_UP_DURATION_MS = 220;
export const DICE_FLIGHT_DURATION_MS = 700;
export const DICE_LIFT_DURATION_MS = 920;
export const DICE_SCALE_DURATION_MS = 980;
export const DICE_PAIR_STAGGER_MS = 100;

export const DICE_ROLL_DURATION_MS = Math.max(
  DICE_WIND_UP_DURATION_MS + DICE_FLIGHT_DURATION_MS,
  DICE_LIFT_DURATION_MS,
  DICE_SCALE_DURATION_MS,
);

export function getRollDurationMs(diceCount: 1 | 2): number {
  return DICE_ROLL_DURATION_MS + (diceCount === 2 ? DICE_PAIR_STAGGER_MS : 0);
}
