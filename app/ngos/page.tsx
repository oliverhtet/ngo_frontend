"use client"

import { useEffect, useState, useCallback } from "react" // Import useCallback
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Filter, Users, Calendar, Loader2 } from "lucide-react" // Add Loader2 icon
import Link from "next/link"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination" // Assuming you have pagination components
import { apiService } from "@/lib/api" // Import your apiService
import type { NGO } from "@/lib/types" // Assuming you have a type defined for NGO in lib/types.ts

// --- Static filter options (can be fetched from API if dynamic) ---
const causes = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Water & Sanitation",
  "Women's Rights",
  "Child Welfare",
  // Add other causes as needed
]
const locations = [
  "All",
  "Yangon",
  "Mandalay",
  "Shan State",
  "Bagan",
  "Ayeyarwady",
  // Add other locations as needed
]

export default function NGOsPage() {
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const [ngos, setNGOs] = useState<NGO[]>([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // State to store fetch errors

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCause, setSelectedCause] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) 
  const [pageCount, setPageCount] = useState(1)     
  const [totalNgos, setTotalNgos] = useState(0)     

  const pageSize = 6; // Define your page size

  // --- Data Fetching Logic ---
  // Using useCallback to memoize the fetch function. This is essential for
  // `useEffect` to correctly track dependencies without infinite loops.
  const fetchNgos = useCallback(async () => {
    setLoading(true)
    setError(null) // Clear previous errors on new fetch attempt

    try {
      // Build the filters object based on current state
      const filters: { [key: string]: any } = {}
      if (searchTerm) {
        // Assuming your API's getNGOs takes `filters.name` for search
        // and applies a `$containsi` logic for `name` or `description`.
        // If your API supports a generic `_q` for global search, you might use that instead.
        filters.name = searchTerm // This will translate to filters[name][$containsi]
        // If you need to explicitly filter by description as well:
        // filters.description = searchTerm;
      }
      if (selectedCause !== "All") {
        filters.cause = selectedCause
      }
      if (selectedLocation !== "All") {
        filters.location = selectedLocation
      }
      if (verifiedOnly) {
        filters.verified = true // Send true boolean for verified
      }

      const response = await apiService.getNGOs({
        page: currentPage,
        pageSize: pageSize,
        filters: filters, 
        sort: "name:asc", 
        populate: "image", 
      }) as {
        data: any[];
        meta: {
          pagination: {
            pageCount: number;
            total: number;
          };
        };
      };
console.log("API Response:", response); // Debugging log to check API response structure
      // Transform the data to match your component's expected structure
      // Strapi's API typically returns data nested under `data` and `attributes`
      // const transformedData: NGO[] = response.data.map((item: any) => ({
      //   id: item.id,
      //   name: item.name,
      //   nameMyanmar: item.nameMyanmar,
      //   description: item.description,
      //   // Safely access image URL, provide fallback if not found
      //   image: item.image?.url || "/placeholder.svg?height=200&width=300",
      //   cause: item.cause,
      //   location: item.location,
      //   verified: item.verified,
      //   raised: item.raised,
      //   goal: item.goal,
      //   volunteers: item.volunteers,
      //   events: item.events,
      //   documentId: item.documentId, 
      // }))

      setNGOs(response.data)
      setPageCount(response.meta.pagination.pageCount)
      setTotalNgos(response.meta.pagination.total)

    } catch (error) {
      console.error("Failed to fetch NGOs:", error)
      setError("Failed to load NGOs. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedCause, selectedLocation, verifiedOnly, currentPage]) // Dependencies for useCallback

 
  useEffect(() => {
    fetchNgos()
  }, [fetchNgos]) 
  useEffect(() => {
    if (currentPage !== 1) { 
      setCurrentPage(1);
    }
  }, [searchTerm, selectedCause, selectedLocation, verifiedOnly]);

  
  if (loading && ngos.length === 0) { 
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organizations...</p>
        </div>
      </div>
    )
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

      {/* Header */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover NGOs</h1>
          <p className="text-xl text-gray-600 mb-8">Find verified organizations making a difference in Myanmar</p>

          {/* Search and Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search NGOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cause" />
                </SelectTrigger>
                <SelectContent>
                  {causes.map((cause) => (
                    <SelectItem key={cause} value={cause}>
                      {cause}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={verifiedOnly ? "default" : "outline"}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Verified Only
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              {loading && ngos.length > 0 ? ( // Show inline loader if already has data
                <span className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating results...
                </span>
              ) : (
                `Showing ${ngos.length} of ${totalNgos} organizations`
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NGO Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {error ? (
            <div className="text-center py-12 text-red-600">
              <p>{error}</p>
            </div>
          ) : ngos.length === 0 && !loading ? (
            // Display 'No NGOs found' if no results and not currently loading
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No NGOs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ngos.map((ngo) => (
                  <Card key={ngo.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      {/* Use optional chaining for image to prevent errors if image data is missing */}
                      <img src={ngo.image?.url
                      ? `${API_URL}${ngo.image.url}`
                      : "/placeholder.svg?height=200&width=400"} alt={ngo.name} className="w-full h-48 object-cover" />
                      {ngo.verified && <Badge className="absolute top-3 right-3 bg-green-600">Verified</Badge>}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{ngo.name}</CardTitle>
                          <p className="text-sm text-gray-600 font-myanmar mb-2">{ngo.nameMyanmar}</p>
                          <Badge variant="secondary" className="mb-2">
                            {ngo.cause}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{ngo.description}</CardDescription>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {ngo.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            {/* Parse string to number and format as Indian Rupee */}
                            <span>Raised: ₹{Number.parseInt(ngo.raised).toLocaleString('en-IN')}</span>
                            <span>Goal: ₹{Number.parseInt(ngo.goal).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(Number.parseInt(String(ngo.raised)) / Number.parseInt(String(ngo.goal))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {ngo.volunteers} volunteers
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {ngo.events} events
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link href={`/donate/${ngo.documentId}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              Donate Now
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/ngos/${ngo.documentId}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pageCount > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className="mx-1"
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                        className={currentPage === pageCount ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}