"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  type: string;
  duration: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

interface ExperienceSectionProps {
  title: string;
  items: ExperienceItem[];
}

export default function ExperienceSection({ title, items }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section py-24 relative">
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
            My{" "}
            <span className="text-rose-500">Journey</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {title}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500 via-purple-500 to-indigo-500" />

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-rose-500 rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(255,35,87,0.5)]" />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="p-6 border border-border rounded-xl bg-card hover:border-foreground/30 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                      item.type === "work"
                        ? "bg-rose-500/10 text-rose-500"
                        : "bg-purple-500/10 text-purple-500"
                    }`}>
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <span className="text-muted-foreground text-xs">{item.location}</span>
                  </div>

                  <span className="inline-block px-3 py-1 bg-secondary border border-border text-muted-foreground text-xs font-mono rounded-lg mb-3">
                    {item.duration}
                  </span>

                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {item.role}
                  </h3>
                  <p className="text-foreground font-medium mb-3">{item.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary border border-border text-muted-foreground text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
