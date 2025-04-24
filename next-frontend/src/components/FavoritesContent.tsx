"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import ResourceCard from "@/components/ResourceCard";
import type { Resource } from "@/types/resource.types";
import Link from "next/link";
import {
  FaHeart,
  FaExclamationTriangle,
  FaCompass,
  FaSync,
} from "react-icons/fa";
import { useResources } from "@/context/ResourcesContext";
import type { Favorite } from "@/types/favorite.types";

interface FavoritesContentProps {
  initialFavorites: Favorite[];
}

export default function FavoritesContent({
  initialFavorites,
}: FavoritesContentProps) {
  const { favorites, loading, refreshFavorites } = useFavorites();
  const { resources, isLoaded } = useResources();
  const [favoriteResources, setFavoriteResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [missingResources, setMissingResources] = useState<string[]>([]);

  useEffect(() => {
    if (initialFavorites.length > 0 && !favorites.length && !loading) {
    }
  }, [initialFavorites, favorites.length, loading]);

  useEffect(() => {
    const favsToUse = favorites.length > 0 ? favorites : initialFavorites;

    if (!loading && favsToUse.length > 0 && isLoaded) {
      const missing: string[] = [];
      const foundResources: Resource[] = [];

      favsToUse.forEach((favorite) => {
        const resource = resources.find(
          (r) => r.documentId === favorite.resourceId
        );
        if (resource) {
          foundResources.push(resource);
        } else {
          missing.push(favorite.resourceId);
        }
      });

      setFavoriteResources(foundResources);

      if (missing.length > 0) {
        setMissingResources(missing);
        setError(
          `No se encontraron ${missing.length} recursos en el caché local.`
        );
      } else {
        setError(null);
        setMissingResources([]);
      }
    } else if (!loading && favsToUse.length === 0) {
      setFavoriteResources([]);
      setError(null);
    }
  }, [favorites, initialFavorites, loading, resources, isLoaded]);

  const handleRetry = () => {
    refreshFavorites();
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <div className="h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const favsToCheck = favorites.length > 0 ? favorites : initialFavorites;

  if (favsToCheck.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="bg-gray-50 p-8 rounded-lg max-w-md mx-auto border border-gray-200 shadow-sm">
          <div className="flex justify-center mb-4">
            <FaHeart className="text-gray-300 text-5xl" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-600 mb-6">
            Guarda tus recursos favoritos para acceder a ellos rápidamente en
            cualquier momento.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
          >
            <FaCompass className="mr-2" />
            Explorar recursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
          <FaExclamationTriangle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-grow">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-1">
              {missingResources.length > 0
                ? `No se encontraron los siguientes recursos en el caché: ${missingResources.join(
                    ", "
                  )}`
                : "Puedes intentar recargar la página o volver más tarde."}
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md flex items-center text-sm transition-colors"
          >
            <FaSync className="mr-1" /> Reintentar
          </button>
        </div>
      )}

      {favoriteResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No se pudieron cargar los recursos favoritos.
          </p>
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
          >
            <FaSync className="mr-2" /> Intentar de nuevo
          </button>
        </div>
      ) : null}
    </div>
  );
}
