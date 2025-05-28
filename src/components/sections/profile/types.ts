import { ReactNode } from 'react';

export interface ProfileItem {
  id: string;
  name: string;
  type: string;
  content: ReactNode; // Allow React elements as content
  icon: ReactNode;
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
