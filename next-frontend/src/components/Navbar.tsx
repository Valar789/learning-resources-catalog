"use client"

import Link from "next/link"
import { useFavorites } from "@/hooks/useFavorites"

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Learning Resources
        </Link>
        <div className="flex items-center">
          <Link href="/favorites" className="text-white flex items-center">
            <span>Favorites</span>
            <span className="ml-2 bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-sm">
              {favorites.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
