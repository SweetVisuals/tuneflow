import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  name: string;
  role: string;
  imgUrl: string;
  followers: string;
}

export function ArtistCard({ name, role, imgUrl, followers }: ArtistCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-4 flex flex-col items-center">
        <div 
          className={cn(
            "relative mb-3",
            "before:content-[''] before:absolute before:inset-0 before:rounded-full",
            "before:bg-gradient-to-br before:from-purple-500/20 before:to-blue-500/20"
          )}
        >
          <Avatar className="h-16 w-16 border-4 border-background">
            <AvatarImage src={imgUrl} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
        
        <h3 className="font-medium text-center">{name}</h3>
        <p className="text-sm text-muted-foreground text-center mb-2">{role}</p>
        <p className="text-xs text-muted-foreground text-center mb-3">{followers} followers</p>
        
        <Button 
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className="w-full gap-1"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <UserPlus className="h-4 w-4" />
          <span>{isFollowing ? 'Following' : 'Follow'}</span>
        </Button>
      </CardContent>
    </Card>
  );
}