export const SOUND_SOURCES = {
  impact: require('../assets/sounds/impact.wav'),
  roll: require('../assets/sounds/dice-rolling.mp3'),
  sparkle: require('../assets/sounds/sparkle.wav'),
  whoosh: require('../assets/sounds/arrow-whoosh.wav'),
} as const;

export type SoundEffect = keyof typeof SOUND_SOURCES;
