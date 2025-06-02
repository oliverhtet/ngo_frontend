import { LoginForm } from "@/components/auth/login-form"
import { Heart, Shield, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <Link href="/" className="flex items-center space-x-3 mb-8">
              <Heart className="h-10 w-10 text-white" />
              <div>
                <h1 className="text-2xl font-bold">MyanmarCares</h1>
                <p className="text-blue-100 font-myanmar">မြန်မာ့စာနာမှု</p>
              </div>
            </Link>

            <h2 className="text-4xl font-bold mb-6 leading-tight">Welcome back to our community of changemakers</h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Continue your journey of making a positive impact in Myanmar. Your contributions matter.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Secure and trusted platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Join 10,000+ active members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Impact across all of Myanmar</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-32 w-20 h-20 bg-white/5 rounded-full"></div>
        </div>

        {/* Right Side - Login Form */}
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
            </div>

            <LoginForm />

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
