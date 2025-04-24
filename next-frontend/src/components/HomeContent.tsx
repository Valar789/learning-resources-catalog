"use client";

import { useEffect } from "react";
import ResourceCard from "@/components/ResourceCard";
import { useResources } from "@/context/ResourcesContext";
import type { Resource } from "@/types/resource.types";

interface HomeContentProps {
  initialResources: Resource[];
}

export default function HomeContent({ initialResources }: HomeContentProps) {
  const { resources, setResources, isLoaded } = useResources();

  useEffect(() => {
    if (initialResources.length > 0 && !isLoaded) {
      setResources(initialResources);
    }
  }, [initialResources, setResources, isLoaded]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.length > 0
        ? resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        : initialResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
    </div>
  );
}
