import axios from "axios"
import type { Favorite } from "@/types/favorite.types"

const API_URL = process.env.NEXT_PUBLIC_FAVORITES_API_URL || "http://localhost:3001"
const DEFAULT_USER_ID = "testUser123"

export const getFavorites = async (userId = DEFAULT_USER_ID): Promise<Favorite[]> => {
  try {
    const response = await axios.get(`${API_URL}/favorites?userId=${userId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return []
  }
}

export const checkFavorite = async (resourceId: string, userId = DEFAULT_USER_ID): Promise<Favorite | null> => {
  try {
    const response = await axios.get(`${API_URL}/favorites/resource/${resourceId}?userId=${userId}`)
    return response.data
  } catch (error) {
    return null
  }
}

export const addFavorite = async (resourceId: string, userId = DEFAULT_USER_ID): Promise<Favorite> => {
  const response = await axios.post(`${API_URL}/favorites`, { resourceId, userId })
  return response.data
}

export const removeFavorite = async (favoriteId: string): Promise<void> => {
  await axios.delete(`${API_URL}/favorites/${favoriteId}`)
}
