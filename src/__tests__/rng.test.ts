import * as Crypto from 'expo-crypto';
import { randomInt, rollD6 } from '../lib/rng';

jest.mock('expo-crypto');

const getRandomBytesAsync = Crypto.getRandomBytesAsync as jest.MockedFunction<
  typeof Crypto.getRandomBytesAsync
>;

describe('rng', () => {
  beforeEach(() => {
    getRandomBytesAsync.mockReset();
  });

  it('maps an accepted byte into an inclusive range', async () => {
    getRandomBytesAsync.mockResolvedValueOnce(new Uint8Array([5]));

    await expect(randomInt(1, 6)).resolves.toBe(6);
  });

  it('rejects invalid ranges', async () => {
    await expect(randomInt(6, 1)).rejects.toThrow('Invalid random range.');
    await expect(randomInt(1.5, 6)).rejects.toThrow('Invalid random range.');
  });

  it('rolls a D6 in the expected range', async () => {
    getRandomBytesAsync
      .mockResolvedValueOnce(new Uint8Array([0]))
      .mockResolvedValueOnce(new Uint8Array([5]));

    await expect(rollD6()).resolves.toBe(1);
    await expect(rollD6()).resolves.toBe(6);
  });
});
