"use client";

import { motion } from "framer-motion";

interface Blog {
  title: string;
  image: string;
  excerpt: string;
  link: string;
}

interface BlogsSectionProps {
  title: string;
  items: Blog[];
}

export default function BlogsSection({ title, items }: BlogsSectionProps) {
  return (
    <section id="blogs" className="section py-24 relative">
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
            <span className="text-rose-500">Blogs</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            {title}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((blog, index) => (
            <motion.a
              key={blog.title}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <div className="border border-border rounded-xl bg-card overflow-hidden p-0 h-full flex flex-col hover:border-foreground/30 transition-colors">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-secondary to-background">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                      ✍️
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3 group-hover:text-rose-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="mt-4 flex items-center text-foreground text-sm font-medium">
                    <span>Read Article</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
