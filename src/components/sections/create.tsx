import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileUploader } from '../ui/file-uploader';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FilePlus, 
  FileVideo, 
  FolderPlus, 
  Mic, 
  Music, 
  Plus, 
  Upload, 
  Users, 
  Video 
} from 'lucide-react';

export function Create() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleCreate = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Project created",
        description: "Your new project has been created successfully!",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>
              Start a new project to upload content, collaborate, or organize files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select defaultValue="audio">
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audio">Audio Project</SelectItem>
                  <SelectItem value="video">Video Project</SelectItem>
                  <SelectItem value="collab">Collaboration</SelectItem>
                  <SelectItem value="folder">File Folder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-desc">Description</Label>
              <Textarea 
                id="project-desc" 
                placeholder="Enter project description" 
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="music">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="vocal">Vocals</SelectItem>
                  <SelectItem value="mixing">Mixing & Mastering</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Music</Badge>
                <Badge variant="outline">Production</Badge>
                <Badge variant="outline">Collaboration</Badge>
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Tag
                </Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Privacy Settings</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public">Public</Label>
                    <p className="text-sm text-muted-foreground">
                      Anyone can find and view
                    </p>
                  </div>
                  <Switch id="public" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others comment on your content
                    </p>
                  </div>
                  <Switch id="comments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="downloads">Allow Downloads</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others download your content
                    </p>
                  </div>
                  <Switch id="downloads" />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Upload Files</Label>
              <FileUploader />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleCreate} disabled={isProcessing}>
              {isProcessing ? 'Creating...' : 'Create Project'}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Create</CardTitle>
              <CardDescription>Start with a template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2">
                <FileVideo className="h-4 w-4" />
                <span>New Video</span>
              </Button>
              <Button className="w-full justify-start gap-2">
                <Music className="h-4 w-4" />
                <span>New Audio Track</span>
              </Button>
              <Button className="w-full justify-start gap-2">
                <FolderPlus className="h-4 w-4" />
                <span>New Folder</span>
              </Button>
              <Button className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                <span>New Collaboration</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Studio Tour Video</p>
                  <p className="text-xs text-muted-foreground">Last edited 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Vocal Recording</p>
                  <p className="text-xs text-muted-foreground">Last edited 3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <FilePlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">New Beat Project</p>
                  <p className="text-xs text-muted-foreground">Last edited 1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}