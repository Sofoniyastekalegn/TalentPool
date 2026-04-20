"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Building2, MapPin, Menu, Search, Users, X } from "lucide-react";
import { TalentForm, type TalentProfile } from "@/components/talent-form";
import { ProfileDisplay } from "@/components/profile-display";

const menuItems = [
  "About us",
  "Product",
  "Job Description Samples",
  "Job Openings",
  "FAQ",
];

const accountTypes = [
  { label: "Job Seeker", icon: Users },
  { label: "Employer", icon: Building2 },
  { label: "Associates", icon: BriefcaseBusiness },
];

const PROFILE_CACHE_KEY = "talent-pool-profile-cache";

const emptyProfile: TalentProfile = {
  fullName: "",
  email: "",
  primarySkill: "",
  yearsOfExperience: "",
  description: "",
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccountType, setActiveAccountType] = useState("Employer");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [employmentLevel, setEmploymentLevel] = useState("");
  const [profileDraft, setProfileDraft] = useState<TalentProfile>(emptyProfile);
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    try {
      const cached = window.localStorage.getItem(PROFILE_CACHE_KEY);
      if (!cached) return;

      const parsed = JSON.parse(cached) as { draft?: TalentProfile; submitted?: TalentProfile };
      if (parsed.draft) setProfileDraft(parsed.draft);
      if (parsed.submitted) {
        setProfile(parsed.submitted);
        setShowProfile(true);
      }
    } catch {
      window.localStorage.removeItem(PROFILE_CACHE_KEY);
    }
  }, []);

  const persistCache = (draft: TalentProfile, submitted: TalentProfile | null) => {
    window.localStorage.setItem(
      PROFILE_CACHE_KEY,
      JSON.stringify({
        draft,
        submitted,
      })
    );
  };

  const handleFormChange = (nextDraft: TalentProfile) => {
    setProfileDraft(nextDraft);
    persistCache(nextDraft, profile);
  };

  const handleSubmit = (nextProfile: TalentProfile) => {
    setProfile(nextProfile);
    setShowProfile(true);
    persistCache(nextProfile, nextProfile);
  };

  const handleBack = () => {
    setShowProfile(false);
    if (profile) {
      setProfileDraft(profile);
      persistCache(profile, null);
    }
  };

  const completedFields = Object.values(profileDraft).filter((value) => value.trim() !== "").length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#48c5c2] via-[#59cac1] to-[#36b7b4] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-sm font-bold text-white">
              TP
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide text-slate-900">TALENT</p>
              <p className="text-sm font-semibold tracking-wide text-slate-700">POOL</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 pb-4 sm:px-6 lg:hidden">
            {menuItems.map((item) => (
              <a
                key={`mobile-${item}`}
                href="#"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.05))]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-12 sm:px-6 md:gap-12 md:pb-16 md:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Connecting Ambitious Talent with Top Employers
            </h1>
            <p className="mt-5 max-w-xl text-xl font-medium text-white/90 sm:text-2xl">
              Empowering careers, connecting talent with opportunities.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
              At Aiwave connect ambitious job seekers with leading employers. Whether
              you want to grow your career or hire top talent, this is the right place.
            </p>
            <div className="mt-7 h-[2px] w-full max-w-2xl bg-white/70" />
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700">
                 Active Candidates
              </span>
              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                Fast Profile Matching
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-slate-900/70 bg-white/35 p-5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md sm:p-6 md:rounded-[2.5rem] md:p-8">
            <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              Log in to Your Account!
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-700">
              Get noticed by premier employers on Talent Pool and simplify your job hunt with
              effortless one-click applications.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {accountTypes.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveAccountType(item.label)}
                  className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    activeAccountType === item.label
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                  type="button"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16">
        <div className="grid gap-3 rounded-2xl bg-white p-3 shadow-2xl shadow-slate-900/15 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center md:gap-4">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <MapPin className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <label className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <select
              value={employmentLevel}
              onChange={(e) => setEmploymentLevel(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
            >
              <option value="">
                Employment Level
              </option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </label>
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Search
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {jobTitle && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-700">
              Title: {jobTitle}
            </span>
          )}
          {location && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-700">
              Location: {location}
            </span>
          )}
          {employmentLevel && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs capitalize text-slate-700">
              Level: {employmentLevel}
            </span>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-white/40 bg-white/25 p-4 backdrop-blur-md md:p-8">
          <h3 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Build Your Talent Profile
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-800/90">
            Smooth, professional profile builder for modern hiring teams.
          </p>
          <div className="mx-auto mt-4 w-fit rounded-full bg-white/75 px-4 py-1 text-xs font-medium text-slate-700">
            Profile completion: {completedFields}/5 fields
          </div>

          <div className="mt-8">
            {!showProfile ? (
              <TalentForm
                onSubmit={handleSubmit}
                initialData={profileDraft}
                onDataChange={handleFormChange}
              />
            ) : profile ? (
              <ProfileDisplay profile={profile} onBack={handleBack} />
            ) : (
              <TalentForm
                onSubmit={handleSubmit}
                initialData={profileDraft}
                onDataChange={handleFormChange}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
