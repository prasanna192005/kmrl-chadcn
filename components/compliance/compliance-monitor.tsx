"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Eye, Download, RefreshCw } from "lucide-react"

interface ComplianceItem {
  id: string
  title: string
  description: string
  regulatoryBody: string
  dueDate: string
  status: "compliant" | "pending" | "overdue" | "at-risk"
  priority: "high" | "medium" | "low"
  documents: string[]
  lastUpdated: string
  assignedTo: string
}

interface AuditLog {
  id: string
  action: string
  user: string
  document: string
  timestamp: string
  details: string
  ipAddress: string
}

export function ComplianceMonitor() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const complianceItems: ComplianceItem[] = [
    {
      id: "1",
      title: "CRMS Safety Audit Report",
      description: "Quarterly safety compliance report for Commissioner of Metro Rail Safety",
      regulatoryBody: "CRMS",
      dueDate: "2024-01-15",
      status: "at-risk",
      priority: "high",
      documents: ["Safety_Audit_Q4.pdf", "Incident_Reports.xlsx"],
      lastUpdated: "2024-01-10",
      assignedTo: "Arun Krishnan",
    },
    {
      id: "2",
      title: "MoHUA Environmental Impact Assessment",
      description: "Annual environmental impact assessment for Ministry of Housing & Urban Affairs",
      regulatoryBody: "MoHUA",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high",
      documents: ["EIA_Report_2024.pdf"],
      lastUpdated: "2024-01-08",
      assignedTo: "Environmental Team",
    },
    {
      id: "3",
      title: "Fire Safety Compliance Certificate",
      description: "Annual fire safety compliance certification renewal",
      regulatoryBody: "Kerala Fire & Rescue",
      dueDate: "2024-02-10",
      status: "compliant",
      priority: "medium",
      documents: ["Fire_Safety_Certificate.pdf", "Inspection_Report.pdf"],
      lastUpdated: "2024-01-05",
      assignedTo: "Safety Team",
    },
    {
      id: "4",
      title: "Financial Audit Documentation",
      description: "Annual financial audit documentation for CAG",
      regulatoryBody: "CAG",
      dueDate: "2024-03-31",
      status: "pending",
      priority: "medium",
      documents: ["Financial_Statements.pdf", "Audit_Trail.xlsx"],
      lastUpdated: "2024-01-03",
      assignedTo: "Finance Team",
    },
  ]

  const auditLogs: AuditLog[] = [
    {
      id: "1",
      action: "Document Viewed",
      user: "Arun Krishnan",
      document: "CRMS_Safety_Audit_Q4.pdf",
      timestamp: "2024-01-10T14:30:00Z",
      details: "Viewed safety audit report for compliance review",
      ipAddress: "192.168.1.45",
    },
    {
      id: "2",
      action: "Document Downloaded",
      user: "Priya Nair",
      document: "Engineering_Specs_Aluva.pdf",
      timestamp: "2024-01-10T13:15:00Z",
      details: "Downloaded engineering specifications for project review",
      ipAddress: "192.168.1.32",
    },
    {
      id: "3",
      action: "Document Uploaded",
      user: "Meera Thomas",
      document: "Vendor_Contract_2024.pdf",
      timestamp: "2024-01-10T11:45:00Z",
      details: "Uploaded new vendor contract for procurement review",
      ipAddress: "192.168.1.28",
    },
    {
      id: "4",
      action: "AI Summary Generated",
      user: "System",
      document: "MoHUA_Guidelines_Malayalam.docx",
      timestamp: "2024-01-10T10:20:00Z",
      details: "Automated AI summary generation completed",
      ipAddress: "System",
    },
    {
      id: "5",
      action: "Document Shared",
      user: "Lakshmi Pillai",
      document: "HR_Policy_Update.pdf",
      timestamp: "2024-01-10T09:30:00Z",
      details: "Shared HR policy update with department heads",
      ipAddress: "192.168.1.15",
    },
  ]

  const getStatusIcon = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "at-risk":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
    }
  }

  const getStatusColor = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "at-risk":
        return "bg-orange-100 text-orange-800"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const complianceStats = {
    total: complianceItems.length,
    compliant: complianceItems.filter((item) => item.status === "compliant").length,
    pending: complianceItems.filter((item) => item.status === "pending").length,
    atRisk: complianceItems.filter((item) => item.status === "at-risk").length,
    overdue: complianceItems.filter((item) => item.status === "overdue").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compliance Monitor</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track regulatory compliance, audit logs, and deadline management for KMRL
        </p>
      </div>

      {/* Compliance Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.total}</div>
            <p className="text-xs text-muted-foreground">Compliance requirements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceStats.compliant}</div>
            <p className="text-xs text-muted-foreground">Up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{complianceStats.atRisk}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((complianceStats.compliant / complianceStats.total) * 100)}%
            </div>
            <Progress value={(complianceStats.compliant / complianceStats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Compliance requirements due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceItems
                    .filter((item) => getDaysUntilDue(item.dueDate) <= 30)
                    .sort((a, b) => getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate))
                    .map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="flex-shrink-0">{getStatusIcon(item.status)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.regulatoryBody}</p>
                          <p className="text-xs text-gray-500">
                            Due in {getDaysUntilDue(item.dueDate)} days ({item.dueDate})
                          </p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Bodies</CardTitle>
                <CardDescription>Compliance requirements by authority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["CRMS", "MoHUA", "Kerala Fire & Rescue", "CAG"].map((body) => {
                    const items = complianceItems.filter((item) => item.regulatoryBody === body)
                    const compliantItems = items.filter((item) => item.status === "compliant")
                    return (
                      <div key={body} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{body}</p>
                          <p className="text-xs text-gray-500">
                            {compliantItems.length}/{items.length} compliant
                          </p>
                        </div>
                        <div className="text-right">
                          <Progress value={(compliantItems.length / items.length) * 100} className="w-20 h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((compliantItems.length / items.length) * 100)}%
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>All regulatory compliance items and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(item.status)}
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>Authority: {item.regulatoryBody}</span>
                          <span>Due: {item.dueDate}</span>
                          <span>Assigned: {item.assignedTo}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.documents.map((doc) => (
                            <Badge key={doc} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-logs">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>Complete audit trail of document access and modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.action} - {log.document}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{log.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>User: {log.user}</span>
                        <span>Time: {new Date(log.timestamp).toLocaleString()}</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Monthly Compliance Report
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Audit Trail Export
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Regulatory Summary
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Risk Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
