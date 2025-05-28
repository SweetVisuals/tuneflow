import { useState } from 'react';
import { 
  useDraggable, 
  DndContext, 
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ProfileItem } from './types';

interface ProfileCustomizationProps {
  sections: ProfileItem[];
  userId: string;
  onSave: (sections: ProfileItem[]) => void;
}

export function ProfileCustomization({ sections, userId, onSave }: ProfileCustomizationProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState<ProfileItem[]>(sections);
  const { toast } = useToast();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    try {
      const { active, over } = event;
      if (!active || !over) return;
      
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    } finally {
      setActiveId(null);
    }
  };

  const saveLayout = async () => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      // First verify the column exists in the profiles table
      const { data: profileData, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      // Update layout column with proper jsonb format
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          layout: items,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select();

      if (error) throw error;
      if (!data) throw new Error('No data returned from update');

      toast({
        title: 'Profile updated',
        description: 'Your changes have been saved',
      });
      onSave(items);
      // Return to profile view after save
      window.location.href = `/profile/${userId}`;
    } catch (error) {
      toast({
        title: 'Error saving profile',
        description: error instanceof Error ? error.message : 'Failed to save changes',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-background border rounded-lg shadow-lg">
              {items.find((item) => item.id === activeId)?.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => onSave(sections)}>
          Cancel
        </Button>
        <Button onClick={saveLayout}>Save Changes</Button>
      </div>
    </div>
  );
}

function SortableItem({ id, item }: { id: UniqueIdentifier; item: ProfileItem }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
      }}
      className="p-4 bg-background border rounded-lg cursor-move flex items-center gap-2 transition-transform duration-200"
      {...attributes}
      {...listeners}
    >
      <span className="text-muted-foreground">☰</span>
      <span>{item.name}</span>
    </div>
  );
}
