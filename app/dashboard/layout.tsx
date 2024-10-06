'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/Button/Button'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Team Management', href: '/dashboard/team-management', icon: '👥' },
  { name: 'Player Database', href: '/dashboard/player-database', icon: '🏀' },
  { name: 'Watchlist', href: '/dashboard/watchlist', icon: '👀' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: '🔔' },
//   { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
//   { name: 'Scouting', href: '/dashboard/scouting', icon: '🔍' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/dashboard" className="text-2xl font-bold">
              Basketball Manager
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md hover:bg-orange-700 ${
                    pathname === item.href ? 'bg-orange-700' : ''
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              Menu
            </Button>
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
                pathname === item.href ? 'bg-orange-700' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}