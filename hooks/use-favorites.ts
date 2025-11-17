"use client";

import { useState, useEffect } from "react";
import { favoritesManager } from "@/lib/favorites";
import type { Character, Episode, Location, Favorite, FavoriteType } from "@/types/simpsons";

// Custom event for favorites updates
const FAVORITES_UPDATED_EVENT = "favoritesUpdated";

export function useFavorites(type?: FavoriteType) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites on mount
    const loadFavorites = () => {
      try {
        const allFavorites = type
          ? favoritesManager.getFavoritesByType(type)
          : favoritesManager.getFavorites();
        setFavorites(allFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();

    // Listen for storage changes (sync across tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "simpsons_favorites") {
        loadFavorites();
      }
    };

    // Listen for custom favorites update event (same tab)
    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate);
    };
  }, [type]);

  const addFavorite = (
    id: number,
    favoriteType: FavoriteType,
    data: Character | Episode | Location
  ) => {
    const favorite = favoritesManager.addFavorite(id, favoriteType, data);
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === id && f.type === favoriteType);
      return exists ? prev : [...prev, favorite];
    });
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  };

  const removeFavorite = (id: number, favoriteType: FavoriteType) => {
    favoritesManager.removeFavorite(id, favoriteType);
    setFavorites((prev) =>
      prev.filter((f) => !(f.id === id && f.type === favoriteType))
    );
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  };

  const toggleFavorite = (
    id: number,
    favoriteType: FavoriteType,
    data: Character | Episode | Location
  ) => {
    const isFav = favoritesManager.toggleFavorite(id, favoriteType, data);
    if (isFav) {
      addFavorite(id, favoriteType, data);
    } else {
      removeFavorite(id, favoriteType);
    }
    return isFav;
  };

  const isFavorite = (id: number, favoriteType: FavoriteType) => {
    return favorites.some((f) => f.id === id && f.type === favoriteType);
  };

  const clearAll = () => {
    favoritesManager.clearAll();
    setFavorites([]);
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  };

  const clearByType = (favoriteType: FavoriteType) => {
    favoritesManager.clearByType(favoriteType);
    setFavorites((prev) => prev.filter((f) => f.type !== favoriteType));
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAll,
    clearByType,
    count: favorites.length,
  };
}
