import type { Purchase } from 'expo-iap';
import { isOwnedPremiumPurchase, PREMIUM_PRODUCT_ID } from '../lib/purchaseEntitlement';

function purchase(overrides: Partial<Purchase> = {}): Purchase {
  return {
    id: 'purchase-1',
    isAutoRenewing: false,
    productId: PREMIUM_PRODUCT_ID,
    purchaseState: 'purchased',
    quantity: 1,
    store: 'google',
    transactionDate: Date.now(),
    ...overrides,
  } as Purchase;
}

describe('purchase entitlement', () => {
  it('accepts a completed premium purchase', () => {
    expect(isOwnedPremiumPurchase(purchase())).toBe(true);
  });

  it('does not unlock for pending or unrelated products', () => {
    expect(isOwnedPremiumPurchase(purchase({ purchaseState: 'pending' }))).toBe(false);
    expect(isOwnedPremiumPurchase(purchase({ productId: 'other_product' }))).toBe(false);
  });

  it('does not unlock a suspended Android purchase', () => {
    expect(isOwnedPremiumPurchase(purchase({ isSuspendedAndroid: true }))).toBe(false);
  });
});
