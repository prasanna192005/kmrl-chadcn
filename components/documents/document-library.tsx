"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Calendar,
  User,
  Building,
  Languages,
  Brain,
  Download,
  Eye,
  Star,
  Filter,
  Grid,
  List,
} from "lucide-react"

interface Document {
  id: string
  title: string
  type: string
  department: string
  author: string
  uploadDate: string
  language: string
  category: string
  summary: string
  tags: string[]
  size: string
  status: string
  priority: "high" | "medium" | "low"
  starred: boolean
}

export function DocumentLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedTab, setSelectedTab] = useState("all")

  // Mock documents data
  const documents: Document[] = [
    {
      id: "1",
      title: "CRMS Safety Compliance Report Q4 2024",
      type: "PDF",
      department: "Safety & Security",
      author: "Arun Krishnan",
      uploadDate: "2024-01-10",
      language: "English",
      category: "Safety",
      summary:
        "Comprehensive safety audit report covering all metro operations, incident analysis, and compliance with CRMS guidelines.",
      tags: ["safety", "compliance", "CRMS", "audit"],
      size: "2.4 MB",
      status: "processed",
      priority: "high",
      starred: true,
    },
    {
      id: "2",
      title: "MoHUA Urban Transit Guidelines Malayalam",
      type: "DOCX",
      department: "Legal",
      author: "Legal Team",
      uploadDate: "2024-01-09",
      language: "Malayalam",
      category: "Legal",
      summary:
        "Ministry of Housing and Urban Affairs guidelines for urban transit systems translated to Malayalam for local compliance.",
      tags: ["MoHUA", "guidelines", "urban transit", "Malayalam"],
      size: "1.8 MB",
      status: "processed",
      priority: "high",
      starred: false,
    },
    {
      id: "3",
      title: "Engineering Specifications - Aluva Extension",
      type: "PDF",
      department: "Engineering",
      author: "Priya Nair",
      uploadDate: "2024-01-08",
      language: "English",
      category: "Engineering",
      summary:
        "Technical specifications and design requirements for the Aluva metro line extension project including structural and electrical systems.",
      tags: ["engineering", "Aluva", "extension", "specifications"],
      size: "5.2 MB",
      status: "processed",
      priority: "medium",
      starred: true,
    },
    {
      id: "4",
      title: "Vendor Contract - Rolling Stock Maintenance",
      type: "PDF",
      department: "Procurement",
      author: "Meera Thomas",
      uploadDate: "2024-01-07",
      language: "English",
      category: "Procurement",
      summary:
        "Annual maintenance contract for rolling stock including terms, conditions, and service level agreements with approved vendors.",
      tags: ["procurement", "vendor", "rolling stock", "maintenance"],
      size: "3.1 MB",
      status: "processed",
      priority: "medium",
      starred: false,
    },
    {
      id: "5",
      title: "Employee Training Manual 2024",
      type: "PDF",
      department: "Human Resources",
      author: "Lakshmi Pillai",
      uploadDate: "2024-01-06",
      language: "English",
      category: "HR",
      summary:
        "Comprehensive training manual covering operational procedures, safety protocols, and customer service standards for all KMRL employees.",
      tags: ["HR", "training", "manual", "procedures"],
      size: "4.7 MB",
      status: "processed",
      priority: "low",
      starred: false,
    },
  ]

  const getFilteredDocuments = () => {
    switch (selectedTab) {
      case "starred":
        return documents.filter((doc) => doc.starred)
      case "recent":
        return documents.slice(0, 3)
      case "high-priority":
        return documents.filter((doc) => doc.priority === "high")
      default:
        return documents
    }
  }

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doc.title}</h3>
            {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            {doc.priority === "high" && (
              <Badge variant="destructive" className="text-xs">
                High Priority
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{doc.summary}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {doc.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {doc.department}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {doc.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {doc.uploadDate}
            </div>
            <div className="flex items-center">
              <Languages className="h-4 w-4 mr-1" />
              {doc.language}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" />
            AI Summary
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Library</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse and manage all KMRL documents with AI-powered organization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex border rounded-md">
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="high-priority">High Priority</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedTab === "all" && "All Documents"}
                {selectedTab === "starred" && "Starred Documents"}
                {selectedTab === "recent" && "Recent Documents"}
                {selectedTab === "high-priority" && "High Priority Documents"}
              </CardTitle>
              <CardDescription>{getFilteredDocuments().length} documents found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredDocuments().map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
