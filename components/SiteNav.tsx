"use client";

import { Home, Gift, CalendarHeart } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Início", url: "#inicio", icon: Home },
  { name: "Lista", url: "#presentes", icon: Gift },
  { name: "Contagem", url: "#contagem", icon: CalendarHeart },
];

export default function SiteNav() {
  return <NavBar items={navItems} />;
}
