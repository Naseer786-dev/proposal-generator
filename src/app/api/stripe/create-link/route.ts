import { NextResponse } from 'next/server'
import { createPaymentLink } from '@/lib/stripe'
import { supabase, mockUpdate } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { proposalId, amount, description } = await req.json()
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const { url, demo } = await createPaymentLink(proposalId, amount * 100, description)

    if (supabase) {
      await supabase.from('proposals').update({ stripe_payment_link: url, status: 'sent' }).eq('id', proposalId)
    } else {
      await mockUpdate('proposals', proposalId, { stripe_payment_link: url, status: 'sent' })
    }

    return NextResponse.json({ url, demo })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}