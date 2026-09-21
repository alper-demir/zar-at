import { useCallback, useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export const PREMIUM_PRODUCT_ID = 'dice_premium_unlock';

/**
 * Store boundary for the non-consumable product. Real Play Billing is wired
 * here once the Play Console product and EAS production credentials exist.
 */
export function usePurchase(): {
  isPurchasing: boolean;
  purchasePremium: () => Promise<void>;
  restorePurchases: () => Promise<void>;
} {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const setEntitlementStatus = useSettingsStore((state) => state.setEntitlementStatus);
  const setPremiumUnlocked = useSettingsStore((state) => state.setPremiumUnlocked);

  const purchasePremium = useCallback(async () => {
    setIsPurchasing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 450));
    if (__DEV__) {
      setPremiumUnlocked(true);
      setEntitlementStatus('premium');
    }
    setIsPurchasing(false);
    // Deliberately does not unlock locally: entitlement must come from Play Billing.
  }, [setEntitlementStatus, setPremiumUnlocked]);

  const restorePurchases = useCallback(async () => {
    setIsPurchasing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 450));
    setIsPurchasing(false);
  }, []);

  return { isPurchasing, purchasePremium, restorePurchases };
}
