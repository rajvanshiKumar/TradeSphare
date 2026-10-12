// Payment provider adapter.
//
// TradeSphere does not have a payment provider connected yet, so online payments (UPI, card,
// net banking, wallet) cannot be completed. startPayment() reports that honestly instead of
// pretending a payment succeeded. To accept real payments, connect a provider here (this needs a
// server to create and verify payments) and return { status: 'paid', reference } only after the
// provider has confirmed the payment on that server.

export const isPaymentProviderConfigured = false;

/**
 * Starts an online payment. Resolves with one of:
 *   { status: 'paid', reference }      only when a real provider confirms it (never in this build)
 *   { status: 'unavailable', message } no provider is connected
 *   { status: 'cancelled' }            the buyer cancelled while waiting
 */
export function startPayment({ signal } = {}) {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      resolve({ status: 'unavailable', message: 'Online payment processing is not available on TradeSphere yet. No money has been taken.' });
    }, 1400);
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer);
      resolve({ status: 'cancelled' });
    });
  });
}
