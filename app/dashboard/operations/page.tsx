"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Train,
  Clock,
  Users,
  AlertTriangle,
  Activity,
  MapPin,
  Zap,
  TrendingUp,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function OperationsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const trainStatus = [
    { id: "T001", route: "Aluva - Pettah", status: "On Time", delay: 0, passengers: 245, capacity: 300 },
    { id: "T002", route: "Pettah - Aluva", status: "Delayed", delay: 3, passengers: 189, capacity: 300 },
    { id: "T003", route: "Aluva - Pettah", status: "On Time", delay: 0, passengers: 267, capacity: 300 },
    { id: "T004", route: "Pettah - Aluva", status: "Maintenance", delay: 15, passengers: 0, capacity: 300 },
  ]

  const stationStatus = [
    { name: "Aluva", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Pulinchodu", status: "Operational", crowd: "Low", alerts: 0 },
    { name: "Companypady", status: "Operational", crowd: "High", alerts: 1 },
    { name: "Ambattukavu", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Muttom", status: "Operational", crowd: "Low", alerts: 0 },
    { name: "Kalamassery", status: "Operational", crowd: "High", alerts: 0 },
    { name: "Cusat", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Pattabiram", status: "Operational", crowd: "Low", alerts: 0 },
    { name: "Edapally", status: "Operational", crowd: "High", alerts: 2 },
    { name: "Changampuzha Park", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Palarivattom", status: "Operational", crowd: "High", alerts: 0 },
    { name: "JLN Stadium", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Kaloor", status: "Operational", crowd: "High", alerts: 1 },
    { name: "Town Hall", status: "Operational", crowd: "Very High", alerts: 0 },
    { name: "MG Road", status: "Operational", crowd: "Very High", alerts: 0 },
    { name: "Maharajas", status: "Operational", crowd: "High", alerts: 0 },
    { name: "Ernakulam South", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Kadavanthra", status: "Operational", crowd: "Low", alerts: 0 },
    { name: "Elamkulam", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Vyttila", status: "Operational", crowd: "High", alerts: 0 },
    { name: "Thaikoodam", status: "Operational", crowd: "Medium", alerts: 0 },
    { name: "Pettah", status: "Operational", crowd: "High", alerts: 0 },
  ]

  const operationalMetrics = {
    totalTrains: 4,
    activeTrains: 3,
    onTimePerformance: 75,
    totalPassengers: 12450,
    avgDelay: 1.5,
    systemUptime: 99.2,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Operations Control Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of KMRL train operations</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-mono font-bold">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Train className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Trains</p>
                <p className="text-2xl font-bold">
                  {operationalMetrics.activeTrains}/{operationalMetrics.totalTrains}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">On-Time %</p>
                <p className="text-2xl font-bold">{operationalMetrics.onTimePerformance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Passengers</p>
                <p className="text-2xl font-bold">{operationalMetrics.totalPassengers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Delay</p>
                <p className="text-2xl font-bold">{operationalMetrics.avgDelay}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold">{operationalMetrics.systemUptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trains" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trains">Train Status</TabsTrigger>
          <TabsTrigger value="stations">Station Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="trains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Train className="h-5 w-5" />
                <span>Live Train Status</span>
              </CardTitle>
              <CardDescription>Real-time monitoring of all active trains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainStatus.map((train) => (
                  <div key={train.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Train className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{train.id}</h3>
                        <p className="text-sm text-gray-600">{train.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge
                          variant={
                            train.status === "On Time"
                              ? "default"
                              : train.status === "Delayed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {train.status}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Delay</p>
                        <p className="font-semibold">{train.delay}m</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <div className="w-24">
                          <Progress value={(train.passengers / train.capacity) * 100} className="h-2" />
                          <p className="text-xs mt-1">
                            {train.passengers}/{train.capacity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Station Network Status</span>
              </CardTitle>
              <CardDescription>Monitoring all 22 stations across the KMRL network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stationStatus.map((station) => (
                  <div key={station.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{station.name}</h3>
                      {station.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {station.alerts} Alert{station.alerts > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge variant="default" className="text-xs">
                          {station.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Crowd Level:</span>
                        <Badge
                          variant={
                            station.crowd === "Low"
                              ? "secondary"
                              : station.crowd === "Medium"
                                ? "default"
                                : station.crowd === "High"
                                  ? "destructive"
                                  : "destructive"
                          }
                          className="text-xs"
                        >
                          {station.crowd}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Daily Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">On-Time Performance</span>
                      <span className="text-sm font-semibold">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Passenger Satisfaction</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Energy Efficiency</span>
                      <span className="text-sm font-semibold">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">System Reliability</span>
                      <span className="text-sm font-semibold">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Weekly Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Peak Hours (8-10 AM)</span>
                    <Badge variant="destructive">High Traffic</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Off-Peak (11 AM-4 PM)</span>
                    <Badge variant="secondary">Normal</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evening Rush (5-8 PM)</span>
                    <Badge variant="destructive">High Traffic</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Night Hours (9 PM-6 AM)</span>
                    <Badge variant="secondary">Low Traffic</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Maintenance Schedule</span>
              </CardTitle>
              <CardDescription>Planned and emergency maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Train T004 - Brake System Check</h3>
                    <p className="text-sm text-gray-600">Scheduled maintenance - 2 hours</p>
                  </div>
                  <Badge variant="destructive">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Edapally Station - Platform Cleaning</h3>
                    <p className="text-sm text-gray-600">Daily maintenance - 30 minutes</p>
                  </div>
                  <Badge variant="default">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Signal System Update</h3>
                    <p className="text-sm text-gray-600">Network-wide update - 4 hours</p>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
