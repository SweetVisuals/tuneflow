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
  layout: 'grid' | 'list' | 'masonry';
  theme: 'modern' | 'minimal' | 'classic';
  showStats: boolean;
}