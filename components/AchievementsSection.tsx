"use client";

import { motion } from "framer-motion";

interface Achievement {
  type: string;
  title: string;
  date: string;
  description: string;
  icon: string;
}

interface AchievementsSectionProps {
  title: string;
  items: Achievement[];
}

const typeColors: Record<string, string> = {
  speaking: "bg-rose-500/10 text-rose-500",
  community: "bg-emerald-500/10 text-emerald-500",
  github: "bg-foreground/10 text-foreground",
  award: "bg-amber-500/10 text-amber-500",
};

const typeIcons: Record<string, string> = {
  speaking: "🎤",
  community: "👥",
  github: "🐙",
  award: "🏆",
};

export default function AchievementsSection({ title, items }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="section py-24 relative">
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
            Achievements &{" "}
            <span className="text-rose-500">Community</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {title}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-border rounded-xl bg-card hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    typeColors[item.type] || typeColors.award
                  }`}
                >
                  <span className="text-xl">{typeIcons[item.type] || "🏆"}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                      typeColors[item.type] || typeColors.award
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-muted-foreground text-xs font-mono">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
