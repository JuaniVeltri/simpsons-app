"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Character } from "@/types/simpsons";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Briefcase, User, Quote, ArrowLeft, Sparkles } from "lucide-react";
import { useRef } from "react";

interface CharacterDetailPageProps {
  character: Character;
  imagePath?: string;
}

export function CharacterDetailPage({ character, imagePath }: CharacterDetailPageProps) {
  // Use provided imagePath or fallback to character's portrait_path
  const finalImagePath = imagePath || character.portrait_path;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCharacterFavorite = isFavorite(character.id, "character");
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen pb-16 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/30" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Epic Header Hero */}
      <motion.div
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-[500px] overflow-hidden border-b-4 border-black"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#70D1FE] via-[#A3E4FF] to-[#FFDE00]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Character portrait as background */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={simpsonsApi.getImageUrl(finalImagePath, 500)}
            alt={character.name || "Character"}
            fill
            className="object-cover blur-md scale-110"
            priority
          />
        </div>

        {/* Decorative circles */}
        <motion.div
          className="absolute top-10 right-20 w-32 h-32 rounded-full bg-white/20 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-12">
          <div className="flex flex-col md:flex-row items-end gap-8 w-full">
            {/* Character Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative group"
            >
              <div className="relative h-80 w-80 rounded-3xl overflow-hidden border-[5px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white shrink-0">
                <Image
                  src={simpsonsApi.getImageUrl(finalImagePath, 500)}
                  alt={character.name || "Character"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Decorative sparkles */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                <Sparkles className="h-8 w-8 text-[#FFDE00] fill-[#FFDE00]" />
              </motion.div>
            </motion.div>

            {/* Character Info */}
            <div className="flex-1 pb-4 space-y-4">
              <Link href="/">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="mb-4 border-3 border-black bg-white hover:bg-[#FFDE00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-display"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back Home
                  </Button>
                </motion.div>
              </Link>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
                className="font-display text-6xl md:text-7xl text-white drop-shadow-[0_8px_0px_rgba(0,0,0,0.4)]"
              >
                {character.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {character.status && (
                  <Badge
                    variant={character.status === "Alive" ? "default" : "destructive"}
                    className="border-[3px] border-black text-lg font-display px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {character.status}
                  </Badge>
                )}
                {character.gender && (
                  <Badge
                    variant="secondary"
                    className="border-[3px] border-black text-lg font-display px-6 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {character.gender}
                  </Badge>
                )}
              </motion.div>
            </div>

            {/* Favorite Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            >
              <FavoriteButton
                isFavorite={isCharacterFavorite}
                onToggle={() => toggleFavorite(character.id, "character", character)}
                size="lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom decoration wave */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#70D1FE]" />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="md:col-span-1 space-y-6">
            {character.age && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#FFDE00] rounded-lg border-2 border-black">
                    <User className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-display text-xl">Age</h3>
                </div>
                <p className="text-4xl font-display text-[#F14E28]">{character.age}</p>
              </motion.div>
            )}

            {character.birthdate && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="p-6 bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#70D1FE] rounded-lg border-2 border-black">
                    <Calendar className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-display text-xl">Birthdate</h3>
                </div>
                <p className="text-2xl font-display text-[#70D1FE]">{character.birthdate}</p>
              </motion.div>
            )}

            {character.occupation && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#F14E28] rounded-lg border-2 border-black">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl">Occupation</h3>
                </div>
                <p className="text-xl font-medium text-[#F14E28]">{character.occupation}</p>
              </motion.div>
            )}
          </div>

          {/* Phrases */}
          <div className="md:col-span-2">
            {character.phrases && character.phrases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#FFDE00] rounded-xl border-3 border-black">
                    <Quote className="h-8 w-8 text-black" />
                  </div>
                  <h2 className="font-display text-4xl">Famous Phrases</h2>
                </div>
                <div className="grid gap-4">
                  {character.phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      className="p-6 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      <p className="text-xl italic font-medium text-gray-800">
                        &ldquo;{phrase}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
