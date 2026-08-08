"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  image: string;
  github: string;
  demo: string;
  description: string;
  tags: string[];
  stars?: number;
}

interface ProjectsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  items: Project[];
}

export default function ProjectsSection({
  title,
  subtitle,
  description,
  items,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="section py-24 relative">
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
            Featured{" "}
            <span className="text-rose-500">Projects</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider mb-4">
            {subtitle}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="border border-border rounded-xl bg-card overflow-hidden h-full flex flex-col hover:border-foreground/30 transition-colors">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-card/80 backdrop-blur-sm text-card-foreground text-sm font-semibold rounded-lg border border-border hover:border-foreground/30 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {project.name}
                    </h3>
                    {project.stars && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <span>★</span>
                        <span className="text-sm font-mono">{project.stars}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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
