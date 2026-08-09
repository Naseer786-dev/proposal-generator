import { NextResponse } from "next/server"
import { mockSelect } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (id) {
      const { data } = await mockSelect("proposals", { id })
      return NextResponse.json({ proposal: data?.[0] || null })
    } else {
      const { data } = await mockSelect("proposals", { user_id: "demo-user" })
      return NextResponse.json({ proposals: data || [] })
    }
  } catch (err: any) {
    console.error("Proposals error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
