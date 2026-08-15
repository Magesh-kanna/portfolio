"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  FileText,
  Send,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";
import MobileContact from "@/components/mobile/MobileContact";

interface ContactSectionProps {
  title?: string;
  data?: any;
}

export default function ContactSection({}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("codermagesh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" });
      setFormSubmitted(false);
    }, 4000);
  };

  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mageshkanna/",
      icon: LinkedinIcon,
      label: "7K+ Network",
    },
    {
      name: "GitHub",
      url: "https://github.com/Magesh-kanna",
      icon: GithubIcon,
      label: "37+ Repositories",
    },
    {
      name: "Twitter / X",
      url: "https://x.com/codermagesh",
      icon: TwitterIcon,
      label: "@codermagesh",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] relative">
      {/* Background glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-rose-500/10 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dedicated Mobile View (< 768px) */}
        <div className="block md:hidden">
          <MobileContact />
        </div>

        {/* Desktop Web View (>= 768px) */}
        <div className="hidden md:block">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                  08 / Let&apos;s Connect
                </span>
                <span className="w-12 h-[1px] bg-rose-500/40" />
              </div>
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-white tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                HAVE A VISION? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400">
                  LET&apos;S BUILD SOMETHING EXTRAORDINARY.
                </span>
              </h2>
            </div>

            <p
              className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Available for full-time engineering roles & mobile consultations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Links & Email Copy (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Quick Email Copy Card */}
              <div className="p-8 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-2xl">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0e0e11] border border-white/[0.08] mb-4">
                  <span className="text-sm sm:text-base font-mono text-white truncate">
                    codermagesh@gmail.com
                  </span>
                  <button
                    onClick={copyEmail}
                    className="px-3.5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:codermagesh@gmail.com"
                    className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-lg shadow-rose-500/20"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Mail Directly</span>
                  </a>

                  <a
                    href="/assets/resume.pdf"
                    download
                    className="px-5 py-2.5 rounded-full bg-[#1e1e24] hover:bg-[#282830] border border-white/[0.1] text-neutral-300 hover:text-white font-medium text-xs flex items-center gap-2 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>Download CV.pdf</span>
                  </a>
                </div>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socials.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-2xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{soc.name}</h4>
                        <p className="text-[10px] font-mono text-neutral-500">{soc.label}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Contact Message Form (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Mobile Engineering Opportunity / Consultation"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    Project Details or Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or what you'd like to collaborate on..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-xl hover:shadow-white/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Thank you! Your message has been received. I will reply shortly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
