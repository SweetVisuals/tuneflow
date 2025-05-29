import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SortableItem } from './SortableItem';
import { ProfileSection } from './types';

interface ProfileCustomizationProps {
  sections: ProfileSection[];
  userId: string;
  onSave: (layout: { sections: ProfileSection[] }) => Promise<void>;
}

export function ProfileCustomization({ sections, userId, onSave }: ProfileCustomizationProps) {
  const [items, setItems] = React.useState<ProfileSection[]>(sections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleVisibilityChange = (sectionId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === sectionId ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleSaveLayout = async () => {
    try {
      await onSave({ sections: items });
      toast.success("Profile layout saved successfully");
    } catch (error) {
      console.error('Error saving layout:', error);
      toast.error("Failed to save profile layout");
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Customize Profile Sections</h3>
          <Button onClick={handleSaveLayout}>Save Layout</Button>
        </div>

        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((section) => (
                <div key={section.id} className="flex items-center space-x-4 py-2">
                  <SortableItem id={section.id}>
                    <div className="flex-1 flex items-center justify-between p-4 bg-card rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="cursor-move">⋮⋮</span>
                        <Label>{section.title}</Label>
                      </div>
                      <Switch
                        checked={section.visible}
                        onCheckedChange={() => handleVisibilityChange(section.id)}
                      />
                    </div>
                  </SortableItem>
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <p className="text-sm text-muted-foreground">
          Drag and drop sections to reorder them. Toggle switches to show/hide sections.
        </p>
      </div>
    </Card>
  );
}