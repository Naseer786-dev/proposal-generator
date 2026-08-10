export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { mockInsert, mockSelect } from '@/lib/db'
import { generateProposal } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const proposal = generateProposal(body)
    const { data } = await mockInsert('proposals', proposal)
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Proposals error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (id) {
      const { data } = await mockSelect('proposals', { id })
      const proposal = data?.[0]
      if (proposal) return NextResponse.json(proposal)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  } catch (err: any) {
    console.error('Proposals error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}