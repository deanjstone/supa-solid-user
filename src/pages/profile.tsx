import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabase, useSupabaseAuth } from "solid-supabase";
import { toast } from "solid-toast";

import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldDescription,
} from "@ui/text-field";
import { IconSend, IconUser, IconLink, IconHome } from "@ui/icons";

import Avatar from "~/components/Avatar";
import { SignOut } from "~/components/buttons";

const Profile = () => {
  const [loading, setLoading] = createSignal(true);
  const [username, setUsername] = createSignal<string | null>(null);
  const [website, setWebsite] = createSignal<string | null>(null);
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);
  const [user, setUser] = createSignal<any>(null);

  const navigate = useNavigate();
  const supabase = useSupabase();
  const auth = useSupabaseAuth();

  createEffect(async () => {
    try {
      // Get the authenticated user data
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();

      if (!userData) {
        navigate("/login");
        return;
      }

      setUser(userData);

      // Now fetch the profile data using the user ID
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", userData.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  });

  const updateProfile = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);
      const currentUser = user();

      if (!currentUser) {
        throw new Error("No user logged in");
      }

      const updates = {
        id: currentUser.id,
        username: username(),
        website: website(),
        avatar_url: avatarUrl(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
      <Card class="w-full max-w-md">
        <CardHeader class="relative pb-6 pt-8">
          <div class="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/dashboard")}
              class="absolute left-4 top-4 size-10">
              <IconHome class="size-5" />
              <span class="sr-only">Back to dashboard</span>
            </Button>
            <SignOut
              size="icon"
              class="absolute right-4 top-4 size-10"
              showText={false}
            />
          </div>
          <CardTitle class="text-center text-2xl font-bold sm:text-3xl">
            User Profile
          </CardTitle>
          <CardDescription class="text-center px-6 mt-2">
            Manage your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} class="space-y-6">
            <div class="flex justify-center mb-6">
              <Avatar
                url={avatarUrl()}
                size={150}
                onUpload={(e: Event, url: string) => {
                  setAvatarUrl(url);
                  updateProfile(e);
                }}
              />
            </div>

            <TextField>
              <TextFieldLabel>Email</TextFieldLabel>
              <TextFieldInput
                value={user()?.email}
                disabled
                aria-readonly="true"
              />
              <TextFieldDescription>
                Your email address cannot be changed
              </TextFieldDescription>
            </TextField>

            <TextField>
              <TextFieldLabel>Name</TextFieldLabel>
              <div class="relative">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <IconUser class="size-4" />
                </div>
                <TextFieldInput
                  value={username() || ""}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  placeholder="Enter your name"
                  class="pl-10"
                />
              </div>
            </TextField>

            <TextField>
              <TextFieldLabel>Website</TextFieldLabel>
              <div class="relative">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <IconLink class="size-4" />
                </div>
                <TextFieldInput
                  value={website() || ""}
                  onChange={(e) => setWebsite(e.currentTarget.value)}
                  placeholder="https://example.com"
                  class="pl-10"
                />
              </div>
            </TextField>
          </form>
        </CardContent>
        <CardFooter class="flex flex-col sm:flex-row justify-center gap-4 pb-6 pt-2">
          <Button
            type="submit"
            onClick={updateProfile}
            disabled={loading()}
            class="w-full">
            {loading() ? "Saving..." : "Update Profile"}
            <IconSend class="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
