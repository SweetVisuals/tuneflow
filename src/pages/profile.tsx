import { useParams } from 'react-router-dom';
import { Profile } from '../components/sections/profile';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/layout';

interface PublicProfileResponse {
  id: string;
  username: string;
  full_name: string;
  profile_url: string;
}

interface UserData {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export default function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      console.log('Starting profile fetch for:', username);
      try {
        // Use secure function to get public profile data first
        const { data, error } = await supabase.rpc('get_public_profile', { p_username: username })
          .returns<PublicProfileResponse>()
          .maybeSingle();

        console.log('Public profile query result:', {
          username,
          data,
          error,
          functionExists: !!supabase.rpc('get_public_profile')
        });

        if (!error && data) {
          const profileData = data as PublicProfileResponse;
          setUserData({
            id: profileData.id,
            name: profileData.full_name || profileData.username || 'User',
            avatarUrl: profileData.profile_url || '/default-avatar.png',
            bio: ''
          });
          return;
        }

        // If no public profile found, check if it's the current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        if (!authError && authUser) {
          const userMeta = authUser.user_metadata || {};
          if (userMeta.username === username) {
            setUserData({
              id: authUser.id,
              name: userMeta.name || userMeta.username || 'User',
              avatarUrl: userMeta.avatar_url || '',
              bio: userMeta.bio || ''
            });
            return;
          }
        }

        // No user found
        setUserData(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsCurrentUser(user?.id === userData?.id);
    };
    if (userData?.id) {
      checkAuth();
    }
  }, [userData]);

  if (loading) {
    return (
      <Layout authenticated={false}>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!userData || !userData.id) {
    return (
      <Layout authenticated={false} hideFooter={true}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground">
              The user @{username} doesn't exist or may have been deleted.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout authenticated={isCurrentUser} activeTab={activeTab}>
      <Profile 
        user={{
          id: userData.id,
          name: userData.name || '',
          avatarUrl: userData.avatarUrl || '',
          bio: userData.bio || '',
          isNew: false
        }}
        currentUserId={isCurrentUser ? userData.id : ''}
        showBanner={false}
        isSidebarCollapsed={false}
        showEditButton={isCurrentUser}
      />
    </Layout>
  );
}
