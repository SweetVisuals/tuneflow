import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, MessageSquare, Search, Star, UserPlus } from 'lucide-react';
import { MessageCard } from '../ui/message-card';

export function Connect() {
  const [connectTab, setConnectTab] = useState('discover');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Connect</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search artists or producers..."
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={connectTab} onValueChange={setConnectTab} className="w-full">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground pl-1 pr-1 mb-4">
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="discover">Discover Artists</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="messages">Messages</TabsTrigger>
          <TabsTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow px-3 py-1" value="collaborations">Collaborations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCard
              name="James Wilson"
              role="EDM Producer"
              location="Los Angeles, CA"
              imgUrl="https://i.pravatar.cc/150?img=11"
              skills={['EDM', 'House', 'Mixing']}
              bio="Electronic music producer specialized in EDM and House. Looking to collaborate with vocalists."
            />
            <ProfileCard
              name="Sarah Waters"
              role="Vocalist"
              location="New York, NY"
              imgUrl="https://i.pravatar.cc/150?img=32"
              skills={['Vocals', 'Songwriting', 'Pop']}
              bio="Vocalist with 5 years of experience in pop and R&B. Currently looking for producers to work with on new tracks."
            />
            <ProfileCard
              name="Marcus Johnson"
              role="Beat Maker"
              location="Atlanta, GA"
              imgUrl="https://i.pravatar.cc/150?img=17"
              skills={['Hip-Hop', 'Trap', 'Sampling']}
              bio="Hip-hop producer with a unique style. I've worked with several upcoming artists and looking to expand my network."
            />
            <ProfileCard
              name="Elena Ramos"
              role="Jazz Vocalist"
              location="Chicago, IL"
              imgUrl="https://i.pravatar.cc/150?img=47"
              skills={['Jazz', 'Vocals', 'Piano']}
              bio="Jazz vocalist and pianist. Looking for producers interested in fusion projects combining jazz with electronic elements."
            />
            <ProfileCard
              name="David Chen"
              role="Rapper"
              location="Miami, FL"
              imgUrl="https://i.pravatar.cc/150?img=69"
              skills={['Rap', 'Lyrics', 'Performance']}
              bio="Rapper with a flow that brings stories to life. Looking for beat producers for my upcoming album project."
            />
            <ProfileCard
              name="Alicia Rodriguez"
              role="Hip-Hop Producer"
              location="Houston, TX"
              imgUrl="https://i.pravatar.cc/150?img=5"
              skills={['Hip-Hop', 'R&B', 'Production']}
              bio="Producer specialized in hip-hop and R&B beats. Have worked with various artists and open to new collaborations."
            />
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>Recent messages from your network</CardDescription>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Sarah Waters" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">Sarah Waters</p>
                      <p className="text-sm text-muted-foreground truncate w-48">
                        I'd love to collaborate on your new track...
                      </p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full justify-start p-2 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=17" alt="Marcus Johnson" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">Marcus Johnson</p>
                      <p className="text-sm text-muted-foreground truncate w-48">
                        Check out this beat I just finished
                      </p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="James Wilson" />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">James Wilson</p>
                      <p className="text-sm text-muted-foreground truncate w-48">
                        Let me know your thoughts on the mix
                      </p>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=17" alt="Marcus Johnson" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Marcus Johnson</CardTitle>
                    <CardDescription>Beat Maker • Atlanta, GA</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-4 space-y-4">
                <MessageCard
                  content="Hey, I just listened to your latest track. The vocals are amazing!"
                  timestamp="Yesterday, 2:30 PM"
                  isIncoming={true}
                  senderImgUrl="https://i.pravatar.cc/150?img=17"
                />
                
                <MessageCard
                  content="Thanks! I appreciate that. I've been working on improving my technique."
                  timestamp="Yesterday, 2:45 PM"
                  isIncoming={false}
                />
                
                <MessageCard
                  content="I think it would sound great with one of my beats. Would you be interested in collaborating?"
                  timestamp="Yesterday, 3:01 PM"
                  isIncoming={true}
                  senderImgUrl="https://i.pravatar.cc/150?img=17"
                />
                
                <MessageCard
                  content="Definitely! I'd love to hear what you have in mind. Can you send over some samples?"
                  timestamp="Yesterday, 3:15 PM"
                  isIncoming={false}
                />
                
                <MessageCard
                  content="Check out this beat I just finished. I think your vocals would fit perfectly with this vibe."
                  timestamp="Today, 10:23 AM"
                  isIncoming={true}
                  senderImgUrl="https://i.pravatar.cc/150?img=17"
                  hasAttachment={true}
                  attachmentName="new_beat_demo.mp3"
                />
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex w-full items-center gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="sm">Send</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vocal Collab</CardTitle>
                <CardDescription>With Sarah Waters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Sarah Waters" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Waters</p>
                      <p className="text-sm text-muted-foreground">Vocalist</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Latest Activity</h4>
                    <p className="text-sm text-muted-foreground">
                      Sarah uploaded a new vocal track 2 days ago
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex gap-2 justify-between">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  View Project
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Beat Collab</CardTitle>
                <CardDescription>With Marcus Johnson</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=17" alt="Marcus Johnson" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Marcus Johnson</p>
                      <p className="text-sm text-muted-foreground">Beat Maker</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Waiting for your feedback on the latest beat
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex gap-2 justify-between">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  View Project
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-dashed border-2">
              <CardContent className="pt-6 flex flex-col items-center justify-center h-[218px]">
                <UserPlus className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Start a new collaboration</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Connect with artists and producers to create amazing music together
                </p>
                <Button>Find Collaborators</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  role: string;
  location: string;
  imgUrl: string;
  skills: string[];
  bio: string;
}

function ProfileCard({ name, role, location, imgUrl, skills, bio }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
      <CardContent className="pt-0 relative">
        <Avatar className="h-16 w-16 border-4 border-background absolute -top-8">
          <AvatarImage src={imgUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="mt-10 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-muted-foreground text-sm">{role} • {location}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
          
          <p className="text-sm mt-2">{bio}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
}
