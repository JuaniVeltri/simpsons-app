"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLocation } from "@/hooks";
import { simpsonsApi } from "@/lib/api-client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Building2, MapPinned, Sparkles } from "lucide-react";
import Image from "next/image";

export default function LocationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationId = parseInt(params.id as string);

  const { data: location, isLoading, error } = useLocation(locationId);

  const imagePath = searchParams.get('img') || location?.image_path;

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

  if (error || !location) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Button
          onClick={() => router.push("/locations")}
          variant="outline"
          className="mb-8 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Locations
        </Button>
        <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <p className="text-xl font-bold text-muted-foreground">
              Location not found
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
          onClick={() => router.push("/locations")}
          variant="outline"
          className="mb-8 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Locations
        </Button>
      </motion.div>

      {/* Location Content */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Location Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] w-full rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-orange-100 to-red-50">
            {imagePath ? (
              <Image
                src={simpsonsApi.getImageUrl(imagePath, 500)}
                alt={location.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="h-24 w-24 text-orange-200" />
              </div>
            )}
          </div>

          {/* Decorative corner */}
          <motion.div
            className="absolute -top-3 -right-3 bg-[#F14E28] border-[3px] border-black rounded-full p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Location Details */}
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
              <Badge className="bg-orange-100 text-orange-700 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-sm font-bold">
                <MapPin className="mr-2 h-4 w-4" />
                Location Detail
              </Badge>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 leading-tight">
              {location.name}
            </h1>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 text-base font-bold">
                <MapPinned className="mr-2 h-4 w-4" />
                {location.town}
              </Badge>
              <Badge className="bg-red-500 hover:bg-red-600 text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 text-base font-bold">
                <Building2 className="mr-2 h-4 w-4" />
                {location.use}
              </Badge>
            </div>
          </div>

          {/* Location Type */}
          <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-black mb-4 flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Location Type
              </h2>
              <p className="text-lg font-bold text-gray-700 capitalize">
                {location.use}
              </p>
              <p className="text-base text-gray-600 mt-2">
                This is a {location.use.toLowerCase()} located in {location.town}.
              </p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-black mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Location Info
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                  <span className="font-bold text-gray-600">Location ID</span>
                  <span className="font-display text-xl font-black">
                    #{location.id}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                  <span className="font-bold text-gray-600">Town</span>
                  <span className="font-display text-xl font-black">
                    {location.town}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Type</span>
                  <span className="font-display text-xl font-black capitalize">
                    {location.use}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Fact */}
          <Card className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-black mb-3 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Did You Know?
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                {location.name} is one of the iconic locations in Springfield, featured
                throughout The Simpsons series. It serves as a{" "}
                {location.use.toLowerCase()} and has been the setting for many
                memorable moments in the show.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
