import { Badge } from '@/components/ui/badge';
import { Gem, Headphones, MapPin, UsersRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileInfoProps {
  name: string;
  bio: string;
  tag: string;
  isCurrentUser: boolean;
  onSave: (data: { bio: string; tag: string }) => void;
}

export function ProfileInfo({ 
  name, 
  bio, 
  tag,
  isCurrentUser
}: ProfileInfoProps) {
  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-4">
            {tag && <Badge variant="outline">{tag}</Badge>}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">New York, NY</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <UsersRound className="h-4 w-4" />
            <span className="text-sm">0 followers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gem className="h-4 w-4" />
            <span className="text-sm">0 gems</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">0 streams</span>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
        {bio || (
          <span className="text-muted-foreground/60">
            This user hasn't added a bio yet. 
            <br />
            <span className="text-xs">Tell your story and showcase your work to connect with others.</span>
          </span>
        )}
      </p>
    </div>
  );
}