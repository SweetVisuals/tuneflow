"use client"

import * as React from "react"
import { createClient } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ25jaWpodGJwbG5lcHlzYmxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM3NTQ5MCwiZXhwIjoyMDYyOTUxNDkwfQ.o46erUPw6uWTdU5XjHQXmp0HHLyubqWBbUzB-cFVyWE"
const supabaseAdmin = createClient(
  "https://fbgncijhtbplnepysbld.supabase.co",
  serviceRoleKey
)
import {
  BadgeCheck,
  Bell,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CaretSortIcon, ComponentPlaceholderIcon } from "@radix-ui/react-icons"

export function NavUser() {
  const { isMobile } = useSidebar()
  const [user, setUser] = React.useState<{
    name: string
    email: string
  } | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (!user) {
          console.log('No authenticated user')
          return
        }

        // Fetch from profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('email, username, full_name')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
          return
        }

        if (profile) {
          setUser({
            email: profile.email,
            name: profile.full_name || profile.username || profile.email?.split('@')[0] || 'User'
          })
        }
      } catch (error) {
        console.error('Error in fetchUser:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={user?.name || ''} />
                <AvatarFallback className="rounded-lg">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {loading ? (
                  <>
                    <span className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <span className="mt-1 h-3 w-16 animate-pulse rounded bg-muted" />
                  </>
                ) : user ? (
                  <>
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </>
                ) : (
                  <span className="truncate text-xs">Not logged in</span>
                )}
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={user?.name || ''} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {loading ? (
                    <>
                      <span className="h-4 w-24 animate-pulse rounded bg-muted" />
                      <span className="mt-1 h-3 w-16 animate-pulse rounded bg-muted" />
                    </>
                  ) : user ? (
                    <>
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                  ) : (
                    <span className="truncate text-xs">Not logged in</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                <LayoutDashboard />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ComponentPlaceholderIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {
              const { error } = await supabase.auth.signOut()
              if (error) {
                console.error('Error logging out:', error.message)
              }
            }}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
