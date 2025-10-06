"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, CheckCircle, MessageSquare, Users, Settings, X } from "lucide-react"

interface Notification {
  id: string
  type: "alert" | "info" | "success" | "warning"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "high" | "medium" | "low"
  category: "compliance" | "processing" | "collaboration" | "system"
  actionUrl?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "CRMS Compliance Deadline",
      message: "Safety compliance report due in 3 days. Please review and submit.",
      timestamp: "2024-01-10T10:30:00Z",
      read: false,
      priority: "high",
      category: "compliance",
      actionUrl: "/dashboard/compliance",
    },
    {
      id: "2",
      type: "success",
      title: "Document Processing Complete",
      message: "MoHUA Guidelines Malayalam translation has been processed successfully.",
      timestamp: "2024-01-10T09:15:00Z",
      read: false,
      priority: "medium",
      category: "processing",
    },
    {
      id: "3",
      type: "info",
      title: "New Team Member Added",
      message: "Ravi Kumar has been added to the Engineering team with document access.",
      timestamp: "2024-01-10T08:45:00Z",
      read: true,
      priority: "low",
      category: "collaboration",
    },
    {
      id: "4",
      type: "warning",
      title: "Storage Usage Alert",
      message: "Document storage is at 85% capacity. Consider archiving old documents.",
      timestamp: "2024-01-09T16:20:00Z",
      read: false,
      priority: "medium",
      category: "system",
    },
    {
      id: "5",
      type: "info",
      title: "AI Summary Generated",
      message: "Engineering specifications for Aluva Extension have been summarized.",
      timestamp: "2024-01-09T14:10:00Z",
      read: true,
      priority: "low",
      category: "processing",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getFilteredNotifications = (category?: string) => {
    if (!category || category === "all") return notifications
    return notifications.filter((notif) => notif.category === category)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Stay updated with document processing, compliance alerts, and team activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{unreadCount} unread</Badge>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="compliance">Compliance ({getFilteredNotifications("compliance").length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({getFilteredNotifications("processing").length})</TabsTrigger>
          <TabsTrigger value="collaboration">Team ({getFilteredNotifications("collaboration").length})</TabsTrigger>
          <TabsTrigger value="system">System ({getFilteredNotifications("system").length})</TabsTrigger>
        </TabsList>

        {["all", "compliance", "processing", "collaboration", "system"].map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {category === "all"
                    ? "All Notifications"
                    : category === "compliance"
                      ? "Compliance Alerts"
                      : category === "processing"
                        ? "Document Processing"
                        : category === "collaboration"
                          ? "Team Collaboration"
                          : "System Notifications"}
                </CardTitle>
                <CardDescription>
                  {getFilteredNotifications(category === "all" ? undefined : category).length} notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getFilteredNotifications(category === "all" ? undefined : category).map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                        notification.read
                          ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          : "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                              <Badge
                                variant={notification.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <Badge variant="default" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            {notification.actionUrl && (
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            )}
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark Read
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Collaboration Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Team Chat Integration
            </CardTitle>
            <CardDescription>Connect with Slack, MS Teams, and WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Slack Integration</p>
                  <p className="text-xs text-gray-500">KMRL Engineering Team</p>
                </div>
              </div>
              <Badge variant="secondary">Connected</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium">MS Teams</p>
                  <p className="text-xs text-gray-500">KMRL Operations</p>
                </div>
              </div>
              <Badge variant="secondary">Connected</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp Business</p>
                  <p className="text-xs text-gray-500">Document Alerts</p>
                </div>
              </div>
              <Badge variant="outline">Setup Required</Badge>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              Configure Integrations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Active Collaborators
            </CardTitle>
            <CardDescription>Team members currently working on documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">PN</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Priya Nair</p>
                  <p className="text-xs text-gray-500">Reviewing Engineering Specs</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">AK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Arun Krishnan</p>
                  <p className="text-xs text-gray-500">Updating Safety Report</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">MT</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Meera Thomas</p>
                  <p className="text-xs text-gray-500">Processing Vendor Contracts</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
