import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Award, Calendar, Gem, Globe, Headphones, Link2, MapPin, Star, UsersRound } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileInfoProps {
  name: string;
  bio: string;
  tag: string;
  isCurrentUser: boolean;
  onSave: (data: { bio: string; tag: string }) => void;
  isEditing?: boolean;
  stats?: {
    followers: number;
    following: number;
    likes: number;
    views: number;
  };
  achievements?: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt: string;
  }[];
  skills?: {
    name: string;
    level: number;
    endorsements: number;
  }[];
  socialLinks?: {
    platform: string;
    url: string;
    username: string;
  }[];
  location?: {
    city: string;
    country: string;
    timezone: string;
  };
}

export function ProfileInfo({ 
  name, 
  bio, 
  tag,
  isCurrentUser,
  onSave,
  isEditing = false,
  stats = {
    followers: 0,
    following: 0,
    likes: 0,
    views: 0
  },
  achievements = [],
  skills = [],
  socialLinks = [],
  location
}: ProfileInfoProps) {
  const [editedBio, setEditedBio] = useState(bio);
  const [editedTag, setEditedTag] = useState(tag);

  useEffect(() => {
    setEditedBio(bio);
    setEditedTag(tag);
  }, [bio, tag]);

  useEffect(() => {
    if (!isEditing && (editedBio !== bio || editedTag !== tag)) {
      onSave({
        bio: editedBio,
        tag: editedTag
      });
    }
  }, [isEditing]);

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-4 w-full">
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
            {location && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location.city}, {location.country}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <UsersRound className="h-4 w-4" />
            <span className="text-sm">{stats.followers.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4" />
            <span className="text-sm">{stats.likes.toLocaleString()} likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">{stats.views.toLocaleString()} views</span>
          </div>
          {location?.timezone && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span className="text-sm">{location.timezone}</span>
            </div>
          )}
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

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {achievements.map((achievement) => (
            <Tooltip key={achievement.id}>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="cursor-help">
                  <Award className="h-3 w-3 mr-1" />
                  {achievement.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-4">Skills & Expertise</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.endorsements} endorsements</span>
                  </div>
                  <Progress value={skill.level} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Link2 className="h-4 w-4" />
              {link.platform}
            </a>
          ))}
        </div>
      )}

      {/* Join Date */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-4">
        <Calendar className="h-4 w-4" />
        <span>Joined January 2024</span>
      </div>
    </div>
  );
}