import { Layout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { VideoCard } from '@/components/ui/video-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const tutorialSections = {
  production: [
    {
      title: "Beat Making Masterclass",
      author: "ProducerPro",
      views: "45K",
      timestamp: "2 days ago",
      thumbnailUrl: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=33"
    },
    {
      title: "Music Production Workflow",
      author: "StudioMaster",
      views: "32K",
      timestamp: "1 week ago",
      thumbnailUrl: "https://images.pexels.com/photos/690779/pexels-photo-690779.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=34"
    }
  ],
  mixing: [
    {
      title: "Mixing Vocals Like a Pro",
      author: "MixMaster",
      views: "28K",
      timestamp: "3 days ago",
      thumbnailUrl: "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=35"
    },
    {
      title: "Advanced EQ Techniques",
      author: "AudioPro",
      views: "19K",
      timestamp: "5 days ago",
      thumbnailUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=36"
    }
  ],
  mastering: [
    {
      title: "Mastering for Streaming",
      author: "MasteringGuru",
      views: "22K",
      timestamp: "1 week ago",
      thumbnailUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=37"
    }
  ],
  vst: [
    {
      title: "Serum Sound Design",
      author: "SynthMaster",
      views: "34K",
      timestamp: "4 days ago",
      thumbnailUrl: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=38"
    }
  ],
  marketing: [
    {
      title: "Music Marketing in 2025",
      author: "MarketingPro",
      views: "41K",
      timestamp: "2 days ago",
      thumbnailUrl: "https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=600",
      authorImgUrl: "https://i.pravatar.cc/150?img=39"
    }
  ]
};

export default function TutorialsPage() {
  return (
    <Layout authenticated={true}>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tutorials</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Tutorial
          </Button>
        </div>

        <Tabs defaultValue="production" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="mixing">Mixing</TabsTrigger>
            <TabsTrigger value="mastering">Mastering</TabsTrigger>
            <TabsTrigger value="vst">VST Plugins</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          {Object.entries(tutorialSections).map(([section, videos]) => (
            <TabsContent key={section} value={section} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={index} {...video} />
                ))}
                
                <Card className="flex items-center justify-center aspect-square cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Add {section} tutorial</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}