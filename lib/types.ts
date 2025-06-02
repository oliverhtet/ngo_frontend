export interface NGO {
  id: number
  attributes: {
    name: string
    nameMyanmar: string
    description: string
    longDescription: string
    cause: string
    location: string
    verified: boolean
    founded: string
    raised: string
    goal: string
    volunteers: number
    events: number
    beneficiaries: string
    slug: string
    image: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
    contact: {
      phone: string
      email: string
      website: string
      facebook: string
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Campaign {
  id: number
  attributes: {
    title: string
    description: string
    raised: number
    goal: number
    image: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
    ngo: {
      data: NGO
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Event {
  id: number
  attributes: {
    title: string
    description: string
    date: string
    location: string
    volunteersNeeded: number
    volunteersRegistered: number
    type: "online" | "offline" | "hybrid"
    image: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
    ngo: {
      data: NGO
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface VolunteerOpportunity {
  id: number
  attributes: {
    title: string
    description: string
    location: string
    type: "on-site" | "remote" | "hybrid"
    duration: string
    timeCommitment: string
    skills: string[]
    volunteersNeeded: number
    volunteersRegistered: number
    startDate: string
    urgent: boolean
    ngo: {
      data: NGO
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface BlogPost {
  id: number
  attributes: {
    title: string
    content: string
    excerpt: string
    slug: string
    featuredImage: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
    author: {
      data: {
        attributes: {
          name: string
          avatar: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }
    }
    ngo: {
      data: NGO
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface User {
  id: number
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  role: {
    id: number
    name: string
    description: string
    type: string
  }
  profile?: {
    firstName: string
    lastName: string
    phone: string
    location: string
    skills: string[]
    interests: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Donation {
  id: number
  attributes: {
    amount: number
    currency: string
    paymentMethod: "kbzpay" | "wavemoney" | "bank_transfer" | "card"
    status: "pending" | "completed" | "failed"
    transactionId: string
    donor: {
      data: User
    }
    ngo: {
      data: NGO
    }
    campaign?: {
      data: Campaign
    }
    createdAt: string
    updatedAt: string
  }
}

export interface ApiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ApiError {
  error: {
    status: number
    name: string
    message: string
    details: any
  }
}
