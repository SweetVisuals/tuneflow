import { useState } from 'react';
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from 'react-router-dom';
import { Bell, Folder, LayoutDashboard, Menu, Search, Upload, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
  authenticated: boolean;
  style?: React.CSSProperties;
  onUpload?: (files: FileList) => Promise<void>;
  isUploading?: boolean;
}

export function Header({ setActiveTab, authenticated, style, onUpload, isUploading }: HeaderProps) {
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header background
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={cn(
        "fixed top-0 pt-6 pb-6 z-50 transition-all duration-200 flex items-center h-16 border-b",
        state === "collapsed" ? "left-[64px] w-[calc(100%-64px)]" : "left-[250px] w-[calc(100%-250px)]",
        "group-data-[collapsible=icon]:left-[64px] group-data-[collapsible=icon]:w-[calc(100%-64px)]",
        "right-0",
        isScrolled 
          ? "bg-background border-border" 
          : "bg-background/80 backdrop-blur-sm border-transparent"
      )}
      style={style}
    >
      <div className={cn(
        "flex items-center gap-2",
        state === "collapsed" ? "ml-0" : "ml-4",
        "group-data-[collapsible=icon]:ml-2"
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-primary/5"
          onClick={toggleSidebar}
          aria-label={state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{state === "collapsed" ? "Expand" : "Collapse"}</span>
        </Button>
      </div>
      <div className="mx-auto max-w-xl w-full relative ml-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search videos, files, or artists..."
          className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-primary/5 relative w-auto px-3 gap-2"
          disabled={isUploading}
          onClick={() => setActiveTab('files')}
        >
          {isUploading ? (
            <div className="flex items-center gap-2 h-5">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-xs">Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 h-5">
              <Upload className="h-4 w-4" />
              <span className="text-xs">Upload</span>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            onChange={(e) => e.target.files && onUpload?.(e.target.files)}
          />
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-primary/5">
          <Bell className="h-5 w-5" />
        </Button>

        <ThemeToggle />

        {authenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 mr-8">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={async () => {
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user) {
                    const { data: profile, error } = await supabase
                      .from('profiles')
                      .select('username, full_name')
                      .eq('id', user.id)
                      .single();
                    
                    if (error || !profile?.username) {
                      // Fall back to using email prefix if username not found
                      const username = user.email?.split('@')[0] || 'me';
                      navigate(`/user/${username}`);
                    } else {
                      navigate(`/user/${profile.username}`);
                    }
                  }
                }}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  if (!window.location.pathname.startsWith('/user')) {
                    setActiveTab('files');
                  }
                }}>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>My Files</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => {
                await supabase.auth.signOut();
                navigate('/login');
              }}>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="mr-6"
            onClick={() => setActiveTab('login')}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
