import { AudioPlayer, setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useMemo } from 'react';
import { SOUND_SOURCES, SoundEffect } from '../lib/sounds';

type SoundPlayers = Record<SoundEffect, AudioPlayer>;

const PLAYER_OPTIONS = {
  keepAudioSessionActive: false,
  updateInterval: 1000,
} as const;

/**
 * Keeps the small sound-effect players alive for the whole app session.
 * Creating a native player for every roll caused ANRs in Expo Go on Android.
 */
export function useSoundEffects(enabled: boolean): (effect: SoundEffect) => void {
  const impactPlayer = useAudioPlayer(SOUND_SOURCES.impact, PLAYER_OPTIONS);
  const rollPlayer = useAudioPlayer(SOUND_SOURCES.roll, PLAYER_OPTIONS);
  const sparklePlayer = useAudioPlayer(SOUND_SOURCES.sparkle, PLAYER_OPTIONS);
  const whooshPlayer = useAudioPlayer(SOUND_SOURCES.whoosh, PLAYER_OPTIONS);

  const players = useMemo<SoundPlayers>(
    () => ({
      impact: impactPlayer,
      roll: rollPlayer,
      sparkle: sparklePlayer,
      whoosh: whooshPlayer,
    }),
    [impactPlayer, rollPlayer, sparklePlayer, whooshPlayer],
  );

  useEffect(() => {
    void setAudioModeAsync({
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: false,
      shouldPlayInBackground: false,
    }).catch(() => {
      // A sound failure must never prevent the dice interaction.
    });
  }, []);

  return useCallback(
    (effect: SoundEffect) => {
      if (!enabled) return;

      const player = players[effect];
      if (!player.isLoaded) return;

      try {
        player.pause();
        void player.seekTo(0).then(
          () => player.play(),
          () => undefined,
        );
      } catch {
        // Native audio errors are isolated from the roll state machine.
      }
    },
    [enabled, players],
  );
}
