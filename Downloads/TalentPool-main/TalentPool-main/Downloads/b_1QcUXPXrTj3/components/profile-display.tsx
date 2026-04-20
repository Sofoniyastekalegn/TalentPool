"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMouseEscape } from "@/hooks/use-mouse-escape";
import type { TalentProfile } from "./talent-form";
import { User, Mail, Briefcase, Clock, Quote, ArrowLeft, Sparkles } from "lucide-react";

interface ProfileDisplayProps {
  profile: TalentProfile;
  onBack: () => void;
}

export function ProfileDisplay({ profile, onBack }: ProfileDisplayProps) {
  const { elementRef: cardRef, offset: cardOffset } = useMouseEscape({
    escapeDistance: 180,
    escapeStrength: 30,
    returnSpeed: 0.06,
  });

  const { elementRef: avatarRef, offset: avatarOffset } = useMouseEscape({
    escapeDistance: 120,
    escapeStrength: 50,
    returnSpeed: 0.1,
  });

  const { elementRef: badgeRef, offset: badgeOffset } = useMouseEscape({
    escapeDistance: 100,
    escapeStrength: 35,
    returnSpeed: 0.12,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100, rotateY: 45 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100, rotateY: -45 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const bounceIn: Variants = {
    hidden: { opacity: 0, scale: 0, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const zoomIn: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        transform: `translate(${cardOffset.x}px, ${cardOffset.y}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 1,
      }}
      className="perspective-1000"
    >
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2 border-primary/30 bg-card/90 backdrop-blur-md overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative h-32 bg-gradient-to-r from-primary via-primary/80 to-accent overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
          />
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              initial={{ x: Math.random() * 100, y: Math.random() * 100 }}
              animate={{
                x: [Math.random() * 200, Math.random() * 400],
                y: [Math.random() * 50, Math.random() * 100],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center -mt-16">
          <motion.div
            ref={avatarRef}
            style={{
              transform: `translate(${avatarOffset.x}px, ${avatarOffset.y}px)`,
            }}
            variants={bounceIn}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-xl shadow-primary/40">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-5xl font-bold text-primary">
                  {profile.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>
        </div>

        <CardContent className="pt-6 pb-8 px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Name */}
            <motion.div variants={zoomIn} className="text-center mb-4">
              <h2 className="text-3xl font-bold text-foreground">{profile.fullName}</h2>
            </motion.div>

            {/* Skill Badge */}
            <motion.div
              ref={badgeRef}
              style={{
                transform: `translate(${badgeOffset.x}px, ${badgeOffset.y}px)`,
              }}
              variants={bounceIn}
              className="flex justify-center mb-6"
            >
              <Badge className="text-lg px-6 py-2 bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 transition-colors">
                <Briefcase className="w-4 h-4 mr-2" />
                {profile.primarySkill}
              </Badge>
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <motion.div
                variants={slideInLeft}
                whileHover={{ scale: 1.03, x: 5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-foreground">{profile.email}</p>
                </div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                whileHover={{ scale: 1.03, x: -5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="p-2 rounded-lg bg-accent/10">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Experience</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile.yearsOfExperience} {parseInt(profile.yearsOfExperience) === 1 ? "Year" : "Years"}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              variants={zoomIn}
              whileHover={{ scale: 1.02 }}
              className="relative p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-muted/30 border border-border"
            >
              <Quote className="absolute top-3 left-3 w-6 h-6 text-primary/30" />
              <Quote className="absolute bottom-3 right-3 w-6 h-6 text-primary/30 rotate-180" />
              <p className="text-center text-foreground/90 italic leading-relaxed px-6">
                {profile.description}
              </p>
            </motion.div>

            {/* Back Button */}
            <motion.div
              variants={bounceIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex justify-center"
            >
              <Button
                onClick={onBack}
                variant="outline"
                className="gap-2 px-6 h-11 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Create Another Profile
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
