import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Materi', path: '/', icon: 'menu_book' },
    { label: 'Laboratorium', path: '/laboratorium', icon: 'science' },
    { label: 'Anatomi 3D', path: '/anatomi', icon: 'view_in_ar' },
    { label: 'Kuis', path: '/kuis', icon: 'quiz' },
  ]

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const NavContent = () => (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-6 pb-2">
        {/* App Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Bio Smart</div>
            <div className="text-xs text-muted-foreground">Belajar Biologi Interaktif</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-1.5" aria-label="Menu Utama">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/' && location.pathname.startsWith('/materi/')) ||
              (item.path === '/anatomi' && location.pathname === '/anatomi-3d')
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-foreground'}`}
              >
                <span className={`material-symbols-outlined ${isActive ? '' : 'text-muted-foreground'}`}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* CTA */}
      <div className="p-4 mt-auto">
        <Link to="/laboratorium" className="w-full">
          <Button variant="default" className="w-full flex items-center gap-2 justify-center shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            Mulai Praktikum
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Hamburger Toggle via Shadcn Sheet */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <span className="material-symbols-outlined">menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu Utama</SheetTitle>
            </SheetHeader>
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] h-screen sticky top-0 shrink-0 z-40">
        <NavContent />
      </aside>
    </>
  )
}
