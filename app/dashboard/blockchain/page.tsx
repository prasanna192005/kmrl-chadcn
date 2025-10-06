"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Link, Hash, CheckCircle, Zap, Lock, Key, Database } from "lucide-react"

export default function BlockchainPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  const blockchainStats = {
    totalBlocks: 15847,
    totalTransactions: 89234,
    hashRate: "2.4 TH/s",
    networkNodes: 127,
    consensusAlgorithm: "Proof of Authority",
    quantumResistant: true,
  }

  const auditTrail = [
    {
      id: "1",
      hash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
      action: "Document Upload",
      document: "CRMS Safety Report Q4 2024",
      user: "Arun Krishnan",
      timestamp: "2024-01-10T10:30:00Z",
      blockHeight: 15847,
      gasUsed: "21000",
      status: "confirmed",
      immutable: true,
    },
    {
      id: "2",
      hash: "0x8a0bade2d1e68b8bg77bc5fbe8a0bade2d1e68b8bg77bc5fbe8d3d3fc8c22ba2496",
      action: "AI Summary Generated",
      document: "MoHUA Guidelines Malayalam",
      user: "AI Engine",
      timestamp: "2024-01-10T09:15:00Z",
      blockHeight: 15846,
      gasUsed: "45000",
      status: "confirmed",
      immutable: true,
    },
    {
      id: "3",
      hash: "0x9b1cbef3e2f79c9ch88cd6gcf9b1cbef3e2f79c9ch88cd6gcf9e4e4gd9d33cb3507",
      action: "Document Access",
      document: "Engineering Specs - Aluva",
      user: "Priya Nair",
      timestamp: "2024-01-10T08:45:00Z",
      blockHeight: 15845,
      gasUsed: "15000",
      status: "confirmed",
      immutable: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blockchain Audit Trail</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Immutable document history with quantum-safe cryptographic security
        </p>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockchainStats.totalBlocks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12 in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Hash className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockchainStats.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Nodes</CardTitle>
            <Link className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockchainStats.networkNodes}</div>
            <p className="text-xs text-muted-foreground">Distributed globally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quantum Safe</CardTitle>
            <Shield className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">Post-quantum crypto</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Advanced Security Features
          </CardTitle>
          <CardDescription>Next-generation cryptographic protection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Quantum-Safe Encryption
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">CRYSTALS-Kyber</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CRYSTALS-Dilithium</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">FALCON Signatures</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Zero-Knowledge Proofs
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">zk-SNARKs</span>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">zk-STARKs</span>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bulletproofs</span>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Consensus Mechanism
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Algorithm</span>
                  <Badge variant="outline">PoA</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block Time</span>
                  <Badge variant="outline">3s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Finality</span>
                  <Badge variant="outline">Instant</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            Immutable Audit Trail
          </CardTitle>
          <CardDescription>Complete document lifecycle tracking on blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditTrail.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => setSelectedTransaction(entry.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <h4 className="font-semibold">{entry.action}</h4>
                      <Badge variant="secondary">Block #{entry.blockHeight}</Badge>
                      {entry.immutable && <Badge variant="outline">Immutable</Badge>}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Document: {entry.document}</p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>User: {entry.user}</span>
                      <span>Gas: {entry.gasUsed}</span>
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs font-mono text-gray-400 truncate">Hash: {entry.hash}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
              <Hash className="h-5 w-5 mr-2" />
              Transaction Details
            </CardTitle>
            <CardDescription>Cryptographic verification and blockchain proof</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const tx = auditTrail.find((t) => t.id === selectedTransaction)
              if (!tx) return null

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">Transaction Info</h5>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Hash:</strong> {tx.hash}
                        </p>
                        <p>
                          <strong>Block:</strong> #{tx.blockHeight}
                        </p>
                        <p>
                          <strong>Gas Used:</strong> {tx.gasUsed}
                        </p>
                        <p>
                          <strong>Status:</strong> {tx.status}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Cryptographic Proof</h5>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Signature:</strong> Valid ✓
                        </p>
                        <p>
                          <strong>Merkle Root:</strong> Verified ✓
                        </p>
                        <p>
                          <strong>Quantum Safe:</strong> Yes ✓
                        </p>
                        <p>
                          <strong>Zero-Knowledge:</strong> Proven ✓
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Download Certificate
                    </Button>
                    <Button variant="outline" size="sm">
                      Verify on Explorer
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setSelectedTransaction(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
