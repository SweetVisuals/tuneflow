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