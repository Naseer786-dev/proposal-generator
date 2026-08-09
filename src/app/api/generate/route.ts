import { NextResponse } from "next/server"
import { generateProposal } from "@/lib/ai"
import { mockInsert } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const content = await generateProposal(body)

    const deposit = Math.round((parseInt(body.totalPrice || "0") * parseInt(body.depositPercent || "0")) / 100)
    const totalPrice = parseInt(body.totalPrice || "0")

    const record = {
      user_id: "demo-user",
      client_name: body.clientName,
      client_email: body.clientEmail,
      project_type: body.projectType,
      project_title: body.projectTitle,
      scope: body.scope,
      deliverables: body.deliverables,
      timeline: body.duration,
      total_price: totalPrice,
      deposit: deposit,
      template: body.template,
      content,
      status: "draft",
    }

    const { data } = await mockInsert("proposals", record)

    return NextResponse.json({ proposalId: data.id, content })
  } catch (err: any) {
    console.error("Generate error:", err)
    return NextResponse.json({ error: err.message || "Failed to generate proposal" }, { status: 500 })
  }
}
