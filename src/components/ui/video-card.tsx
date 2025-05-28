import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Play } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  title: string;
  author: string;
  views: string;
  timestamp: string;
  thumbnailUrl: string;
  authorImgUrl: string;
}

export function VideoCard({ 
  title, 
  author, 
  views, 
  timestamp, 
  thumbnailUrl, 
  authorImgUrl 
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-muted overflow-hidden group">
        <img
          src={thumbnailUrl}
          alt={title}
          className={cn(
            "object-cover w-full h-full transition-transform duration-300",
            isHovered && "scale-105"
          )}
          style={{ objectPosition: 'center' }}
        />
        <div className={cn(
          "absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity",
          isHovered && "opacity-100"
        )}>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full bg-background/90 text-foreground hover:scale-110 transition-transform"
          >
            <Play className="h-4 w-4 ml-0.5" />
          </Button>
        </div>
      </div>
      <CardContent className="p-2">
        <div className="flex gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={authorImgUrl} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-xs line-clamp-2" title={title}>
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{author}</p>
            <p className="text-[0.7rem] text-muted-foreground">
              {views} views • {timestamp}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-3 w-3" />
          </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save to Watch Later</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Not Interested</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
