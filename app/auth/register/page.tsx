import { RegisterForm } from "@/components/auth/register-form"
import { Heart, Target, Handshake, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <Link href="/" className="flex items-center space-x-3 mb-8">
              <Heart className="h-10 w-10 text-white" />
              <div>
                <h1 className="text-2xl font-bold">MyanmarCares</h1>
                <p className="text-green-100 font-myanmar">မြန်မာ့စာနာမှု</p>
              </div>
            </Link>

            <h2 className="text-4xl font-bold mb-6 leading-tight">Join Myanmar's largest community for social good</h2>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Whether you want to donate, volunteer, or represent an NGO, start making a difference today.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Target className="h-6 w-6 text-green-200 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-100">Make Real Impact</h3>
                  <p className="text-green-200 text-sm">Your contributions directly help communities across Myanmar</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Handshake className="h-6 w-6 text-green-200 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-100">Connect & Collaborate</h3>
                  <p className="text-green-200 text-sm">Join a network of passionate changemakers and organizations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <TrendingUp className="h-6 w-6 text-green-200 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-100">Track Your Impact</h3>
                  <p className="text-green-200 text-sm">
                    See exactly how your time and donations create positive change
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">Trusted Platform</span>
              </div>
              <p className="text-green-100 text-sm">
                "MyanmarCares has helped us reach more donors and volunteers than ever before. It's been a game-changer
                for our organization."
              </p>
              <p className="text-green-200 text-xs mt-2">- Thant Zin, Education Foundation Myanmar</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-32 w-20 h-20 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rounded-full"></div>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-red-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MyanmarCares</h1>
                  <p className="text-sm text-gray-600 font-myanmar">မြန်မာ့စာနာမှု</p>
                </div>
              </Link>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-green-800">
                  🎉 Join over <strong>10,000 members</strong> who are already making a difference!
                </p>
              </div>
            </div>

            <RegisterForm />

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-2">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <Link href="/help" className="hover:text-gray-700">
                  Help
                </Link>
                <Link href="/privacy" className="hover:text-gray-700">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-gray-700">
                  Terms
                </Link>
              </div>
              <p className="text-xs text-gray-400">© 2024 MyanmarCares. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
