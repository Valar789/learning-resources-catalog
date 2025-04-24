import { Injectable } from '@nestjs/common';
import { Favorite } from './interfaces/favorite.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites: Map<string, Favorite> = new Map();
  private DEFAULT_USER = 'testUser123';

  addFavorite(resourceId: string, userId: string = this.DEFAULT_USER): Favorite {
    const id = uuidv4();
    const favorite: Favorite = {
      id,
      resourceId,
      userId,
      createdAt: new Date(),
    };
    
    this.favorites.set(id, favorite);
    return favorite;
  }

  removeFavorite(id: string): boolean {
    return this.favorites.delete(id);
  }

  getFavorites(userId: string = this.DEFAULT_USER): Favorite[] {
    return Array.from(this.favorites.values()).filter(
      favorite => favorite.userId === userId
    );
  }

  isFavorite(resourceId: string, userId: string = this.DEFAULT_USER): boolean {
    return Array.from(this.favorites.values()).some(
      favorite => favorite.resourceId === resourceId && favorite.userId === userId
    );
  }

  getFavoriteByResourceId(resourceId: string, userId: string = this.DEFAULT_USER): Favorite | undefined {
    return Array.from(this.favorites.values()).find(
      favorite => favorite.resourceId === resourceId && favorite.userId === userId
    );
  }
}
