import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Gem, Video, Upload, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileContentSectionProps {
  id: string;
  name: string;
  type: string;
  icon: ReactNode;
  content?: ReactNode;
  state: 'expanded' | 'collapsed';
}

export function ProfileContentSection({
  id,
  name,
  type,
  icon,
  content,
  state
}: ProfileContentSectionProps) {
  return (
    <div className={cn(
      "w-full px-6 max-w-[1800px] mx-auto",
      state === 'collapsed' ? 'pr-[calc(25px+1.5rem)]' : 'pr-[calc(25px+2.5rem)]'
    )}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 flex items-center justify-center">
                {icon}
              </div>
              {name}
            </div>
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Plus className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          {content ? (
            content
          ) : (
            <div className="flex flex-col items-center justify-center h-40 rounded-lg border border-dashed border-muted pt-6 pb-6">
              {type === 'music' && <Music className="h-16 w-16 text-muted-foreground mb-4" />}
              {type === 'services' && <Gem className="h-16 w-16 text-muted-foreground mb-4" />}
              {type === 'videos' && <Video className="h-16 w-16 text-muted-foreground mb-4" />}
              <p className="text-muted-foreground text-center">
                {`No ${name.toLowerCase()} added yet`}
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1 text-center">
                {type === 'music' && 'Upload your first beat tape to get started'}
                {type === 'services' && 'Add services to showcase your offerings'}
                {type === 'videos' && 'Create your first tutorial to share your knowledge'}
              </p>
              <Button variant="outline" className="mt-4 gap-2">
                <Upload className="h-5 w-5" />
                Upload {type === 'services' ? 'Service' : type}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const defaultContentSections = [
  {
    id: 'beat-tapes',
    name: 'Beat Tapes',
    type: 'music',
    icon: <Music className="h-6 w-6" />,
    order: 0,
    visible: true
  },
  {
    id: 'services',
    name: 'Services',
    type: 'services',
    icon: <Gem className="h-6 w-6" />,
    order: 1,
    visible: true
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    type: 'videos',
    icon: <Video className="h-6 w-6" />,
    order: 2,
    visible: true
  }
];