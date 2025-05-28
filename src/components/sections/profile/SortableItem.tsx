import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { GripVertical } from 'lucide-react';
import { ProfileItem } from './types';

interface SortableItemProps {
  item: ProfileItem;
  onNameChange: (name: string) => void;
  onVisibilityChange: (visible: boolean) => void;
}

export function SortableItem({ item, onNameChange, onVisibilityChange }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-card rounded-lg border shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="flex-1">
        <Input
          value={item.name}
          onChange={(e) => onNameChange(e.target.value)}
          className="border-none bg-transparent focus-visible:ring-0 px-0 text-lg font-medium"
        />
      </div>
      
      <Switch
        checked={item.visible}
        onCheckedChange={onVisibilityChange}
      />
    </div>
  );
}