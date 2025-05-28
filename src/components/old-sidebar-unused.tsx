"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Folder,
  Heart,
  Home,
  Music,
  Play,
  PlusCircle,
  Users,
  User,
  Zap,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronsUpDown,
  Bell,
  CreditCard,
  Sparkles,
  BadgeCheck,
  Menu,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface SidebarProps {
  open: boolean
  setSidebarOpen: (open: boolean) => void
  setActiveTab: (tab: string) => void
  activeTab: string
  authenticated: boolean
}

interface AppSidebarProps {
  authenticated: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function LegacySidebar({ open, setSidebarOpen, setActiveTab, activeTab, authenticated }: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out",
      open ? "w-[240px]" : "w-[70px]"
    )}>
      <AppSidebar 
        authenticated={authenticated}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  )
}

export function AppSidebar({ authenticated, activeTab, setActiveTab }: AppSidebarProps) {
  const { isMobile } = useSidebar()

  const navMain = [
    {
      title: "Discover",
      url: "#",
      icon: Home,
      isActive: activeTab === "discover",
      onClick: () => setActiveTab("discover"),
    },
    {
      title: "Create",
      url: "#",
      icon: PlusCircle,
      isActive: activeTab === "create",
      onClick: () => setActiveTab("create"),
    },
  ]

  const authenticatedNav = [
    {
      title: "Videos",
      url: "#",
      icon: Play,
      isActive: activeTab === "videos",
      onClick: () => setActiveTab("videos"),
    },
    {
      title: "Audio",
      url: "#",
      icon: Music,
      isActive: activeTab === "audio",
      onClick: () => setActiveTab("audio"),
    },
    {
      title: "Files",
      url: "#",
      icon: Folder,
      isActive: activeTab === "files",
      onClick: () => setActiveTab("files"),
    },
    {
      title: "Connect",
      url: "#",
      icon: Users,
      isActive: activeTab === "connect",
      onClick: () => setActiveTab("connect"),
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart,
      isActive: activeTab === "analytics",
      onClick: () => setActiveTab("analytics"),
    },
  ]

  const libraryNav = [
    {
      title: "Liked Content",
      url: "#",
      icon: Heart,
      isActive: activeTab === "liked",
      onClick: () => setActiveTab("liked"),
    },
    {
      title: "Recent Activity",
      url: "#",
      icon: Zap,
      isActive: activeTab === "recent",
      onClick: () => setActiveTab("recent"),
    },
  ]

  const navSecondary = [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

  const user = {
    name: "User",
    email: "user@example.com",
    avatar: "",
  }

  return (
    <ShadcnSidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Melodify</span>
                  <span className="truncate text-xs">Music Platform</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} onClick={item.onClick}>
                  <a href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {authenticated && authenticatedNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} onClick={item.onClick}>
                  <a href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {authenticated && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Library</SidebarGroupLabel>
              <SidebarMenu>
                {libraryNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} onClick={item.onClick}>
                      <a href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarMenu>
                {navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
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
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!authenticated ? (
                  <>
                    <DropdownMenuItem onClick={() => setActiveTab("login")}>
                      <User className="mr-2 size-4" />
                      Login / Signup
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles className="mr-2 size-4" />
                        Upgrade to Pro
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <BadgeCheck className="mr-2 size-4" />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 size-4" />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="mr-2 size-4" />
                        Notifications
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
