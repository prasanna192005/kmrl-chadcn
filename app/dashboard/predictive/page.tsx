"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Brain, Zap, AlertTriangle, Target, Lightbulb, Activity } from "lucide-react"

export default function PredictivePage() {
  const [selectedModel, setSelectedModel] = useState("document-processing")

  const predictionModels = [
    {
      id: "document-processing",
      name: "Document Processing Load",
      accuracy: 94.2,
      status: "active",
      lastTrained: "2024-01-10",
      predictions: "Next 7 days",
    },
    {
      id: "compliance-deadlines",
      name: "Compliance Risk Assessment",
      accuracy: 89.7,
      status: "active",
      lastTrained: "2024-01-09",
      predictions: "Next 30 days",
    },
    {
      id: "storage-optimization",
      name: "Storage Optimization",
      accuracy: 96.1,
      status: "active",
      lastTrained: "2024-01-08",
      predictions: "Next 90 days",
    },
    {
      id: "user-behavior",
      name: "User Access Patterns",
      accuracy: 87.3,
      status: "training",
      lastTrained: "2024-01-07",
      predictions: "Real-time",
    },
  ]

  const processingPredictions = [
    { day: "Mon", predicted: 45, actual: 47, confidence: 0.94 },
    { day: "Tue", predicted: 52, actual: 49, confidence: 0.91 },
    { day: "Wed", predicted: 38, actual: null, confidence: 0.89 },
    { day: "Thu", predicted: 61, actual: null, confidence: 0.92 },
    { day: "Fri", predicted: 73, actual: null, confidence: 0.95 },
    { day: "Sat", predicted: 28, actual: null, confidence: 0.88 },
    { day: "Sun", predicted: 15, actual: null, confidence: 0.85 },
  ]

  const complianceRisks = [
    {
      category: "CRMS Safety Reports",
      riskLevel: "medium",
      probability: 0.23,
      daysUntilDeadline: 5,
      recommendation: "Schedule review meeting with safety team",
    },
    {
      category: "MoHUA Guidelines",
      riskLevel: "low",
      probability: 0.08,
      daysUntilDeadline: 15,
      recommendation: "Continue current compliance tracking",
    },
    {
      category: "Environmental Impact",
      riskLevel: "high",
      probability: 0.67,
      daysUntilDeadline: 3,
      recommendation: "Immediate action required - assign priority team",
    },
  ]

  const aiInsights = [
    {
      type: "optimization",
      title: "Storage Optimization Opportunity",
      description:
        "AI predicts 23% storage reduction possible by archiving documents older than 2 years with <5% access rate",
      impact: "High",
      confidence: 0.91,
    },
    {
      type: "efficiency",
      title: "Processing Bottleneck Detected",
      description: "OCR processing queue shows 15% efficiency improvement possible with load balancing optimization",
      impact: "Medium",
      confidence: 0.87,
    },
    {
      type: "security",
      title: "Anomalous Access Pattern",
      description:
        "Unusual document access pattern detected for user group 'External Contractors' - recommend security review",
      impact: "High",
      confidence: 0.94,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Predictive AI Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Advanced machine learning models for predictive insights and intelligent automation
        </p>
      </div>

      {/* Model Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {predictionModels.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-colors ${selectedModel === model.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={() => setSelectedModel(model.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{model.name}</CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{model.accuracy}%</div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={model.status === "active" ? "secondary" : "outline"}>{model.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Predictions Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Document Processing Predictions
            </CardTitle>
            <CardDescription>AI-predicted document processing load for next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={processingPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Compliance Risk Assessment
            </CardTitle>
            <CardDescription>AI-predicted compliance risks and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceRisks.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{risk.category}</h4>
                    <Badge
                      variant={
                        risk.riskLevel === "high"
                          ? "destructive"
                          : risk.riskLevel === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {risk.riskLevel} risk
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Risk Probability</span>
                      <span>{Math.round(risk.probability * 100)}%</span>
                    </div>
                    <Progress value={risk.probability * 100} className="h-2" />
                    <p className="text-xs text-gray-600">{risk.recommendation}</p>
                    <p className="text-xs text-gray-500">Deadline in {risk.daysUntilDeadline} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Intelligent recommendations based on predictive analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {insight.type === "optimization" && <Target className="h-4 w-4 text-blue-500" />}
                      {insight.type === "efficiency" && <Zap className="h-4 w-4 text-yellow-500" />}
                      {insight.type === "security" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline">{Math.round(insight.confidence * 100)}% confidence</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                    <Badge
                      variant={
                        insight.impact === "High"
                          ? "destructive"
                          : insight.impact === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      Implement
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Training */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Model Training Status
          </CardTitle>
          <CardDescription>Real-time machine learning model performance and training</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Active Training Jobs</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Neural Language Model</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={73} className="w-20 h-2" />
                    <span className="text-xs">73%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Computer Vision OCR</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={91} className="w-20 h-2" />
                    <span className="text-xs">91%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anomaly Detection</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-20 h-2" />
                    <span className="text-xs">45%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Model Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inference Speed</span>
                  <Badge variant="secondary">23ms avg</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">GPU Utilization</span>
                  <Badge variant="secondary">87%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory Usage</span>
                  <Badge variant="secondary">12.4 GB</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Accuracy</span>
                  <Badge variant="secondary">94.2%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  )
}
