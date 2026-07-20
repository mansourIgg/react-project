import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "../types/user"
import { userStorage } from "../services/user.storage"

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    userStorage.get().then((cached) => {
      setUserState(cached ?? null)
      setIsLoading(false)
    })
  }, [])

  const setUser = (user: User | null) => {
    setUserState(user)
    if (user) {
      userStorage.set(user)
    } else {
      userStorage.clear()
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}