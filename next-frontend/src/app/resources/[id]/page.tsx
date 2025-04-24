import { getResourceById, getImageUrl } from "@/services/strapi.service";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await getResourceById(id);

  const imageUrl =
    resource?.coverImage?.url || resource?.coverImage?.formats?.medium?.url;
  const formattedImageUrl = getImageUrl(imageUrl);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      <div className="p-4 bg-gray-50 border-b">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <FaArrowLeft className="h-4 w-4 mr-2" />
          Back to resources
        </Link>
      </div>
      <div className="relative h-64 sm:h-80">
        {imageUrl ? (
          <Image
            src={formattedImageUrl || "/placeholder.svg"}
            alt={resource?.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {resource?.type}
          </span>
          <FavoriteButton resourceId={id} />
        </div>

        <h1 className="text-3xl font-bold mb-4">{resource?.title}</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">{resource?.description}</p>

          <div className="mt-8" />

          {resource?.externalUrl && (
            <div className="mt-6">
              <a
                href={resource?.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center transition-all duration-300"
              >
                Visit Resource
                <FaExternalLinkAlt className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
