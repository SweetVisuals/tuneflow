import { Button } from '@/components/ui/button';
import { Camera, Pencil, Settings } from 'lucide-react';
import { useRef } from 'react';

interface ProfileBannerProps {
  isCurrentUser: boolean;
  onEditClick: () => void;
  onSettingsClick: () => void;
  onUploadClick: () => void;
}

export function ProfileBanner({ 
  isCurrentUser,
  onEditClick,
  onSettingsClick,
  onUploadClick
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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="h-8 w-8 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
