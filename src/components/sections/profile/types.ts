import { ReactNode } from 'react';

export interface ProfileItem {
  id: string;
  name: string;
  type: string;
  content: ReactNode;
  icon: ReactNode;
  visible?: boolean;
  order?: number;
}

export interface ProfileProps {
  user: {
    id: string;
    name: string;
    avatarUrl: string;
    bio: string;
    tag?: string;
    isNew?: boolean;
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
  };
  currentUserId: string;
  showBanner?: boolean;
  isSidebarCollapsed: boolean;
  showEditButton?: boolean;
}

export interface ProfilePreferences {
  layout: 'grid' | 'list' | 'masonry' | 'carousel';
  theme: 'modern' | 'minimal' | 'classic' | 'artistic';
  accentColor?: string;
  background?: 'solid' | 'gradient' | 'pattern' | 'image';
  font?: string;
  customIcons?: boolean;
  animations?: boolean;
  previews?: boolean;
  visibility?: 'public' | 'followers' | 'private';
  activityStatus?: boolean;
  contentPrivacy?: 'public' | 'followers' | 'private';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export interface ContentUploadProps {
  type: 'music' | 'video' | 'service';
  onUpload: (files: File[]) => Promise<void>;
}