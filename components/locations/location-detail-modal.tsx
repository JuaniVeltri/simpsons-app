"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useFavorites } from "@/hooks/use-favorites";
import { simpsonsApi } from "@/lib/api-client";
import type { Location } from "@/types/simpsons";
import { MapPin } from "lucide-react";

interface LocationDetailModalProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LocationDetailModal({
  location,
  isOpen,
  onClose,
}: LocationDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!location) return null;

  const isLocationFavorite = isFavorite(location.id, "location");

  const handleFavoriteClick = () => {
    toggleFavorite(location.id, "location", location);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-3xl font-black">
                {location.name}
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                Location in Springfield
              </DialogDescription>
            </div>
            <FavoriteButton
              isFavorite={isLocationFavorite}
              onToggle={handleFavoriteClick}
              size="md"
            />
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src={simpsonsApi.getImageUrl(location.image_path)}
              alt={location.name || "Location image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>

          {location.use && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location Type</p>
                <Badge variant="secondary" className="border-2 border-black mt-1">
                  {location.use}
                </Badge>
              </div>
            </div>
          )}

          {location.town && (
            <>
              <Separator className="bg-black h-0.5" />
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Town</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {location.town}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
