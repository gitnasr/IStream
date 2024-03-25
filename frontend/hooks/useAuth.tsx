"use client"

import { useCallback, useContext, useEffect, useState } from "react"

import Backend from "libs/API"
import { AuthContext, User } from "types"
import { createContext } from "react"

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  user: undefined,
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>()

  const auth = useCallback(async () => {
    const API = new Backend()

    try {
      if (!isAuthenticated) {
        if (!API.token) {
          const data = await API.post("/auth", { device: API.device?.toUpperCase() }, false)
          API.setByName("token", data.token)
          setUser(data.user)
          return setIsAuthenticated(true)
        }
        const data = await API.authenticate()
        API.setByName("token", data.token)
        setUser(data.user)
        return setIsAuthenticated(true)
      }
    } catch (error) {
      return setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    auth()
  }, [auth])

  const value = {
    isAuthenticated,
    user: user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
