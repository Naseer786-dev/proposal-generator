"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Loader2 } from "lucide-react"

const STEPS = [
  { label: "Client", fields: ["clientName", "clientEmail"] },
  { label: "Project", fields: ["projectType", "projectTitle"] },
  { label: "Scope", fields: ["scope", "deliverables"] },
  { label: "Timeline", fields: ["duration"] },
  { label: "Pricing", fields: ["totalPrice", "depositPercent"] },
]

export default function Wizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    projectType: "web-design",
    projectTitle: "",
    scope: "",
    deliverables: "",
    duration: "2 weeks",
    totalPrice: "",
    depositPercent: "50",
    template: "modern",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const update = (k: string, v: string) => {
    setForm(p => ({ ...p, [k]: v }))
    setError("")
  }

  const validate = () => {
    if (step === 0 && !form.clientName.trim()) return "Client name is required"
    if (step === 1 && !form.projectTitle.trim()) return "Project title is required"
    if (step === 2 && !form.scope.trim()) return "Project scope is required"
    if (step === 4) {
      if (!form.totalPrice || parseInt(form.totalPrice) <= 0) return "Enter a valid price"
      if (!form.depositPercent || parseInt(form.depositPercent) < 0 || parseInt(form.depositPercent) > 100) return "Deposit must be 0-100%"
    }
    return ""
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); return }
    setStep(p => Math.min(STEPS.length - 1, p + 1))
  }

  const generate = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (e: any) {
      setError(e.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span className="font-bold">PropGen</span>
          </div>
          <Badge variant="secondary">Wizard</Badge>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">Create a Proposal</h1>
        <p className="text-gray-500 text-sm mb-6">5 questions → professional proposal in 30 seconds</p>

        <Progress value={progress} className="mb-8 h-2" />

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Step {step + 1}: {STEPS[step].label}</CardTitle>
              <span className="text-xs text-gray-400">{step + 1} of {STEPS.length}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {step === 0 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Client Name *</label>
                  <Input value={form.clientName} onChange={e => update("clientName", e.target.value)} placeholder="Acme Corporation" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Client Email</label>
                  <Input type="email" value={form.clientEmail} onChange={e => update("clientEmail", e.target.value)} placeholder="contact@acme.com" />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Project Type</label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={form.projectType}
                    onChange={e => update("projectType", e.target.value)}
                  >
                    <option value="web-design">Web Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consulting">Consulting</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="video-production">Video Production</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Project Title *</label>
                  <Input value={form.projectTitle} onChange={e => update("projectTitle", e.target.value)} placeholder="E-commerce Website Redesign" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Project Scope *</label>
                  <Textarea value={form.scope} onChange={e => update("scope", e.target.value)} placeholder="Describe what you'll deliver..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Key Deliverables</label>
                  <Textarea value={form.deliverables} onChange={e => update("deliverables", e.target.value)} placeholder="1. Homepage design&#10;2. Product pages&#10;3. Mobile responsive&#10;4. SEO optimization" rows={4} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Project Duration</label>
                  <Input value={form.duration} onChange={e => update("duration", e.target.value)} placeholder="e.g. 2 weeks, 1 month" />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                  <b>Tip:</b> Be realistic with timelines. Clients appreciate honesty over overpromising.
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Total Price (USD) *</label>
                  <Input type="number" value={form.totalPrice} onChange={e => update("totalPrice", e.target.value)} placeholder="5000" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Deposit Percentage (%)</label>
                  <Input type="number" value={form.depositPercent} onChange={e => update("depositPercent", e.target.value)} placeholder="50" />
                  <p className="text-xs text-gray-500 mt-1">Typical: 30-50% upfront to secure the project</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Template Style</label>
                  <div className="flex gap-2 mt-1.5">
                    {["modern", "minimal", "bold"].map(t => (
                      <button key={t} onClick={() => update("template", t)}
                        className={`flex-1 py-2.5 rounded-lg border text-sm font-medium capitalize transition-colors ${
                          form.template === t
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-1">Price Breakdown</p>
                  <p>Total: <b>${form.totalPrice || "0"}</b></p>
                  <p>Deposit ({form.depositPercent}%): <b>${Math.round((parseInt(form.totalPrice || "0") * parseInt(form.depositPercent || "0")) / 100)}</b></p>
                  <p>Balance on completion: <b>${parseInt(form.totalPrice || "0") - Math.round((parseInt(form.totalPrice || "0") * parseInt(form.depositPercent || "0")) / 100)}</b></p>
                </div>
              </>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(p => Math.max(0, p - 1))} disabled={step === 0 || loading}>
                Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>Next Step</Button>
              ) : (
                <Button onClick={generate} disabled={loading} className="gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  {loading ? "Generating..." : "Generate Proposal"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="mt-6 border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Proposal Generated!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg border p-4 mb-4 space-y-3 text-sm">
                <p><span className="font-medium">Client:</span> {form.clientName}</p>
                <p><span className="font-medium">Project:</span> {form.projectTitle}</p>
                <p><span className="font-medium">Summary:</span> {result.content?.executiveSummary}</p>
                <p><span className="font-medium">Investment:</span> ${result.content?.investment?.total} (Deposit: ${result.content?.investment?.deposit})</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => router.push(`/proposal/${result.proposalId}`)}>
                  View Full Proposal
                </Button>
                <Button onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
