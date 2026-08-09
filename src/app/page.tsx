import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, FileText, CreditCard } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-black" />
            <span className="font-bold text-xl">PropGen</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/wizard">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Create Winning Proposals<br />in 30 Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered freelance proposals that look professional, include embedded payments, 
          and help you close deals faster.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/wizard">
            <Button size="lg" className="gap-2">
              <Zap className="w-4 h-4" />
              Create Your First Proposal
            </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required. Free plan includes 3 proposals.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-500 mb-2" />
              <CardTitle>AI-Generated Copy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Answer 5 questions. Our AI writes the entire proposal — executive summary, scope, timeline, and terms.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Embedded Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Clients accept and pay deposits directly from the proposal. No more chasing invoices.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Track Everything</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">See when clients open, view, and accept your proposals. Know exactly where every deal stands.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-transparent">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <p className="text-3xl font-bold">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">✓ 3 proposals/month</p>
              <p className="text-sm text-gray-600">✓ Basic template</p>
              <p className="text-sm text-gray-600">✓ Manual export</p>
              <Button variant="outline" className="w-full mt-4">Get Started</Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-black">
            <CardHeader>
              <div className="text-xs font-bold bg-black text-white px-2 py-1 rounded w-fit mb-2">POPULAR</div>
              <CardTitle>Pro</CardTitle>
              <p className="text-3xl font-bold">$19<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">✓ Unlimited proposals</p>
              <p className="text-sm text-gray-600">✓ AI writer</p>
              <p className="text-sm text-gray-600">✓ All templates</p>
              <p className="text-sm text-gray-600">✓ Stripe payments</p>
              <p className="text-sm text-gray-600">✓ Open tracking</p>
              <Button className="w-full mt-4">Start Free Trial</Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-transparent">
            <CardHeader>
              <CardTitle>Agency</CardTitle>
              <p className="text-3xl font-bold">$49<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">✓ Everything in Pro</p>
              <p className="text-sm text-gray-600">✓ 5 team seats</p>
              <p className="text-sm text-gray-600">✓ White-label domain</p>
              <p className="text-sm text-gray-600">✓ API access</p>
              <Button variant="outline" className="w-full mt-4">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © 2026 PropGen. Built for freelancers who want to get paid.
      </footer>
    </div>
  )
}
