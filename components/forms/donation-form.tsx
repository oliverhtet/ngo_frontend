"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, CreditCard, Smartphone, Building, Loader2, Shield, Info } from "lucide-react"

interface DonationFormProps {
  ngoId: string
  campaignId?: string
  onSuccess?: () => void
}

const predefinedAmounts = [5000, 10000, 25000, 50000, 100000, 250000]

export function DonationForm({ ngoId, campaignId, onSuccess }: DonationFormProps) {
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
        ngo: ngoId,
        campaign: campaignId,
        donorInfo,
      })

      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Donation failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
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
                  onCheckedChange={(checked) => setDonorInfo((prev) => ({ ...prev, anonymous: checked as boolean }))}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={donorInfo.newsletter}
                  onCheckedChange={(checked) => setDonorInfo((prev) => ({ ...prev, newsletter: checked as boolean }))}
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
  )
}
