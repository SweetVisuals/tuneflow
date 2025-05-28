import { useState, useRef } from 'react';
import { 
  useDraggable, 
  DndContext, 
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
  restrictToVerticalAxis,
  restrictToParentElement
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Settings2, Layout, Palette } from 'lucide-react';
import { ProfileItem } from './types';
import { cn } from '@/lib/utils';

interface ProfileCustomizationProps {
  sections: ProfileItem[];
  userId: string;
  onSave: (sections: ProfileItem[]) => void;
}

export function ProfileCustomization({ sections, userId, onSave }: ProfileCustomizationProps) {
  const [items, setItems] = useState<ProfileItem[]>(sections);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [layout, setLayout] = useState('grid');
  const [theme, setTheme] = useState('modern');
  const [showStats, setShowStats] = useState(true);
  const { toast } = useToast();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const saveLayout = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          layout: {
            sections: items,
            preferences: {
              layout,
              theme,
              showStats
            }
          },
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your changes have been saved",
      });
      
      onSave(items);
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: error instanceof Error ? error.message : 'Failed to save changes',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="layout" className="w-full">
        <TabsList>
          <TabsTrigger value="layout">
            <Layout className="h-4 w-4 mr-2" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings2 className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <DndContext
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              const newItems = items.map((i) =>
                                i.id === item.id ? { ...i, name: e.target.value } : i
                              );
                              setItems(newItems);
                            }}
                            className="border-none bg-transparent focus-visible:ring-0 px-0 text-lg font-medium"
                          />
                        </div>
                        <Switch
                          checked={item.visible}
                          onCheckedChange={(checked) => {
                            const newItems = items.map((i) =>
                              i.id === item.id ? { ...i, visible: checked } : i
                            );
                            setItems(newItems);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Layout Style</Label>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="masonry">Masonry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Statistics</Label>
                  <p className="text-sm text-muted-foreground">
                    Display view counts and engagement metrics
                  </p>
                </div>
                <Switch
                  checked={showStats}
                  onCheckedChange={setShowStats}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Profile URL</Label>
                <div className="flex gap-2">
                  <Input value={`melodify.com/${userId}`} readOnly className="bg-muted" />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Privacy</Label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue placeholder="Select privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onSave(sections)}>
          Cancel
        </Button>
        <Button onClick={saveLayout}>Save Changes</Button>
      </div>
    </div>
  );
}