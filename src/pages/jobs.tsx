import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Music, 
  Settings, 
  Headphones,
  Mic2, 
  Briefcase,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  Plus
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price_per_hour: number;
  icon: keyof typeof serviceIcons;
  rating: number;
  reviews_count: number;
  availability: string;
  provider: {
    name: string;
    avatar: string;
    location: string;
  };
}

const serviceIcons = {
  production: Music,
  mixing: Settings,
  mastering: Headphones,
  recording: Mic2,
  technician: Briefcase
};

export default function JobsPage() {
  const [services] = useState<Service[]>([
    {
      id: '1',
      title: 'Music Production',
      description: 'Full production service including arrangement, recording, and initial mixing. Specializing in hip-hop and electronic music.',
      price_per_hour: 75,
      icon: 'production',
      rating: 4.8,
      reviews_count: 124,
      availability: 'Available next week',
      provider: {
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=33',
        location: 'Los Angeles, CA'
      }
    },
    {
      id: '2',
      title: 'Mixing & Mastering',
      description: 'Professional mixing and mastering services. State-of-the-art equipment and years of experience.',
      price_per_hour: 60,
      icon: 'mixing',
      rating: 4.9,
      reviews_count: 89,
      availability: 'Available now',
      provider: {
        name: 'Sarah Davis',
        avatar: 'https://i.pravatar.cc/150?img=32',
        location: 'Nashville, TN'
      }
    },
    {
      id: '3',
      title: 'Vocal Recording',
      description: 'High-quality vocal recording sessions with professional microphones and acoustic treatment.',
      price_per_hour: 45,
      icon: 'recording',
      rating: 4.7,
      reviews_count: 56,
      availability: 'Available next week',
      provider: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?img=53',
        location: 'New York, NY'
      }
    },
    {
      id: '4',
      title: 'Sound Engineering',
      description: 'Live sound engineering for events and concerts. Complete PA system available.',
      price_per_hour: 85,
      icon: 'technician',
      rating: 4.9,
      reviews_count: 73,
      availability: 'Available weekends',
      provider: {
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/150?img=60',
        location: 'Miami, FL'
      }
    }
  ]);

  return (
    <Layout authenticated={true}>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Jobs</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="my-services">My Services</TabsTrigger>
            <TabsTrigger value="requests">Job Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service) => {
                const IconComponent = serviceIcons[service.icon];
                return (
                  <Card key={service.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{service.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <img 
                                  src={service.provider.avatar} 
                                  alt={service.provider.name}
                                  className="h-5 w-5 rounded-full"
                                />
                                <span className="text-sm">{service.provider.name}</span>
                                <span className="text-sm text-muted-foreground">• {service.provider.location}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{service.rating}</span>
                                <span className="text-sm text-muted-foreground">
                                  ({service.reviews_count} reviews)
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">${service.price_per_hour}</p>
                              <p className="text-sm text-muted-foreground">per hour</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              {service.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-4 flex gap-2">
                      <Button className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-services" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Start Offering Services</h3>
              <p className="text-muted-foreground mb-4">Share your expertise and earn money by offering your services</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Service
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No Job Requests Yet</h3>
              <p className="text-muted-foreground">Job requests from clients will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}