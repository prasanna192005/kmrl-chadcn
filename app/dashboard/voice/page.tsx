"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, Volume2, VolumeX, Brain, Languages, Zap, Settings, Headphones, Radio, Waves } from "lucide-react"

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentCommand, setCurrentCommand] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [language, setLanguage] = useState("English")

  const voiceCommands = [
    { command: "KMRL, show me safety documents", action: "Search safety documents", confidence: 0.95 },
    { command: "KMRL, summarize latest report", action: "Generate AI summary", confidence: 0.92 },
    { command: "KMRL, translate to Malayalam", action: "Language translation", confidence: 0.89 },
    { command: "KMRL, upload new document", action: "Open upload interface", confidence: 0.97 },
    { command: "KMRL, check compliance status", action: "Show compliance dashboard", confidence: 0.94 },
  ]

  const voiceSettings = {
    wakeWord: "KMRL",
    language: "English + Malayalam",
    sensitivity: 0.7,
    noiseReduction: true,
    continuousListening: false,
    voiceFeedback: true,
  }

  const recentCommands = [
    { time: "10:30 AM", command: "Show me engineering documents", result: "Found 47 documents", confidence: 0.94 },
    { time: "10:25 AM", command: "Translate MoHUA guidelines", result: "Translation completed", confidence: 0.91 },
    { time: "10:20 AM", command: "Generate safety report summary", result: "Summary generated", confidence: 0.96 },
    { time: "10:15 AM", command: "Check pending approvals", result: "3 documents pending", confidence: 0.89 },
  ]

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentCommand("KMRL, show me safety documents")
        setConfidence(0.95)
      }, 2000)

      setTimeout(() => {
        setIsListening(false)
        setCurrentCommand("")
        setConfidence(0)
      }, 5000)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Voice Control Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Advanced voice recognition with multilingual support and natural language processing
        </p>
      </div>

      {/* Voice Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Recognition</CardTitle>
            <Mic className={`h-4 w-4 ${isListening ? "text-red-500" : "text-gray-400"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isListening ? "text-red-600" : "text-green-600"}`}>
              {isListening ? "Listening" : "Ready"}
            </div>
            <p className="text-xs text-muted-foreground">
              {isListening ? "Processing audio..." : 'Say "KMRL" to activate'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Language Support</CardTitle>
            <Languages className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">English + Malayalam</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Average confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commands Today</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Voice Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="h-5 w-5 mr-2" />
              Voice Interface
            </CardTitle>
            <CardDescription>Click to start voice recognition or use wake word "KMRL"</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                onClick={handleVoiceToggle}
                className="w-32 h-32 rounded-full"
              >
                {isListening ? (
                  <div className="flex flex-col items-center">
                    <MicOff className="h-8 w-8 mb-2" />
                    <span className="text-sm">Stop</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Mic className="h-8 w-8 mb-2" />
                    <span className="text-sm">Listen</span>
                  </div>
                )}
              </Button>

              {isListening && (
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Waves className="h-4 w-4 text-blue-500 animate-pulse" />
                    <span className="text-sm text-blue-600">Listening for commands...</span>
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-8 bg-blue-500 rounded animate-pulse"></div>
                    <div
                      className="w-2 h-12 bg-blue-500 rounded animate-pulse"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div className="w-2 h-6 bg-blue-500 rounded animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div
                      className="w-2 h-10 bg-blue-500 rounded animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div className="w-2 h-4 bg-blue-500 rounded animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}

              {currentCommand && (
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Recognized:</strong> "{currentCommand}"<br />
                    <strong>Confidence:</strong> {Math.round(confidence * 100)}%
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Voice Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wake Word</span>
                  <Badge variant="secondary">{voiceSettings.wakeWord}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sensitivity</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={voiceSettings.sensitivity * 100} className="w-20 h-2" />
                    <span className="text-xs">{Math.round(voiceSettings.sensitivity * 100)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Noise Reduction</span>
                  <Badge variant={voiceSettings.noiseReduction ? "secondary" : "outline"}>
                    {voiceSettings.noiseReduction ? "On" : "Off"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Feedback</span>
                  <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Headphones className="h-5 w-5 mr-2" />
              Available Commands
            </CardTitle>
            <CardDescription>Natural language commands you can use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {voiceCommands.map((cmd, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">"{cmd.command}"</p>
                      <p className="text-xs text-gray-500 mt-1">{cmd.action}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(cmd.confidence * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4 bg-transparent" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Customize Commands
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Voice Commands</CardTitle>
          <CardDescription>History of processed voice interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCommands.map((cmd, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{cmd.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(cmd.confidence * 100)}%
                    </Badge>
                  </div>
                  <p className="text-sm font-medium mt-1">"{cmd.command}"</p>
                  <p className="text-xs text-gray-600 mt-1">Result: {cmd.result}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Replay
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  )
}
