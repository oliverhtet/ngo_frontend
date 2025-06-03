"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Clock, Users, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

import { apiService } from "@/lib/api" 


interface Opportunity {
  id: number;
  title: string;
  organization: string;
  description: string;
  location: string;
  type: string;
  duration: string;
  timeCommitment: string;
  skills: string[];
  volunteersRegistered: number;
  volunteersNeeded: number;
  date: string;
  urgent: boolean;
}

const types = ["All", "On-site", "Remote", "Hybrid"]
const durations = ["All", "1 day", "1 week", "1 month", "2 months", "3 months", "6 months"]
const skills = ["All", "Teaching", "Healthcare", "Social Media", "Event Planning", "Physical Work", "Communication"]

export default function VolunteerPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedSkill, setSelectedSkill] = useState("All")
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [totalOpportunities, setTotalOpportunities] = useState(0) 
  const pageSize = 6;

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null) 

    try {
      const filters: { [key: string]: any } = {}
      if (searchTerm) {
       
        filters.name = searchTerm; 
      }
      if (selectedType !== "All") {
        filters.type = selectedType
      }
      if (selectedSkill !== "All") {
        filters.skills = selectedSkill
      }
      if (urgentOnly) {
        filters.urgent = true
      }
    

      const response = await apiService.getOpportunities({
        page: currentPage,
        pageSize: pageSize,
        filters: filters,
        sort: "title:asc", 
        populate: "*", 
      }) as {
        data: Opportunity[]; 
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      };

      const transformedOpportunities = response.data.map(item => ({
        id: item.id,
        title: item.title,
        organization: item.organization,
        description: item.description,
        location: item.location,
        type: item.type,
        duration: item.duration,
        timeCommitment: item.timeCommitment,
        skills: item.skills || [], 
        volunteers: item.volunteersRegistered,
        maxVolunteers: item.volunteersNeeded,
        date: item.date,
        urgent: item.urgent,
      }));

      setOpportunities(transformedOpportunities)
      setPageCount(response.meta.pagination.pageCount)
      setTotalOpportunities(response.meta.pagination.total)

    } catch (err) {
      console.error("Failed to fetch opportunities:", err)
      setError("Failed to load opportunities. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedType, selectedSkill, urgentOnly, currentPage]) // Add selectedDuration if you integrate its filter

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  useEffect(() => {
    if (currentPage !== 1 && !loading) { // Add !loading to prevent premature reset on initial load
        setCurrentPage(1);
    }
  }, [searchTerm, selectedType, selectedSkill, urgentOnly]); // Add selectedDuration if you integrate its filter

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
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
              <Link href="/ngos" className="text-gray-700 hover:text-blue-600">
                NGOs
              </Link>
              <Link href="/volunteer" className="text-blue-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
          <p className="text-xl text-gray-600 mb-8">
            Make a difference in your community by volunteering with verified NGOs
          </p>

          {/* Search and Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={urgentOnly ? "default" : "outline"}
                onClick={() => setUrgentOnly(!urgentOnly)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Urgent Only
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {opportunities.length} of {totalOpportunities} opportunities
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading opportunities...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium mb-2">
                          {opportunity.organization}
                        </CardDescription>
                        <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                      </div>
                      {opportunity.urgent && (
                        <Badge variant="destructive" className="ml-2">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Location and Type */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {opportunity.location}
                        </div>
                        <Badge variant="outline">{opportunity.type}</Badge>
                      </div>

                      {/* Duration and Time */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {opportunity.duration}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {opportunity.timeCommitment}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-sm text-gray-600">
                        <strong>Start:</strong> {opportunity.date}
                      </div>

                      {/* Skills */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Volunteers */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {opportunity.volunteers}/{opportunity.maxVolunteers} volunteers
                        </div>
                        <div className="text-gray-500">
                          {opportunity.maxVolunteers - opportunity.volunteers} spots left
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(opportunity.volunteers / opportunity.maxVolunteers) * 100}%` }}
                        ></div>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full mt-4">Apply to Volunteer</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {opportunities.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {/* You could add page numbers here if you have many pages */}
                  <PaginationItem className="px-4 text-gray-700">
                    Page {currentPage} of {pageCount}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={currentPage === pageCount ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">
            Create a volunteer profile and get notified when new opportunities match your interests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Volunteer Profile
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Organizations
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}