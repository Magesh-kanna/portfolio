"use client";

import { motion } from "framer-motion";

interface ContactData {
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    medium: string;
    instagram: string;
  };
}

interface ContactSectionProps {
  title: string;
  data: ContactData;
}

export default function ContactSection({ title, data }: ContactSectionProps) {
  const contactItems = [
    { label: "Email", value: data.email, icon: "✉", href: `mailto:${data.email}` },
    { label: "Phone", value: data.phone, icon: "📱", href: `tel:${data.phone}` },
    { label: "Location", value: data.location, icon: "📍", href: null },
  ];

  const socialItems = [
    { name: "GitHub", icon: "🐙", href: data.socials.github, color: "hover:text-foreground" },
    { name: "LinkedIn", icon: "💼", href: data.socials.linkedin, color: "hover:text-blue-500" },
    { name: "Twitter", icon: "🐦", href: data.socials.twitter, color: "hover:text-sky-500" },
    { name: "Medium", icon: "📝", href: data.socials.medium, color: "hover:text-emerald-500" },
    { name: "Instagram", icon: "📸", href: data.socials.instagram, color: "hover:text-rose-500" },
  ];

  return (
    <section id="contact" className="section py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-big-shoulders)" }}
          >
            Get In{" "}
            <span className="text-rose-500">Touch</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {title}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {contactItems.map((item) => (
              <div key={item.label} className="p-6 border border-border rounded-xl bg-card flex items-center gap-4 hover:border-foreground/30 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-card-foreground font-medium hover:text-foreground transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-card-foreground font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-border rounded-xl bg-card flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">Connect with me</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Feel free to reach out for collaborations, opportunities, or just a friendly hello!
              I&apos;m always open to discussing new projects and ideas.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialItems.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-xl text-muted-foreground hover:border-foreground/30 transition-all ${social.color}`}
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
