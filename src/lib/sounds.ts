import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

let audioConfigured = false;
const activePlayers = new Set<AudioPlayer>();

const SOURCES = {
  impact: require('../assets/sounds/impact.wav'),
  roll: require('../assets/sounds/dice-rolling.mp3'),
  sparkle: require('../assets/sounds/sparkle.wav'),
  whoosh: require('../assets/sounds/arrow-whoosh.wav'),
} as const;

export type SoundEffect = keyof typeof SOURCES;

export async function prepareSounds(): Promise<void> {
  if (!audioConfigured) {
    await setAudioModeAsync({ playsInSilentMode: true });
    audioConfigured = true;
  }
}

export async function playSound(effect: SoundEffect, enabled: boolean): Promise<void> {
  if (!enabled) return;

  try {
    await prepareSounds();
    const player = createAudioPlayer(SOURCES[effect], {
      keepAudioSessionActive: true,
      updateInterval: 0.1,
    });
    player.volume = effect === 'sparkle' ? 0.72 : 0.82;
    activePlayers.add(player);
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) {
        subscription.remove();
        activePlayers.delete(player);
        player.remove();
      }
    });
    player.play();
  } catch {
    // Audio must never prevent a roll from completing on an unsupported device.
  }
}
