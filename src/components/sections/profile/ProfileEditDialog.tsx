import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { PostgrestError } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProfileProps } from "./types";
import { ProfileUploadDialog } from "./ProfileUploadDialog";

const profileFormSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  audioQuality: z.enum(["low", "medium", "high"]),
  autoplay: z.boolean(),
  showListeningActivity: z.boolean(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  socialSectionTitle: z.string().max(30).optional(),
  audioSectionTitle: z.string().max(30).optional(),
  privacySectionTitle: z.string().max(30).optional(),
  notificationsSectionTitle: z.string().max(30).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileEditDialog({ user, currentUserId }: ProfileProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
      website: "",
      twitter: "",
      instagram: "",
      audioQuality: "medium",
      autoplay: true,
      showListeningActivity: true,
      emailNotifications: true,
      pushNotifications: true,
      socialSectionTitle: "Social Links",
      audioSectionTitle: "Audio Preferences", 
      privacySectionTitle: "Privacy",
      notificationsSectionTitle: "Notifications",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      // First check if columns exist
      const { data: columns } = await supabase
        .rpc('get_columns', { table_name: 'profiles' });

      // Add any missing columns
      const missingColumns = [
        { name: 'social_section_title', type: 'text' },
        { name: 'audio_section_title', type: 'text' },
        { name: 'privacy_section_title', type: 'text' },
        { name: 'notifications_section_title', type: 'text' }
      ].filter(col => !columns?.includes(col.name));

      if (missingColumns.length > 0) {
        await supabase.rpc('add_columns', {
          table_name: 'profiles',
          columns: missingColumns
        });
      }

      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          bio: data.bio,
          website: data.website,
          twitter: data.twitter,
          instagram: data.instagram,
          audio_quality: data.audioQuality,
          autoplay: data.autoplay,
          show_listening_activity: data.showListeningActivity,
          email_notifications: data.emailNotifications,
          push_notifications: data.pushNotifications,
          social_section_title: data.socialSectionTitle,
          audio_section_title: data.audioSectionTitle,
          privacy_section_title: data.privacySectionTitle,
          notifications_section_title: data.notificationsSectionTitle
        })
        .eq('id', currentUserId);

      if (error) throw error;
      
      // Show success message
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === "string" 
          ? error 
          : "An unknown error occurred";
      toast.error(`Error updating profile: ${errorMessage}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} />
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </DialogTrigger>
              <ProfileUploadDialog
                open={false}
                onOpenChange={() => {}}
                title="Upload Profile Picture"
                onFilesSelected={(files) => {
                  // TODO: Implement upload logic
                  console.log(files);
                }}
              />
            </Dialog>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell others about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="socialSectionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          className="w-40 text-sm font-medium h-8" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="@username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="@username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="audioSectionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          className="w-40 text-sm font-medium h-8" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audioQuality"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Streaming Quality</FormLabel>
                      <div className="flex gap-4">
                        {["low", "medium", "high"].map((quality) => (
                          <Button
                            key={quality}
                            variant={field.value === quality ? "default" : "outline"}
                            onClick={() => field.onChange(quality)}
                            type="button"
                          >
                            {quality.charAt(0).toUpperCase() + quality.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoplay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Autoplay Next Track</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="privacySectionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          className="w-40 text-sm font-medium h-8" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showListeningActivity"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Show Listening Activity</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="notificationsSectionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          className="w-40 text-sm font-medium h-8" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Email Notifications</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Push Notifications</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
