"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  ImageIcon,
  File,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Eye,
  Download,
  Brain,
  Languages,
} from "lucide-react"

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  metadata?: {
    type: string
    size: string
    pages?: number
    language?: string
    category?: string
    extractedText?: string
    summary?: string
  }
  error?: string
}

export function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadSource, setUploadSource] = useState("local")
  const [emailConfig, setEmailConfig] = useState({ server: "", username: "", password: "" })
  const [sharepointConfig, setSharepointConfig] = useState({ url: "", credentials: "" })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateFileProcessing(uploadedFile.id)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "text/csv": [".csv"],
      "image/*": [".png", ".jpg", ".jpeg", ".tiff"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const simulateFileProcessing = async (fileId: string) => {
    const updateFile = (updates: Partial<UploadedFile>) => {
      setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, ...updates } : f)))
    }

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      updateFile({ progress })
    }

    updateFile({ status: "processing", progress: 0 })

    // Simulate processing steps
    const processingSteps = [
      { step: "Extracting metadata", progress: 20 },
      { step: "OCR processing", progress: 40 },
      { step: "Language detection", progress: 60 },
      { step: "Content categorization", progress: 80 },
      { step: "Generating summary", progress: 100 },
    ]

    for (const { progress } of processingSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      updateFile({ progress })
    }

    // Simulate completion with mock metadata
    const file = uploadedFiles.find((f) => f.id === fileId)
    if (file) {
      const mockMetadata = {
        type: file.file.type.includes("pdf") ? "PDF Document" : "Office Document",
        size: `${(file.file.size / 1024 / 1024).toFixed(2)} MB`,
        pages: Math.floor(Math.random() * 20) + 1,
        language: Math.random() > 0.5 ? "English" : "Malayalam",
        category: ["Engineering", "HR", "Procurement", "Safety", "Legal"][Math.floor(Math.random() * 5)],
        extractedText: "Sample extracted text content from the document...",
        summary:
          "This document contains important information regarding project specifications and compliance requirements.",
      }

      updateFile({
        status: "completed",
        progress: 100,
        metadata: mockMetadata,
      })
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
    if (file.type.includes("image")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Upload</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload documents from multiple sources for AI processing and summarization
        </p>
      </div>

      <Tabs value={uploadSource} onValueChange={setUploadSource} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="local">Local Files</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sharepoint">SharePoint</TabsTrigger>
          <TabsTrigger value="iot">IoT Streams</TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Drag and drop files or click to browse. Supports PDF, Word, Excel, CSV, and images up to 50MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600 dark:text-blue-400">Drop the files here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Drag and drop your documents here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG up to 50MB</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Integration</CardTitle>
              <CardDescription>Connect to your email server to automatically process attachments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-server">Email Server</Label>
                  <Input
                    id="email-server"
                    placeholder="imap.company.com"
                    value={emailConfig.server}
                    onChange={(e) => setEmailConfig({ ...emailConfig, server: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-username">Username</Label>
                  <Input
                    id="email-username"
                    placeholder="user@company.com"
                    value={emailConfig.username}
                    onChange={(e) => setEmailConfig({ ...emailConfig, username: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-password">Password</Label>
                <Input
                  id="email-password"
                  type="password"
                  placeholder="Enter password"
                  value={emailConfig.password}
                  onChange={(e) => setEmailConfig({ ...emailConfig, password: e.target.value })}
                />
              </div>
              <Button className="w-full">Connect Email Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharepoint" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SharePoint Integration</CardTitle>
              <CardDescription>Connect to SharePoint to sync documents automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sharepoint-url">SharePoint URL</Label>
                <Input
                  id="sharepoint-url"
                  placeholder="https://company.sharepoint.com/sites/documents"
                  value={sharepointConfig.url}
                  onChange={(e) => setSharepointConfig({ ...sharepointConfig, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sharepoint-credentials">Authentication</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select authentication method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    <SelectItem value="basic">Basic Authentication</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Connect SharePoint</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IoT Data Streams</CardTitle>
              <CardDescription>Configure IoT data ingestion from sensors and devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  IoT stream integration requires Apache Kafka configuration. Contact your system administrator.
                </AlertDescription>
              </Alert>
              <Button className="w-full" disabled>
                Configure IoT Streams
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Monitor your document processing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-shrink-0">{getFileIcon(uploadedFile.file)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {uploadedFile.file.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(uploadedFile.status)}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {uploadedFile.status === "uploading"
                            ? "Uploading..."
                            : uploadedFile.status === "processing"
                              ? "Processing..."
                              : uploadedFile.status === "completed"
                                ? "Completed"
                                : "Error"}
                        </span>
                        <span className="text-gray-500">{uploadedFile.progress}%</span>
                      </div>
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>

                    {uploadedFile.metadata && (
                      <div className="mt-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{uploadedFile.metadata.type}</Badge>
                          <Badge variant="secondary">{uploadedFile.metadata.size}</Badge>
                          {uploadedFile.metadata.pages && (
                            <Badge variant="secondary">{uploadedFile.metadata.pages} pages</Badge>
                          )}
                          <Badge variant="secondary">
                            <Languages className="h-3 w-3 mr-1" />
                            {uploadedFile.metadata.language}
                          </Badge>
                          <Badge variant="outline">{uploadedFile.metadata.category}</Badge>
                        </div>

                        {uploadedFile.metadata.summary && (
                          <div className="bg-white dark:bg-gray-700 p-3 rounded border">
                            <div className="flex items-center mb-2">
                              <Brain className="h-4 w-4 text-purple-500 mr-2" />
                              <span className="text-sm font-medium">AI Summary</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{uploadedFile.metadata.summary}</p>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}

                    {uploadedFile.error && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{uploadedFile.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
