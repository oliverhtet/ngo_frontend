"use client"

import type React from "react"
import { use } from 'react';
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MapPin,
  Users,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Globe,
  Facebook,
  Share2,
  Target,
  TrendingUp,

  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Loader2,
  Shield,
  Info,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { apiService } from "@/lib/api" // Your actual apiService instance

// Define the shape of your NGO data after it's transformed from Strapi's 'attributes'
interface Ngo {
  id: number;
  name: string;
  nameMyanmar: string;
  description: string;
  image?: string; // URL of the image
  cause: string;
  location: string;
  verified: boolean;
  raised: number;
  goal: number;
  beneficiaries: string;
}

// Define the shape of the raw Strapi response for a single NGO
interface StrapiNgoResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      nameMyanmar: string;
      description: string;
      image?: { // This structure depends on your Strapi image field setup
        data: {
          attributes: {
            url: string;
          };
        } | null; // It can be null if no image is uploaded
      };
      cause: string;
      location: string;
      verified: boolean;
      raised: number;
      goal: number;
      beneficiaries: string;
      // Other Strapi default fields like createdAt, updatedAt, publishedAt
    };
  } | null; // Data can be null if NGO not found
  meta: {}; // Meta for single entry is often empty or minimal
}

const predefinedAmounts = [5000, 10000, 25000, 50000, 100000, 250000]

// Destructure { documentId } directly from params here
export default function DonatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const resolvedParams = use(params);
  const ngoId = resolvedParams.id;
  const [ngoData, setNgoData] = useState<Ngo | null>(null)
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    anonymous: false,
    newsletter: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const fetchNgoData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Use the destructured documentId directly
      const response: StrapiNgoResponse = await apiService.getNGO(ngoId, "image")

      if (response.data) {
        const attributes = response.data
        setNgoData({
          id: attributes.documentId,
          name: attributes.name,
          nameMyanmar: attributes.nameMyanmar,
          description: attributes.description,
          image: attributes.image?.data?.attributes?.url || "/placeholder.svg",
          cause: attributes.cause,
          location: attributes.location,
          verified: attributes.verified,
          raised: attributes.raised,
          goal: attributes.goal,
          beneficiaries: attributes.beneficiaries,
        })
      } else {
        setError("NGO not found.")
      }
    } catch (err: any) {
      console.error("Error fetching NGO data:", err)
      setError(err.message || "Failed to load NGO details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [ngoId]) // Add documentId to the dependency array directly

  useEffect(() => {
    fetchNgoData()
  }, [fetchNgoData])

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const getFinalAmount = (): string => {
    const final = amount || customAmount;
    return final && !isNaN(Number(final)) ? final : "";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const finalAmount = getFinalAmount()
    if (!finalAmount || Number.parseInt(finalAmount) < 1000) {
      setError("Minimum donation amount is MMK 1,000.")
      setLoading(false)
      return
    }

    if (!paymentMethod) {
      setError("Please select a payment method.")
      setLoading(false)
      return
    }

    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
        setError("Please fill in all required donor information fields (Name, Email, Phone).");
        setLoading(false);
        return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      router.push(`/donate/${ngoData.id}/success?amount=${finalAmount}`)
    } catch (err: any) {
      console.error("Donation submission error:", err);
      setError(err.message || "Donation failed. Please try again.")
      setLoading(false)
    }
  }

  if (loading && !ngoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="ml-3 text-gray-700">Loading NGO details...</p>
      </div>
    )
  }

  if (error && !ngoData && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h2>
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <Button onClick={() => router.push("/ngos")}>Go back to NGOs</Button>
      </div>
    )
  }

  if (!ngoData && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Info className="h-16 w-16 text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">NGO Not Found</h2>
        <p className="text-gray-600 text-center mb-4">The NGO you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/ngos")}>Browse other NGOs</Button>
      </div>
    );
  }

  const progressPercentage = (ngoData!.raised / ngoData!.goal) * 100;

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
                  {ngoData?.campaigns?.map((campaign) => (
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
                  {ngoData?.events?.map((event) => (
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
                  {ngoData?.updates?.map((update) => (
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
                    <span className="text-sm">{ngoData?.contact?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData?.contact?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData?.contact?.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Facebook className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{ngoData?.contact?.facebook}</span>
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
