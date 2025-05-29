import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Music, 
  PlayCircle, 
  Heart, 
  Share2, 
  MessageCircle,
  Edit,
  Bell,
  BellOff
} from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  followers_count: number;
  following_count: number;
  tracks_count: number;
  likes_count: number;
}

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) throw error;

        // Check if current user
        const { data: { user } } = await supabase.auth.getUser();
        setIsCurrentUser(user?.id === data.id);

        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <Layout authenticated={false}>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout authenticated={false}>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-muted-foreground">This profile doesn't exist or has been removed.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout authenticated={isCurrentUser}>
      <div className="min-h-screen bg-background">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 relative">
          {isCurrentUser && (
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 -mt-20 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{profile.full_name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>

                <div className="flex gap-2">
                  {!isCurrentUser && (
                    <>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button 
                        variant={isFollowing ? "outline" : "default"} 
                        size="sm"
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? (
                          <>
                            <BellOff className="h-4 w-4 mr-2" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-sm max-w-2xl">{profile.bio}</p>

              <div className="flex gap-6 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile.tracks_count}</p>
                  <p className="text-sm text-muted-foreground">Tracks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile.followers_count}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile.following_count}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile.likes_count}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="tracks" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="reposts">Reposts</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="tracks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example Track Card */}
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-md mb-3"></div>
                    <h3 className="font-medium">Track Name</h3>
                    <p className="text-sm text-muted-foreground">1.2K plays</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="playlists">
              <div className="text-center text-muted-foreground py-12">
                No playlists yet
              </div>
            </TabsContent>

            <TabsContent value="reposts">
              <div className="text-center text-muted-foreground py-12">
                No reposts yet
              </div>
            </TabsContent>

            <TabsContent value="liked">
              <div className="text-center text-muted-foreground py-12">
                No liked tracks yet
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About</h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}