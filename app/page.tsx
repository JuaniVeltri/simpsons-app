"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Tv,
  MapPin,
  Heart,
  Github,
  ExternalLink,
  Sparkles,
  Database,
  Code,
  Zap,
  Star,
  TrendingUp,
  Award,
  Play
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Animated counter component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Floating donut component
function FloatingDonut({ delay = 0, duration = 20, x = 0, y = 0 }: { delay?: number; duration?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute text-7xl pointer-events-none select-none"
      initial={{ x, y, rotate: 0, opacity: 0 }}
      animate={{
        x: [x, x + 100, x - 50, x],
        y: [y, y - 100, y + 50, y],
        rotate: [0, 180, 360],
        opacity: [0, 0.3, 0.3, 0],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        filter: 'drop-shadow(0 0 20px rgba(255, 182, 193, 0.8)) drop-shadow(0 0 40px rgba(255, 105, 180, 0.5))'
      }}
    >
      🍩
    </motion.div>
  );
}

// Famous quotes carousel
const FAMOUS_QUOTES = [
  { text: "D'oh!", character: "Homer" },
  { text: "Eat my shorts!", character: "Bart" },
  { text: "Don't have a cow, man!", character: "Bart" },
  { text: "Excellent...", character: "Mr. Burns" },
  { text: "¡Ay, caramba!", character: "Bart" },
];

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate quotes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % FAMOUS_QUOTES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Users,
      title: "1182+ Characters",
      description: "Explore every character from Springfield with detailed info, ages, occupations, and memorable phrases.",
      gradient: "from-yellow-400 via-yellow-500 to-orange-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      stat: "1182"
    },
    {
      icon: Tv,
      title: "768+ Episodes",
      description: "Browse through all seasons with synopses, air dates, and episode details from the longest-running sitcom.",
      gradient: "from-blue-400 via-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stat: "768"
    },
    {
      icon: MapPin,
      title: "477+ Locations",
      description: "Discover iconic Springfield locations, from homes to businesses and landmarks.",
      gradient: "from-orange-400 via-red-500 to-pink-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      stat: "477"
    },
    {
      icon: Heart,
      title: "Favorites System",
      description: "Save your favorite characters, episodes, and locations for quick access anytime.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      stat: "∞"
    },
  ];

  const techFeatures = [
    { icon: Zap, label: "Next.js 16", description: "React 19 with App Router", color: "from-purple-500 to-purple-600" },
    { icon: Database, label: "React Query", description: "Smart data caching", color: "from-blue-500 to-blue-600" },
    { icon: Code, label: "TypeScript", description: "Type-safe development", color: "from-cyan-500 to-cyan-600" },
    { icon: Sparkles, label: "Framer Motion", description: "Smooth animations", color: "from-pink-500 to-pink-600" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Static Sky Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#5BC0DE] via-[#87CEEB] to-[#FFD700]" />

      {/* Static Clouds */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-[10%] text-8xl opacity-40 drop-shadow-lg">☁️</div>
        <div className="absolute top-60 left-[60%] text-7xl opacity-35 drop-shadow-lg">☁️</div>
      </div>

      {/* Floating Donuts - Reduced to 2 */}
      <FloatingDonut x={100} y={200} delay={0} duration={30} />
      <FloatingDonut x={300} y={600} delay={10} duration={35} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Epic Hero Section */}
        <div className="text-center mb-20 relative">
          {/* TV Screen Effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative"
          >
            {/* Springfield Sign Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
              }}
              className="mb-8 inline-block"
            >
              <Badge className="bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#FF6347] text-white border-[5px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-10 py-4 text-2xl font-black">
                <Star className="mr-3 h-6 w-6 inline" />
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Welcome to Springfield!</span>
                <Star className="ml-3 h-6 w-6 inline" />
              </Badge>
            </motion.div>

            {/* Main Title with Stagger Effect */}
            <div className="mb-8">
              <motion.h1
                className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block text-stroke-yellow drop-shadow-[0_12px_0px_rgba(0,0,0,0.4)]">
                  The
                </span>
                <span className="block bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#FF1493] bg-clip-text text-transparent">
                  Simpsons
                </span>
                <span className="block text-stroke-blue drop-shadow-[0_12px_0px_rgba(0,0,0,0.4)]">
                  Explorer
                </span>
              </motion.h1>
            </div>

            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-8"
            >
              <div className="bg-white/95 backdrop-blur-sm border-[4px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-8 py-6 max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl text-black font-bold leading-relaxed">
                  Dive into the <span className="text-[#F14E28] bg-[#FFE4E1] px-2 py-1 rounded-lg border-2 border-black">complete database</span> of The Simpsons universe.
                  Browse <span className="text-white bg-[#FFDE00] px-2 py-1 rounded-lg border-2 border-black">characters</span>, <span className="text-white bg-[#70D1FE] px-2 py-1 rounded-lg border-2 border-black">episodes</span>,
                  and <span className="text-white bg-[#F14E28] px-2 py-1 rounded-lg border-2 border-black">locations</span> with a modern interface!
                </p>
              </div>
            </motion.div>

            {/* Famous Quote Carousel */}
            <div className="h-32 mb-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="bg-[#F14E28] border-[5px] border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-10 py-6 max-w-3xl mx-auto relative overflow-hidden">
                    {/* Speech bubble tail */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#F14E28]" style={{
                      filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 1))'
                    }} />

                    <p className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] mb-3">
                      &quot;{FAMOUS_QUOTES[currentQuote].text}&quot;
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1 w-12 bg-white/50 rounded-full" />
                      <p className="text-xl font-bold text-white/90 italic">
                        {FAMOUS_QUOTES[currentQuote].character}
                      </p>
                      <div className="h-1 w-12 bg-white/50 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Epic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link href="/characters" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Button className="h-16 px-10 text-xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black transition-all">
                    <Users className="mr-3 h-7 w-7" />
                    Browse Characters
                    <Sparkles className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/episodes" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Button className="h-16 px-10 text-xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-black transition-all">
                    <Play className="mr-3 h-7 w-7" />
                    Explore Episodes
                    <TrendingUp className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/locations" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Button className="h-16 px-10 text-xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-black transition-all">
                    <MapPin className="mr-3 h-7 w-7" />
                    Discover Locations
                    <Award className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#70D1FE] bg-clip-text text-transparent">
                By The Numbers
              </span>
            </h2>
            <p className="text-xl text-black/70 font-bold">
              The biggest Simpsons database on the web!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all h-full bg-white relative overflow-hidden group">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />

                    <CardContent className="p-6 text-center relative z-10">
                      <div className={`${feature.iconBg} p-4 rounded-2xl border-[3px] border-black mx-auto w-fit mb-4 shadow-lg`}>
                        <Icon className={`h-10 w-10 ${feature.iconColor}`} />
                      </div>
                      <div className="text-5xl md:text-6xl font-black mb-2 text-black drop-shadow-lg">
                        {feature.stat === "∞" ? "∞" : <AnimatedCounter end={parseInt(feature.stat)} suffix="+" />}
                      </div>
                      <h3 className="font-display text-sm md:text-base font-black text-gray-700">
                        {feature.title.split(' ')[1] || feature.title.split(' ')[0]}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Grid with Epic Animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              <span className="text-stroke-yellow">What&apos;s Inside?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all h-full relative overflow-hidden group">
                    {/* Static gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />

                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-start gap-6">
                        <div className={`${feature.iconBg} p-5 rounded-2xl border-[4px] border-black shrink-0`}>
                          <Icon className={`h-12 w-12 ${feature.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-3xl font-black mb-3 transition-all">
                            {feature.title}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack with Rotation Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              <span className="text-stroke-blue">Built with Modern Tech</span>
            </h2>
            <p className="text-xl text-black/70 font-bold">
              Cutting-edge tools for the best experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techFeatures.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center transition-all h-full relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    <CardContent className="p-6 relative z-10">
                      <Icon className="h-14 w-14 mx-auto mb-4 text-primary" />
                      <h4 className="font-display font-black text-xl mb-2">
                        {tech.label}
                      </h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Open Source & Author */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Open Source */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all bg-gradient-to-br from-gray-50 to-gray-100 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-black rounded-2xl">
                    <Github className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black">
                      Open Source
                    </h3>
                    <p className="text-base text-muted-foreground font-bold">
                      Free & Open to Everyone
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg font-medium">
                  This project is open source and available on GitHub. Feel free to
                  explore the code, contribute, or use it as inspiration for your own projects!
                </p>
                <a
                  href="https://github.com/JuaniVeltri/simpsons-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
                    <Button className="w-full h-14 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black hover:bg-gray-800 text-white font-black text-lg cursor-pointer">
                      <Github className="mr-2 h-6 w-6" />
                      View on GitHub
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Author */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all bg-gradient-to-br from-blue-50 to-purple-50 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl border-[4px] border-black">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black">
                      Created by Juan Veltri
                    </h3>
                    <p className="text-base text-muted-foreground font-bold">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg font-medium">
                  Built with passion for modern web development and The Simpsons.
                  Check out more of my work and projects!
                </p>
                <a
                  href="https://www.jveltri.com.ar/es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
                    <Button className="w-full h-14 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black text-lg cursor-pointer">
                      <ExternalLink className="mr-2 h-6 w-6" />
                      Visit My Website
                    </Button>
                  </motion.div>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* API Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center pb-8"
        >
          <p className="text-base text-black/60 font-bold">
            Data provided by{" "}
            <a
              href="https://thesimpsonsapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#F14E28] hover:underline hover:text-[#FFDE00] transition-colors cursor-pointer"
            >
              The Simpsons API
            </a>
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .text-stroke-yellow {
          color: #FFDE00;
          text-shadow:
            -5px -5px 0 #000,
            5px -5px 0 #000,
            -5px 5px 0 #000,
            5px 5px 0 #000,
            -3px 0 0 #000,
            3px 0 0 #000,
            0 -3px 0 #000,
            0 3px 0 #000,
            0 0 30px rgba(255, 222, 0, 0.8),
            0 0 50px rgba(255, 222, 0, 0.5);
        }

        .text-stroke-blue {
          color: #70D1FE;
          text-shadow:
            -5px -5px 0 #000,
            5px -5px 0 #000,
            -5px 5px 0 #000,
            5px 5px 0 #000,
            -3px 0 0 #000,
            3px 0 0 #000,
            0 -3px 0 #000,
            0 3px 0 #000,
            0 0 30px rgba(112, 209, 254, 0.8),
            0 0 50px rgba(112, 209, 254, 0.5);
        }
      `}</style>
    </div>
  );
}
