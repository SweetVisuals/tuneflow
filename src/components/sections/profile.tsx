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
import { ProfileProps, ProfileItem } from '@/components/sections/profile/types';

export function Profile({ user, currentUserId, showBanner = true, showEditButton = false }: ProfileProps) {
  const [showBannerUpload, setShowBannerUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileSections, setProfileSections] = useState<Omit<ProfileItem, 'content'>[]>([]);
  const { toast } = useToast();
  const { state } = useSidebar();

  useEffect(() => {
    const fetchProfileLayout = async () => {
      if (!currentUserId) return;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('layout')
          .eq('user_id', currentUserId)
          .single();

        if (!error && data?.layout) {
          // Merge saved layout with default sections to ensure all required sections exist
          const mergedSections = defaultContentSections.map(defaultSection => {
            const savedSection = data.layout.find((s: any) => s.id === defaultSection.id);
            if (savedSection) {
              return {
                ...defaultSection,
                ...savedSection,
                content: ''
              };
            }
            return {
              ...defaultSection,
              content: ''
            };
          });
          setProfileSections(mergedSections);
        } else {
          setProfileSections(defaultContentSections);
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

      console.log(`${type} URL:`, publicUrl);
      
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

  return (
    <div className="transition-all duration-300">
      <div className={`space-y-6 pb-6 w-full px-6 transition-all duration-300 ${state === 'collapsed' ? 'pr-6 min-w-[calc(100vw-6rem)]' : 'pr-6 min-w-[calc(100vw-20rem)]'}`}>
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
          name={user.name}
          bio={user.bio}
          tag={user.tag || ''}
          isCurrentUser={user.id === currentUserId}
          onSave={async ({ bio, tag }) => {
            try {
              const { error } = await supabase
                .from('user_profiles')
                .update({ bio, tag: tag || null })
                .eq('user_id', currentUserId);
              
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

      <div className="space-y-10 w-full grid grid-cols-1 gap-6 pt-10">
        {defaultContentSections.map((section) => (
          <div key={section.id} className={`space-y-2 w-full px-6 max-w-[1800px] ml-[-25px] mx-auto ${state === 'collapsed' ? 'pr-6 min-w-[calc(100vw-8rem)]' : 'pr-6 min-w-[calc(100vw-24rem)]'}`}>
            <div className="flex items-center gap-3">
              {section.icon}
              <h3 className="font-medium text-lg">{section.name}</h3>
            </div>
            <div className={`col-span-1 ${state === 'collapsed' ? 'mr-[-30px]' : 'mr-[-43px]'}`}>
              <div className="flex flex-col items-center justify-center h-40 rounded-lg border border-dashed border-muted pt-6 pb-6 pl-6">
                {section.type === 'music' && <Music className="h-8 w-8 text-muted-foreground mb-2" />}
                {section.type === 'services' && <Gem className="h-8 w-8 text-muted-foreground mb-2" />}
                {section.type === 'videos' && <Video className="h-8 w-8 text-muted-foreground mb-2" />}
                <p className="text-muted-foreground text-center">
                  {`No ${section.name.toLowerCase()} added yet`}
                </p>
                <p className="text-sm text-muted-foreground/60 mt-1 text-center">
                  {section.type === 'music' && 'Upload your first beat tape to get started'}
                  {section.type === 'services' && 'Add services to showcase your offerings'}
                  {section.type === 'videos' && 'Create your first tutorial to share your knowledge'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
