import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { VideoCard } from '../ui/video-card';
import { ArrowRight } from 'lucide-react';

export function Videos() {
  const videoCategories = ['All', 'Music', 'Production', 'Tutorials', 'Performances'];
  const [activeCategory, setActiveCategory] = useState(videoCategories[0]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
      </div>

      <section className="space-y-6">
        <Card className="p-4 overflow-hidden">
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Featured Video"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Ultimate Music Production Guide 2025</h2>
              <p className="text-white/90 mb-4 max-w-2xl">Learn industry secrets from top producers in this comprehensive guide to modern music production techniques.</p>
              <div className="flex gap-4">
                <Button>Watch Now</Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Save for Later</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Tabs defaultValue="recommended">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1">
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="recommended">Recommended</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="trending">Trending</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="new">New</TabsTrigger>
        </TabsList>
        
        <div className="overflow-x-auto pb-2 mt-4">
          <div className="flex gap-2 mb-4">
            {videoCategories.map((category) => (
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
        
        <TabsContent value="recommended" className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <VideoCard 
              title="Beat Production Masterclass" 
              author="ProducerJohn"
              views="145K"
              timestamp="3 days ago"
              thumbnailUrl="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=33"
            />
            <VideoCard 
              title="Vocal Recording Techniques" 
              author="VocalCoach"
              views="98K"
              timestamp="1 week ago"
              thumbnailUrl="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=26"
            />
            <VideoCard 
              title="Mix and Master Your Tracks" 
              author="StudioPro"
              views="201K"
              timestamp="2 weeks ago"
              thumbnailUrl="https://images.pexels.com/photos/690779/pexels-photo-690779.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=60"
            />
            <VideoCard 
              title="Creating Melody Hooks" 
              author="MelodyMaster"
              views="78K"
              timestamp="3 days ago"
              thumbnailUrl="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=12"
            />
            <VideoCard 
              title="Studio Tour with Famous Producer" 
              author="MusicInsider"
              views="302K"
              timestamp="1 month ago"
              thumbnailUrl="https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=40"
            />
            <VideoCard 
              title="Live Performance Setup Guide" 
              author="StagePro"
              views="112K"
              timestamp="2 weeks ago"
              thumbnailUrl="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=50"
            />
            <VideoCard 
              title="How to Find Your Unique Sound" 
              author="ArtistCoach"
              views="89K"
              timestamp="5 days ago"
              thumbnailUrl="https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=22"
            />
            <VideoCard 
              title="Music Marketing in 2025" 
              author="IndustryInsider"
              views="167K"
              timestamp="1 week ago"
              thumbnailUrl="https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=36"
            />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-1">
              Load More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <VideoCard 
              title="Studio Tour with Famous Producer" 
              author="MusicInsider"
              views="302K"
              timestamp="1 month ago"
              thumbnailUrl="https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=40"
            />
            <VideoCard 
              title="Mix and Master Your Tracks" 
              author="StudioPro"
              views="201K"
              timestamp="2 weeks ago"
              thumbnailUrl="https://images.pexels.com/photos/690779/pexels-photo-690779.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=60"
            />
            <VideoCard 
              title="Beat Production Masterclass" 
              author="ProducerJohn"
              views="145K"
              timestamp="3 days ago"
              thumbnailUrl="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=33"
            />
            <VideoCard 
              title="Music Marketing in 2025" 
              author="IndustryInsider"
              views="167K"
              timestamp="1 week ago"
              thumbnailUrl="https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=36"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <VideoCard 
              title="Creating Melody Hooks" 
              author="MelodyMaster"
              views="78K"
              timestamp="3 days ago"
              thumbnailUrl="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=12"
            />
            <VideoCard 
              title="How to Find Your Unique Sound" 
              author="ArtistCoach"
              views="89K"
              timestamp="5 days ago"
              thumbnailUrl="https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=22"
            />
            <VideoCard 
              title="Beat Production Masterclass" 
              author="ProducerJohn"
              views="145K"
              timestamp="3 days ago"
              thumbnailUrl="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=33"
            />
            <VideoCard 
              title="Vocal Recording Techniques" 
              author="VocalCoach"
              views="98K"
              timestamp="1 week ago"
              thumbnailUrl="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=26"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
