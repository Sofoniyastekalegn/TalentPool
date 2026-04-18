"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TalentForm, type TalentProfile } from "@/components/talent-form";
import { ProfileDisplay } from "@/components/profile-display";
import { AnimatedBackground } from "@/components/animated-background";
import { Sparkles } from "lucide-react";

export default function TalentProfilePage() {
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = (data: TalentProfile) => {
    setProfile(data);
    setShowProfile(true);
  };

  const handleBack = () => {
    setShowProfile(false);
    setProfile(null);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Talent Showcase
          </span>
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Your Profile
          </span>
        </motion.h1>
        
        <motion.p
          className="mt-4 text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {showProfile
            ? "Here is your professional talent profile"
            : "Create your professional profile and showcase your skills"}
        </motion.p>
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showProfile ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 30 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <TalentForm onSubmit={handleSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 100, rotateY: -30 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              {profile && <ProfileDisplay profile={profile} onBack={handleBack} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive hint */}
      <motion.p
        className="mt-8 text-xs text-muted-foreground/60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Move your mouse around - elements will playfully escape from your cursor
      </motion.p>
    </main>
  );
}
