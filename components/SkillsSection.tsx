"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  name: string;
  items: Skill[];
}

interface SkillsSectionProps {
  title: string;
  categories: SkillCategory[];
}

export default function SkillsSection({ title, categories }: SkillsSectionProps) {
  const allSkills = categories.flatMap((cat) => cat.items);

  return (
    <section id="skills" className="section py-24 relative overflow-hidden">
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
            <span className="text-rose-500">Skills</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {title}
          </p>
        </motion.div>

        {/* Marquee Skills Ticker */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex overflow-hidden">
            <div className="flex gap-4 animate-marquee group-hover:animation-play-state-paused whitespace-nowrap">
              {[...allSkills, ...allSkills].map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="px-6 py-3 bg-secondary border border-border rounded-xl flex items-center gap-3 hover:border-foreground/30 transition-colors"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-muted-foreground text-sm font-mono">{skill.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="p-6 border border-border rounded-xl bg-card"
            >
              <h3 className="text-lg font-semibold mb-6 text-foreground">{category.name}</h3>
              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-card-foreground text-sm">{skill.name}</span>
                      <span className="text-muted-foreground text-xs font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
