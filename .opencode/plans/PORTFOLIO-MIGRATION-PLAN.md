# Portfolio Migration Plan
## Magesh K Portfolio - Next.js Migration

**Source**: https://debpriyo.is-a.dev/ (Next.js + Tailwind CSS)
**Target**: https://mageshportfolio.netlify.app/ → https://magesh_kanna.dev
**Date**: August 2026

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Source Portfolio Analysis](#3-source-portfolio-analysis)
4. [File Structure](#4-file-structure)
5. [JSON Master Data Schema](#5-json-master-data-schema)
6. [Implementation Steps](#6-implementation-steps)
7. [Features to Implement](#7-features-to-implement)
8. [Domain Registration & Deployment](#8-domain-registration--deployment)
9. [Checklist](#9-checklist)

---

## 1. Project Overview

Migrate the current vanilla HTML/CSS/JS portfolio to a **Next.js 14+** application that mimics the design and features of https://debpriyo.is-a.dev/, while containing Magesh K's personal content.

**Key Requirements:**
- Migrate to Next.js with App Router
- Use Tailwind CSS for styling
- Create a `portfolio-data.json` file for easy content editing
- Include ALL features from source portfolio (loading screen, command palette, animations, etc.)
- Deploy to Vercel with custom domain `magesh_kanna.dev`
- Use existing images from `img/` and `assets/` folders
- Resume download functionality from `resume.pdf`

---

## 2. Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Geist, Geist Mono, Manrope, Bebas Neue, Cedarville Cursive (via next/font) |
| Language | TypeScript |
| Deployment | Vercel |
| Domain | magesh_kanna.dev (via Cloudflare) |

---

## 3. Source Portfolio Analysis

### Design Elements from debpriyo.is-a.dev:

**Layout & Structure:**
- Single-page portfolio with smooth scrolling
- Dark theme (black background)
- Minimalist, clean design
- Full-screen sections

**Fonts Used:**
- Geist (primary sans-serif)
- Geist Mono (monospace accents)
- Manrope (body text)
- Bebas Neue (large headings)
- Cedarville Cursive (decorative/handwritten accents)

**Key Features:**
1. **Loading Screen** - Animated "hello" text with black curtain reveal
2. **Command Palette** - Cmd+K searchable navigation (search pages)
3. **Tilted Card Effect** - 3D perspective tilt on profile image
4. **Circular Rotating Text** - Animated circular text around profile
5. **Smooth Page Transitions** - Animated section reveals
6. **Navigation** - Fixed side/bottom nav with section indicators
7. **Dark/Light Theme Toggle**
8. **Responsive Design** - Mobile-first approach

**Sections:**
- Hero/Home (with profile image + animated text)
- About
- Skills/Technologies
- Experience/Timeline
- Projects (with hover effects)
- Contact
- Footer with social links

---

## 4. File Structure

```
portfolio-mk/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Main page (all sections)
│   ├── globals.css             # Global styles + Tailwind
│   └── not-found.tsx           # 404 page
├── components/
│   ├── LoadingScreen.tsx       # Initial loading animation
│   ├── CommandPalette.tsx      # Cmd+K navigation
│   ├── Navbar.tsx              # Fixed navigation
│   ├── HeroSection.tsx         # Hero with profile + circular text
│   ├── TiltedCard.tsx          # 3D tilt effect component
│   ├── AboutSection.tsx        # About me section
│   ├── SkillsSection.tsx       # Skills with progress bars
│   ├── ExperienceSection.tsx   # Timeline/experience
│   ├── ProjectsSection.tsx     # Project cards grid
│   ├── ContactSection.tsx      # Contact info + social links
│   ├── Footer.tsx              # Footer
│   ├── ThemeToggle.tsx         # Dark/light mode toggle
│   └── ScrollReveal.tsx        # Scroll animation wrapper
├── lib/
│   ├── data.ts                 # Load and export portfolio data
│   └── utils.ts                # Helper functions
├── public/
│   ├── img/                    # Portfolio images (copy from current)
│   │   ├── hero*.png
│   │   ├── port*.jpg
│   │   └── blog*.jpg
│   ├── assets/                 # Additional assets (copy from current)
│   │   ├── resume.pdf
│   │   ├── magesh-k.jpg
│   │   └── ...
│   ├── favicon.png
│   └── shareCard.png           # OG image for social sharing
├── data/
│   └── portfolio-data.json     # MASTER DATA FILE - Edit this!
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── PLAN.md
```

---

## 5. JSON Master Data Schema

### File: `data/portfolio-data.json`

```json
{
  "meta": {
    "name": "Magesh K",
    "title": "SDE | Flutter & iOS Developer",
    "description": "Portfolio of Magesh K, a Software Development Engineer specializing in Flutter, iOS, Kotlin Multiplatform, and FinTech solutions.",
    "url": "https://magesh_kanna.dev",
    "image": "/assets/magesh-k.jpg",
    "keywords": ["Magesh K", "Flutter Developer", "SDE", "iOS Developer", "Kotlin", "Firebase", "FinTech", "UPI", "Mobile App Developer", "Portfolio"],
    "author": "Magesh K"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "name": "Magesh K",
    "tagline": "SDE | Flutter & iOS Developer",
    "description": "Crafting sleek, high-performant mobile apps with Flutter, iOS, and Kotlin Multiplatform. On a mission to become a FullStack Mobile Developer.",
    "profileImage": "/img/hero4half2.png",
    "circularText": "Flutter • iOS • Kotlin • Firebase • FinTech • "
  },
  "about": {
    "title": "About Me",
    "subtitle": "my stats",
    "bio": "Software Development Engineer with 3+ years of experience building production-ready mobile applications. Currently working at NPST (Banking & Payment Solutions) on Canara Bank's fintech product — building UPI and Mobile banking features. Previously at Thiran Technologies, where I developed Flutter applications with Voice AI integration ('TAM'), Video Call services using ZEGO SDK, and Cognitive Dashboard with real-time mapping. Passionate about mentoring developers, speaking at community meetups (Namma Flutter), and shipping solid code. On a mission to become a FullStack Mobile Developer.",
    "stats": [
      { "value": "3+", "label": "Years Experience" },
      { "value": "15+", "label": "Projects Delivered" },
      { "value": "7K+", "label": "LinkedIn Followers" },
      { "value": "37", "label": "GitHub Repos" }
    ]
  },
  "skills": {
    "title": "My Skills",
    "categories": [
      {
        "name": "Languages",
        "items": [
          { "name": "Dart", "percentage": 90, "icon": "code" },
          { "name": "Kotlin", "percentage": 75, "icon": "code" },
          { "name": "Swift", "percentage": 70, "icon": "code" },
          { "name": "Python", "percentage": 60, "icon": "code" },
          { "name": "JavaScript", "percentage": 55, "icon": "code" }
        ]
      },
      {
        "name": "Frameworks & Tools",
        "items": [
          { "name": "Flutter", "percentage": 90, "icon": "smartphone" },
          { "name": "iOS (SwiftUI)", "percentage": 75, "icon": "apple" },
          { "name": "Kotlin Multiplatform", "percentage": 70, "icon": "smartphone" },
          { "name": "Firebase", "percentage": 85, "icon": "flame" },
          { "name": "IBM Maximo", "percentage": 70, "icon": "database" }
        ]
      },
      {
        "name": "State Management & Architecture",
        "items": [
          { "name": "Riverpod", "percentage": 85, "icon": "layers" },
          { "name": "Clean Architecture", "percentage": 80, "icon": "layout" },
          { "name": "GoRouter", "percentage": 75, "icon": "route" }
        ]
      },
      {
        "name": "Databases & APIs",
        "items": [
          { "name": "REST APIs", "percentage": 85, "icon": "server" },
          { "name": "SQLite/Drift", "percentage": 80, "icon": "database" },
          { "name": "MongoDB", "percentage": 65, "icon": "database" },
          { "name": "MySQL", "percentage": 70, "icon": "database" }
        ]
      },
      {
        "name": "Design & Other",
        "items": [
          { "name": "Figma", "percentage": 70, "icon": "pen-tool" },
          { "name": "Git", "percentage": 85, "icon": "git-branch" },
          { "name": "Postman", "percentage": 80, "icon": "send" },
          { "name": "Mentorship", "percentage": 90, "icon": "users" }
        ]
      }
    ]
  },
  "experience": {
    "title": "My Journey",
    "items": [
      {
        "type": "work",
        "duration": "Sep 2025 - Present",
        "role": "Software Development Engineer",
        "company": "NPST (Network People Services Technologies Ltd.)",
        "location": "Bengaluru, India",
        "description": "Working on Canara Bank's fintech product — building UPI and Mobile banking features. Integrated Voice Assistant 'TAM' with AI Model for offline capability, Video Call services using ZEGO SDK, and Cognitive Dashboard with real-time latitude longitude integration.",
        "tags": ["Flutter", "FinTech", "UPI", "IBM Maximo", "AI/ML"]
      },
      {
        "type": "work",
        "duration": "Feb 2024 - Sep 2025",
        "role": "Mobile Application Developer",
        "company": "Thiran Technologies",
        "location": "Chennai, India",
        "description": "Key role in developing production-ready Flutter applications. Integrated Voice Assistant 'TAM' with Voice SDK for offline AI capabilities. Built Video Call services with ZEGO SDK. Worked on Cognitive Dashboard with real-time mapping. Handled user transactions with multiple databases on Mobile and Cloud.",
        "tags": ["Flutter", "Voice AI", "ZEGO SDK", "Clean Architecture"]
      },
      {
        "type": "work",
        "duration": "Aug 2023 - Feb 2024",
        "role": "Trainee Mobile Developer",
        "company": "Thiran Technologies",
        "location": "Chennai, India",
        "description": "Developed Flutter applications for Android and iOS using Riverpod State Management, SQLite/D drift, GoRouting, and Adaptive Screens. Handled large user data processing in Isolates for concurrent operations.",
        "tags": ["Flutter", "Riverpod", "Drift", "Isolates"]
      },
      {
        "type": "work",
        "duration": "Jan 2023 - Aug 2023",
        "role": "Mobile Application Developer",
        "company": "doodleblue Innovations",
        "location": "Chennai, India",
        "description": "Deep dive into mobile development with Flutter and iOS (Swift). Built applications for Android, iOS, and Web platforms with REST API integration.",
        "tags": ["Flutter", "iOS", "Swift", "REST API"]
      },
      {
        "type": "work",
        "duration": "Sep 2022 - Dec 2022",
        "role": "Flutter Developer",
        "company": "Bull Tech Pvt Ltd",
        "location": "Chennai, India",
        "description": "Built Cryptocurrency Application with Firebase Authentication, Coinbase API integration for real-time crypto data, Currency Converter, Wishlist functionality, and News App for crypto-related news.",
        "tags": ["Flutter", "Firebase", "REST API", "Coinbase"]
      },
      {
        "type": "education",
        "duration": "2021 - 2023",
        "role": "Master of Computer Applications (MCA)",
        "company": "S.A. Engineering College",
        "location": "Chennai, India",
        "description": "Completed Master's with 9.0 GPA. Knowledge in app development, web development, cybersecurity, and cloud technologies.",
        "tags": ["9.0 GPA", "Computer Science"]
      },
      {
        "type": "education",
        "duration": "2018 - 2021",
        "role": "Bachelor of Computer Applications (BCA)",
        "company": "Madras University",
        "location": "Chennai, India",
        "description": "Graduated with 8.2 CGPA. Gained experience in event management and people management through organizing college-level events.",
        "tags": ["8.2 CGPA", "Computer Science"]
      }
    ]
  },
  "projects": {
    "title": "Featured Projects",
    "subtitle": "My Work",
    "description": "Here are some of my notable projects from GitHub, showcasing expertise in Flutter, iOS, and mobile development.",
    "items": [
      {
        "name": "Namma Wallet",
        "image": "/img/port1.jpg",
        "github": "https://github.com/Namma-Flutter/namma_wallet",
        "demo": "",
        "description": "Community Flutter wallet project with 57 stars and 67 forks. Contributed to the Namma Flutter open-source initiative.",
        "tags": ["Flutter", "Open Source", "FinTech"],
        "stars": 57
      },
      {
        "name": "BullTech CryptoApp",
        "image": "/img/port2.jpg",
        "github": "https://github.com/Magesh-kanna/BullTech-CryptoApp-Flutter",
        "demo": "",
        "description": "Cryptocurrency mobile app with Firebase auth, Coinbase API integration, real-time currency converter, and crypto news feed.",
        "tags": ["Flutter", "Firebase", "REST API"]
      },
      {
        "name": "Apple Maps with SwiftUI",
        "image": "/img/port3.jpg",
        "github": "https://github.com/Magesh-kanna/Apple-Maps-with-SwiftUI",
        "demo": "",
        "description": "Maps navigation app built with SwiftUI featuring Apple Maps integration and Core Data local database.",
        "tags": ["Swift", "SwiftUI", "Core Data"]
      },
      {
        "name": "Finance Tracker",
        "image": "/img/port4.jpg",
        "github": "https://github.com/Magesh-kanna/finance-tracking-flutter",
        "demo": "",
        "description": "Personal finance tracking application built with Flutter for managing expenses and income.",
        "tags": ["Flutter", "Dart", "Finance"]
      },
      {
        "name": "Dashboard with Charts",
        "image": "/img/port5.jpg",
        "github": "https://github.com/Magesh-kanna/Dashboard-flutter-with-charts-graph",
        "demo": "",
        "description": "Flutter dashboard application with interactive charts and data visualization components.",
        "tags": ["Flutter", "Charts", "UI"]
      },
      {
        "name": "Expense Tracker (SwiftUI)",
        "image": "/img/port6.jpg",
        "github": "https://github.com/Magesh-kanna/Expense-Tracker-SwiftUI",
        "demo": "",
        "description": "iOS expense tracking application built with SwiftUI for managing personal finances.",
        "tags": ["Swift", "SwiftUI", "iOS"]
      },
      {
        "name": "Organization Management",
        "image": "/img/port7.jpg",
        "github": "https://github.com/Magesh-kanna/Organization-management-flutter-UI",
        "demo": "",
        "description": "Comprehensive organizational management UI with employee management, events, documents, and financial dashboard.",
        "tags": ["Flutter", "UI", "Enterprise"]
      }
    ]
  },
  "achievements": {
    "title": "Achievements & Community",
    "items": [
      {
        "type": "speaking",
        "title": "Guest Lecture at S.A. Engineering College",
        "date": "February 2026",
        "description": "Delivered a guest lecture on 'From Classroom to Codebase: Building Apps That People Actually Use' — covering the gap between college and real-world product development.",
        "icon": "mic"
      },
      {
        "type": "speaking",
        "title": "Speaker at Namma Flutter Chennai Meetup",
        "date": "April 2025",
        "description": "Spoke at the Namma Flutter Chennai Meetup at Entrans Inc., sharing insights on Flutter development and mobile engineering.",
        "icon": "mic"
      },
      {
        "type": "community",
        "title": "Organizer at Namma Flutter Chennai",
        "date": "2024 - Present",
        "description": "Active organizer and community member of Namma Flutter Chennai, helping organize meetups, workshops, and devcons for the Flutter community.",
        "icon": "users"
      },
      {
        "type": "github",
        "title": "GitHub Achievements",
        "date": "2023 - Present",
        "description": "Earned YOLO, Quickdraw, and Pull Shark achievements. 37 public repositories with 81+ stars.",
        "icon": "github"
      }
    ]
  },
  "blogs": {
    "title": "Insights & Tips",
    "items": [
      {
        "title": "From Classroom to Codebase: Building Apps That People Actually Use",
        "image": "/img/blog1.jpg",
        "excerpt": "Bridging the gap between academic learning and real-world mobile app development. Lessons from shipping production apps.",
        "link": "https://medium.com/@codermagesh"
      },
      {
        "title": "Integrating Voice AI in Flutter Applications",
        "image": "/img/blog2.jpg",
        "excerpt": "How I integrated an offline Voice Assistant 'TAM' using AI Models in a Flutter application for real-time voice interactions.",
        "link": "https://medium.com/@codermagesh"
      },
      {
        "title": "Building Video Call Features with ZEGO SDK",
        "image": "/img/blog3.jpg",
        "excerpt": "End-to-end video call implementation in Flutter using ZEGO SDK for seamless user communication.",
        "link": "https://medium.com/@codermagesh"
      },
      {
        "title": "Mastering Flutter State Management with Riverpod",
        "image": "/img/port1.jpg",
        "excerpt": "A deep dive into Riverpod state management for building scalable and maintainable Flutter applications.",
        "link": "https://medium.com/@codermagesh"
      },
      {
        "title": "Offline-First Mobile Apps: Handling Data Without Internet",
        "image": "/img/port2.jpg",
        "excerpt": "Techniques for building offline-capable mobile applications using local databases and sync strategies.",
        "link": "https://medium.com/@codermagesh"
      },
      {
        "title": "My Journey from BCA to SDE: A Developer's Story",
        "image": "/img/port3.jpg",
        "excerpt": "From a BCA graduate to a Software Development Engineer — sharing my career journey, challenges, and learnings.",
        "link": "https://medium.com/@codermagesh"
      }
    ]
  },
  "contact": {
    "title": "Let's Connect",
    "subtitle": "Contact",
    "description": "I'd love to hear from you. Whether you have a project in mind, want to collaborate, or just want to say hi — feel free to reach out!",
    "info": [
      { "type": "location", "label": "Location", "value": "Bengaluru, India", "icon": "map-pin" },
      { "type": "email", "label": "Email", "value": "codermagesh@gmail.com", "icon": "mail" },
      { "type": "education", "label": "Education", "value": "MCA (9.0 GPA)", "icon": "graduation-cap" },
      { "type": "coffee", "label": "Support", "value": "Buy Me a Coffee", "icon": "coffee", "url": "https://www.buymeacoffee.com/codermagesh" }
    ],
    "social": [
      { "name": "LinkedIn", "url": "https://www.linkedin.com/in/mageshkanna/", "icon": "linkedin", "followers": "7K+" },
      { "name": "GitHub", "url": "https://github.com/Magesh-kanna", "icon": "github", "followers": "11" },
      { "name": "Twitter/X", "url": "https://x.com/codermagesh", "icon": "twitter" },
      { "name": "Instagram", "url": "https://instagram.com/Magesh_kanna", "icon": "instagram" },
      { "name": "Medium", "url": "https://medium.com/@codermagesh", "icon": "medium" },
      { "name": "Facebook", "url": "https://facebook.com/Magesh.kanna.007", "icon": "facebook" }
    ]
  },
  "resume": {
    "label": "Download Resume",
    "file": "/assets/resume.pdf"
  },
  "navigation": [
    { "id": "home", "label": "Home", "icon": "home" },
    { "id": "about", "label": "About", "icon": "user" },
    { "id": "skills", "label": "Skills", "icon": "code" },
    { "id": "experience", "label": "Experience", "icon": "briefcase" },
    { "id": "projects", "label": "Projects", "icon": "folder" },
    { "id": "achievements", "label": "Achievements", "icon": "award" },
    { "id": "blogs", "label": "Blog", "icon": "newspaper" },
    { "id": "contact", "label": "Contact", "icon": "mail" }
  ]
}
```

---

## 6. Implementation Steps

### Step 1: Initialize Next.js Project
```bash
# In the portfolio-MK directory
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**IMPORTANT**: Since we're in an existing directory, we need to:
1. Backup current files to a `legacy/` folder
2. Initialize Next.js
3. Copy assets back

### Step 2: Install Dependencies
```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

### Step 3: Configure Tailwind
Update `tailwind.config.ts` with custom colors and fonts matching the source portfolio's dark theme.

### Step 4: Copy Assets
```bash
# Copy images to public folder
cp -r img/ public/img/
cp -r assets/ public/assets/
```

### Step 5: Create Components (in order)

1. **LoadingScreen.tsx** - Black screen with animated "hello" text
2. **Navbar.tsx** - Fixed side navigation (desktop) / bottom nav (mobile)
3. **HeroSection.tsx** - Profile image with circular rotating text + tilted card
4. **TiltedCard.tsx** - 3D perspective tilt effect (using Framer Motion)
5. **AboutSection.tsx** - Bio + stats grid
6. **SkillsSection.tsx** - Skills with animated progress bars
7. **ExperienceSection.tsx** - Timeline with work/education items
8. **ProjectsSection.tsx** - Project cards with hover effects
9. **BlogsSection.tsx** - Blog post cards
10. **ContactSection.tsx** - Contact info + social links
11. **CommandPalette.tsx** - Cmd+K searchable navigation
12. **ThemeToggle.tsx** - Dark/light mode switcher
13. **ScrollReveal.tsx** - Wrapper for scroll animations

### Step 6: Create Layout and Page
- `app/layout.tsx` - Root layout with fonts, metadata, theme provider
- `app/page.tsx` - Main page importing all sections
- `app/globals.css` - Global styles

### Step 7: Add Animations
- Page load: Black curtain reveal
- Scroll: Fade-in/slide-up animations for sections
- Hover: Tilted card effect, project card reveals
- Navigation: Smooth scroll between sections

### Step 8: Add Command Palette
- Cmd+K keyboard shortcut
- Search through sections
- Quick navigation

---

## 7. Features to Implement

### A. Loading Screen
- Full black screen on initial load
- Animated "hello" text (handwritten font - Cedarville Cursive)
- Curtain reveal animation after 1.5-2 seconds
- Uses Framer Motion for smooth transitions

### B. Navigation
**Desktop:**
- Fixed vertical sidebar on the right
- Circular icons for each section
- Active section indicator (green highlight)
- Smooth scroll on click

**Mobile:**
- Fixed bottom bar
- Horizontal layout
- Same icon style

### C. Hero Section
- Two-column layout (image + text)
- **Left**: Profile image with 3D tilt effect
  - Image rotates based on mouse position
  - Green accent shape behind image
- **Right**: Name, title, description
- **Circular rotating text** around profile image
  - Text orbits the image continuously
  - Uses CSS transforms for rotation

### D. About Section
- Two-column grid
- Left: Bio paragraph
- Right: 2x2 stats grid (Projects, Experience, Clients, Reviews)
- Stats cards with hover effects (lift + border color change)

### E. Skills Section
- Grid of skill bars
- Each skill: Name + percentage bar
- Animated progress bars on scroll
- Skills: Flutter, Dart, iOS, Firebase, REST API, IBM Maximo, Figma, Presentation, Mentorship, Databases

### F. Experience/Timeline Section
- Vertical timeline with alternating items
- Left side: Duration badge
- Right side: Role, company, description
- Icons for work (briefcase) vs education (graduation cap)
- Border line connecting items

### G. Projects Section
- 3-column grid of project cards
- Each card: Image + hover overlay
- On hover: Image zooms, overlay appears with project name + GitHub link
- Projects from JSON data

### H. Blogs Section
- 3-column grid
- Each card: Image + title + excerpt
- Hover effects: Image grayscale to color, slight lift

### I. Contact Section
- Left side: Contact info cards (location, email, education, phone, languages)
- Social media icons (LinkedIn, Twitter, Facebook, GitHub, YouTube)
- Each social icon: Circular button, hover changes to green

### J. Theme Toggle
- Fixed position button (top-right)
- Toggles between dark (default) and light mode
- Uses CSS variables for theme colors
- Persists preference in localStorage

### K. Command Palette
- Triggered by Cmd+K (Mac) or Ctrl+K (Windows)
- Modal overlay with search input
- Lists all sections as navigable items
- Keyboard navigation (arrow keys + Enter)
- Closes on Escape or click outside

### L. Scroll Animations
- Sections fade in and slide up on scroll
- Uses Intersection Observer API
- Staggered animations for grid items

---

## 8. Domain Registration & Deployment

### Option A: Register magesh_kanna.dev Domain

**Step 1: Buy Domain**
1. Go to https://www.cloudflare.com/products/registrar/
2. Search for `magesh_kanna.dev`
3. Add to cart and complete purchase (~$12/year)
4. Cloudflare is recommended for free DNS + SSL

**Alternative registrars:**
- Google Domains (now Squarespace)
- Namecheap
- Porkbun

**Step 2: Configure DNS (Cloudflare)**
After purchase, add these DNS records:
```
Type    Name    Content           Proxy
A       @       76.76.21.21       Proxied
CNAME   www     cname.vercel-dns.com  Proxied
```

### Option B: Deploy to Vercel

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial portfolio migration"
git remote add origin https://github.com/Magesh-kanna/portfolio-mk.git
git push -u origin main
```

**Step 2: Connect to Vercel**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import the `portfolio-mk` repository
5. Framework: Next.js (auto-detected)
6. Click "Deploy"

**Step 3: Add Custom Domain**
1. In Vercel project settings → "Domains"
2. Add `magesh_kanna.dev`
3. Add `www.magesh_kanna.dev`
4. Vercel will show DNS records to configure
5. Update DNS records at Cloudflare as shown

**Step 4: SSL Certificate**
- Vercel auto-provisions SSL via Let's Encrypt
- Takes 24-48 hours after DNS propagation

### Step 5: Verify Deployment
1. Visit https://magesh_kanna.dev
2. Check all sections work
3. Test mobile responsiveness
4. Verify resume download works

---

## 9. Checklist

### Pre-Migration
- [ ] Backup current files to `legacy/` folder
- [ ] Verify all images exist in `img/` and `assets/`
- [ ] Verify `resume.pdf` is accessible
- [ ] Note down all current content (already in JSON schema above)

### Development
- [ ] Initialize Next.js project
- [ ] Install dependencies (framer-motion, lucide-react, etc.)
- [ ] Configure Tailwind with dark theme colors
- [ ] Create `portfolio-data.json` with all content
- [ ] Create all components (see Section 6)
- [ ] Implement loading screen animation
- [ ] Implement command palette (Cmd+K)
- [ ] Implement tilted card effect
- [ ] Implement circular rotating text
- [ ] Add scroll reveal animations
- [ ] Add theme toggle (dark/light)
- [ ] Make fully responsive
- [ ] Add proper SEO metadata
- [ ] Add Open Graph images
- [ ] Test on mobile devices

### Deployment
- [ ] Register `magesh_kanna.dev` domain
- [ ] Configure DNS (Cloudflare)
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Add custom domain in Vercel
- [ ] Verify SSL certificate
- [ ] Test all links
- [ ] Verify resume download

---

## Quick Reference: Content Updates

To update any content, edit `data/portfolio-data.json`:

```bash
# Example: Update project
# Edit data/portfolio-data.json → projects.items[0].name

# Example: Add new skill
# Edit data/portfolio-data.json → skills.items

# Example: Change contact info
# Edit data/portfolio-data.json → contact.info
```

The site will automatically reflect changes on next build/deploy.

---

## Notes for Other AI Models

If continuing this project with another AI model:

1. **Read this PLAN.md first** - It contains the full specification
2. **Read `data/portfolio-data.json`** - Contains all content data
3. **Use the source portfolio** (https://debpriyo.is-a.dev/) as visual reference
4. **Prioritize**: Loading screen → Navigation → Hero → About → Skills → Experience → Projects → Contact
5. **Key libraries**: framer-motion for animations, lucide-react for icons, Tailwind for styling
6. **Test frequently**: Run `npm run dev` after each component
7. **Deploy**: Push to GitHub → Connect to Vercel → Add custom domain

---

*Last updated: August 2026*
