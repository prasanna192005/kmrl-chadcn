"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Shield, Key, UserPlus, Edit, Trash2, Eye, Lock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  permissions: string[]
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export function UserManagement() {
  const [selectedTab, setSelectedTab] = useState("users")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const users: User[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "admin@kmrl.co.in",
      role: "System Administrator",
      department: "IT & Systems",
      permissions: ["read", "write", "delete", "admin", "user_management", "system_config"],
      status: "active",
      lastLogin: "2024-01-10T14:30:00Z",
      createdAt: "2023-01-15T09:00:00Z",
    },
    {
      id: "2",
      name: "Priya Nair",
      email: "engineer@kmrl.co.in",
      role: "Senior Engineer",
      department: "Engineering",
      permissions: ["read", "write", "document_upload", "ai_processing"],
      status: "active",
      lastLogin: "2024-01-10T13:15:00Z",
      createdAt: "2023-03-20T10:30:00Z",
    },
    {
      id: "3",
      name: "Suresh Menon",
      email: "controller@kmrl.co.in",
      role: "Station Controller",
      department: "Operations",
      permissions: ["read", "write", "operations_view", "incident_report"],
      status: "active",
      lastLogin: "2024-01-10T12:45:00Z",
      createdAt: "2023-02-10T11:15:00Z",
    },
    {
      id: "4",
      name: "Lakshmi Pillai",
      email: "hr@kmrl.co.in",
      role: "HR Manager",
      department: "Human Resources",
      permissions: ["read", "write", "hr_documents", "employee_data"],
      status: "active",
      lastLogin: "2024-01-10T11:20:00Z",
      createdAt: "2023-04-05T14:00:00Z",
    },
    {
      id: "5",
      name: "Arun Krishnan",
      email: "safety@kmrl.co.in",
      role: "Safety Officer",
      department: "Safety & Security",
      permissions: ["read", "write", "safety_reports", "compliance_view"],
      status: "active",
      lastLogin: "2024-01-10T10:30:00Z",
      createdAt: "2023-05-12T16:45:00Z",
    },
    {
      id: "6",
      name: "Meera Thomas",
      email: "procurement@kmrl.co.in",
      role: "Procurement Officer",
      department: "Procurement",
      permissions: ["read", "write", "vendor_documents", "contract_management"],
      status: "active",
      lastLogin: "2024-01-09T15:10:00Z",
      createdAt: "2023-06-18T12:30:00Z",
    },
  ]

  const roles: Role[] = [
    {
      id: "1",
      name: "System Administrator",
      description: "Full system access with user management and configuration rights",
      permissions: ["read", "write", "delete", "admin", "user_management", "system_config", "audit_logs"],
      userCount: 1,
    },
    {
      id: "2",
      name: "Senior Engineer",
      description: "Engineering department access with document processing capabilities",
      permissions: ["read", "write", "document_upload", "ai_processing", "engineering_docs"],
      userCount: 3,
    },
    {
      id: "3",
      name: "Station Controller",
      description: "Operations access with incident reporting and real-time monitoring",
      permissions: ["read", "write", "operations_view", "incident_report", "real_time_data"],
      userCount: 8,
    },
    {
      id: "4",
      name: "HR Manager",
      description: "Human resources access with employee data and policy management",
      permissions: ["read", "write", "hr_documents", "employee_data", "policy_management"],
      userCount: 2,
    },
    {
      id: "5",
      name: "Safety Officer",
      description: "Safety and compliance access with audit and reporting capabilities",
      permissions: ["read", "write", "safety_reports", "compliance_view", "audit_access"],
      userCount: 4,
    },
    {
      id: "6",
      name: "Procurement Officer",
      description: "Procurement access with vendor and contract management",
      permissions: ["read", "write", "vendor_documents", "contract_management", "financial_docs"],
      userCount: 3,
    },
  ]

  const allPermissions = [
    "read",
    "write",
    "delete",
    "admin",
    "user_management",
    "system_config",
    "document_upload",
    "ai_processing",
    "operations_view",
    "incident_report",
    "hr_documents",
    "employee_data",
    "safety_reports",
    "compliance_view",
    "vendor_documents",
    "contract_management",
    "audit_logs",
    "real_time_data",
    "policy_management",
    "audit_access",
    "engineering_docs",
    "financial_docs",
  ]

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage users, roles, and permissions for KMRL document management system
          </p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="safety">Safety & Security</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="it">IT & Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Create User</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Security Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Permission groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allPermissions.length}</div>
            <p className="text-xs text-muted-foreground">Available permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Lock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">System security</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>Manage user accounts and their access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{user.role}</span>
                        <span>{user.department}</span>
                        <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.permissions.slice(0, 4).map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {user.permissions.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Define roles and their associated permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{role.name}</h3>
                          <Badge variant="secondary">{role.userCount} users</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{role.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Configure system security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Require 2FA for all users</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto-logout after inactivity</p>
                  </div>
                  <Badge variant="secondary">30 minutes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Password Policy</p>
                    <p className="text-xs text-gray-500">Minimum 8 characters, mixed case</p>
                  </div>
                  <Badge variant="secondary">Strong</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">IP Restrictions</p>
                    <p className="text-xs text-gray-500">Limit access to KMRL network</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Encryption & Compliance</CardTitle>
                <CardDescription>Data protection and regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">End-to-End Encryption</p>
                    <p className="text-xs text-gray-500">AES-256 encryption for all data</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Data Backup</p>
                    <p className="text-xs text-gray-500">Automated daily backups</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Audit Logging</p>
                    <p className="text-xs text-gray-500">Complete activity tracking</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">GDPR Compliance</p>
                    <p className="text-xs text-gray-500">Data protection compliance</p>
                  </div>
                  <Badge variant="secondary">Compliant</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access-logs">
          <Card>
            <CardHeader>
              <CardTitle>Access Logs</CardTitle>
              <CardDescription>Monitor user access and system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Priya Nair",
                    action: "Document Access",
                    resource: "Engineering_Specs_Aluva.pdf",
                    timestamp: "2024-01-10T14:30:00Z",
                    ip: "192.168.1.32",
                    status: "Success",
                  },
                  {
                    user: "Arun Krishnan",
                    action: "Login Attempt",
                    resource: "System Login",
                    timestamp: "2024-01-10T14:15:00Z",
                    ip: "192.168.1.45",
                    status: "Success",
                  },
                  {
                    user: "Unknown",
                    action: "Failed Login",
                    resource: "System Login",
                    timestamp: "2024-01-10T13:45:00Z",
                    ip: "203.192.45.12",
                    status: "Failed",
                  },
                  {
                    user: "Meera Thomas",
                    action: "Document Upload",
                    resource: "Vendor_Contract_2024.pdf",
                    timestamp: "2024-01-10T13:30:00Z",
                    ip: "192.168.1.28",
                    status: "Success",
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          log.status === "Success" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${log.status === "Success" ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.action} - {log.resource}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>User: {log.user}</span>
                        <span>Time: {new Date(log.timestamp).toLocaleString()}</span>
                        <span>IP: {log.ip}</span>
                        <Badge variant={log.status === "Success" ? "secondary" : "destructive"} className="text-xs">
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
