export interface ProfileStats {
  followers: number;
  following: number;
  likes: number;
  views: number;
}

export interface ProfileAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface ProfileSkill {
  name: string;
  level: number; // 0-100
  endorsements: number;
}

export interface ProfileSocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfilePreferences {
  theme: 'modern' | 'minimal' | 'classic' | 'artistic';
  accentColor: string;
  backgroundStyle: string;
  fontFamily: string;
  showStats: boolean;
  showAchievements: boolean;
  showSkills: boolean;
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'followers';
    showActivity: boolean;
    showLocation: boolean;
  };
  notificationPreferences: {
    mentions: boolean;
    messages: boolean;
    followers: boolean;
    likes: boolean;
  };
}

export interface ProfileData {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  location: string;
  timezone: string;
  joinedAt: Date;
  avatarUrl: string;
  bannerUrl: string;
  stats: ProfileStats;
  achievements: ProfileAchievement[];
  skills: ProfileSkill[];
  socialLinks: ProfileSocialLink[];
  preferences: ProfilePreferences;
}

export interface ProfileProps {
  user: {
    id: string;
    name: string;
    avatarUrl: string;
    bio: string;
    isNew?: boolean;
  };
  currentUserId?: string;
  showBanner?: boolean;
  isSidebarCollapsed?: boolean;
  showEditButton?: boolean;
}