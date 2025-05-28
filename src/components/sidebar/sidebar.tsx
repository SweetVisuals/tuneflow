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
import {
  Home,
  PlusCircle,
  Play,
  Music,
  BookOpen,
  Folder,
  Users,
  BarChart,
  Heart,
  Zap,
  LifeBuoy,
  MessageSquare,
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
  Handshake,
  FileText,
  Video,
  Gem
} from "lucide-react"
import { ChevronRight } from "lucide-react"

interface SidebarProps {
  authenticated: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigate: (path: string) => void;
}

export function AppSidebar({ authenticated, activeTab, setActiveTab, navigate }: SidebarProps) {
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
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8" onClick={() => {
                setActiveTab('discover');
                navigate('/');
              }}>
                <Home className="w-4 h-4 group-data-[collapsible=icon]:mx-auto" />
                <span className="group-data-[collapsible=icon]:hidden">Discover</span>
              </div>
            </SidebarMenuItem>

            {authenticated && (
              <>
                <Collapsible
                  asChild
                  defaultOpen={activeTab === 'community'}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8" onClick={() => {
                        navigate('/');
                      }}>
                        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                          <Users className="w-4 h-4" />
                          <span>Community</span>
                        </div>
                        <Users className="w-4 h-4 group-data-[collapsible=icon]:mx-auto hidden group-data-[collapsible=icon]:block text-white" />
                        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                      <SidebarMenuSub className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex-col group-data-[collapsible=icon]:group-data-[state=open]/collapsible:items-center group-data-[collapsible=icon]:group-data-[state=open]/collapsible:gap-1 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:ml-0 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:border-l-0 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:px-0">
                        <SidebarMenuSubItem>
                          <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('tutorials');
                            navigate('/tutorials');
                          }}>
                            <span className="group-data-[collapsible=icon]:hidden">Tutorials</span>
                            <GraduationCap className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                          </div>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('connect');
                            navigate('/connect');
                          }}>
                            <span className="group-data-[collapsible=icon]:hidden">Connect</span>
                            <Handshake className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                          </div>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('feedback');
                            navigate('/feedback');
                          }}>
                            <span className="group-data-[collapsible=icon]:hidden">Feedback</span>
                            <MessageSquare className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                          </div>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                <Collapsible
                  asChild
                  defaultOpen={activeTab === 'services'}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8" onClick={() => {
                        navigate('/');
                      }}>
                        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                          <LifeBuoy className="w-4 h-4" />
                          <span>Services</span>
                        </div>
                        <LifeBuoy className="w-4 h-4 group-data-[collapsible=icon]:mx-auto hidden group-data-[collapsible=icon]:block" />
                        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                      <SidebarMenuSub className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex-col group-data-[collapsible=icon]:group-data-[state=open]/collapsible:items-center group-data-[collapsible=icon]:group-data-[state=open]/collapsible:gap-1 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:ml-0 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:border-l-0">
                        <SidebarMenuSubItem>
                          <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('jobs');
                            navigate('/jobs');
                          }}>
                            <span className="group-data-[collapsible=icon]:hidden">Jobs</span>
                            <Briefcase className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                          </div>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('marketing');
                            navigate('/marketing');
                          }}>
                            <span className="group-data-[collapsible=icon]:hidden">Marketing</span>
                            <Megaphone className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                          </div>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {authenticated && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                asChild
                defaultOpen={activeTab === 'profile'}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-[#242424] cursor-pointer transition-colors duration-200 rounded-md group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
                      <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                      <User className="w-4 h-4 group-data-[collapsible=icon]:mx-auto hidden group-data-[collapsible=icon]:block" />
                      <ChevronRight className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex group-data-[collapsible=icon]:group-data-[state=open]/collapsible:flex-col group-data-[collapsible=icon]:group-data-[state=open]/collapsible:items-center group-data-[collapsible=icon]:group-data-[state=open]/collapsible:gap-1 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:ml-0 group-data-[collapsible=icon]:group-data-[state=open]/collapsible:border-l-0">
                      <SidebarMenuSubItem>
                        <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]">
                          <span className="group-data-[collapsible=icon]:hidden">Tutorials</span>
                          <Video className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                        </div>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]">
                          <span className="group-data-[collapsible=icon]:hidden">Services</span>
                          <Gem className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                        </div>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <div className="block px-4 py-1.5 text-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-md hover:bg-[#242424]" onClick={() => {
                            setActiveTab('analytics');
                            navigate('/analytics');
                          }}>
                          <span className="group-data-[collapsible=icon]:hidden">Analytics</span>
                          <BarChart className="w-3 h-3 text-[#8b5cf6] hidden group-data-[collapsible=icon]:block" />
                        </div>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
