"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, ArrowLeft, Share2, Download, Copy } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function DonationSuccessPage({ params }: { params: { ngoId: string } }) {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "0"
  const [ngoName, setNgoName] = useState("the organization")
  const [copied, setCopied] = useState(false)
  const transactionId = `DON-${Math.floor(Math.random() * 1000000)}`
  const donationDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    // In a real app, fetch the NGO details
    const fetchNgoDetails = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const ngoNames: Record<string, string> = {
        "1": "Myanmar Education Foundation",
        "2": "Clean Water Initiative",
        "3": "Healthcare for All",
        "4": "Environmental Protection Myanmar",
        "5": "Women Empowerment Network",
        "6": "Child Nutrition Program",
      }

      setNgoName(ngoNames[params.ngoId] || "the organization")
    }

    fetchNgoDetails()
  }, [params.ngoId])

  const handleCopyReceipt = () => {
    const receiptText = `
      Donation Receipt
      Transaction ID: ${transactionId}
      Date: ${donationDate}
      Amount: ₹${Number(amount).toLocaleString()}
      Organization: ${ngoName}
      
      Thank you for your generous donation!
    `
    navigator.clipboard.writeText(receiptText.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Donation!</h1>
            <p className="text-xl text-gray-600">
              Your generosity will make a real difference in the lives of those we serve.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Donation Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{donationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-lg text-green-600">₹{Number(amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{ngoName}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={handleCopyReceipt}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy Receipt"}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Track Your Impact</h3>
                <p className="text-gray-600">
                  We'll send you updates on how your donation is making a difference. You can also visit the
                  organization's page to see their progress.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Tax Receipt</h3>
                <p className="text-gray-600">
                  A tax receipt has been sent to your email. If you don't receive it within 24 hours, please contact us.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Ways to Stay Involved</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href={`/ngos/${params.ngoId}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4 text-red-600" />
                      Follow {ngoName}
                    </Button>
                  </Link>
                  <Link href="/volunteer" className="w-full">
                    <Button variant="outline" className="w-full">
                      Volunteer Opportunities
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
