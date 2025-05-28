import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  accept?: string;
  onFilesSelected?: (files: File[]) => void;
}

export function FileUploader({ 
  accept = '*/*',
  onFilesSelected = () => {}
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesSelected(newFiles);
      
      // Initialize upload progress for each file
      newFiles.forEach(file => {
        simulateUploadProgress(file.name);
      });
    }
  };
  
  const simulateUploadProgress = (fileName: string) => {
    let progress = 0;
    
    setUploadProgress(prev => ({
      ...prev,
      [fileName]: progress
    }));
    
    const interval = setInterval(() => {
      progress += 5;
      
      setUploadProgress(prev => ({
        ...prev,
        [fileName]: progress
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };
  
  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Initialize upload progress for each file
      newFiles.forEach(file => {
        simulateUploadProgress(file.name);
      });
    }
  };
  
  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'mp3':
      case 'wav':
      case 'ogg':
      case 'flac':
        return '🎵';
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'webm':
        return '🎬';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📁';
    }
  };
  
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all",
          isDragging 
            ? "border-primary/70 bg-primary/5" 
            : "border-border hover:border-primary/50"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={accept}
          />
        
        <div className="flex flex-col items-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">Drop files here</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Support for audio, video, images and documents
          </p>
          <Button 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Files
          </Button>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Selected Files</h3>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFileTypeIcon(file.name)}</span>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{getFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {uploadProgress[file.name] === 100 ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        {uploadProgress[file.name] || 0}%
                      </Badge>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(file.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {uploadProgress[file.name] < 100 && (
                  <Progress value={uploadProgress[file.name] || 0} className="h-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
