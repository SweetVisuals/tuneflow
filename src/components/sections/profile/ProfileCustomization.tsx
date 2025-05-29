import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SortableItem } from "./SortableItem";
import { ProfilePreferences } from "./types";

interface ProfileCustomizationProps {
  preferences: ProfilePreferences;
  onSave: (preferences: ProfilePreferences) => Promise<void>;
  sections: { id: string; title: string; visible: boolean }[];
  onSectionOrderChange: (sections: { id: string; title: string; visible: boolean }[]) => void;
}

export function ProfileCustomization({
  preferences,
  onSave,
  sections,
  onSectionOrderChange,
}: ProfileCustomizationProps) {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);
  const [isLoading, setIsLoading] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      onSectionOrderChange(newSections);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(localPreferences);
      toast.success("Profile preferences saved successfully");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={localPreferences.theme}
                onValueChange={(value: any) =>
                  setLocalPreferences({ ...localPreferences, theme: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Accent Color</Label>
              <Input
                type="color"
                value={localPreferences.accentColor}
                onChange={(e) =>
                  setLocalPreferences({ ...localPreferences, accentColor: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={localPreferences.fontFamily}
              onValueChange={(value) =>
                setLocalPreferences({ ...localPreferences, fontFamily: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <Select
              value={localPreferences.privacySettings.profileVisibility}
              onValueChange={(value: any) =>
                setLocalPreferences({
                  ...localPreferences,
                  privacySettings: {
                    ...localPreferences.privacySettings,
                    profileVisibility: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Show Activity</Label>
            <Switch
              checked={localPreferences.privacySettings.showActivity}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  privacySettings: {
                    ...localPreferences.privacySettings,
                    showActivity: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Show Location</Label>
            <Switch
              checked={localPreferences.privacySettings.showLocation}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  privacySettings: {
                    ...localPreferences.privacySettings,
                    showLocation: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Mentions</Label>
            <Switch
              checked={localPreferences.notificationPreferences.mentions}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  notificationPreferences: {
                    ...localPreferences.notificationPreferences,
                    mentions: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Messages</Label>
            <Switch
              checked={localPreferences.notificationPreferences.messages}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  notificationPreferences: {
                    ...localPreferences.notificationPreferences,
                    messages: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>New Followers</Label>
            <Switch
              checked={localPreferences.notificationPreferences.followers}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  notificationPreferences: {
                    ...localPreferences.notificationPreferences,
                    followers: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Likes</Label>
            <Switch
              checked={localPreferences.notificationPreferences.likes}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  notificationPreferences: {
                    ...localPreferences.notificationPreferences,
                    likes: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Section Order</CardTitle>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections} strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <SortableItem key={section.id} id={section.id}>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-2">
                    <span className="font-medium">{section.title}</span>
                    <Switch
                      checked={section.visible}
                      onCheckedChange={(checked) => {
                        const newSections = sections.map((s) =>
                          s.id === section.id ? { ...s, visible: checked } : s
                        );
                        onSectionOrderChange(newSections);
                      }}
                    />
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}