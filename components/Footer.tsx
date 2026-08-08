"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm"
          >
            © {new Date().getFullYear()} Magesh K. Crafted with{" "}
            <span className="text-rose-500">❤</span> using Next.js & Tailwind CSS
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            <span>Always learning</span>
            <span className="text-foreground">⚡</span>
            <span>Always building</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
