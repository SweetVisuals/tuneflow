import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gem, Headphones, MapPin, UsersRound } from 'lucide-react';
import { useState } from 'react';
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
  const [editedBio, setEditedBio] = useState(bio);
  const [editedTag, setEditedTag] = useState(tag);

  const handleSave = () => {
    onSave({
      bio: editedBio,
      tag: editedTag
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-4">
              {isEditing ? (
                <Input
                  value={editedTag}
                  onChange={(e) => setEditedTag(e.target.value)}
                  placeholder="Add a tag"
                  className="w-32"
                />
              ) : (
                tag && <Badge variant="outline">{tag}</Badge>
              )}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
          {isCurrentUser && (
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
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
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          placeholder="Tell your story and showcase your work to connect with others."
          className="min-h-[100px]"
        />
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
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