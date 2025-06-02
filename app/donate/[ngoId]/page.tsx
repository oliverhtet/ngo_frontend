"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Loader2,
  Shield,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data - in real app this would come from API
const ngosData = {
  "1": {
    id: 1,
    name: "Myanmar Education Foundation",
    nameMyanmar: "မြန်မာပညာရေးဖောင်ဒေးရှင်း",
    description: "Providing quality education to underprivileged children across Myanmar",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Education",
    location: "Yangon",
    verified: true,
    raised: "2,500,000",
    goal: "5,000,000",
    beneficiaries: "12,000+",
  },
  "2": {
    id: 2,
    name: "Clean Water Initiative",
    nameMyanmar: "သန့်ရှင်းသောရေစီမံကိန်း",
    description: "Building wells and water systems in rural communities",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Water & Sanitation",
    location: "Mandalay",
    verified: true,
    raised: "1,800,000",
    goal: "3,000,000",
    beneficiaries: "8,500+",
  },
  "3": {
    id: 3,
    name: "Healthcare for All",
    nameMyanmar: "လူတိုင်းအတွက်ကျန်းမာရေး",
    description: "Mobile clinics serving remote villages",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Healthcare",
    location: "Shan State",
    verified: true,
    raised: "950,000",
    goal: "2,000,000",
    beneficiaries: "15,000+",
  },
  "4": {
    id: 4,
    name: "Environmental Protection Myanmar",
    nameMyanmar: "မြန်မာပတ်ဝန်းကျင်ကာကွယ်ရေး",
    description: "Protecting forests and wildlife conservation",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Environment",
    location: "Bagan",
    verified: true,
    raised: "750,000",
    goal: "1,500,000",
    beneficiaries: "5,000+",
  },
  "5": {
    id: 5,
    name: "Women Empowerment Network",
    nameMyanmar: "အမျိုးသမီးများ စွမ်းဆောင်ရည်မြှင့်တင်ရေး",
    description: "Supporting women's rights and economic independence",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Women's Rights",
    location: "Yangon",
    verified: false,
    raised: "420,000",
    goal: "800,000",
    beneficiaries: "3,200+",
  },
  "6": {
    id: 6,
    name: "Child Nutrition Program",
    nameMyanmar: "ကလေးငယ်များအာဟာရပြည့်ဝရေး",
    description: "Fighting malnutrition in rural communities",
    image: "/placeholder.svg?height=300&width=400",
    cause: "Child Welfare",
    location: "Ayeyarwady",
    verified: true,
    raised: "1,200,000",
    goal: "2,200,000",
    beneficiaries: "6,800+",
  },
}

const predefinedAmounts = [5000, 10000, 25000, 50000, 100000, 250000]

export default function DonatePage({ params }: { params: { ngoId: string } }) {
  const router = useRouter()
  const [ngoData, setNgoData] = useState<any>(null)
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const data = ngosData[params.ngoId as keyof typeof ngosData]
    if (data) {
      setNgoData(data)
    } else {
      // Handle not found
      router.push("/ngos")
    }
  }, [params.ngoId, router])

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const getFinalAmount = () => {
    return amount || customAmount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const finalAmount = getFinalAmount()
    if (!finalAmount || Number.parseInt(finalAmount) < 1000) {
      setError("Minimum donation amount is ₹1,000")
      setLoading(false)
      return
    }

    if (!paymentMethod) {
      setError("Please select a payment method")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation, this would call the API
      console.log("Donation data:", {
        amount: Number.parseInt(finalAmount),
        currency: "MMK",
        paymentMethod,
        ngo: params.ngoId,
        donorInfo,
      })

      setSuccess(true)
      // Redirect to success page
      router.push(`/donate/${params.ngoId}/success?amount=${finalAmount}`)
    } catch (err: any) {
      setError(err.message || "Donation failed. Please try again.")
      setLoading(false)
    }
  }

  if (!ngoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
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
            <div className="flex items-center space-x-3">
              <Link href={`/ngos/${params.ngoId}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to NGO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* NGO Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-2xl">{ngoData.name}</CardTitle>
                  {ngoData.verified && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 font-myanmar">{ngoData.nameMyanmar}</p>
              </CardHeader>
              <CardContent>
                <img
                  src={ngoData.image || "/placeholder.svg"}
                  alt={ngoData.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 mb-4">{ngoData.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {ngoData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {ngoData.beneficiaries} people helped
                  </div>
                  <Badge variant="secondary">{ngoData.cause}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Fundraising Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Fundraising Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Raised</span>
                      <span className="font-semibold">₹{ngoData.raised}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Goal</span>
                      <span className="font-semibold">₹{ngoData.goal}</span>
                    </div>
                    <Progress value={progressPercentage} className="mb-2" />
                    <div className="text-center text-sm text-gray-600">
                      {progressPercentage.toFixed(1)}% of goal reached
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">₹10,000 can provide:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• School supplies for 20 children</li>
                      <li>• Books and learning materials</li>
                      <li>• Basic educational resources</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">₹25,000 can provide:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Teacher training for 1 month</li>
                      <li>• Classroom equipment</li>
                      <li>• Educational technology tools</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">₹50,000 can provide:</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Complete classroom setup</li>
                      <li>• Learning materials for 100 students</li>
                      <li>• Teacher salaries for 2 months</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Your contribution will directly support this organization's mission and help create positive change.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Amount Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Select Donation Amount (MMK)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {predefinedAmounts.map((amt) => (
                        <Button
                          key={amt}
                          type="button"
                          variant={amount === amt.toString() ? "default" : "outline"}
                          onClick={() => handleAmountSelect(amt.toString())}
                          className="h-12 text-sm font-medium"
                        >
                          ₹{amt.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customAmount">Or enter custom amount</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Enter amount (minimum ₹1,000)"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        min="1000"
                        className="text-lg"
                      />
                    </div>
                    {getFinalAmount() && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-medium">
                          Total Donation: ₹{Number.parseInt(getFinalAmount()).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Choose Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="kbzpay" id="kbzpay" />
                          <Label htmlFor="kbzpay" className="flex items-center cursor-pointer flex-1">
                            <Smartphone className="mr-3 h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">KBZ Pay</div>
                              <div className="text-sm text-gray-500">Mobile wallet payment</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="wavemoney" id="wavemoney" />
                          <Label htmlFor="wavemoney" className="flex items-center cursor-pointer flex-1">
                            <Smartphone className="mr-3 h-5 w-5 text-purple-600" />
                            <div>
                              <div className="font-medium">Wave Money</div>
                              <div className="text-sm text-gray-500">Digital payment platform</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer flex-1">
                            <Building className="mr-3 h-5 w-5 text-green-600" />
                            <div>
                              <div className="font-medium">Bank Transfer</div>
                              <div className="text-sm text-gray-500">Direct bank transfer</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                            <CreditCard className="mr-3 h-5 w-5 text-orange-600" />
                            <div>
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-gray-500">Visa, Mastercard accepted</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Donor Information</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo((prev) => ({ ...prev, name: e.target.value }))}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo((prev) => ({ ...prev, email: e.target.value }))}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                        placeholder="+95 9 XXX XXX XXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message of Support (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Leave a message of encouragement for the organization..."
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo((prev) => ({ ...prev, message: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={donorInfo.anonymous}
                          onCheckedChange={(checked) =>
                            setDonorInfo((prev) => ({ ...prev, anonymous: checked as boolean }))
                          }
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Make this donation anonymous
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={donorInfo.newsletter}
                          onCheckedChange={(checked) =>
                            setDonorInfo((prev) => ({ ...prev, newsletter: checked as boolean }))
                          }
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to updates about this organization's impact
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">Secure Payment</p>
                      <p>Your payment information is encrypted and secure. We never store your payment details.</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold"
                    disabled={loading || !paymentMethod || !getFinalAmount()}
                  >
                    {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {loading
                      ? "Processing..."
                      : `Donate ₹${getFinalAmount() ? Number.parseInt(getFinalAmount()).toLocaleString() : "0"}`}
                  </Button>

                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <Info className="h-3 w-3" />
                    <span>By donating, you agree to our terms and privacy policy</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
