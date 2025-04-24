import Link from "next/link"
import Image from "next/image"
import { FaBookOpen } from "react-icons/fa"
import { getImageUrl } from "@/utils/image-utils"

 
interface Resource {
  id: number
  documentId: string
  title: string
  description: string
  type: string
  coverImage: {
    url?: string
    formats?: {
      medium?: {
        url?: string
      }
    }
  }
}

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { documentId, title, coverImage, type, description } = resource
  const imageUrl = coverImage?.url || coverImage?.formats?.medium?.url

 
  const formattedImageUrl = getImageUrl(imageUrl)

  return (
    <Link href={`/resources/${documentId}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          {imageUrl ? (
            <Image src={formattedImageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center">
            <FaBookOpen size={16} className="mr-1" />
            {type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}
