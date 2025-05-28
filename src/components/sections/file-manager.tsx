import { useState, useRef } from 'react';
import { 
  File, 
  Folder, 
  Grid, 
  List, 
  Music, 
  Upload,
  Video, 
  FileText,
  FileImage,
  MoreVertical,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  icon: React.ReactNode;
}

export function FileManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Mock files data
  const files: FileItem[] = [
    {
      id: '1',
      name: 'Vocal Recording.mp3',
      type: 'audio',
      size: '4.2 MB',
      modified: '2 days ago',
      icon: <Music className="h-6 w-6 text-blue-500" />,
    },
    {
      id: '2',
      name: 'Beat Demo.mp3',
      type: 'audio',
      size: '3.8 MB',
      modified: '3 days ago',
      icon: <Music className="h-6 w-6 text-blue-500" />,
    },
    {
      id: '3',
      name: 'Studio Session.mp4',
      type: 'video',
      size: '24.5 MB',
      modified: '1 week ago',
      icon: <Video className="h-6 w-6 text-purple-500" />,
    },
    {
      id: '4',
      name: 'Album Artwork.png',
      type: 'image',
      size: '1.7 MB',
      modified: '2 weeks ago',
      icon: <FileImage className="h-6 w-6 text-green-500" />,
    },
    {
      id: '5',
      name: 'Project Notes.txt',
      type: 'document',
      size: '45 KB',
      modified: '3 weeks ago',
      icon: <FileText className="h-6 w-6 text-yellow-500" />,
    },
    {
      id: '6',
      name: 'Mix Session',
      type: 'folder',
      size: '4 items',
      modified: '1 month ago',
      icon: <Folder className="h-6 w-6 text-amber-500" />,
    },
  ];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          toast({
            title: "Upload complete",
            description: "Your file has been uploaded successfully!",
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 400);
  };

  // Simulate drag and drop functionality
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleFileUpload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Files</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8"
            />
          </div>

          <div>
            <Button
              className="w-full justify-start gap-2"
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4" />
              <span>Upload Files</span>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start gap-2 mt-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Folder</span>
            </Button>
          </div>

          <Separator />

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <File className="h-4 w-4" />
              <span>All Files</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Music className="h-4 w-4" />
              <span>Audio</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileImage className="h-4 w-4" />
              <span>Images</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Storage</h3>
            <Progress value={68} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              6.8 GB of 10 GB used
            </p>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="my-files">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1">
              <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="my-files">My Files</TabsTrigger>
              <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="shared">Shared with me</TabsTrigger>
              <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-files" className="mt-4">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center mb-4",
                  "transition-all hover:border-primary/50"
                )}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Uploading...</p>
                    <Progress value={uploadProgress} className="h-2 max-w-md mx-auto" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files here or{" "}
                      <Button variant="link" className="p-0 h-auto" onClick={handleUploadClick}>
                        browse
                      </Button>
                    </p>
                  </div>
                )}
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => (
                    <Card key={file.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 pt-2">
                            {file.icon}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {file.size} • {file.modified}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Modified</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {file.icon}
                              <span>{file.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{file.type}</Badge>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.modified}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shared" className="mt-4">
              <div className="text-center py-10">
                <Folder className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No shared files yet</h3>
                <p className="text-muted-foreground mt-2">
                  Files shared with you will appear here.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 pt-2">
                        <Music className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-medium">Vocal Recording.mp3</p>
                          <p className="text-sm text-muted-foreground">
                            4.2 MB • 2 days ago
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 pt-2">
                        <Music className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-medium">Beat Demo.mp3</p>
                          <p className="text-sm text-muted-foreground">
                            3.8 MB • 3 days ago
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
