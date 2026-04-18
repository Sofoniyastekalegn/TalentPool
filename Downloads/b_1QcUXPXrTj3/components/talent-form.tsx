"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useMouseEscape } from "@/hooks/use-mouse-escape";
import { User, Mail, Briefcase, Clock, FileText } from "lucide-react";

export interface TalentProfile {
  fullName: string;
  email: string;
  primarySkill: string;
  yearsOfExperience: string;
  description: string;
}

interface TalentFormProps {
  onSubmit: (profile: TalentProfile) => void;
}

export function TalentForm({ onSubmit }: TalentFormProps) {
  const [formData, setFormData] = useState<TalentProfile>({
    fullName: "",
    email: "",
    primarySkill: "",
    yearsOfExperience: "",
    description: "",
  });

  const { elementRef: formRef, offset: formOffset } = useMouseEscape({
    escapeDistance: 200,
    escapeStrength: 25,
    returnSpeed: 0.08,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={formRef}
      style={{
        transform: `translate(${formOffset.x}px, ${formOffset.y}px)`,
      }}
      initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8,
      }}
      className="perspective-1000"
    >
      <Card className="w-full max-w-lg mx-auto shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create Your Profile
            </CardTitle>
          </motion.div>
          <CardDescription className="text-muted-foreground">
            Showcase your talent to the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <FieldGroup>
                <motion.div variants={itemVariants}>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </FieldLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email
                    </FieldLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Primary Skill
                    </FieldLabel>
                    <Input
                      name="primarySkill"
                      value={formData.primarySkill}
                      onChange={handleChange}
                      placeholder="React Developer"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Years of Experience
                    </FieldLabel>
                    <Input
                      name="yearsOfExperience"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      placeholder="5"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      About Yourself
                    </FieldLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your experience, achievements, and what makes you unique..."
                      rows={4}
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20 resize-none"
                    />
                  </Field>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full mt-4 h-12 text-lg font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
                  >
                    Create Profile
                  </Button>
                </motion.div>
              </FieldGroup>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
