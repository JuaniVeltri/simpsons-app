"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Location } from "@/types/simpsons";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLocationFavorite = isFavorite(location.id, "location");

  const handleFavoriteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    toggleFavorite(location.id, "location", location);
  };

  return (
    <Link href={`/locations/${location.id}?img=${encodeURIComponent(location.image_path || '')}`} className="cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.03, y: -6 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="cursor-pointer"
      >
        <Card className="h-[440px] flex flex-col cursor-pointer border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden bg-white">
        <div className="relative h-[260px] shrink-0 overflow-hidden">
          <Image
            src={simpsonsApi.getImageUrl(location.image_path)}
            alt={location.name || "Location image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              isFavorite={isLocationFavorite}
              onToggle={handleFavoriteClick}
              size="sm"
            />
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 space-y-3 min-h-0">
          <h3 className="font-display text-xl leading-tight line-clamp-2">
            {location.name}
          </h3>

          {location.use && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary" className="border-2 border-black text-xs font-bold">
                {location.use}
              </Badge>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-y-auto">
            {location.town && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {location.town}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </Link>
  );
}
