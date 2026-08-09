export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabase, mockInsert, mockSelectById } from '@/lib/db'
import { generateProposal } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const proposal = generateProposal(body)
    
    if (supabase) {
      const { data, error } = await supabase
        .from('proposals')
        .insert([proposal])
        .select()
        .single()
      if (error) throw error
      return NextResponse.json(data)
    } else {
      const result = mockInsert('proposals', proposal)
      return NextResponse.json(result)
    }
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
      if (supabase) {
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        return NextResponse.json(data)
      } else {
        const result = mockSelectById('proposals', id)
        return NextResponse.json(result)
      }
    }
    
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  } catch (err: any) {
    console.error('Proposals error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}