import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { useRef } from 'react';

interface ProfileAvatarProps {
  avatarUrl: string;
  isCurrentUser: boolean;
  onUploadClick: () => void;
}

export function ProfileAvatar({ 
  avatarUrl,
  isCurrentUser,
  onUploadClick
}: ProfileAvatarProps) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isCurrentUser) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      ref={avatarRef}
      className="relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative group">
        <Avatar className="h-20 w-20 md:h-28 md:w-28 border-4 border-background">
          <AvatarImage src={avatarUrl} alt="" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        {isCurrentUser && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onUploadClick();
                }
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full bg-black/60 z-10">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
