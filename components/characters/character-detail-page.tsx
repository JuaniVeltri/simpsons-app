"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Character } from "@/types/simpsons";
import { motion } from "framer-motion";
import { Calendar, Briefcase, User, Quote, ArrowLeft } from "lucide-react";

interface CharacterDetailPageProps {
  character: Character;
  imagePath?: string;
}

export function CharacterDetailPage({ character, imagePath }: CharacterDetailPageProps) {
  // Use provided imagePath or fallback to character's portrait_path
  const finalImagePath = imagePath || character.portrait_path;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCharacterFavorite = isFavorite(character.id, "character");

  return (
    <div className="min-h-screen pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/characters">
          <Button
            variant="outline"
            className="border-[3px] border-black bg-white hover:bg-[#FFDE00] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Characters
          </Button>
        </Link>
      </div>

      {/* Hero Section - Simplified for mobile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Character Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-[#FFDE00] to-[#F14E28]">
              <Image
                src={simpsonsApi.getImageUrl(finalImagePath, 500)}
                alt={character.name || "Character"}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Favorite Button - Mobile positioned below image */}
            <div className="flex justify-center mt-6 md:hidden">
              <FavoriteButton
                isFavorite={isCharacterFavorite}
                onToggle={() => toggleFavorite(character.id, "character", character)}
                size="lg"
              />
            </div>
          </motion.div>

          {/* Character Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Badges */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
                {character.name}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                {character.status && (
                  <Badge
                    variant={character.status === "Alive" ? "default" : "destructive"}
                    className="border-[3px] border-black text-base font-display px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {character.status}
                  </Badge>
                )}
                {character.gender && (
                  <Badge
                    variant="secondary"
                    className="border-[3px] border-black text-base font-display px-4 py-2 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {character.gender}
                  </Badge>
                )}
              </div>

              {/* Favorite Button - Desktop positioned in header */}
              <div className="hidden md:block">
                <FavoriteButton
                  isFavorite={isCharacterFavorite}
                  onToggle={() => toggleFavorite(character.id, "character", character)}
                  size="lg"
                />
              </div>
            </div>

            {/* Info Cards - Compact for mobile */}
            <div className="space-y-4">
              {character.age && (
                <div className="p-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFDE00] rounded-lg border-2 border-black">
                      <User className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-600">Age</h3>
                      <p className="text-2xl font-display text-[#F14E28]">{character.age}</p>
                    </div>
                  </div>
                </div>
              )}

              {character.birthdate && (
                <div className="p-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#70D1FE] rounded-lg border-2 border-black">
                      <Calendar className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-600">Birthdate</h3>
                      <p className="text-xl font-display text-[#70D1FE]">{character.birthdate}</p>
                    </div>
                  </div>
                </div>
              )}

              {character.occupation && (
                <div className="p-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F14E28] rounded-lg border-2 border-black">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-600">Occupation</h3>
                      <p className="text-lg font-medium text-[#F14E28]">{character.occupation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Phrases Section */}
      {character.phrases && character.phrases.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FFDE00] rounded-xl border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Quote className="h-6 w-6 text-black" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">Famous Phrases</h2>
            </div>
            <div className="grid gap-4">
              {character.phrases.map((phrase, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                  <p className="text-lg sm:text-xl italic font-medium text-gray-800">
                    &ldquo;{phrase}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
