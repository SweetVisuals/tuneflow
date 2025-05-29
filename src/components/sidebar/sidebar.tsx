import { 
  Home,
  PlusCircle,
  Play,
  Music,
  Folder,
  Users,
  BarChart,
  Heart,
  Zap,
  LifeBuoy,
  Settings,
  User,
  LogOut,
  ChevronsUpDown,
  Bell,
  CreditCard,
  Sparkles,
  BadgeCheck,
  Briefcase,
  Megaphone,
  GraduationCap,
  FileText,
  Video,
  Gem
} from "lucide-react"
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"
import { NavUser } from '../nav-user'
import { logout } from '@/lib/supabase'
import { useSidebar } from '@/hooks/use-sidebar'
import { ChevronRight } from "lucide-react"

interface SidebarProps {
  authenticated: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigate: (path: string) => void;
}

export function AppSidebar({ authenticated, activeTab, setActiveTab, navigate }: SidebarProps) {
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
      title: "Jobs",
      url: "#",
      icon: Briefcase,
      isActive: activeTab === "jobs",
      onClick: () => setActiveTab("jobs"),
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart,
      isActive: activeTab === "analytics",
      onClick: () => setActiveTab("analytics"),
    },
  ]

  return (
    <Sidebar className="fixed h-screen w-[250px] border-r bg-[#121212] pt-2" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <div className="flex items-center gap-3 px-4 py-1 bg-[#242424] rounded-lg mb-2 group-data-[collapsible=icon]:p-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:bg-[#8b5cf6] group-data-[state=expanded]:py-2 group-data-[state=expanded]:-mt-1">
              <div className="flex items-center justify-center w-6 h-6 bg-[#8b5cf6] rounded-md group-data-[collapsible=icon]:hidden">
                <Music className="w-4 h-4 text-white" />
              </div>
              <Music className="w-4 h-4 text-white hidden group-data-[collapsible=icon]:block" />
              <span className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Melodify</span>
            </div>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
                  onClick={item.onClick}
                >
                  <item.icon className="w-4 h-4 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </div>
              </SidebarMenuItem>
            ))}

            {authenticated && authenticatedNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
                  onClick={item.onClick}
                >
                  <item.icon className="w-4 h-4 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {authenticated && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-4 h-4 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      {authenticated && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#242424]">
          <NavUser />
        </div>
      )}
    </Sidebar>
  )
}