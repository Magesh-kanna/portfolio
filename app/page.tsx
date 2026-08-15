"use client";

import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import BlogsSection from "@/components/BlogsSection";
import GuestbookSection from "@/components/GuestbookSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navbar />
      <CommandPalette />
      <MobileBottomNav />
      <main className="bg-[#0a0a0a] text-white min-h-screen">
        <HeroSection />
        <SkillsMarquee />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <SkillsSection />
        <BlogsSection />
        <GuestbookSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
