import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfileItem } from './types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Layout as LayoutIcon, Palette, Settings2, Bell, Globe2, Shield, Eye, Brush, Layers, Monitor } from 'lucide-react';

interface ProfileCustomizationProps {
  sections: ProfileItem[];
  userId: string;
  onSave: (sections: ProfileItem[]) => void;
}

export function ProfileCustomization({ sections, userId, onSave }: ProfileCustomizationProps) {
  const [items, setItems] = useState<ProfileItem[]>(sections);
  const [layout, setLayout] = useState('grid');
  const [theme, setTheme] = useState('modern');
  const [activeTab, setActiveTab] = useState('layout');

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems.map((item, index) => ({ ...item, order: index })));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Button 
          variant={activeTab === 'layout' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('layout')}
          size="sm"
        >
          <LayoutIcon className="h-4 w-4 mr-2" />
          Layout
        </Button>
        <Button 
          variant={activeTab === 'appearance' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('appearance')}
          size="sm"
        >
          <Palette className="h-4 w-4 mr-2" />
          Appearance
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('settings')}
          size="sm"
        >
          <Settings2 className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      {activeTab === 'layout' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Display Mode</Label>
                  <p className="text-sm text-muted-foreground">Choose how your content is displayed</p>
                </div>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid Layout</SelectItem>
                    <SelectItem value="list">List Layout</SelectItem>
                    <SelectItem value="masonry">Masonry Grid</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Section Order</Label>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop to reorder sections</p>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-4 p-4 bg-card rounded-lg border shadow-sm"
                              >
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Input
                                  value={item.name}
                                  onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[index].name = e.target.value;
                                    setItems(newItems);
                                  }}
                                  className="flex-1"
                                />
                                <Switch
                                  checked={item.visible}
                                  onCheckedChange={(checked) => {
                                    const newItems = [...items];
                                    newItems[index].visible = checked;
                                    setItems(newItems);
                                  }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Theme & Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme Style</Label>
                    <p className="text-sm text-muted-foreground">Choose your profile's visual style</p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Custom Accent Color</Label>
                      <p className="text-sm text-muted-foreground">Set your profile's accent color</p>
                    </div>
                    <Input type="color" className="w-20 h-8" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Background Style</Label>
                      <p className="text-sm text-muted-foreground">Choose your profile's background</p>
                    </div>
                    <Select defaultValue="solid">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                        <SelectItem value="pattern">Pattern</SelectItem>
                        <SelectItem value="image">Custom Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Font Style</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred font</p>
                    </div>
                    <Select defaultValue="inter">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visual Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brush className="h-4 w-4" />
                  <div>
                    <Label>Custom Section Icons</Label>
                    <p className="text-sm text-muted-foreground">Use custom icons for sections</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <div>
                    <Label>Section Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <div>
                    <Label>Preview Images</Label>
                    <p className="text-sm text-muted-foreground">Show preview thumbnails</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Privacy & Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4" />
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                </div>
                <Select defaultValue="public">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <div>
                    <Label>Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're online</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <div>
                    <Label>Content Privacy</Label>
                    <p className="text-sm text-muted-foreground">Protect your uploads</p>
                  </div>
                </div>
                <Select defaultValue="public">
                  <SelectTrigger className="w-40">
                    <SelectValue />
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get browser notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onSave(sections)}>
          Cancel
        </Button>
        <Button onClick={() => onSave(items)}>Save Changes</Button>
      </div>
    </div>
  );
}