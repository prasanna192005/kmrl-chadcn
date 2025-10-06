"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  FileText,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  Loader2,
  Languages,
  Eye,
  BarChart3,
  Bot,
  Sparkles,
} from "lucide-react"

export default function AIProcessingPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const processingQueue = [
    {
      id: "DOC001",
      name: "Safety Protocol Manual.pdf",
      status: "Processing",
      progress: 75,
      type: "OCR + Summarization",
      language: "English",
      priority: "High",
    },
    {
      id: "DOC002",
      name: "മലയാളം നിയമാവലി.pdf",
      status: "Queued",
      progress: 0,
      type: "Translation + OCR",
      language: "Malayalam",
      priority: "Medium",
    },
    {
      id: "DOC003",
      name: "Financial Report Q3.xlsx",
      status: "Completed",
      progress: 100,
      type: "Data Analysis",
      language: "English",
      priority: "High",
    },
    {
      id: "DOC004",
      name: "Maintenance Log.docx",
      status: "Processing",
      progress: 45,
      type: "Classification",
      language: "English",
      priority: "Low",
    },
  ]

  const aiModels = [
    { name: "OCR Engine", status: "Active", accuracy: 98.5, load: 65 },
    { name: "Text Summarizer", status: "Active", accuracy: 94.2, load: 42 },
    { name: "Language Translator", status: "Active", accuracy: 96.8, load: 28 },
    { name: "Document Classifier", status: "Active", accuracy: 92.1, load: 55 },
    { name: "Sentiment Analyzer", status: "Active", accuracy: 89.7, load: 33 },
    { name: "Entity Extractor", status: "Active", accuracy: 91.4, load: 47 },
  ]

  const processingStats = {
    totalProcessed: 1247,
    todayProcessed: 89,
    avgProcessingTime: "2.3m",
    successRate: 96.8,
    queueLength: 12,
    activeModels: 6,
  }

  const recentSummaries = [
    {
      document: "KMRL Safety Guidelines 2024",
      summary:
        "Updated safety protocols for train operations including new emergency procedures, passenger safety measures, and staff training requirements. Key changes include enhanced fire safety protocols and improved evacuation procedures.",
      confidence: 94,
      language: "English",
      keywords: ["Safety", "Emergency", "Training", "Protocols"],
    },
    {
      document: "വാർഷിക റിപ്പോർട്ട് 2023",
      summary:
        "കൊച്ചി മെട്രോയുടെ 2023 വാർഷിക പ്രകടന റിപ്പോർട്ട്. യാത്രക്കാരുടെ എണ്ണത്തിൽ 15% വർദ്ധനവ്, പുതിയ സാങ്കേതികവിദ്യകളുടെ നടപ്പാക്കൽ, പരിസ്ഥിതി സൗഹൃദ നടപടികൾ എന്നിവ ഉൾപ്പെടുന്നു.",
      confidence: 91,
      language: "Malayalam",
      keywords: ["വാർഷിക", "പ്രകടനം", "യാത്രക്കാർ", "സാങ്കേതികവിദ്യ"],
    },
  ]

  const handleProcessDocument = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Processing Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Advanced document processing with artificial intelligence</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Bot className="h-3 w-3 mr-1" />
            AI Online
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">{processingStats.totalProcessed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold">{processingStats.todayProcessed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Time</p>
                <p className="text-2xl font-bold">{processingStats.avgProcessingTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{processingStats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Queue</p>
                <p className="text-2xl font-bold">{processingStats.queueLength}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-600">AI Models</p>
                <p className="text-2xl font-bold">{processingStats.activeModels}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queue">Processing Queue</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="summaries">Recent Summaries</TabsTrigger>
          <TabsTrigger value="process">Process Document</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Document Processing Queue</span>
              </CardTitle>
              <CardDescription>Real-time status of documents being processed by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingQueue.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-gray-600">{doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Language</p>
                        <Badge variant="outline" className="text-xs">
                          <Languages className="h-3 w-3 mr-1" />
                          {doc.language}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Priority</p>
                        <Badge
                          variant={
                            doc.priority === "High"
                              ? "destructive"
                              : doc.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {doc.priority}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge
                          variant={
                            doc.status === "Completed"
                              ? "default"
                              : doc.status === "Processing"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="w-24">
                        <Progress value={doc.progress} className="h-2" />
                        <p className="text-xs mt-1 text-center">{doc.progress}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Model Performance</span>
              </CardTitle>
              <CardDescription>Real-time monitoring of AI processing models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiModels.map((model) => (
                  <div key={model.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{model.name}</h3>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {model.status}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Accuracy</span>
                          <span className="text-sm font-semibold">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Current Load</span>
                          <span className="text-sm font-semibold">{model.load}%</span>
                        </div>
                        <Progress value={model.load} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summaries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>AI-Generated Summaries</span>
              </CardTitle>
              <CardDescription>Recent document summaries created by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentSummaries.map((summary, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{summary.document}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <Languages className="h-3 w-3 mr-1" />
                          {summary.language}
                        </Badge>
                        <Badge variant="default">{summary.confidence}% Confidence</Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{summary.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {summary.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Process New Document</span>
              </CardTitle>
              <CardDescription>Upload and process documents with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Processing Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      OCR
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Summarize
                    </Button>
                    <Button variant="outline" size="sm">
                      <Languages className="h-4 w-4 mr-2" />
                      Translate
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Document Language</label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      English
                    </Button>
                    <Button variant="outline" size="sm">
                      മലയാളം
                    </Button>
                    <Button variant="outline" size="sm">
                      हिंदी
                    </Button>
                    <Button variant="outline" size="sm">
                      Auto-Detect
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Processing Priority</label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Low
                    </Button>
                    <Button variant="outline" size="sm">
                      Medium
                    </Button>
                    <Button variant="destructive" size="sm">
                      High
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Instructions</label>
                  <Textarea
                    placeholder="Enter any specific processing instructions or requirements..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button onClick={handleProcessDocument} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Document...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Start AI Processing
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  )
}
