export function getImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "/placeholder-image.jpg";
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${STRAPI_URL}${imageUrl}`;
}
