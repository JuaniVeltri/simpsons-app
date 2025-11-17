"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllCharacters, useAllEpisodes, useAllLocations } from "@/hooks";
import { useFavorites } from "@/hooks/use-favorites";
import { Users, Tv, MapPin, Heart, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function StatsSection() {
  const { data: characters, isLoading: charactersLoading } = useAllCharacters();
  const { data: episodes, isLoading: episodesLoading } = useAllEpisodes();
  const { data: locations, isLoading: locationsLoading } = useAllLocations();
  const { count: totalFavorites } = useFavorites();

  const isLoading = charactersLoading || episodesLoading || locationsLoading;

  // Calculate stats from the loaded data
  const stats = {
    totalCharacters: characters?.length ?? 0,
    aliveCharacters: characters?.filter((c) => c.status === "Alive").length ?? 0,
    deceasedCharacters: characters?.filter((c) => c.status === "Deceased").length ?? 0,
    totalEpisodes: episodes?.length ?? 0,
    totalSeasons: episodes?.length ? Math.max(...episodes.map((e) => e.season)) : 0,
    totalLocations: locations?.length ?? 0,
    episodesBySeason: episodes?.reduce((acc, ep) => {
      const season = ep.season.toString();
      acc[season] = (acc[season] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) ?? {},
  };

  const statCards = [
    {
      title: "Total Characters",
      value: stats.totalCharacters,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Episodes",
      value: stats.totalEpisodes,
      icon: Tv,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Total Locations",
      value: stats.totalLocations,
      icon: MapPin,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Your Favorites",
      value: totalFavorites,
      icon: Heart,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-2 border-black">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Character status breakdown */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6" />
            Character Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between p-4 bg-primary/10 border-2 border-black rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alive</p>
                <p className="text-3xl font-black">{stats.aliveCharacters}</p>
              </div>
              <Badge className="bg-primary text-primary-foreground border-2 border-black">
                {((stats.aliveCharacters / stats.totalCharacters) * 100).toFixed(1)}%
              </Badge>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between p-4 bg-destructive/10 border-2 border-black rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deceased</p>
                <p className="text-3xl font-black">{stats.deceasedCharacters}</p>
              </div>
              <Badge variant="destructive" className="border-2 border-black">
                {((stats.deceasedCharacters / stats.totalCharacters) * 100).toFixed(1)}%
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Season info */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-2xl font-black flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Season Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center p-4 bg-secondary/10 border-2 border-black rounded-lg"
            >
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Seasons</p>
              <p className="text-4xl font-black text-secondary">{stats.totalSeasons}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center p-4 bg-secondary/10 border-2 border-black rounded-lg"
            >
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Episodes</p>
              <p className="text-4xl font-black text-secondary">{stats.totalEpisodes}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center p-4 bg-secondary/10 border-2 border-black rounded-lg col-span-2 md:col-span-1"
            >
              <p className="text-sm font-medium text-muted-foreground mb-2">Avg Episodes/Season</p>
              <p className="text-4xl font-black text-secondary">
                {Math.round(stats.totalEpisodes / stats.totalSeasons)}
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Fun facts */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-2xl font-black flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Fun Facts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4 bg-primary/10 border-2 border-black rounded-lg"
            >
              <p className="text-sm font-medium">
                📺 The Simpsons has aired over{" "}
                <span className="font-black text-lg">{stats.totalEpisodes}</span> episodes across{" "}
                <span className="font-black text-lg">{stats.totalSeasons}</span> seasons!
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-4 bg-secondary/10 border-2 border-black rounded-lg"
            >
              <p className="text-sm font-medium">
                🌍 Springfield features over{" "}
                <span className="font-black text-lg">{stats.totalLocations}</span> iconic locations!
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="p-4 bg-accent/10 border-2 border-black rounded-lg"
            >
              <p className="text-sm font-medium">
                👥 With <span className="font-black text-lg">{stats.totalCharacters}+</span> characters,
                you&apos;ve got plenty to explore!
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
