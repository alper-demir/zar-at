import { useEffect } from 'react';
import { EntitlementStatus, useSettingsStore } from '../store/settingsStore';

export function useEntitlement(): {
  isPremium: boolean;
  status: EntitlementStatus;
} {
  const premiumUnlocked = useSettingsStore((state) => state.premiumUnlocked);
  const status = useSettingsStore((state) => state.entitlementStatus);
  const setEntitlementStatus = useSettingsStore((state) => state.setEntitlementStatus);

  useEffect(() => {
    setEntitlementStatus(premiumUnlocked ? 'premium' : 'free');
  }, [premiumUnlocked, setEntitlementStatus]);

  return { isPremium: status === 'premium', status };
}
