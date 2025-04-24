import { getFavorites } from "@/services/favorites.service";
import FavoritesContent from "@/components/FavoritesContent";

export default async function FavoritesPage() {
  const favorites = await getFavorites();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tus Favoritos</h1>
      <FavoritesContent initialFavorites={favorites} />
    </div>
  );
}
