"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Episode } from "@/types/simpsons";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isEpisodeFavorite = isFavorite(episode.id, "episode");

  const handleFavoriteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    toggleFavorite(episode.id, "episode", episode);
  };

  return (
    <Link href={`/episodes/${episode.id}?img=${encodeURIComponent(episode.image_path || '')}`} className="cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.03, y: -6 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="cursor-pointer"
      >
        <Card className="h-[440px] flex flex-col cursor-pointer border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden bg-white">
        <div className="relative h-[260px] shrink-0 overflow-hidden">
          <Image
            src={simpsonsApi.getImageUrl(episode.image_path)}
            alt={episode.name || "Episode thumbnail"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              isFavorite={isEpisodeFavorite}
              onToggle={handleFavoriteClick}
              size="sm"
            />
          </div>
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-secondary text-secondary-foreground border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-display text-sm px-3 py-1">
              S{episode.season}E{episode.episode_number}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 space-y-3 min-h-0">
          <h3 className="font-display text-xl leading-tight line-clamp-2">
            {episode.name}
          </h3>

          {episode.airdate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Calendar className="h-4 w-4" />
              <span>{episode.airdate}</span>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-y-auto">
            {episode.synopsis && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {episode.synopsis}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </Link>
  );
}
