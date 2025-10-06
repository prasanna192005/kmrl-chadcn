"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Brain,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Database,
  Shield,
  Languages,
} from "lucide-react"

export function DashboardOverview() {
  const stats = {
    totalDocuments: 2847,
    processedToday: 47,
    pendingProcessing: 12,
    aiSummaries: 1523,
    storageUsed: 68,
    activeUsers: 23,
    complianceAlerts: 3,
    trainOperations: "Normal",
  }

  const recentActivity = [
    {
      id: 1,
      action: "Safety Compliance Report uploaded",
      file: "CRMS_Safety_Audit_Q4.pdf",
      time: "3 minutes ago",
      status: "processing",
      department: "Safety",
      language: "English",
    },
    {
      id: 2,
      action: "AI Summary generated",
      file: "MoHUA_Guidelines_Malayalam.docx",
      time: "8 minutes ago",
      status: "completed",
      department: "Legal",
      language: "Malayalam",
    },
    {
      id: 3,
      action: "Engineering drawing processed",
      file: "Station_Layout_Aluva.dwg",
      time: "15 minutes ago",
      status: "completed",
      department: "Engineering",
      language: "English",
    },
    {
      id: 4,
      action: "OCR processing completed",
      file: "Vendor_Invoice_Scanned.pdf",
      time: "22 minutes ago",
      status: "completed",
      department: "Procurement",
      language: "English",
    },
    {
      id: 5,
      action: "HR Policy translated",
      file: "Employee_Handbook_2024.pdf",
      time: "35 minutes ago",
      status: "completed",
      department: "HR",
      language: "English → Malayalam",
    },
  ]

  const complianceAlerts = [
    {
      id: 1,
      title: "CRMS Deadline Approaching",
      description: "Safety compliance report due in 5 days",
      priority: "high",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "MoHUA Guidelines Update",
      description: "New urban transit guidelines require review",
      priority: "medium",
      dueDate: "2024-01-20",
    },
    {
      id: 3,
      title: "Environmental Impact Assessment",
      description: "Annual EIA report pending submission",
      priority: "medium",
      dueDate: "2024-01-25",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KMRL Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitor document processing, AI summarization, and compliance activities across all departments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processedToday}</div>
            <p className="text-xs text-muted-foreground">Documents processed successfully</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Summaries</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiSummaries}</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.complianceAlerts}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document processing activities across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{activity.file}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.department}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Languages className="h-3 w-3 mr-1" />
                        {activity.language}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status & Compliance */}
        <div className="space-y-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-gray-500">{stats.storageUsed}%</span>
                </div>
                <Progress value={stats.storageUsed} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Train Operations</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Processing</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">OCR Service</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Operational</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-transparent" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Compliance Alerts
              </CardTitle>
              <CardDescription>Regulatory deadlines and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Due: {alert.dueDate}</p>
                      </div>
                      <Badge variant={alert.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {alert.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common KMRL document management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Upload className="h-6 w-6 mb-2" />
              Upload Documents
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Brain className="h-6 w-6 mb-2" />
              Generate Summary
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Database className="h-6 w-6 mb-2" />
              Search Archive
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Shield className="h-6 w-6 mb-2" />
              Compliance Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
