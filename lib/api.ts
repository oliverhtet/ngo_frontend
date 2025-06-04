import { useId } from "react";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || null;

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = `${API_URL}/api`;
    this.token = API_TOKEN; // Get token from .env
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "API request failed")
      }

      return response.json()
    } catch (error) {
      console.error("API request error:", error)
      throw error
    }
  }

  // Authentication
  async login(email: string, password: string) {
    try {
      return this.request("/auth/local", {
        method: "POST",
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      })
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      return this.request("/auth/local/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      })
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  async forgotPassword(email: string) {
    return this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(code: string, password: string, passwordConfirmation: string) {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    })
  }

  // User Profile
  async getProfile() {
    return this.request("/users/me?populate=*")
  }

  async updateProfile(data: any) {
    return this.request("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // NGOs
  async getNGOs(params?: {
    page?: number
    pageSize?: number
    filters?: any
    sort?: string
    populate?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append("pagination[page]", params.page.toString())
    if (params?.pageSize) searchParams.append("pagination[pageSize]", params.pageSize.toString())
    if (params?.sort) searchParams.append("sort", params.sort)
    if (params?.populate) searchParams.append("populate", params.populate)

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(`filters[${key}][$containsi]`, value.toString())
        }
      })
    }

    return this.request(`/ngos?${searchParams.toString()}`)
  }

  // getOpportunities
  async getOpportunities(params?: {
    page?: number
    pageSize?: number
    filters?: any
    sort?: string
    populate?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append("pagination[page]", params.page.toString())
    if (params?.pageSize) searchParams.append("pagination[pageSize]", params.pageSize.toString())
    if (params?.sort) searchParams.append("sort", params.sort)
    if (params?.populate) searchParams.append("populate", params.populate)

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(`filters[${key}][$containsi]`, value.toString())
        }
      })
    }

    return this.request(`/volunteer-opportunities?${searchParams.toString()}`)
  }
  
  async getNGO(uid: string, populate?: string) {
    const searchParams = new URLSearchParams()
    if (populate) searchParams.append("populate", populate)

    return this.request(`/ngos/${uid}?${searchParams.toString()}`)
  }

  // Donations
  async createDonation(data: {
    amount: number
    currency: string
    paymentMethod: string
    ngo: string
    campaign?: string
    donorInfo: any
  }) {
    return this.request("/donations", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  async getDonations(params?: {
    page?: number
    pageSize?: number
    filters?: any
    sort?: string
    populate?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append("pagination[page]", params.page.toString())
    if (params?.pageSize) searchParams.append("pagination[pageSize]", params.pageSize.toString())
    if (params?.sort) searchParams.append("sort", params.sort)
    if (params?.populate) searchParams.append("populate", params.populate)

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(`filters[${key}]`, value.toString())
        }
      })
    }

    return this.request(`/donations?${searchParams.toString()}`)
  }

  async getDonation(id: string, populate?: string) {
    const searchParams = new URLSearchParams()
    if (populate) searchParams.append("populate", populate)

    return this.request(`/donations/${id}?${searchParams.toString()}`)
  }

  // Events
  async getEvents(params?: {
    page?: number;
    pageSize?: number;
    filters?: any;
    sort?: string;
    populate?: string;
  }) {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("pagination[page]", params.page.toString());
    if (params?.pageSize) searchParams.append("pagination[pageSize]", params.pageSize.toString());
    if (params?.sort) searchParams.append("sort", params.sort);
    if (params?.populate) searchParams.append("populate", params.populate);

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(`filters[${key}]`, value.toString());
        }
      });
    }

    return this.request(`/events?${searchParams.toString()}`);
  }

  async getEvent(id: string, populate?: string) {
    const searchParams = new URLSearchParams();
    if (populate) searchParams.append("populate", populate);

    return this.request(`/events/${id}?${searchParams.toString()}`);
  }

  //Blog Posts
  async getBlogPosts(params?: {
    page?: number;
    pageSize?: number;
    filters?: any;
    sort?: string;
    populate?: string;
  }) {
    const searchParams = new URLSearchParams();
  
    // ✅ This is the key line to exclude drafts
    searchParams.append("publicationState", "live");
  
    if (params?.page) searchParams.append("pagination[page]", params.page.toString());
    if (params?.pageSize) searchParams.append("pagination[pageSize]", params.pageSize.toString());
    if (params?.sort) searchParams.append("sort", params.sort);
    if (params?.populate) searchParams.append("populate", params.populate);
  
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(`filters[${key}]`, value.toString());
        }
      });
    }
  
    return this.request(`/blog-posts?draft=false&${searchParams.toString()}`);
  }
  
  
  
  async getBlogPost(uid: string, populate?: string) {
    const searchParams = new URLSearchParams();
    if (populate) searchParams.append("populate", populate);
    const fullPath = `/blog-posts/${uid}?${searchParams.toString()}`;
    return this.request(fullPath);
  }
   
  
  // Payment processing
  async processPayment(data: {
    donationId: string
    paymentMethod: string
    paymentDetails: any
  }) {
    return this.request("/payments/process", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  async verifyPayment(transactionId: string) {
    return this.request(`/payments/verify/${transactionId}`)
  }
}

export const apiService = new ApiService()
