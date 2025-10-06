"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Glasses, Headphones, Cable as Cube, Zap, Eye, Hand, Layers, Monitor } from "lucide-react"

export default function ARVRPage() {
  const [vrMode, setVrMode] = useState(false)
  const [arMode, setArMode] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const documents = [
    {
      id: "1",
      title: "Aluva Station 3D Blueprint",
      type: "3D Model",
      size: "45.2 MB",
      vrReady: true,
      arReady: true,
      hologramReady: true,
    },
    {
      id: "2",
      title: "Train Interior Layout",
      type: "Interactive 3D",
      size: "32.1 MB",
      vrReady: true,
      arReady: false,
      hologramReady: true,
    },
    {
      id: "3",
      title: "Safety Protocol Visualization",
      type: "AR Experience",
      size: "28.7 MB",
      vrReady: false,
      arReady: true,
      hologramReady: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AR/VR Document Visualization</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Experience documents in immersive 3D environments with cutting-edge AR/VR technology
        </p>
      </div>

      {/* VR/AR Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VR Headset</CardTitle>
            <Glasses className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Connected</div>
            <p className="text-xs text-muted-foreground">Meta Quest 3 Pro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AR Device</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ready</div>
            <p className="text-xs text-muted-foreground">HoloLens 2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hologram Display</CardTitle>
            <Cube className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Calibrating</div>
            <p className="text-xs text-muted-foreground">Looking Glass Pro</p>
          </CardContent>
        </Card>
      </div>

      {/* Document Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            3D Document Library
          </CardTitle>
          <CardDescription>Documents optimized for immersive viewing experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.size}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    {doc.vrReady && <Badge variant="secondary">VR Ready</Badge>}
                    {doc.arReady && <Badge variant="secondary">AR Ready</Badge>}
                    {doc.hologramReady && <Badge variant="secondary">Hologram Ready</Badge>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDocument(doc.id)}>
                    <Glasses className="h-4 w-4 mr-2" />
                    Launch VR
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Launch AR
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Immersive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hand className="h-5 w-5 mr-2" />
              Gesture Controls
            </CardTitle>
            <CardDescription>Control documents with hand gestures and voice commands</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hand Tracking</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Voice Recognition</span>
                <Badge variant="secondary">Listening</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Eye Tracking</span>
                <Badge variant="secondary">Calibrated</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Neural Interface</span>
                <Badge variant="outline">Beta</Badge>
              </div>
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                Say "KMRL, show me safety protocols" to launch AR safety visualization
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Spatial Computing
            </CardTitle>
            <CardDescription>Advanced spatial awareness and document positioning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Room Mapping</span>
                  <span>98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Object Recognition</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lighting Analysis</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>

            <Button className="w-full">
              <Cube className="h-4 w-4 mr-2" />
              Calibrate Spatial Anchors
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* VR Session Active */}
      {selectedDocument && (
        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
              <Glasses className="h-5 w-5 mr-2" />
              VR Session Active
            </CardTitle>
            <CardDescription>Document: {documents.find((d) => d.id === selectedDocument)?.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm">Session Duration: 00:05:23</p>
                <p className="text-sm">Participants: 3 users connected</p>
                <p className="text-sm">Interaction Mode: Collaborative</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Headphones className="h-4 w-4 mr-2" />
                  Spatial Audio
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setSelectedDocument(null)}>
                  End Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
