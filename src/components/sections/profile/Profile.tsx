import React, { useState, useEffect } from 'react';
import { Music, Gem, Video, LayoutGrid, LayoutList } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

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
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
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
              ...defaultSection,
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
          setLayoutView(savedLayout.preferences?.layout || 'grid');
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

      const updateData = type === 'avatar' 
        ? { avatar_url: publicUrl }
        : { banner_url: publicUrl };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', currentUserId);

      if (updateError) throw updateError;

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
            })),
            preferences: {
              ...preferences,
              layout: layoutView
            }
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

  const handleProfileUpdate = async (data: { bio: string; tag: string }) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          bio: data.bio,
          tag: data.tag
        })
        .eq('id', currentUserId);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your changes have been saved",
      });

      // Update local user state
      user.bio = data.bio;
      user.tag = data.tag;
      
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const toggleLayout = async () => {
    const newLayout = layoutView === 'grid' ? 'list' : 'grid';
    setLayoutView(newLayout);
    
    if (currentUserId) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            layout: {
              ...preferences,
              layout: newLayout
            }
          })
          .eq('id', currentUserId);

        if (error) throw error;
      } catch (error) {
        console.error('Error saving layout preference:', error);
      }
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
          isEditing={isEditing}
        />

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <ProfileAvatar
            avatarUrl={user.avatarUrl}
            isCurrentUser={user.id === currentUserId}
            onUploadClick={() => setShowAvatarUpload(true)}
          />

          <ProfileInfo
            name={user.name}
            bio={user.bio}
            tag={user.tag || ''}
            isCurrentUser={user.id === currentUserId}
            onSave={handleProfileUpdate}
            isEditing={isEditing}
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
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLayout}
                className="gap-2"
              >
                {layoutView === 'grid' ? (
                  <>
                    <LayoutList className="h-4 w-4" />
                    List View
                  </>
                ) : (
                  <>
                    <LayoutGrid className="h-4 w-4" />
                    Grid View
                  </>
                )}
              </Button>
            </div>

            <div className={cn(
              "space-y-6",
              layoutView === 'list' ? 'max-w-3xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            )}>
              {profileSections
                .filter(section => section.visible)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((section) => (
                  <div key={section.id} className={cn(
                    "w-full",
                    layoutView === 'list' && "mb-6"
                  )}>
                    <ProfileContentSection
                      {...section}
                      state={state}
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}