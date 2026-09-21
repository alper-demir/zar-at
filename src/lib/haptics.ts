import * as Haptics from 'expo-haptics';

export async function playRollStart(enabled: boolean): Promise<void> {
  if (enabled) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

export async function playRollSettle(enabled: boolean, critical: boolean): Promise<void> {
  if (enabled) {
    await Haptics.notificationAsync(
      critical
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning,
    );
  }
}
