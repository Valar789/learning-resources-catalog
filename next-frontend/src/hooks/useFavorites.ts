"use client"

import { useState, useEffect, useCallback } from "react"
import type { Favorite } from "@/types/favorite.types"
import { getFavorites, addFavorite, removeFavorite, checkFavorite } from "@/services/favorites.service"
 

export const useFavorites = (resourceId?: string) => {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [currentFavorite, setCurrentFavorite] = useState<Favorite | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
 

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getFavorites()
      setFavorites(data)
    } catch (error) {
      console.error("Error loading favorites:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  useEffect(() => {
    if (resourceId) {
      checkIfFavorite(resourceId)
    }
  }, [resourceId])

  const checkIfFavorite = async (id: string) => {
    try {
      const favorite = await checkFavorite(id)
      setIsFavorite(!!favorite)
      setCurrentFavorite(favorite)
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = async (id: string) => {
    try {
      if (isFavorite && currentFavorite) {
        await removeFavorite(currentFavorite.id)
        setIsFavorite(false)
        setCurrentFavorite(null)
        setFavorites(favorites.filter((fav) => fav.id !== currentFavorite.id))
      } else {
        const newFavorite = await addFavorite(id)
        setIsFavorite(true)
        setCurrentFavorite(newFavorite)
        setFavorites([...favorites, newFavorite])
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  return {
    favorites,
    isFavorite,
    loading,
    toggleFavorite,
    refreshFavorites: loadFavorites,
  }
}
