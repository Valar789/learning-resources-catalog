"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Resource } from "@/types/resource.types"

interface ResourcesContextType {
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  getResourceById: (id: string) => Resource | undefined
  isLoaded: boolean
}

const ResourcesContext = createContext<ResourcesContextType>({
  resources: [],
  setResources: () => {},
  getResourceById: () => undefined,
  isLoaded: false,
})

export const useResources = () => useContext(ResourcesContext)

interface ResourcesProviderProps {
  children: ReactNode
}

export const ResourcesProvider = ({ children }: ResourcesProviderProps) => {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const getResourceById = (id: string) => {
    return resources.find((resource) => resource.documentId === id)
  }

  useEffect(() => {
    if (resources.length > 0 && !isLoaded) {
      setIsLoaded(true)
    }
  }, [resources, isLoaded])

  return (
    <ResourcesContext.Provider
      value={{
        resources,
        setResources,
        getResourceById,
        isLoaded,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  )
}
