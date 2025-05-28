import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Settings2, Layout, Palette } from 'lucide-react';
import { ProfileItem } from './types';

interface ProfileCustomizationProps {
  sections: ProfileItem[];
  userId: string;
  onSave: (sections: ProfileItem[]) => void;
}

export function ProfileCustomization({ sections, userId, onSave }: ProfileCustomizationProps) {
  const [items, setItems] = useState<ProfileItem[]>(sections);
  const [layout, setLayout] = useState('grid');
  const [theme, setTheme] = useState('modern');
  const [showStats, setShowStats] = useState(true);
  const { toast } = useToast();

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < items.length) {
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      setItems(newItems);
    }
  };

  const saveLayout = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          layout: {
            sections: items.map((item, index) => ({ ...item, order: index })),
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
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border shadow-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6"
                      >
                        <ArrowUpDown className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === items.length - 1}
                        className="h-6 w-6"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
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