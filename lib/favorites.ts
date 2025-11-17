import type { Character, Episode, Location, Favorite, FavoriteType } from "@/types/simpsons";

const FAVORITES_KEY = "simpsons_favorites";

export class FavoritesManager {
  /**
   * Get all favorites from localStorage
   */
  getFavorites(): Favorite[] {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading favorites:", error);
      return [];
    }
  }

  /**
   * Save favorites to localStorage
   */
  private saveFavorites(favorites: Favorite[]): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }

  /**
   * Add item to favorites
   */
  addFavorite(
    id: number,
    type: FavoriteType,
    data: Character | Episode | Location
  ): Favorite {
    const favorites = this.getFavorites();
    const favorite: Favorite = {
      id,
      type,
      data,
      addedAt: new Date().toISOString(),
    };

    // Check if already exists
    const existingIndex = favorites.findIndex(
      (f) => f.id === id && f.type === type
    );

    if (existingIndex === -1) {
      favorites.push(favorite);
      this.saveFavorites(favorites);
    }

    return favorite;
  }

  /**
   * Remove item from favorites
   */
  removeFavorite(id: number, type: FavoriteType): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter((f) => !(f.id === id && f.type === type));
    this.saveFavorites(filtered);
  }

  /**
   * Check if item is favorited
   */
  isFavorite(id: number, type: FavoriteType): boolean {
    const favorites = this.getFavorites();
    return favorites.some((f) => f.id === id && f.type === type);
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(
    id: number,
    type: FavoriteType,
    data: Character | Episode | Location
  ): boolean {
    if (this.isFavorite(id, type)) {
      this.removeFavorite(id, type);
      return false;
    } else {
      this.addFavorite(id, type, data);
      return true;
    }
  }

  /**
   * Get favorites by type
   */
  getFavoritesByType(type: FavoriteType): Favorite[] {
    const favorites = this.getFavorites();
    return favorites.filter((f) => f.type === type);
  }

  /**
   * Get favorite count
   */
  getFavoriteCount(type?: FavoriteType): number {
    if (!type) {
      return this.getFavorites().length;
    }
    return this.getFavoritesByType(type).length;
  }

  /**
   * Clear all favorites
   */
  clearAll(): void {
    this.saveFavorites([]);
  }

  /**
   * Clear favorites by type
   */
  clearByType(type: FavoriteType): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter((f) => f.type !== type);
    this.saveFavorites(filtered);
  }
}

// Export singleton instance
export const favoritesManager = new FavoritesManager();
