"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Calendar, User, Building, Languages, Brain, Download, Eye } from "lucide-react"

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
}

export function DocumentSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [searchResults, setSearchResults] = useState<Document[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock documents data
  const mockDocuments: Document[] = [
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
    },
  ]

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      let filtered = mockDocuments

      if (searchQuery) {
        filtered = filtered.filter(
          (doc) =>
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      }

      if (selectedDepartment !== "all") {
        filtered = filtered.filter((doc) => doc.department === selectedDepartment)
      }

      if (selectedCategory !== "all") {
        filtered = filtered.filter((doc) => doc.category === selectedCategory)
      }

      if (selectedLanguage !== "all") {
        filtered = filtered.filter((doc) => doc.language === selectedLanguage)
      }

      setSearchResults(filtered)
      setIsSearching(false)
    }, 1000)
  }

  const departments = ["Safety & Security", "Engineering", "Human Resources", "Procurement", "Legal", "Operations"]
  const categories = ["Safety", "Engineering", "HR", "Procurement", "Legal", "Operations"]
  const languages = ["English", "Malayalam"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Search</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Search and filter documents across all departments with AI-powered semantic search
        </p>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Search Documents</CardTitle>
          <CardDescription>
            Use keywords, department filters, or semantic search to find relevant documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Search</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search documents, summaries, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching}>
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Advanced Search"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Found {searchResults.length} documents matching your criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doc.title}</h3>
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
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Search Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Search</CardTitle>
          <CardDescription>Common search queries and document categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("safety compliance")
                handleSearch()
              }}
            >
              Safety Compliance
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("CRMS")
                handleSearch()
              }}
            >
              CRMS Reports
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("MoHUA")
                handleSearch()
              }}
            >
              MoHUA Guidelines
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("engineering")
                handleSearch()
              }}
            >
              Engineering Docs
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("procurement")
                handleSearch()
              }}
            >
              Procurement
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("training")
                handleSearch()
              }}
            >
              Training Materials
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("Malayalam")
                handleSearch()
              }}
            >
              Malayalam Documents
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("vendor")
                handleSearch()
              }}
            >
              Vendor Contracts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
