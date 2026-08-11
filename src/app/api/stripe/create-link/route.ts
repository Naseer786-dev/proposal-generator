export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { proposalId, amount, description } = await req.json()
    
    // Return a timestamped URL to prove this code is running
    const timestamp = Date.now()
    const testUrl = `https://example.com/test-${timestamp}?prop=${proposalId}&amount=${amount}`
    
    console.log('TIMESTAMP TEST:', testUrl)
    
    return NextResponse.json({ url: testUrl, debug: 'timestamp-test' })
  } catch (err: any) {
    console.error('ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}