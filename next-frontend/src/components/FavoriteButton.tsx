"use client"

import { useState } from "react"
import { useFavorites } from "@/hooks/useFavorites"

interface FavoriteButtonProps {
  resourceId: string
}

export default function FavoriteButton({ resourceId }: FavoriteButtonProps) {
  const { isFavorite, loading, toggleFavorite } = useFavorites(resourceId)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleFavorite = async () => {
    if (loading) return

    setIsAnimating(true)

    try {
      await toggleFavorite(resourceId)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <span
        className={`text-2xl transition-all duration-300 ${
          isFavorite ? "text-red-500" : "text-gray-400"
        } ${isAnimating ? "scale-125" : "scale-100"} inline-block transform`}
      >
        ♥
      </span>


      {isAnimating && <span className="absolute inset-0 rounded-full animate-ping bg-red-100 opacity-75"></span>}


      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
        </span>
      )}
    </button>
  )
}
