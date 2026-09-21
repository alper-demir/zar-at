import type { Purchase } from 'expo-iap';

export const PREMIUM_PRODUCT_ID = 'dice_premium_unlock';

export function isOwnedPremiumPurchase(purchase: Purchase): boolean {
  return (
    purchase.productId === PREMIUM_PRODUCT_ID &&
    purchase.purchaseState === 'purchased' &&
    (!('isSuspendedAndroid' in purchase) || purchase.isSuspendedAndroid !== true)
  );
}
