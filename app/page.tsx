import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, TrendingUp, ArrowRight, Search, MapPin } from "lucide-react"
import Link from "next/link"

const featuredNGOs = [
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
  },
]

const impactStats = [
  { icon: Heart, label: "Lives Impacted", value: "50,000+", color: "text-red-600" },
  { icon: Users, label: "Active NGOs", value: "150+", color: "text-blue-600" },
  { icon: Calendar, label: "Events This Month", value: "25", color: "text-green-600" },
  { icon: TrendingUp, label: "Funds Raised", value: "₹15M+", color: "text-purple-600" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MyanmarCares</h1>
                <p className="text-xs text-gray-600">မြန်မာ့စာနာမှု</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/ngos" className="text-gray-700 hover:text-blue-600">
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
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Connecting Hearts, <span className="text-blue-600">Changing Lives</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">Join Myanmar's largest platform for NGOs, donors, and volunteers</p>
          <p className="text-lg text-gray-500 mb-8 font-myanmar">
            မြန်မာနိုင်ငံ၏ အကြီးဆုံး NGO၊ လှူဒါန်းရှင်နှင့် စေတနာ့ဝန်ထမ်းများအတွက် ပလပ်ဖောင်း
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Find NGOs
            </Button>
            <Button size="lg" variant="outline">
              <Users className="mr-2 h-5 w-5" />
              Volunteer Now
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NGOs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Organizations</h2>
            <p className="text-gray-600">Discover verified NGOs making a real impact in Myanmar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNGOs.map((ngo) => (
              <Card key={ngo.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={ngo.image || "/placeholder.svg"} alt={ngo.name} className="w-full h-48 object-cover" />
                  {ngo.verified && <Badge className="absolute top-3 right-3 bg-green-600">Verified</Badge>}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{ngo.name}</CardTitle>
                      <p className="text-sm text-gray-600 font-myanmar">{ngo.nameMyanmar}</p>
                    </div>
                    <Badge variant="secondary">{ngo.cause}</Badge>
                  </div>
                  <CardDescription className="text-sm">{ngo.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {ngo.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
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
                    <div className="flex gap-2">
                      <Link href={`/donate/${ngo.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          Donate Now
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/ngos/${ngo.id}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/ngos">
                View All NGOs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How MyanmarCares Works</h2>
            <p className="text-gray-600">Simple steps to make a difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover</h3>
                <p className="text-gray-600">Browse verified NGOs and causes that matter to you</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p className="text-gray-600">Donate securely or volunteer your time and skills</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Impact</h3>
                <p className="text-gray-600">See how your contributions are making a real difference</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of people already making Myanmar a better place</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Register Your NGO
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Start Volunteering
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-600" />
                <span className="text-lg font-bold">MyanmarCares</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting hearts and changing lives across Myanmar through the power of community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For NGOs</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Register Organization
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Manage Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Supporters</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Find NGOs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MyanmarCares. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
