import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Gem, Headphones, MapPin, MessageCircle, UsersRound, Pencil, Check, X } from 'lucide-react';
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
  isCurrentUser,
  onSave
}: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(bio);

  const handleSave = () => {
    onSave({ bio: editBio, tag });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-4">
            {tag && <Badge variant="outline" className="animate-in fade-in-50">{tag}</Badge>}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">New York, NY</span>
            </div>
          </div>
          
          {isCurrentUser && (
            <div className="flex items-center gap-2 ml-auto">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Bio
                </Button>
              )}
            </div>
          )}
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

      {isEditing ? (
        <Textarea
          value={editBio}
          onChange={(e) => setEditBio(e.target.value)}
          className="min-h-[100px] resize-none text-sm bg-transparent focus-visible:ring-1"
          placeholder="Tell your story and showcase your work..."
        />
      ) : (
        <p className="text-sm text-muted-foreground max-w-2xl pr-20 ml-0.5">
          {bio || (
            <span className="text-muted-foreground/60">
              This user hasn't added a bio yet. 
              <br />
              <span className="text-xs">Tell your story and showcase your work to connect with others.</span>
            </span>
          )}
        </p>
      )}
    </div>
  );
}