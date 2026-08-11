export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-07-29.dahlia',
})

export async function POST(req: Request) {
  try {
    const { proposalId, amount, description } = await req.json()

    console.log('DEBUG: Received request:', { proposalId, amount, description })

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || 'Project Deposit',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/proposal/${proposalId}?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/proposal/${proposalId}?canceled=true`,
    })

    console.log('DEBUG: Stripe session URL:', session.url)

    // Add cache-busting headers
    const response = NextResponse.json({ url: session.url })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    return response
  } catch (err: any) {
    console.error('DEBUG: Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}