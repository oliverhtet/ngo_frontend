"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Clock, Users, Calendar, Filter } from "lucide-react"
import Link from "next/link"

const opportunities = [
  {
    id: 1,
    title: "English Teacher for Rural Schools",
    organization: "Myanmar Education Foundation",
    description: "Teach English to children in rural areas. No formal teaching experience required.",
    location: "Shan State",
    type: "On-site",
    duration: "3 months",
    timeCommitment: "20 hours/week",
    skills: ["Teaching", "English", "Communication"],
    volunteers: 5,
    maxVolunteers: 10,
    date: "Starting March 15, 2024",
    urgent: false,
  },
  {
    id: 2,
    title: "Medical Camp Assistant",
    organization: "Healthcare for All",
    description: "Assist medical professionals during mobile clinic visits to remote villages.",
    location: "Ayeyarwady Region",
    type: "On-site",
    duration: "1 week",
    timeCommitment: "Full-time",
    skills: ["Healthcare", "First Aid", "Communication"],
    volunteers: 8,
    maxVolunteers: 12,
    date: "March 20-27, 2024",
    urgent: true,
  },
  {
    id: 3,
    title: "Social Media Manager",
    organization: "Clean Water Initiative",
    description: "Manage social media accounts and create content to raise awareness.",
    location: "Remote",
    type: "Remote",
    duration: "6 months",
    timeCommitment: "10 hours/week",
    skills: ["Social Media", "Content Creation", "Marketing"],
    volunteers: 2,
    maxVolunteers: 3,
    date: "Flexible start",
    urgent: false,
  },
  {
    id: 4,
    title: "Event Coordinator",
    organization: "Women Empowerment Network",
    description: "Help organize workshops and training sessions for women entrepreneurs.",
    location: "Yangon",
    type: "Hybrid",
    duration: "2 months",
    timeCommitment: "15 hours/week",
    skills: ["Event Planning", "Communication", "Organization"],
    volunteers: 3,
    maxVolunteers: 5,
    date: "Starting April 1, 2024",
    urgent: false,
  },
  {
    id: 5,
    title: "Tree Planting Volunteer",
    organization: "Environmental Protection Myanmar",
    description: "Join our reforestation efforts in degraded forest areas.",
    location: "Bagan",
    type: "On-site",
    duration: "1 day",
    timeCommitment: "8 hours",
    skills: ["Physical Work", "Environmental Awareness"],
    volunteers: 25,
    maxVolunteers: 50,
    date: "March 30, 2024",
    urgent: false,
  },
  {
    id: 6,
    title: "Nutrition Program Assistant",
    organization: "Child Nutrition Program",
    description: "Help prepare and distribute nutritious meals to children.",
    location: "Mandalay",
    type: "On-site",
    duration: "1 month",
    timeCommitment: "4 hours/day",
    skills: ["Food Preparation", "Child Care", "Health"],
    volunteers: 12,
    maxVolunteers: 20,
    date: "Starting March 25, 2024",
    urgent: true,
  },
]

const types = ["All", "On-site", "Remote", "Hybrid"]
const durations = ["All", "1 day", "1 week", "1 month", "2 months", "3 months", "6 months"]
const skills = ["All", "Teaching", "Healthcare", "Social Media", "Event Planning", "Physical Work", "Communication"]

export default function VolunteerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedSkill, setSelectedSkill] = useState("All")
  const [urgentOnly, setUrgentOnly] = useState(false)

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || opportunity.type === selectedType
    const matchesDuration = selectedDuration === "All" || opportunity.duration === selectedDuration
    const matchesSkill = selectedSkill === "All" || opportunity.skills.includes(selectedSkill)
    const matchesUrgent = !urgentOnly || opportunity.urgent

    return matchesSearch && matchesType && matchesDuration && matchesSkill && matchesUrgent
  })

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
              <Link href="/volunteer" className="text-blue-600 font-medium">
                Volunteer
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-blue-600">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
          <p className="text-xl text-gray-600 mb-8">
            Make a difference in your community by volunteering with verified NGOs
          </p>

          {/* Search and Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={urgentOnly ? "default" : "outline"}
                onClick={() => setUrgentOnly(!urgentOnly)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Urgent Only
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium mb-2">
                        {opportunity.organization}
                      </CardDescription>
                      <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                    </div>
                    {opportunity.urgent && (
                      <Badge variant="destructive" className="ml-2">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Location and Type */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {opportunity.location}
                      </div>
                      <Badge variant="outline">{opportunity.type}</Badge>
                    </div>

                    {/* Duration and Time */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {opportunity.duration}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {opportunity.timeCommitment}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-600">
                      <strong>Start:</strong> {opportunity.date}
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Volunteers */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {opportunity.volunteers}/{opportunity.maxVolunteers} volunteers
                      </div>
                      <div className="text-gray-500">
                        {opportunity.maxVolunteers - opportunity.volunteers} spots left
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(opportunity.volunteers / opportunity.maxVolunteers) * 100}%` }}
                      ></div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full mt-4">Apply to Volunteer</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">
            Create a volunteer profile and get notified when new opportunities match your interests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Volunteer Profile
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Organizations
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
