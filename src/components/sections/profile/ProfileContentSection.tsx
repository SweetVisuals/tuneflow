import { Music, Gem, Video } from 'lucide-react';
import React, { ReactNode } from 'react';
import { ProfileItem } from './types';

interface ProfileContentSectionProps {
  id: string;
  name: string;
  icon: ReactNode;
  content: React.ReactNode;
  state: 'collapsed' | 'expanded';
}

export function ProfileContentSection({
  id,
  name,
  icon,
  content,
  state
}: ProfileContentSectionProps) {
  return (
    <div key={id} className={`space-y-2 w-full px-6 max-w-[1800px] ml-[-25px] mx-auto ${state === 'collapsed' ? 'pr-6 min-w-[calc(100vw-8rem)]' : 'pr-6 min-w-[calc(100vw-24rem)]'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-medium text-lg">{name}</h3>
      </div>
      <div className={`col-span-1 ${state === 'collapsed' ? 'mr-[-30px]' : 'mr-[-43px]'}`}>
        {content}
      </div>
    </div>
  );
}

export const defaultContentSections: Omit<ProfileItem, 'content'>[] = [
  {
    id: 'beat-tapes',
    name: 'Beat Tapes',
    type: 'music',
    icon: <Music className="h-4 w-4" />,
  },
  {
    id: 'services',
    name: 'Services',
    type: 'services',
    icon: <Gem className="h-4 w-4" />,
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    type: 'videos',
    icon: <Video className="h-4 w-4" />,
  }
];
