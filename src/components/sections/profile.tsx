import React, { useState, useEffect } from 'react';
import { Music, Gem, Video } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ProfileBanner } from '@/components/sections/profile/ProfileBanner';
import { ProfileAvatar } from '@/components/sections/profile/ProfileAvatar';
import { ProfileInfo } from '@/components/sections/profile/ProfileInfo';
import { ProfileContentSection, defaultContentSections } from '@/components/sections/profile/ProfileContentSection';
import { ProfileUploadDialog } from '@/components/sections/profile/ProfileUploadDialog';
import { ProfileCustomization } from '@/components/sections/profile/ProfileCustomization';
import { ProfileProps, ProfileItem, ProfilePreferences } from '@/components/sections/profile/types';
import { cn } from '@/lib/utils';

export function Profile({ user, currentUserId, showBanner = true, showEditButton = false }: ProfileProps) {
  const [showBannerUpload, setShowBannerUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileSections, setProfileSections] = useState<ProfileItem[]>([]);
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    layout: 'grid',
    theme: 'modern',
    showStats: true
  });
  const { toast } = useToast();
  const { state } = useSidebar();

  useEffect(() => {
    const fetchProfileLayout = async () => {
      if (!currentUserId) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('layout')
          .eq('id', currentUserId)
          .single();

        if (!error && data?.layout) {
          const savedLayout = data.layout;
          const mergedSections = defaultContentSections.map(defaultSection => {
            const savedSection = savedLayout.sections?.find((s: any) => s.id === defaultSection.id);
            return {
              ...defaultSection, // Keep the default icon from defaultContentSections
              name: savedSection?.name ?? defaultSection.name,
              content: savedSection?.content && typeof savedSection.content === 'string' 
                ? savedSection.content 
                : '',
              visible: savedSection?.visible ?? true,
              order: savedSection?.order ?? defaultSection.order
            };
          });
          setProfileSections(mergedSections);
          setPreferences(savedLayout.preferences || {
            layout: 'grid',
            theme: 'modern',
            showStats: true
          });
        } else {
          setProfileSections(defaultContentSections.map((section, index) => ({
            ...section,
            content: '',
            visible: true,
            order: index
          })));
        }
      } catch (error) {
        console.error('Error fetching profile layout:', error);
      }
    };

    fetchProfileLayout();
  }, [currentUserId]);

  const handleUpload = async (files: File[], type: 'banner' | 'avatar'): Promise<void> => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-media')
        .getPublicUrl(filePath);

      toast({
        title: 'Upload successful',
        description: `Your ${type} has been updated`,
      });
      
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      type === 'banner' ? setShowBannerUpload(false) : setShowAvatarUpload(false);
    }
  };

  const handleSaveLayout = async (updatedSections: ProfileItem[]) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          layout: {
            sections: updatedSections.map(section => ({
              id: section.id,
              name: section.name,
              content: section.content,
              visible: section.visible,
              order: section.order
              // Explicitly omit the icon property as it's a React component
            })),
            preferences
          }
        })
        .eq('id', currentUserId);

      if (error) throw error;

      setProfileSections(updatedSections);
      setIsEditing(false);
      
      toast({
        title: "Layout saved",
        description: "Your profile layout has been updated",
      });
    } catch (error) {
      toast({
        title: "Error saving layout",
        description: error instanceof Error ? error.message : 'Failed to save layout',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="transition-all duration-300">
      <div className={cn(
        "space-y-6 pb-6 w-full px-6 transition-all duration-300",
        state === 'collapsed' ? 'pr-6 min-w-[calc(100vw-6rem)]' : 'pr-6 min-w-[calc(100vw-20rem)]'
      )}>
        <ProfileBanner
          isCurrentUser={!!currentUserId && user.id === currentUserId}
          onEditClick={() => setIsEditing(!isEditing)}
          onSettingsClick={() => console.log('Settings clicked')}
          onUploadClick={() => setShowBannerUpload(true)}
        />

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <ProfileAvatar
            avatarUrl={user.avatarUrl}
            isCurrentUser={user.id === currentUserId}
            onUploadClick={() => setShowAvatarUpload(true)}
          />

          <ProfileInfo
            profile={{
              username: user.name,
              full_name: user.name,
              bio: user.bio,
              location: user.location,
              email: user.email,
              phone_number: user.phoneNumber,
              profile_url: user.profileUrl
            }}
            isCurrentUser={user.id === currentUserId}
            onSave={async (updatedProfile) => {
              try {
                const { error } = await supabase
                  .from('profiles')
                  .update({
                    username: updatedProfile.username,
                    full_name: updatedProfile.full_name,
                    bio: updatedProfile.bio,
                    location: updatedProfile.location,
                    email: updatedProfile.email,
                    phone_number: updatedProfile.phone_number,
                    profile_url: updatedProfile.profile_url
                  })
                  .eq('id', currentUserId);
                
                if (error) throw error;
                
                toast({
                  title: 'Profile updated',
                  description: 'Your changes have been saved',
                });
              } catch (error) {
                toast({
                  title: 'Update failed',
                  description: error instanceof Error ? error.message : 'Failed to update profile',
                  variant: 'destructive',
                });
              }
            }}
          />
        </div>

        <ProfileUploadDialog
          open={showBannerUpload}
          onOpenChange={setShowBannerUpload}
          title="Upload Banner Image"
          onFilesSelected={(files) => handleUpload(files, 'banner')}
        />

        <ProfileUploadDialog
          open={showAvatarUpload}
          onOpenChange={setShowAvatarUpload}
          title="Upload Profile Picture"
          onFilesSelected={(files) => handleUpload(files, 'avatar')}
        />

        {isEditing ? (
          <ProfileCustomization
            sections={profileSections}
            userId={currentUserId}
            onSave={handleSaveLayout}
          />
        ) : (
          <div className="space-y-6">
            {profileSections
              .filter(section => section.visible)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section) => (
                <div key={section.id} className="w-full">
                  <ProfileContentSection
                    {...section}
                    state={state}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}