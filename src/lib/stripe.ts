import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-07-29.dahlia',
})

export async function createPaymentLink(proposalId: string, amount: number, description: string) {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_dummy') {
    return { url: '#demo', demo: true }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: description || 'Proposal Deposit',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://proposal-generator-16a761u2j-prop-gen1.vercel.app/proposal/${proposalId}?paid=true`,
    cancel_url: `https://proposal-generator-16a761u2j-prop-gen1.vercel.app/proposal/${proposalId}`,
  })

  return { url: session.url || '#demo', demo: false }
}