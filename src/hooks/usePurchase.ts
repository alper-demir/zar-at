import { useCallback, useEffect, useRef, useState } from 'react';
import { isOwnedPremiumPurchase, PREMIUM_PRODUCT_ID } from '../lib/purchaseEntitlement';
import { useSettingsStore } from '../store/settingsStore';
import { useI18n } from '../lib/i18n';

type IapModule = typeof import('expo-iap');

function getPurchaseErrorMessage(error: unknown, language: 'tr' | 'en'): string {
  if (error instanceof Error && error.message) return error.message;
  return language === 'en'
    ? 'The purchase could not be completed. Please try again.'
    : 'Satın alma şu anda tamamlanamadı. Lütfen tekrar deneyin.';
}

/**
 * Store boundary for the non-consumable product.
 *
 * Expo Go and development mode use the local mock so the rest of the product
 * can be tested without a Play Console product. Release builds use expo-iap;
 * the Play Store remains the source of truth for ownership.
 */
export function usePurchase(): {
  isPurchasing: boolean;
  purchaseError: string | null;
  purchasePremium: () => Promise<void>;
  restorePurchases: () => Promise<void>;
} {
  const { language } = useI18n();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const iapModuleRef = useRef<Promise<IapModule> | null>(null);
  const setEntitlementStatus = useSettingsStore((state) => state.setEntitlementStatus);
  const setPremiumUnlocked = useSettingsStore((state) => state.setPremiumUnlocked);

  const loadIap = useCallback(() => {
    if (!iapModuleRef.current) {
      iapModuleRef.current = import('expo-iap');
    }
    return iapModuleRef.current;
  }, []);

  const grantPurchase = useCallback(
    async (iap: IapModule, purchase: import('expo-iap').Purchase) => {
      if (!isOwnedPremiumPurchase(purchase)) return false;

      setPremiumUnlocked(true);
      setEntitlementStatus('premium');
      await iap.finishTransaction({ purchase, isConsumable: false });
      return true;
    },
    [setEntitlementStatus, setPremiumUnlocked],
  );

  useEffect(() => {
    if (__DEV__) return;

    let cancelled = false;
    let purchaseSubscription: { remove: () => void } | undefined;
    let iap: IapModule | undefined;

    const initializeStore = async () => {
      try {
        iap = await loadIap();
        setEntitlementStatus('checking');
        purchaseSubscription = iap.purchaseUpdatedListener((purchase) => {
          void grantPurchase(iap as IapModule, purchase).catch((error: unknown) => {
            if (!cancelled) setPurchaseError(getPurchaseErrorMessage(error, language));
          });
        });
        await iap.initConnection();
        const purchases = await iap.getAvailablePurchases();
        const owned = purchases.some(isOwnedPremiumPurchase);
        if (!cancelled) {
          setPremiumUnlocked(owned);
          setEntitlementStatus(owned ? 'premium' : 'free');
        }
      } catch (error) {
        if (!cancelled) {
          setPremiumUnlocked(false);
          setEntitlementStatus('free');
          setPurchaseError(getPurchaseErrorMessage(error, language));
        }
      }
    };

    void initializeStore();
    return () => {
      cancelled = true;
      purchaseSubscription?.remove();
      if (iap) void iap.endConnection().catch(() => undefined);
    };
  }, [grantPurchase, language, loadIap, setEntitlementStatus, setPremiumUnlocked]);

  const purchasePremium = useCallback(async () => {
    setIsPurchasing(true);
    setPurchaseError(null);
    try {
      if (__DEV__) {
        await new Promise<void>((resolve) => setTimeout(resolve, 450));
        setPremiumUnlocked(true);
        setEntitlementStatus('premium');
        return;
      }

      const iap = await loadIap();
      await iap.initConnection();
      const products = await iap.fetchProducts({
        skus: [PREMIUM_PRODUCT_ID],
        type: 'in-app',
      });
      if (!products?.length) {
        throw new Error(
          language === 'en'
            ? 'The Premium product is not available on Google Play yet.'
            : 'Premium ürünü Google Play üzerinde henüz bulunamadı.',
        );
      }
      await iap.requestPurchase({
        request: {
          google: { skus: [PREMIUM_PRODUCT_ID] },
          apple: { sku: PREMIUM_PRODUCT_ID },
        },
        type: 'in-app',
      });
    } catch (error) {
      setPurchaseError(getPurchaseErrorMessage(error, language));
    } finally {
      setIsPurchasing(false);
    }
  }, [language, loadIap, setEntitlementStatus, setPremiumUnlocked]);

  const restorePurchases = useCallback(async () => {
    setIsPurchasing(true);
    setPurchaseError(null);
    try {
      if (__DEV__) {
        await new Promise<void>((resolve) => setTimeout(resolve, 450));
        return;
      }

      const iap = await loadIap();
      await iap.initConnection();
      const purchases = await iap.getAvailablePurchases();
      const ownedPurchase = purchases.find(isOwnedPremiumPurchase);
      if (ownedPurchase) {
        await grantPurchase(iap, ownedPurchase);
      } else {
        setPremiumUnlocked(false);
        setEntitlementStatus('free');
      }
    } catch (error) {
      setPurchaseError(getPurchaseErrorMessage(error, language));
    } finally {
      setIsPurchasing(false);
    }
  }, [grantPurchase, language, loadIap, setEntitlementStatus, setPremiumUnlocked]);

  return { isPurchasing, purchaseError, purchasePremium, restorePurchases };
}
