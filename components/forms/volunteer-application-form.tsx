"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiService } from "@/lib/api"
import { Users, Loader2, CheckCircle } from "lucide-react"

interface VolunteerApplicationFormProps {
  opportunityId: string
  opportunityTitle: string
  onSuccess?: () => void
}

export function VolunteerApplicationForm({
  opportunityId,
  opportunityTitle,
  onSuccess,
}: VolunteerApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
    availability: "",
    skills: [] as string[],
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const skillOptions = [
    "Teaching",
    "Healthcare",
    "Social Media",
    "Event Planning",
    "Physical Work",
    "Communication",
    "Translation",
    "Photography",
    "Fundraising",
    "Administration",
  ]

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      setLoading(false)
      return
    }

    try {
      await apiService.applyForVolunteerOpportunity(opportunityId, formData)
      setSuccess(true)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Application failed")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for applying to volunteer for "{opportunityTitle}". The organization will review your application
            and contact you soon.
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            Apply for Another Opportunity
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-600" />
          Volunteer Application
        </CardTitle>
        <CardDescription>Apply to volunteer for: {opportunityTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Personal Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h4 className="font-medium">Skills & Experience</h4>
            <div className="space-y-2">
              <Label>Select your relevant skills:</Label>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Previous Volunteer Experience</Label>
              <Textarea
                id="experience"
                placeholder="Describe any relevant volunteer or work experience..."
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
              />
            </div>
          </div>

          {/* Motivation & Availability */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to volunteer?</Label>
              <Textarea
                id="motivation"
                placeholder="Tell us what motivates you to volunteer for this opportunity..."
                value={formData.motivation}
                onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Textarea
                id="availability"
                placeholder="When are you available? (days, times, duration)"
                value={formData.availability}
                onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions and volunteer guidelines
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
