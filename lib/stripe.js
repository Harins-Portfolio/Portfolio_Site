import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise = null;

export const getStripe = () => {
  if (!stripePublishableKey) {
    if (import.meta.env.DEV) console.warn('VITE_STRIPE_PUBLISHABLE_KEY not set; Stripe disabled.');
    return null;
  }
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

export const formatPrice = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const createPaymentSession = async (project) => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY.');
  }

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId: project.id,
      amount: project.budget,
      clientEmail: project.client_email,
      clientName: project.client_name,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment session');
  }

  const session = await response.json();
  return session;
};

export const handleStripeRedirect = async (sessionId) => {
  const stripe = await getStripe();
  if (!stripe) return;
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) throw error;
};
