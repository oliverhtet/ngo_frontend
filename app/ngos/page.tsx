"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Filter, Users, Calendar } from "lucide-react"
import Link from "next/link"

const ngos = [
  {
    id: 1,
    name: "Myanmar Education Foundation",
    nameMyanmar: "မြန်မာပညာရေးဖောင်ဒေးရှင်း",
    description: "Providing quality education to underprivileged children across Myanmar",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Education",
    location: "Yangon",
    verified: true,
    raised: "2,500,000",
    goal: "5,000,000",
    volunteers: 45,
    events: 8,
  },
  {
    id: 2,
    name: "Clean Water Initiative",
    nameMyanmar: "သန့်ရှင်းသောရေစီမံကိန်း",
    description: "Building wells and water systems in rural communities",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Water & Sanitation",
    location: "Mandalay",
    verified: true,
    raised: "1,800,000",
    goal: "3,000,000",
    volunteers: 32,
    events: 5,
  },
  {
    id: 3,
    name: "Healthcare for All",
    nameMyanmar: "လူတိုင်းအတွက်ကျန်းမာရေး",
    description: "Mobile clinics serving remote villages",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Healthcare",
    location: "Shan State",
    verified: true,
    raised: "950,000",
    goal: "2,000,000",
    volunteers: 28,
    events: 12,
  },
  {
    id: 4,
    name: "Environmental Protection Myanmar",
    nameMyanmar: "မြန်မာပတ်ဝန်းကျင်ကာကွယ်ရေး",
    description: "Protecting forests and wildlife conservation",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Environment",
    location: "Bagan",
    verified: true,
    raised: "750,000",
    goal: "1,500,000",
    volunteers: 18,
    events: 6,
  },
  {
    id: 5,
    name: "Women Empowerment Network",
    nameMyanmar: "အမျိုးသမီးများ စွမ်းဆောင်ရည်မြှင့်တင်ရေး",
    description: "Supporting women's rights and economic independence",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Women's Rights",
    location: "Yangon",
    verified: false,
    raised: "420,000",
    goal: "800,000",
    volunteers: 22,
    events: 4,
  },
  {
    id: 6,
    name: "Child Nutrition Program",
    nameMyanmar: "ကလေးငယ်များအာဟာရပြည့်ဝရေး",
    description: "Fighting malnutrition in rural communities",
    image: "/placeholder.svg?height=200&width=300",
    cause: "Child Welfare",
    location: "Ayeyarwady",
    verified: true,
    raised: "1,200,000",
    goal: "2,200,000",
    volunteers: 35,
    events: 9,
  },
]

const causes = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Water & Sanitation",
  "Women's Rights",
  "Child Welfare",
]
const locations = ["All", "Yangon", "Mandalay", "Shan State", "Bagan", "Ayeyarwady"]

export default function NGOsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCause, setSelectedCause] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch =
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCause = selectedCause === "All" || ngo.cause === selectedCause
    const matchesLocation = selectedLocation === "All" || ngo.location === selectedLocation
    const matchesVerified = !verifiedOnly || ngo.verified

    return matchesSearch && matchesCause && matchesLocation && matchesVerified
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
              <Link href="/ngos" className="text-blue-600 font-medium">
                NGOs
              </Link>
              <Link href="/volunteer" className="text-gray-700 hover:text-blue-600">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover NGOs</h1>
          <p className="text-xl text-gray-600 mb-8">Find verified organizations making a difference in Myanmar</p>

          {/* Search and Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search NGOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cause" />
                </SelectTrigger>
                <SelectContent>
                  {causes.map((cause) => (
                    <SelectItem key={cause} value={cause}>
                      {cause}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={verifiedOnly ? "default" : "outline"}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Verified Only
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredNGOs.length} of {ngos.length} organizations
            </div>
          </div>
        </div>
      </section>

      {/* NGO Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNGOs.map((ngo) => (
              <Card key={ngo.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={ngo.image || "/placeholder.svg"} alt={ngo.name} className="w-full h-48 object-cover" />
                  {ngo.verified && <Badge className="absolute top-3 right-3 bg-green-600">Verified</Badge>}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{ngo.name}</CardTitle>
                      <p className="text-sm text-gray-600 font-myanmar mb-2">{ngo.nameMyanmar}</p>
                      <Badge variant="secondary" className="mb-2">
                        {ngo.cause}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{ngo.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {ngo.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Raised: ₹{ngo.raised}</span>
                        <span>Goal: ₹{ngo.goal}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(Number.parseInt(ngo.raised.replace(/,/g, "")) / Number.parseInt(ngo.goal.replace(/,/g, ""))) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {ngo.volunteers} volunteers
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {ngo.events} events
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link href={`/donate/${ngo.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          Donate Now
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/ngos/${ngo.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNGOs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No NGOs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
