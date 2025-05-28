import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Header } from './header';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Dashboard } from './dashboard';
import { AuthContainer } from './auth/auth-container';
import { logout } from '@/lib/supabase';
import { NavUser } from './nav-user';
import { AppSidebar } from './sidebar/sidebar';
import { SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  authenticated: boolean;
  children?: React.ReactNode;
  activeTab?: string;
  hideFooter?: boolean;
}

export function Layout({ authenticated, children, activeTab: propActiveTab, hideFooter }: LayoutProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(propActiveTab || 'discover');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    try {
      // TODO: Implement actual file upload logic
      console.log('Uploading files:', files);
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-row">
        <AppSidebar 
          authenticated={authenticated}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
        />

        {/* Main Content */}
        <SidebarInset className="pt-16">
          <div className="fixed top-0 left-[250px] w-[calc(100%-250px)] z-50 group-data-[collapsible=icon]:left-[64px] group-data-[collapsible=icon]:w-[calc(100%-64px)] transition-all duration-300 ease-in-out">
            <Header 
              authenticated={authenticated} 
              setActiveTab={setActiveTab}
              onUpload={handleFileUpload}
              isUploading={isUploading}
            />
          </div>

          {/* Page Content Group */}
          <main className="flex-1 overflow-auto ml-6 pr-12 flex-grow transition-all duration-300 ease-in-out w-full max-w-none">
            <div className="pt-10 h-full w-full max-w-none group-data-[state=collapsed]:pl-[50px]">
              {!authenticated && (activeTab === 'login' || activeTab === 'signup') ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] w-full">
                  <AuthContainer
                    defaultForm={activeTab === 'login' ? 'login' : 'signup'}
                    onLoginSuccess={() => {
                      setActiveTab('discover')
                      navigate("/")
                    }}
                  />
                </div>
              ) : children ? (
                children
              ) : (
                <Dashboard activeTab={activeTab} />
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
