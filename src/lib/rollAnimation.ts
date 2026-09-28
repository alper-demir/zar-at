export const DICE_WIND_UP_DURATION_MS = 140;
export const DICE_TAKEOFF_DURATION_MS = 290;
export const DICE_FALL_DURATION_MS = 330;
export const DICE_SETTLE_DURATION_MS = 200;
export const DICE_FLIGHT_DURATION_MS =
  DICE_TAKEOFF_DURATION_MS + DICE_FALL_DURATION_MS + DICE_SETTLE_DURATION_MS;
export const DICE_LIFT_DURATION_MS = DICE_WIND_UP_DURATION_MS + DICE_FLIGHT_DURATION_MS;
export const DICE_SCALE_DURATION_MS = DICE_LIFT_DURATION_MS;
export const DICE_PAIR_STAGGER_MS = 90;
export const REDUCED_MOTION_DURATION_MS = 180;

export interface DiceMotionProfile {
  driftX: number;
  landingTiltX: number;
  landingTiltY: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  windUpX: number;
  windUpY: number;
}

/**
 * Produces a stable visual trajectory for one roll. This does not determine
 * the result; the cryptographic RNG remains the sole source of dice values.
 */
export function getDiceMotionProfile(rollId: number, diceIndex: number): DiceMotionProfile {
  const seed = Math.abs(rollId * 17 + diceIndex * 31);
  const direction = seed % 2 === 0 ? 1 : -1;

  return {
    driftX: direction * (18 + (seed % 9)),
    landingTiltX: direction * (2 + (seed % 3)),
    landingTiltY: -direction * (2 + (seed % 2)),
    // X/Y stay within a visible tilt because this is a layered 2.5D die;
    // the full tumble is carried by Z so the face never collapses edge-on.
    rotationX: direction * (18 + (seed % 8)),
    rotationY: -direction * (22 + (seed % 10)),
    rotationZ: direction * 720,
    windUpX: -direction * (10 + (seed % 5)),
    windUpY: direction * (12 + (seed % 6)),
  };
}

export const DICE_ROLL_DURATION_MS = Math.max(
  DICE_WIND_UP_DURATION_MS + DICE_FLIGHT_DURATION_MS,
  DICE_LIFT_DURATION_MS,
  DICE_SCALE_DURATION_MS,
);

export function getRollDurationMs(diceCount: 1 | 2): number {
  return DICE_ROLL_DURATION_MS + (diceCount === 2 ? DICE_PAIR_STAGGER_MS : 0);
}
