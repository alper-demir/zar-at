import * as Haptics from 'expo-haptics';
import { HapticProfile } from './personalization';

export async function playRollStart(
  enabled: boolean,
  profile: HapticProfile = 'standard',
): Promise<void> {
  if (enabled) {
    await Haptics.impactAsync(
      profile === 'strong' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
    );
  }
}

export async function playRollSettle(
  enabled: boolean,
  critical: boolean,
  profile: HapticProfile = 'standard',
): Promise<void> {
  if (enabled) {
    if (profile === 'soft') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      return;
    }
    await Haptics.notificationAsync(
      critical
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning,
    );
  }
}
