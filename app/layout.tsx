import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyanmarCares - Connecting Hearts, Changing Lives",
  description:
    "Myanmar's largest platform for NGOs, donors, and volunteers. Join us in making a difference across Myanmar.",
  keywords: "Myanmar, NGO, donation, volunteer, charity, social impact",
  openGraph: {
    title: "MyanmarCares - Connecting Hearts, Changing Lives",
    description: "Myanmar's largest platform for NGOs, donors, and volunteers.",
    url: "https://myanmarcares.org",
    siteName: "MyanmarCares",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyanmarCares Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyanmarCares - Connecting Hearts, Changing Lives",
    description: "Myanmar's largest platform for NGOs, donors, and volunteers.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pyidaungsu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
