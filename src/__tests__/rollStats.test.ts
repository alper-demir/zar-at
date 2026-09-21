import { calculateRollStats } from '../lib/rollStats';

describe('calculateRollStats', () => {
  it('counts dice values and calculates the average', () => {
    const stats = calculateRollStats([
      { dice: [1], id: 1, total: 1 },
      { dice: [6, 3], id: 2, total: 9 },
    ]);

    expect(stats.totalRolls).toBe(2);
    expect(stats.counts).toEqual([1, 0, 1, 0, 0, 1]);
    expect(stats.average).toBeCloseTo(10 / 3);
  });

  it('returns empty stats without a division by zero', () => {
    expect(calculateRollStats([])).toEqual({
      average: 0,
      counts: [0, 0, 0, 0, 0, 0],
      totalRolls: 0,
    });
  });
});
