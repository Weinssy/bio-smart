import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import CommandPalette from './CommandPalette'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsPaletteOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 w-full flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        {/* Search Trigger Button & Filter Badges */}
        <div className="flex flex-1 items-center gap-4">
          <Button 
            variant="outline" 
            className="w-full justify-between sm:w-80 text-muted-foreground font-normal"
            onClick={() => setIsPaletteOpen(true)}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Cari materi...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <div className="hidden md:flex gap-2">
            <Button variant="secondary" size="sm" className="h-8 rounded-full">Biologi Sel</Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full text-muted-foreground">Sistem Organ</Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full text-muted-foreground">Ekologi</Button>
          </div>
        </div>

        {/* Trailing Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            title={`Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=raditya" alt="@raditya" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">RP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Raditya Putra</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    raditya@sma.edu
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <span className="material-symbols-outlined text-[16px] mr-2">person</span>
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="material-symbols-outlined text-[16px] mr-2">settings</span>
                Pengaturan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <span className="material-symbols-outlined text-[16px] mr-2">logout</span>
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
