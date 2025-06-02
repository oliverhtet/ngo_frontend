import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
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

      {/* Not Found Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 text-gray-400">
                <Search className="h-16 w-16" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">NGO Not Found</CardTitle>
              <p className="text-gray-600">
                The organization you're looking for doesn't exist or may have been removed.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/ngos">
                    <Search className="mr-2 h-4 w-4" />
                    Browse All NGOs
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Looking for a specific organization? Try searching our directory or contact us for help.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
