// src/features/auth/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Customer } from "../types/customer"
import { userStorage } from "../services/user.storage"

interface AuthContextValue {
  user: Customer | null
  isLoading: boolean
  setUser: (user: Customer | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    userStorage.get().then((cached) => {
      setUserState(cached ?? null)
      setIsLoading(false)
    })
  }, [])

  const setUser = (user: Customer | null) => {
    setUserState(user)
    if (user) {
      userStorage.set(user)
    } else {
      userStorage.clear()
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}