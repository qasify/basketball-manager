"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";

const navItems = [
  { name: "Team Management", href: "/team-management", icon: "👥" },
  { name: "Player Database", href: "/player-database", icon: "🏀" },
  { name: "Watchlist", href: "/watchlist", icon: "👀" },
  { name: "News", href: "/news", icon: "🗞️" },
  { name: "Notifications", href: "/notifications", icon: "🔔" },
];

const NavigationBar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold">
              Basketball Manager
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md hover:bg-orange-700 ${
                    pathname === item.href ? "bg-orange-700" : ""
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <div className="rounded-full bg-white w-14 h-14 text-5xl flex justify-center items-center">🧑🏻</div>
            </nav>
            <Button
              variant="outline"
              className="md:hidden bg-white "
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              Menu
            </Button>
            <div className="rounded-full bg-white w-14 h-14 text-5xl flex justify-center items-center md:hidden">🧑🏻</div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-orange-600 text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 hover:bg-orange-700 ${
                pathname === item.href ? "bg-orange-700" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavigationBar;
