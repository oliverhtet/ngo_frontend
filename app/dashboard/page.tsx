"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Calendar, TrendingUp, DollarSign, Plus, Edit, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalDonations: 1250000,
    totalVolunteers: 45,
    activeEvents: 8,
    impactReach: 12000,
  })
  const [recentDonations, setRecentDonations] = useState([
    {
      id: 1,
      attributes: {
        amount: 50000,
        status: "completed",
        createdAt: "2024-03-15T10:30:00Z",
        paymentMethod: "kbzpay",
        ngo: {
          data: {
            attributes: {
              name: "Myanmar Education Foundation",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        amount: 25000,
        status: "completed",
        createdAt: "2024-03-10T14:20:00Z",
        paymentMethod: "wavemoney",
        ngo: {
          data: {
            attributes: {
              name: "Clean Water Initiative",
            },
          },
        },
      },
    },
  ])
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      attributes: {
        title: "Education Fair 2024",
        date: "2024-03-25T09:00:00Z",
        location: "Yangon Convention Center",
      },
    },
    {
      id: 2,
      attributes: {
        title: "Book Donation Drive",
        date: "2024-03-30T10:00:00Z",
        location: "Various locations",
      },
    },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("jwt")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MyanmarCares</h1>
                <p className="text-xs text-gray-600">မြန်မာ့စာနာမှု</p>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                Profile
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  localStorage.removeItem("jwt")
                  localStorage.removeItem("user")
                  router.push("/")
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || JSON.parse(localStorage.getItem("user") || '{"username":"User"}').username}
            !
          </h1>
          <p className="text-gray-600">Track your contributions and find new ways to help</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalDonations.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Volunteers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVolunteers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">People Reached</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.impactReach.toLocaleString()}+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest contributions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDonations.map((donation: any) => (
                      <div key={donation.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Donated ₹{donation.attributes.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(donation.attributes.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events you might be interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event: any) => (
                      <div key={event.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{event.attributes.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(event.attributes.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Track all your donations and their impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonations.map((donation: any) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">₹{donation.attributes.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{donation.attributes.ngo?.data?.attributes?.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(donation.attributes.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={donation.attributes.status === "completed" ? "default" : "secondary"}>
                          {donation.attributes.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{donation.attributes.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Participation</CardTitle>
                <CardDescription>Events you've registered for or organized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.attributes.title}</p>
                        <p className="text-sm text-gray-600">{event.attributes.location}</p>
                        <p className="text-xs text-gray-500">{new Date(event.attributes.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Plus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Create Campaign</h3>
                  <p className="text-sm text-gray-600">Start a new fundraising campaign</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Add Event</h3>
                  <p className="text-sm text-gray-600">Organize a new community event</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">View Analytics</h3>
                  <p className="text-sm text-gray-600">Track your organization's impact</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
