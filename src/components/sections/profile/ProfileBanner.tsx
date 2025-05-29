import { Button } from '@/components/ui/button';
import { Camera, Pencil, Settings } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProfileBannerProps {
  isCurrentUser: boolean;
  onEditClick: () => void;
  onSettingsClick: () => void;
  onUploadClick: () => void;
  isEditing?: boolean;
}

export function ProfileBanner({ 
  isCurrentUser,
  onEditClick,
  onSettingsClick,
  onUploadClick,
  isEditing = false
}: ProfileBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={bannerRef}
      className="group relative h-40 md:h-60 rounded-lg bg-muted transition-all duration-300"
      onClick={isCurrentUser ? onUploadClick : undefined}
    >
      <div className="w-full h-full flex items-center justify-center hover:bg-black/20 transition-colors duration-300 px-4">
        <span className="text-muted-foreground"></span>
        {isCurrentUser && (
          <>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className={cn(
                  "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20",
                  isEditing && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick();
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onSettingsClick();
                }}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}