"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEpisode } from "@/hooks";
import { simpsonsApi } from "@/lib/api-client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Tv, Film, Sparkles } from "lucide-react";
import Image from "next/image";

export default function EpisodeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const episodeId = parseInt(params.id as string);

  const { data: episode, isLoading, error } = useEpisode(episodeId);

  // Get image from query param (passed from card) or fallback to API data
  const imagePath = searchParams.get('img') || episode?.image_path;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-12 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[500px] w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Button
          onClick={() => router.push("/episodes")}
          variant="outline"
          className="mb-8 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Episodes
        </Button>
        <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <p className="text-xl font-bold text-muted-foreground">
              Episode not found
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => router.push("/episodes")}
          variant="outline"
          className="mb-8 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Episodes
        </Button>
      </motion.div>

      {/* Episode Content */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Episode Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] w-full rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
            {imagePath ? (
              <Image
                src={simpsonsApi.getImageUrl(imagePath, 500)}
                alt={episode.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Tv className="h-24 w-24 text-blue-200" />
              </div>
            )}
          </div>

          {/* Decorative corner */}
          <motion.div
            className="absolute -top-3 -right-3 bg-[#70D1FE] border-[3px] border-black rounded-full p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-6 w-6 text-black" />
          </motion.div>
        </motion.div>

        {/* Episode Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              <Badge className="bg-blue-100 text-blue-700 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-sm font-bold">
                <Tv className="mr-2 h-4 w-4" />
                Episode Detail
              </Badge>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 leading-tight">
              {episode.name}
            </h1>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 text-base font-bold">
                <Tv className="mr-2 h-4 w-4" />
                Season {episode.season}
              </Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 text-base font-bold">
                <Film className="mr-2 h-4 w-4" />
                Episode {episode.episode_number}
              </Badge>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 text-base font-bold">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(episode.airdate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </div>

          {/* Synopsis */}
          <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-black mb-4 flex items-center gap-2">
                <Film className="h-6 w-6" />
                Synopsis
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {episode.synopsis || "No synopsis available for this episode."}
              </p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-black mb-4">
                Episode Info
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                  <span className="font-bold text-gray-600">Episode ID</span>
                  <span className="font-display text-xl font-black">
                    #{episode.id}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                  <span className="font-bold text-gray-600">Season</span>
                  <span className="font-display text-xl font-black">
                    {episode.season}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">
                    Episode Number
                  </span>
                  <span className="font-display text-xl font-black">
                    {episode.episode_number}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
