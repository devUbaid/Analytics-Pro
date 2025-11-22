"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from '@/components/theme-toggle'
import { Search, Bell, Settings, LogOut, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Add a new import for the sidebar icon
import { Sidebar } from 'lucide-react'

export function Header({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Determine the section based on the search query
    if (searchQuery.match(/^[A-Z]+$/)) {
      router.push(`/dashboard?section=stocks&symbol=${searchQuery}`)
    } else if (searchQuery.includes('weather')) {
      router.push(`/dashboard?section=weather&city=${searchQuery.replace('weather', '').trim()}`)
    } else if (searchQuery.includes('news')) {
      router.push(`/dashboard?section=news&q=${searchQuery.replace('news', '').trim()}`)
    } else {
      router.push(`/dashboard?section=movies&query=${searchQuery}`)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      })
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="mr-4">
          <Sidebar className="h-5 w-5" />
        </Button>
        <form onSubmit={handleSearch} className="flex-1 flex items-center max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks, weather, news, or movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </form>

        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Profile</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Manage your account
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}