"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiService } from "./api"
import type { User } from "./types"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      apiService.setToken(token)
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const userData = await apiService.getProfile()
      setUser(userData)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("jwt")
      apiService.removeToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password)
      apiService.setToken(response.jwt)
      setUser(response.user)
      router.push("/dashboard")
      return response
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await apiService.register(email, password, username)
      apiService.setToken(response.jwt)
      setUser(response.user)
      router.push("/dashboard")
      return response
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("jwt")
    apiService.removeToken()
    setUser(null)
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
