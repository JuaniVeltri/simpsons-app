"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { CharacterCard } from "@/components/characters/character-card";
import { EpisodeCard } from "@/components/episodes/episode-card";
import { LocationCard } from "@/components/locations/location-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Heart, Users, Tv, MapPin, Trash2, Sparkles } from "lucide-react";
import type { Character, Episode, Location } from "@/types/simpsons";

export default function FavoritesPage() {
  const { favorites, isLoading, clearByType, clearAll, count } = useFavorites();

  // Organize favorites by type
  const characterFavorites = favorites.filter((f) => f.type === "character");
  const episodeFavorites = favorites.filter((f) => f.type === "episode");
  const locationFavorites = favorites.filter((f) => f.type === "location");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-16 w-64 mb-8" />
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const hasAnyFavorites = count > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-400px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
              <Heart className="h-10 w-10 fill-current text-[#F14E28]" />
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              You have{" "}
              <span className="font-black text-[#F14E28]">{count}</span>{" "}
              favorite{count !== 1 ? "s" : ""}
            </p>
          </div>

          {hasAnyFavorites && (
            <Button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear all favorites? This action cannot be undone."
                  )
                ) {
                  clearAll();
                }
              }}
              variant="destructive"
              className="border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold h-12"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear All Favorites
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        {hasAnyFavorites && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground mb-1">
                    Characters
                  </p>
                  <p className="text-3xl font-display font-black">
                    {characterFavorites.length}
                  </p>
                </div>
                <Users className="h-10 w-10 text-yellow-600" />
              </CardContent>
            </Card>

            <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground mb-1">
                    Episodes
                  </p>
                  <p className="text-3xl font-display font-black">
                    {episodeFavorites.length}
                  </p>
                </div>
                <Tv className="h-10 w-10 text-blue-600" />
              </CardContent>
            </Card>

            <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground mb-1">
                    Locations
                  </p>
                  <p className="text-3xl font-display font-black">
                    {locationFavorites.length}
                  </p>
                </div>
                <MapPin className="h-10 w-10 text-orange-600" />
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {!hasAnyFavorites && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-12 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Heart className="h-24 w-24 text-gray-300" />
              </motion.div>
              <h2 className="font-display text-3xl font-black mb-4">
                No Favorites Yet
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring and add your favorite characters, episodes, and
                locations by clicking the{" "}
                <Heart className="inline h-5 w-5 fill-current text-[#F14E28]" />{" "}
                button!
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={() => (window.location.href = "/characters")}
                  className="border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Browse Characters
                </Button>
                <Button
                  onClick={() => (window.location.href = "/episodes")}
                  className="border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-400 hover:bg-blue-500 text-black font-bold"
                >
                  <Tv className="mr-2 h-5 w-5" />
                  Browse Episodes
                </Button>
                <Button
                  onClick={() => (window.location.href = "/locations")}
                  className="border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-orange-400 hover:bg-orange-500 text-black font-bold"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Browse Locations
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Character Favorites Section */}
      {characterFavorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-yellow-600" />
              <h2 className="font-display text-3xl font-black">
                Favorite Characters
              </h2>
              <Badge className="bg-yellow-500 text-black border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-lg px-3 py-1">
                {characterFavorites.length}
              </Badge>
            </div>
            <Button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear all character favorites?"
                  )
                ) {
                  clearByType("character");
                }
              }}
              variant="outline"
              size="sm"
              className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Section
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characterFavorites.map((fav) => (
              <CharacterCard
                key={fav.id}
                character={fav.data as Character}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Episode Favorites Section */}
      {episodeFavorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Tv className="h-8 w-8 text-blue-600" />
              <h2 className="font-display text-3xl font-black">
                Favorite Episodes
              </h2>
              <Badge className="bg-blue-500 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-lg px-3 py-1">
                {episodeFavorites.length}
              </Badge>
            </div>
            <Button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear all episode favorites?"
                  )
                ) {
                  clearByType("episode");
                }
              }}
              variant="outline"
              size="sm"
              className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Section
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {episodeFavorites.map((fav) => (
              <EpisodeCard key={fav.id} episode={fav.data as Episode} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Location Favorites Section */}
      {locationFavorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-orange-600" />
              <h2 className="font-display text-3xl font-black">
                Favorite Locations
              </h2>
              <Badge className="bg-orange-500 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-lg px-3 py-1">
                {locationFavorites.length}
              </Badge>
            </div>
            <Button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear all location favorites?"
                  )
                ) {
                  clearByType("location");
                }
              }}
              variant="outline"
              size="sm"
              className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Section
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {locationFavorites.map((fav) => (
              <LocationCard key={fav.id} location={fav.data as Location} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
