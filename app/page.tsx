"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import portfolioData from "@/data/portfolio-data.json";

const commandSections = [
  { id: "home", label: "Home", shortcut: "⌘1", section: "Navigation" },
  { id: "about", label: "About", shortcut: "⌘2", section: "Navigation" },
  { id: "skills", label: "Skills", shortcut: "⌘3", section: "Navigation" },
  { id: "experience", label: "Experience", shortcut: "⌘4", section: "Navigation" },
  { id: "projects", label: "Projects", shortcut: "⌘5", section: "Navigation" },
  { id: "achievements", label: "Achievements", shortcut: "⌘6", section: "Navigation" },
  { id: "blogs", label: "Blogs", shortcut: "⌘7", section: "Navigation" },
  { id: "contact", label: "Contact", shortcut: "⌘8", section: "Navigation" },
];

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar navigation={portfolioData.navigation} />
      <CommandPalette sections={commandSections} />
      <main>
        <HeroSection
          greeting={portfolioData.hero.greeting}
          name={portfolioData.hero.name}
          tagline={portfolioData.hero.tagline}
          description={portfolioData.hero.description}
          profileImage={portfolioData.hero.profileImage}
          circularText={portfolioData.hero.circularText}
        />
        <AboutSection
          title={portfolioData.about.title}
          subtitle={portfolioData.about.subtitle}
          bio={portfolioData.about.bio}
          stats={portfolioData.about.stats}
        />
        <SkillsSection
          title={portfolioData.skills.title}
          categories={portfolioData.skills.categories}
        />
        <ExperienceSection
          title={portfolioData.experience.title}
          items={portfolioData.experience.items}
        />
        <ProjectsSection
          title={portfolioData.projects.title}
          subtitle={portfolioData.projects.subtitle}
          description={portfolioData.projects.description}
          items={portfolioData.projects.items}
        />
        <AchievementsSection
          title={portfolioData.achievements.title}
          items={portfolioData.achievements.items}
        />
        <BlogsSection
          title={portfolioData.blogs.title}
          items={portfolioData.blogs.items}
        />
        <ContactSection
          title={portfolioData.contact.title}
          data={{
            email: portfolioData.contact.info.find((i) => i.type === "email")?.value || "",
            phone: "",
            location: portfolioData.contact.info.find((i) => i.type === "location")?.value || "",
            socials: {
              github: portfolioData.contact.social.find((s) => s.name === "GitHub")?.url || "",
              linkedin: portfolioData.contact.social.find((s) => s.name === "LinkedIn")?.url || "",
              twitter: portfolioData.contact.social.find((s) => s.name === "Twitter/X")?.url || "",
              medium: portfolioData.contact.social.find((s) => s.name === "Medium")?.url || "",
              instagram: portfolioData.contact.social.find((s) => s.name === "Instagram")?.url || "",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
