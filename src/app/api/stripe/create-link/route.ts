export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { proposalId, amount, description } = await req.json()
    
    console.log('DEBUG: API called with:', { proposalId, amount, description })
    
    // Return a test URL to see if this code is even running
    return NextResponse.json({ 
      url: `https://example.com/test-stripe-${proposalId}`,
      debug: 'This is the real API route running'
    })
  } catch (err: any) {
    console.error('DEBUG ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}