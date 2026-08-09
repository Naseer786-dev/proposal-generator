"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Eye, Send, Loader2 } from "lucide-react"

export default function Dashboard() {
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/proposals")
      .then(r => r.json())
      .then(data => {
        setProposals(data.proposals || [])
        setLoading(false)
      })
  }, [])

  const stats = {
    total: proposals.length,
    sent: proposals.filter((p: any) => p.status === "sent").length,
    accepted: proposals.filter((p: any) => p.status === "accepted").length,
    draft: proposals.filter((p: any) => p.status === "draft").length,
    totalValue: proposals.reduce((sum: number, p: any) => sum + (p.total_price || 0), 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span className="font-bold">PropGen</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Demo User</span>
            <Link href="/wizard">
              <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> New</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Proposals</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Sent</p>
              <p className="text-2xl font-bold">{stats.sent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No proposals yet. Create your first one!</p>
                <Link href="/wizard">
                  <Button>Create Proposal</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposals.map((p: any) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.client_name}</TableCell>
                      <TableCell>{p.project_title}</TableCell>
                      <TableCell>${p.total_price?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "accepted" ? "default" : p.status === "sent" ? "secondary" : "outline"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {new Date(p.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link href={`/proposal/${p.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1"><Eye className="w-3 h-3" /> View</Button>
                          </Link>
                          {p.status === "draft" && (
                            <Button variant="ghost" size="sm" className="gap-1"><Send className="w-3 h-3" /> Send</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
