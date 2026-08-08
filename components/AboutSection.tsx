"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  title: string;
  subtitle: string;
  bio: string;
  stats: { value: string; label: string }[];
}

export default function AboutSection({
  title,
  subtitle,
  bio,
  stats,
}: AboutSectionProps) {
  return (
    <section id="about" className="section py-24 relative">
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
            {title.split(" ").map((word, i) => (
              <span key={i} className={i === title.split(" ").length - 1 ? "text-rose-500" : "text-foreground"}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 border border-border rounded-xl bg-card">
              <p className="text-card-foreground leading-relaxed text-lg">{bio}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 border border-border rounded-xl bg-card text-center hover:border-foreground/30 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
