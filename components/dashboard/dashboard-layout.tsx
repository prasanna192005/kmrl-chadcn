"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Upload,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  Brain,
  BarChart3,
  Users,
  Shield,
  Train,
  Bot,
  Glasses,
  Zap,
  Mic,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  permissions: string[]
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const navigation = [
    { name: "Overview", icon: BarChart3, href: "/dashboard", current: true },
    { name: "Documents", icon: FileText, href: "/dashboard/documents", current: false },
    { name: "Upload", icon: Upload, href: "/dashboard/upload", current: false },
    { name: "AI Processing", icon: Brain, href: "/dashboard/ai", current: false },
    { name: "Search", icon: Search, href: "/dashboard/search", current: false },
    { name: "AI Chat", icon: Bot, href: "/dashboard/ai-chat", current: false },
    { name: "AR/VR Docs", icon: Glasses, href: "/dashboard/ar-vr", current: false },
    { name: "Blockchain", icon: Shield, href: "/dashboard/blockchain", current: false },
    { name: "Predictive AI", icon: Zap, href: "/dashboard/predictive", current: false },
    { name: "Voice Control", icon: Mic, href: "/dashboard/voice", current: false },
    { name: "Operations", icon: Train, href: "/dashboard/operations", current: false },
    { name: "Compliance", icon: Shield, href: "/dashboard/compliance", current: false },
    { name: "Users", icon: Users, href: "/dashboard/users", current: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">KMRL DocuMind</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Kochi Metro Rail</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation - takes up available space */}
          <div className="flex-1 overflow-y-auto">
            <nav className="mt-6 px-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </nav>

            {/* System Status */}
            <div className="mt-6 px-3 pb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">System Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Train Operations</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Document Processing</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Compliance Monitor</span>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Alert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User section - fixed at bottom */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.department} • {user.role}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${sidebarOpen ? "lg:ml-64" : ""} transition-all duration-200`}>
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kochi Metro Rail Limited - Document Management System
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1">3</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
