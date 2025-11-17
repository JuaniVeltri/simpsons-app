"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Character } from "@/types/simpsons";
import { motion } from "framer-motion";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCharacterFavorite = isFavorite(character.id, "character");

  const handleFavoriteClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toggleFavorite(character.id, "character", character);
  };

  return (
    <Link href={`/characters/${character.id}?img=${encodeURIComponent(character.portrait_path || '')}`} className="cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.03, y: -6 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="cursor-pointer"
      >
        <Card
          className="h-[440px] flex flex-col cursor-pointer border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden bg-white"
        >
        <div className="relative h-[260px] shrink-0 overflow-hidden">
          <Image
            src={simpsonsApi.getImageUrl(character.portrait_path)}
            alt={character.name || "Character portrait"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              isFavorite={isCharacterFavorite}
              onToggle={handleFavoriteClick}
              size="sm"
            />
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 space-y-3 min-h-0">
          <h3 className="font-display text-xl leading-tight line-clamp-2">
            {character.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {character.status && (
              <Badge
                variant={character.status === "Alive" ? "default" : "destructive"}
                className="border-2 border-black text-xs font-bold"
              >
                {character.status}
              </Badge>
            )}
            {character.gender && (
              <Badge
                variant="secondary"
                className="border-2 border-black text-xs font-bold"
              >
                {character.gender}
              </Badge>
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
            {character.occupation && (
              <p className="text-sm text-muted-foreground font-medium">
                {character.occupation}
              </p>
            )}

            {character.age && (
              <p className="text-xs text-muted-foreground font-bold">
                Age: {character.age}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </Link>
  );
}
