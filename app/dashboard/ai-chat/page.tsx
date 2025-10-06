"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  User,
  Mic,
  MicOff,
  Brain,
  Zap,
  FileText,
  Search,
  Languages,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  language?: string
  documents?: string[]
  confidence?: number
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm KMRL DocuMind AI, your intelligent document assistant. I can help you search documents, generate summaries, translate content, and answer questions about your document library. How can I assist you today?",
      timestamp: new Date(),
      confidence: 0.98,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const aiCapabilities = [
    { name: "Document Search", icon: Search, active: true },
    { name: "AI Summarization", icon: Brain, active: true },
    { name: "Language Translation", icon: Languages, active: true },
    { name: "Voice Recognition", icon: Mic, active: isListening },
    { name: "Text-to-Speech", icon: Volume2, active: voiceEnabled },
    { name: "Predictive Analytics", icon: Sparkles, active: true },
  ]

  const quickQuestions = [
    "Show me all safety compliance documents",
    "Summarize the latest CRMS report",
    "Translate MoHUA guidelines to Malayalam",
    "What are the pending compliance deadlines?",
    "Find engineering documents for Aluva extension",
    "Generate monthly document processing report",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        confidence: Math.random() * 0.3 + 0.7,
        documents: inputMessage.toLowerCase().includes("document")
          ? ["CRMS_Safety_Report.pdf", "MoHUA_Guidelines.docx"]
          : undefined,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("safety") || lowerQuery.includes("crms")) {
      return "I found 12 safety compliance documents in your library. The latest CRMS Safety Report Q4 2024 shows 98% compliance rate with 3 minor recommendations. Key highlights: All train operations meet safety standards, emergency response protocols updated, and staff training completion at 100%. Would you like me to provide more details on any specific safety aspect?"
    }

    if (lowerQuery.includes("translate") || lowerQuery.includes("malayalam")) {
      return "I can translate documents between English and Malayalam using advanced neural machine translation. The MoHUA Urban Transit Guidelines have been successfully translated to Malayalam with 94% accuracy. The translated document maintains technical terminology while ensuring local language compliance. Would you like me to translate any other documents?"
    }

    if (lowerQuery.includes("summary") || lowerQuery.includes("summarize")) {
      return "I've generated AI summaries for 1,523 documents in your library. Recent summaries include: Engineering specifications for Aluva Extension (key points: 15km extension, 12 new stations, completion by 2026), Vendor maintenance contracts (annual cost: ₹45 crores, 99.2% uptime guarantee), and HR training manual updates (new safety protocols, digital ticketing procedures). Which document would you like me to summarize?"
    }

    return "I understand your query and I'm processing it using advanced natural language understanding. Based on your document library and current context, I can provide detailed insights, search relevant documents, generate summaries, or help with translations. Could you provide more specific details about what you're looking for?"
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("Show me all safety compliance documents")
        setIsListening(false)
      }, 3000)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Document Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Intelligent conversational AI with RAG-based document understanding and multilingual support
        </p>
      </div>

      {/* AI Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Capabilities
          </CardTitle>
          <CardDescription>Advanced AI features powered by large language models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {aiCapabilities.map((capability) => (
              <div key={capability.name} className="flex items-center space-x-2 p-2 border rounded">
                <capability.icon className={`h-4 w-4 ${capability.active ? "text-green-500" : "text-gray-400"}`} />
                <span className="text-sm">{capability.name}</span>
                <Badge variant={capability.active ? "secondary" : "outline"} className="text-xs">
                  {capability.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                KMRL DocuMind AI
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Badge variant="secondary">Online</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 mb-4" ref={scrollAreaRef}>
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "ai" && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                        {message.type === "user" && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          {message.documents && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs opacity-75">Referenced documents:</p>
                              {message.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs opacity-75">{message.timestamp.toLocaleTimeString()}</p>
                            {message.confidence && (
                              <Badge variant="outline" className="text-xs">
                                {Math.round(message.confidence * 100)}% confidence
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything about your documents..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                className={isListening ? "bg-red-100 border-red-300" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Zap className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Quick Questions
            </CardTitle>
            <CardDescription>Common queries to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2 text-xs bg-transparent"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  )
}
