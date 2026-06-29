"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  // Mantém a aba ativa em sincronia com o #hash da URL (clique ou scroll manual).
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      const match = items.find((i) => i.url === hash);
      if (match) setActiveTab(match.name);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 mb-6 -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white/80 px-1 py-1 shadow-card backdrop-blur-lg sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors sm:px-6",
                "text-ink/70 hover:text-forest-600",
                isActive && "bg-forest-50 text-forest-700"
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">
                <Icon size={18} strokeWidth={2.4} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-forest-500/5"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-forest-500">
                    <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-forest-500/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-forest-500/20 blur-md" />
                    <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-forest-500/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
