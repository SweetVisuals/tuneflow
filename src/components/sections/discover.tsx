import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoCard } from '../ui/video-card';
import { ArtistCard } from '../ui/artist-card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Headphones, TrendingUp } from 'lucide-react';

export function Discover() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const videoCategories = ['For You', 'Trending', 'Music', 'Beats', 'Vocals', 'New'];
  const [activeCategory, setActiveCategory] = useState(videoCategories[0]);

  return (
    <div className={cn("space-y-8 transition-opacity duration-500", 
      isLoaded ? "opacity-100" : "opacity-0")}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden border bg-gradient-to-br from-violet-500/20 to-purple-600/30 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col h-full justify-between pb-2.5">
              <div>
                <Flame className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trending Artists</h3>
                <p className="text-muted-foreground">Discover the most popular artists and producers making waves this week.</p>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border bg-gradient-to-br from-blue-500/20 to-cyan-600/30 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col h-full justify-between pb-2.5">
              <div>
                <Headphones className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fresh Tracks</h3>
                <p className="text-muted-foreground">The latest beats and tracks from producers around the world.</p>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                <span>Listen Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border bg-gradient-to-br from-amber-500/20 to-rose-600/30 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col h-full justify-between pb-2.5">
              <div>
                <TrendingUp className="h-10 w-10 text-rose-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
                <p className="text-muted-foreground">Find artists and producers looking to collaborate on new projects.</p>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                <span>Connect</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border bg-gradient-to-br from-green-500/20 to-lime-600/30 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col h-full justify-between pb-2.5">
              <div>
                <TrendingUp className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Remix Stems</h3>
                <p className="text-muted-foreground">Download stems from popular tracks and create your own remixes.</p>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                <span>Remix</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Content</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto pb-2">
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
        </div>
      </section>

      <section>
        <Tabs defaultValue="artists" className="w-full mb-4">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground flex pl-1 pr-1">
              <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow first:ml-0 px-3 py-1 mr-0.5" value="artists">Top Artists</TabsTrigger>
              <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1 ml-0.5 ml-0.5" value="producers">Top Producers</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="artists" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <ArtistCard
                name="Sarah Waters"
                role="Vocalist"
                imgUrl="https://i.pravatar.cc/150?img=32"
                followers="245K"
              />
              <ArtistCard
                name="Mike Thompson"
                role="Singer-Songwriter"
                imgUrl="https://i.pravatar.cc/150?img=53"
                followers="189K"
              />
              <ArtistCard
                name="Elena Ramos"
                role="Jazz Vocalist"
                imgUrl="https://i.pravatar.cc/150?img=47"
                followers="122K"
              />
              <ArtistCard
                name="David Chen"
                role="Rapper"
                imgUrl="https://i.pravatar.cc/150?img=69"
                followers="356K"
              />
              <ArtistCard
                name="Tasha Williams"
                role="R&B Artist"
                imgUrl="https://i.pravatar.cc/150?img=23"
                followers="207K"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="producers" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <ArtistCard
                name="James Wilson"
                role="EDM Producer"
                imgUrl="https://i.pravatar.cc/150?img=11"
                followers="312K"
              />
              <ArtistCard
                name="Alicia Rodriguez"
                role="Hip-Hop Producer"
                imgUrl="https://i.pravatar.cc/150?img=5"
                followers="275K"
              />
              <ArtistCard
                name="Marcus Johnson"
                role="Beat Maker"
                imgUrl="https://i.pravatar.cc/150?img=17"
                followers="198K"
              />
              <ArtistCard
                name="Sophia Lee"
                role="Music Composer"
                imgUrl="https://i.pravatar.cc/150?img=20"
                followers="146K"
              />
              <ArtistCard
                name="Victor Blake"
                role="Mix Engineer"
                imgUrl="https://i.pravatar.cc/150?img=58"
                followers="234K"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}