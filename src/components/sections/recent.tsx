import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoCard } from '../ui/video-card';

export function Recent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recent Activity</h1>
      </div>

      <Tabs defaultValue="viewed">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1">
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="viewed">Recently Viewed</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="uploads">Your Uploads</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="activity">Activity Feed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="viewed" className="mt-6 space-y-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Videos</CardTitle>
          </CardHeader>
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

          <CardHeader className="px-0">
            <CardTitle>Audio</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Sunset Vibes</h3>
                    <p className="text-sm text-muted-foreground">ChillMaster • Lofi</p>
                    <p className="text-xs text-muted-foreground">Listened 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                    <span className="text-2xl">🥁</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Urban Beat 808</h3>
                    <p className="text-sm text-muted-foreground">TrapKing • Trap</p>
                    <p className="text-xs text-muted-foreground">Listened 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <CardHeader className="px-0">
            <CardTitle>Files</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <span className="text-xl">🎵</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Vocal Recording.mp3</h3>
                    <p className="text-xs text-muted-foreground">Accessed 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="text-xl">🎬</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Studio Session.mp4</h3>
                    <p className="text-xs text-muted-foreground">Accessed 1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <span className="text-xl">📁</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Mix Session</h3>
                    <p className="text-xs text-muted-foreground">Accessed 1 month ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="uploads" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <VideoCard 
              title="My Studio Tour 2025" 
              author="You"
              views="3.2K"
              timestamp="1 week ago"
              thumbnailUrl="https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=32"
            />
            <VideoCard 
              title="Vocal Cover - Someone Like You" 
              author="You"
              views="5.6K"
              timestamp="2 weeks ago"
              thumbnailUrl="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600"
              authorImgUrl="https://i.pravatar.cc/150?img=32"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <span className="text-sm">👍</span>
                  </div>
                  <div>
                    <h3 className="font-medium">You liked "Beat Production Masterclass"</h3>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="text-sm">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-medium">You searched for "vocal recording techniques"</h3>
                    <p className="text-sm text-muted-foreground">4 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <span className="text-sm">📥</span>
                  </div>
                  <div>
                    <h3 className="font-medium">You downloaded "Soul Sample Pack"</h3>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <h3 className="font-medium">You followed ProducerJohn</h3>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
