import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, MoreVertical, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function Audio() {
  const audioCategories = ['All', 'Beats', 'Vocals', 'Samples', 'Instrumentals'];
  const [activeCategory, setActiveCategory] = useState(audioCategories[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Audio</h1>
      </div>

      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/3 aspect-square max-w-[240px] rounded-lg overflow-hidden relative group">
            <img 
              src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Featured Track"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-12 w-12 rounded-full bg-background/90 text-foreground"
              >
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Badge className="mb-2">Featured Track</Badge>
            <h2 className="text-2xl font-bold mb-1">Midnight Groove</h2>
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://i.pravatar.cc/150?img=33" alt="ProducerJohn" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <span className="text-sm">ProducerJohn</span>
            </div>
            <p className="text-muted-foreground mb-4">
              A smooth jazz-inspired beat with deep bass and atmospheric synths. Perfect for vocals or as a standalone instrumental.
            </p>
            <div className="flex gap-3">
              <Button>Play Now</Button>
              <Button variant="outline">Add to Playlist</Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="trending">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1">
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="trending">Trending</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="new">New Releases</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <div className="overflow-x-auto pb-2 mt-4">
          <div className="flex gap-2 mb-4">
            {audioCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "secondary" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <TabsContent value="trending" className="mt-2">
          <div className="grid grid-cols-1 gap-4">
            <AudioTrackCard
              title="Sunset Vibes"
              artist="ChillMaster"
              artistImgUrl="https://i.pravatar.cc/150?img=45"
              duration="3:42"
              genre="Lofi"
              plays="354K"
            />
            <AudioTrackCard
              title="Urban Beat 808"
              artist="TrapKing"
              artistImgUrl="https://i.pravatar.cc/150?img=28"
              duration="2:55"
              genre="Trap"
              plays="218K"
            />
            <AudioTrackCard
              title="Electric Dreams"
              artist="SynthWave"
              artistImgUrl="https://i.pravatar.cc/150?img=53"
              duration="4:17"
              genre="Electronic"
              plays="176K"
            />
            <AudioTrackCard
              title="Soul Sample Pack"
              artist="VinylDigger"
              artistImgUrl="https://i.pravatar.cc/150?img=22"
              duration="5:30"
              genre="Soul"
              plays="98K"
            />
            <AudioTrackCard
              title="Acoustic Guitar Loop"
              artist="StringMaster"
              artistImgUrl="https://i.pravatar.cc/150?img=37"
              duration="1:45"
              genre="Acoustic"
              plays="122K"
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="gap-1">
              Load More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-2">
          <div className="grid grid-cols-1 gap-4">
            <AudioTrackCard
              title="Morning Coffee"
              artist="ChillHop"
              artistImgUrl="https://i.pravatar.cc/150?img=41"
              duration="3:15"
              genre="Lofi"
              plays="42K"
              isNew={true}
            />
            <AudioTrackCard
              title="Future Bass Template"
              artist="WaveMaker"
              artistImgUrl="https://i.pravatar.cc/150?img=19"
              duration="4:05"
              genre="EDM"
              plays="28K"
              isNew={true}
            />
            <AudioTrackCard
              title="Drum Kit Vol.3"
              artist="BeatMachine"
              artistImgUrl="https://i.pravatar.cc/150?img=58"
              duration="2:30"
              genre="Drums"
              plays="36K"
              isNew={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-2">
          <div className="grid grid-cols-1 gap-4">
            <AudioTrackCard
              title="Jazz Piano Sample"
              artist="KeyMaster"
              artistImgUrl="https://i.pravatar.cc/150?img=24"
              duration="2:18"
              genre="Jazz"
              plays="76K"
            />
            <AudioTrackCard
              title="Epic Strings"
              artist="OrchestralMind"
              artistImgUrl="https://i.pravatar.cc/150?img=59"
              duration="4:52"
              genre="Orchestral"
              plays="53K"
            />
            <AudioTrackCard
              title="Deep House Bass"
              artist="ClubProducer"
              artistImgUrl="https://i.pravatar.cc/150?img=11"
              duration="3:40"
              genre="House"
              plays="89K"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Card className="fixed bottom-0 left-0 right-0 border-t z-10 p-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 w-1/4">
            <div className="h-14 w-14 rounded overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Now Playing"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-medium truncate">Midnight Groove</p>
              <p className="text-sm text-muted-foreground">ProducerJohn</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-1">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">1:24</span>
              <Slider
                defaultValue={[33]}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">3:42</span>
            </div>
          </div>
          
          <div className="w-1/4 flex justify-end">
            <Button variant="ghost" size="sm">
              Playlist
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface AudioTrackCardProps {
  title: string;
  artist: string;
  artistImgUrl: string;
  duration: string;
  genre: string;
  plays: string;
  isNew?: boolean;
}

function AudioTrackCard({
  title,
  artist,
  artistImgUrl,
  duration,
  genre,
  plays,
  isNew
}: AudioTrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Simulate progress when playing
  if (isPlaying) {
    setTimeout(() => {
      setProgress(prev => prev < 100 ? prev + 1 : 0);
    }, 300);
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-muted"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 
              <Pause className="h-5 w-5" /> : 
              <Play className="h-5 w-5 ml-0.5" />
            }
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{title}</h3>
                {isNew && <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">New</Badge>}
              </div>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={artistImgUrl} alt={artist} />
                <AvatarFallback>{artist[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{artist}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <Badge variant="secondary" className="text-xs">{genre}</Badge>
              <span className="text-xs text-muted-foreground ml-auto">{plays} plays</span>
            </div>
            
            {isPlaying && (
              <Progress value={progress} className="h-1 mt-2" />
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>View Producer Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
