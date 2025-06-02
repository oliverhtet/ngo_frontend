"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Clock, Search, Filter, Heart } from "lucide-react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import type { Event } from "@/lib/types"

const eventTypes = ["All", "Online", "Offline", "Hybrid"]
const locations = ["All", "Yangon", "Mandalay", "Shan State", "Bagan", "Ayeyarwady"]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await apiService.getEvents({
        populate: "image",
        sort: "date:asc",
      }) as { data: Event[] }
      console.log("Fetched events:", response.data)
      setEvents(response.data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || event.type === selectedType.toLowerCase()
    const matchesLocation = selectedLocation === "All" || event.location.includes(selectedLocation)

    return matchesSearch && matchesType && matchesLocation
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/ngos" className="text-gray-700 hover:text-blue-600">
                NGOs
              </Link>
              <Link href="/volunteer" className="text-gray-700 hover:text-blue-600">
                Volunteer
              </Link>
              <Link href="/events" className="text-blue-600 font-medium">
                Events
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                Stories
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Button size="sm">Register NGO</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600 mb-8">Join community events and make a difference together</p>

          {/* Search and Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={event.image?.url
                      ? `${API_URL}${event.image.url}`
                      : "/placeholder.svg?height=200&width=400"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 capitalize">{event.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {event.ngo?.data?.name}
                  </CardDescription>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.volunteersRegistered}/{event.volunteersNeeded} registered
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(event.volunteersRegistered / event.volunteersNeeded) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <Button className="w-full">Register for Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
