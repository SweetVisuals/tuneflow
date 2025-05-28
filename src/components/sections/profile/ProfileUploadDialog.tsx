import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileUploader } from '@/components/ui/file-uploader';

interface ProfileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onFilesSelected: (files: File[]) => void;
  accept?: string;
}

export function ProfileUploadDialog({
  open,
  onOpenChange,
  title,
  onFilesSelected,
  accept = 'image/*'
}: ProfileUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FileUploader 
          accept={accept}
          onFilesSelected={onFilesSelected}
        />
      </DialogContent>
    </Dialog>
  );
}
