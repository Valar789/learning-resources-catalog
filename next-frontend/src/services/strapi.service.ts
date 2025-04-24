import axios from "axios";
import type { Resource, ResourcesResponse } from "@/types/resource.types";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getResources = async (): Promise<ResourcesResponse> => {
  try {
    const url = `${API_URL}/resources?populate=coverImage`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error(response.data?.error?.message || "No resources found");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching resources:", error.message);
    throw new Error("Failed to fetch resources");
  }
};

export const getResourceById = async (id: string): Promise<Resource> => {
  try {
    console.log(
      `Fetching resource with ID: ${id} from ${API_URL}/resources/${id}?populate=coverImage`
    );

    const response = await axios.get(
      `${API_URL}/resources/${id}?populate=coverImage`
    );

    if (!response.data) {
      throw new Error(response.data?.error?.message || "Resource not found");
    }

    console.log(
      "Resource data structure:",
      JSON.stringify(response.data).substring(0, 200) + "..."
    );

    return response.data.data || response.data;
  } catch (error: any) {
    console.error(`Error fetching resource with ID ${id}:`, error.message);
    throw new Error("Failed to fetch resource");
  }
};

export const getImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "/placeholder-image.jpg";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${STRAPI_URL}${imageUrl}`;
};
