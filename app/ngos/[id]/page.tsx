import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MapPin,
  Users,
  Calendar,
  Phone,
  Mail,
  Globe,
  Facebook,
  Share2,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data - in real app this would come from API
const ngosData = {
  "1": {
    id: 1,
    name: "Myanmar Education Foundation",
    nameMyanmar: "မြန်မာပညာရေးဖောင်ဒေးရှင်း",
    description: "Providing quality education to underprivileged children across Myanmar",
    longDescription:
      "The Myanmar Education Foundation has been working tirelessly since 2015 to ensure that every child in Myanmar has access to quality education. We believe that education is the key to breaking the cycle of poverty and building a brighter future for our nation.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Education",
    location: "Yangon",
    verified: true,
    founded: "2015",
    raised: "2,500,000",
    goal: "5,000,000",
    volunteers: 45,
    events: 8,
    beneficiaries: "12,000+",
    contact: {
      phone: "+95 9 123 456 789",
      email: "info@myanmareducation.org",
      website: "www.myanmareducation.org",
      facebook: "MyanmarEducationFoundation",
    },
    campaigns: [
      {
        id: 1,
        title: "School Building Project",
        description: "Building new classrooms in rural areas",
        raised: 1200000,
        goal: 2000000,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Teacher Training Program",
        description: "Training local teachers with modern methods",
        raised: 800000,
        goal: 1500000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Education Fair 2024",
        date: "March 15, 2024",
        location: "Yangon Convention Center",
        volunteers: 25,
      },
      {
        id: 2,
        title: "Book Donation Drive",
        date: "March 22, 2024",
        location: "Various locations",
        volunteers: 15,
      },
    ],
    updates: [
      {
        id: 1,
        title: "New School Opened in Shan State",
        date: "February 28, 2024",
        content: "We're excited to announce the opening of our 15th school, serving 200 children in a remote village.",
      },
      {
        id: 2,
        title: "Teacher Training Graduation",
        date: "February 15, 2024",
        content:
          "30 new teachers completed our intensive training program and are now ready to serve their communities.",
      },
    ],
  },
  "2": {
    id: 2,
    name: "Clean Water Initiative",
    nameMyanmar: "သန့်ရှင်းသောရေစီမံကိန်း",
    description: "Building wells and water systems in rural communities",
    longDescription:
      "Clean Water Initiative has been providing access to clean, safe drinking water to rural communities across Myanmar since 2018. We focus on sustainable solutions that communities can maintain themselves.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Water & Sanitation",
    location: "Mandalay",
    verified: true,
    founded: "2018",
    raised: "1,800,000",
    goal: "3,000,000",
    volunteers: 32,
    events: 5,
    beneficiaries: "8,500+",
    contact: {
      phone: "+95 9 234 567 890",
      email: "info@cleanwatermyanmar.org",
      website: "www.cleanwatermyanmar.org",
      facebook: "CleanWaterMyanmar",
    },
    campaigns: [
      {
        id: 1,
        title: "Village Well Project",
        description: "Drilling wells in 20 villages",
        raised: 900000,
        goal: 1500000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Water System Training",
        date: "March 18, 2024",
        location: "Mandalay Community Center",
        volunteers: 12,
      },
    ],
    updates: [
      {
        id: 1,
        title: "10 New Wells Completed",
        date: "February 25, 2024",
        content: "We successfully completed 10 new wells, providing clean water access to over 2,000 people.",
      },
    ],
  },
  "3": {
    id: 3,
    name: "Healthcare for All",
    nameMyanmar: "လူတိုင်းအတွက်ကျန်းမာရေး",
    description: "Mobile clinics serving remote villages",
    longDescription:
      "Healthcare for All operates mobile medical clinics that reach the most remote areas of Myanmar, providing essential healthcare services to underserved communities since 2017.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Healthcare",
    location: "Shan State",
    verified: true,
    founded: "2017",
    raised: "950,000",
    goal: "2,000,000",
    volunteers: 28,
    events: 12,
    beneficiaries: "15,000+",
    contact: {
      phone: "+95 9 345 678 901",
      email: "info@healthcareforall.org",
      website: "www.healthcareforall.org",
      facebook: "HealthcareForAllMyanmar",
    },
    campaigns: [
      {
        id: 1,
        title: "Mobile Clinic Expansion",
        description: "Adding 3 new mobile clinics",
        raised: 600000,
        goal: 1200000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Medical Camp - Shan State",
        date: "March 20, 2024",
        location: "Remote villages",
        volunteers: 15,
      },
    ],
    updates: [
      {
        id: 1,
        title: "New Medical Equipment Arrived",
        date: "February 20, 2024",
        content: "Our mobile clinics are now equipped with advanced diagnostic equipment to better serve patients.",
      },
    ],
  },
  "4": {
    id: 4,
    name: "Environmental Protection Myanmar",
    nameMyanmar: "မြန်မာပတ်ဝန်းကျင်ကာကွယ်ရေး",
    description: "Protecting forests and wildlife conservation",
    longDescription:
      "Environmental Protection Myanmar is dedicated to preserving Myanmar's natural heritage through forest conservation, wildlife protection, and environmental education programs.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Environment",
    location: "Bagan",
    verified: true,
    founded: "2019",
    raised: "750,000",
    goal: "1,500,000",
    volunteers: 18,
    events: 6,
    beneficiaries: "5,000+",
    contact: {
      phone: "+95 9 456 789 012",
      email: "info@environmentmyanmar.org",
      website: "www.environmentmyanmar.org",
      facebook: "EnvironmentMyanmar",
    },
    campaigns: [
      {
        id: 1,
        title: "Forest Restoration",
        description: "Replanting native trees in degraded areas",
        raised: 400000,
        goal: 800000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Tree Planting Day",
        date: "March 30, 2024",
        location: "Bagan Forest Reserve",
        volunteers: 50,
      },
    ],
    updates: [
      {
        id: 1,
        title: "1000 Trees Planted",
        date: "February 15, 2024",
        content: "Volunteers helped us plant 1000 native trees in the Bagan area, contributing to forest restoration.",
      },
    ],
  },
  "5": {
    id: 5,
    name: "Women Empowerment Network",
    nameMyanmar: "အမျိုးသမီးများ စွမ်းဆောင်ရည်မြှင့်တင်ရေး",
    description: "Supporting women's rights and economic independence",
    longDescription:
      "Women Empowerment Network works to advance women's rights and economic opportunities in Myanmar through skills training, microfinance programs, and advocacy initiatives.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Women's Rights",
    location: "Yangon",
    verified: false,
    founded: "2020",
    raised: "420,000",
    goal: "800,000",
    volunteers: 22,
    events: 4,
    beneficiaries: "3,200+",
    contact: {
      phone: "+95 9 567 890 123",
      email: "info@womenempowerment.org",
      website: "www.womenempowerment.org",
      facebook: "WomenEmpowermentMyanmar",
    },
    campaigns: [
      {
        id: 1,
        title: "Skills Training Program",
        description: "Vocational training for women entrepreneurs",
        raised: 250000,
        goal: 500000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Women's Leadership Workshop",
        date: "April 5, 2024",
        location: "Yangon Business Center",
        volunteers: 8,
      },
    ],
    updates: [
      {
        id: 1,
        title: "50 Women Complete Training",
        date: "February 10, 2024",
        content: "Our latest cohort of 50 women successfully completed the entrepreneurship training program.",
      },
    ],
  },
  "6": {
    id: 6,
    name: "Child Nutrition Program",
    nameMyanmar: "ကလေးငယ်များအာဟာရပြည့်ဝရေး",
    description: "Fighting malnutrition in rural communities",
    longDescription:
      "Child Nutrition Program addresses malnutrition among children in rural Myanmar through feeding programs, nutrition education, and community health initiatives.",
    image: "/placeholder.svg?height=400&width=800",
    cause: "Child Welfare",
    location: "Ayeyarwady",
    verified: true,
    founded: "2016",
    raised: "1,200,000",
    goal: "2,200,000",
    volunteers: 35,
    events: 9,
    beneficiaries: "6,800+",
    contact: {
      phone: "+95 9 678 901 234",
      email: "info@childnutrition.org",
      website: "www.childnutrition.org",
      facebook: "ChildNutritionMyanmar",
    },
    campaigns: [
      {
        id: 1,
        title: "School Feeding Program",
        description: "Providing nutritious meals to school children",
        raised: 700000,
        goal: 1200000,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    events: [
      {
        id: 1,
        title: "Nutrition Education Workshop",
        date: "March 25, 2024",
        location: "Ayeyarwady Community Centers",
        volunteers: 20,
      },
    ],
    updates: [
      {
        id: 1,
        title: "New Feeding Center Opened",
        date: "February 5, 2024",
        content: "We opened our 8th feeding center, now serving nutritious meals to 500 children daily.",
      },
    ],
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function NGODetailPage({ params }: PageProps) {
  const ngoData = ngosData[params.id as keyof typeof ngosData]

  if (!ngoData) {
    notFound()
  }

  const progressPercentage =
    (Number.parseInt(ngoData.raised.replace(/,/g, "")) / Number.parseInt(ngoData.goal.replace(/,/g, ""))) * 100

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

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img
                src={ngoData.image || "/placeholder.svg"}
                alt={ngoData.name}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{ngoData.name}</h1>
                  {ngoData.verified && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 font-myanmar mb-4">{ngoData.nameMyanmar}</p>
                <Badge variant="secondary" className="mb-4">
                  {ngoData.cause}
                </Badge>
                <p className="text-gray-700">{ngoData.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {ngoData.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Founded in {ngoData.founded}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {ngoData.beneficiaries} people helped
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/donate/${ngoData.id}`}>
                  <Button className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Now
                  </Button>
                </Link>
                <Button variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{ngoData.longDescription}</p>
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">15</div>
                          <div className="text-sm text-gray-600">Projects Completed</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-600">{ngoData.volunteers}</div>
                          <div className="text-sm text-gray-600">Active Volunteers</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-purple-600">{ngoData.beneficiaries}</div>
                          <div className="text-sm text-gray-600">People Helped</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="campaigns" className="space-y-6">
                  {ngoData.campaigns.map((campaign) => (
                    <Card key={campaign.id}>
                      <div className="md:flex">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full md:w-48 h-48 object-cover"
                        />
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                          <p className="text-gray-600 mb-4">{campaign.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Raised: ₹{campaign.raised.toLocaleString()}</span>
                              <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
                            </div>
                            <Progress value={(campaign.raised / campaign.goal) * 100} />
                          </div>
                          <Button className="mt-4">Support This Campaign</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="events" className="space-y-4">
                  {ngoData.events.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-gray-600 mb-2">{event.location}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Users className="h-4 w-4 mr-1" />
                              {event.volunteers} volunteers needed
                            </div>
                          </div>
                          <Button size="sm">Join Event</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="updates" className="space-y-4">
                  {ngoData.updates.map((update) => (
                    <Card key={update.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{update.title}</h3>
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <p className="text-gray-700">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Fundraising Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Raised</span>
                        <span>₹{ngoData.raised}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Goal</span>
                        <span>₹{ngoData.goal}</span>
                      </div>
                      <Progress value={progressPercentage} className="mb-2" />
                      <div className="text-center text-sm text-gray-600">
                        {progressPercentage.toFixed(1)}% of goal reached
                      </div>
                    </div>
                    <Link href={`/donate/${ngoData.id}`}>
                      <Button className="w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Donate Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData.contact.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Facebook className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData.contact.facebook}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Volunteers</span>
                    <span className="font-semibold">{ngoData.volunteers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-semibold">{ngoData.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">People Helped</span>
                    <span className="font-semibold">{ngoData.beneficiaries}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
