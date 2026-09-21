import * as Crypto from 'expo-crypto';

/** Returns a uniformly distributed integer in the inclusive range. */
export async function randomInt(min: number, max: number): Promise<number> {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    throw new Error('Invalid random range.');
  }

  const range = max - min + 1;
  const limit = Math.floor(256 / range) * range;

  while (true) {
    const bytes = await Crypto.getRandomBytesAsync(1);
    const value = bytes[0];
    if (value < limit) {
      return min + (value % range);
    }
  }
}

export async function rollD6(): Promise<number> {
  return randomInt(1, 6);
}
