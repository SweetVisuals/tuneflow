import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoCard } from '../ui/video-card';

export function Liked() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Liked Content</h1>
      </div>

      <Tabs defaultValue="videos">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1">
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="videos">Videos</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="audio">Audio</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="artists">Artists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-6">
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
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AudioLikeCard
              title="Sunset Vibes"
              artist="ChillMaster"
              genre="Lofi"
              likedDate="2 days ago"
            />
            <AudioLikeCard
              title="Urban Beat 808"
              artist="TrapKing"
              genre="Trap"
              likedDate="3 days ago"
            />
            <AudioLikeCard
              title="Electric Dreams"
              artist="SynthWave"
              genre="Electronic"
              likedDate="1 week ago"
            />
            <AudioLikeCard
              title="Soul Sample Pack"
              artist="VinylDigger"
              genre="Soul"
              likedDate="2 weeks ago"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ArtistLikeCard
              name="James Wilson"
              role="EDM Producer"
              imgUrl="https://i.pravatar.cc/150?img=11"
              likedDate="1 week ago"
            />
            <ArtistLikeCard
              name="Marcus Johnson"
              role="Beat Maker"
              imgUrl="https://i.pravatar.cc/150?img=17"
              likedDate="2 weeks ago"
            />
            <ArtistLikeCard
              name="Elena Ramos"
              role="Jazz Vocalist"
              imgUrl="https://i.pravatar.cc/150?img=47"
              likedDate="3 weeks ago"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AudioLikeCardProps {
  title: string;
  artist: string;
  genre: string;
  likedDate: string;
}

function AudioLikeCard({ title, artist, genre, likedDate }: AudioLikeCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
        <span className="text-2xl">🎵</span>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{artist} • {genre}</p>
        <p className="text-xs text-muted-foreground">Liked {likedDate}</p>
      </div>
    </div>
  );
}

interface ArtistLikeCardProps {
  name: string;
  role: string;
  imgUrl: string;
  likedDate: string;
}

function ArtistLikeCard({ name, role, imgUrl, likedDate }: ArtistLikeCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <img 
          src={imgUrl} 
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-xs text-muted-foreground">Followed {likedDate}</p>
      </div>
    </div>
  );
}
