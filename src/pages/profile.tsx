import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabase, useSupabaseAuth } from "solid-supabase";
import { toast } from "solid-toast";

import Avatar from "../components/Avatar";
import { Button } from "~/components/ui/button";
import { IconSend } from "~/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

const Profile = () => {
  const [loading, setLoading] = createSignal(true);
  const [username, setUsername] = createSignal<string | null>(null);
  const [website, setWebsite] = createSignal<string | null>(null);
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);
  const [user, setUser] = createSignal<any>(null);

  const navigate = useNavigate();
  const supabase = useSupabase();
  const auth = useSupabaseAuth();
  const supaAuth = useSupabaseAuth();
  const session = supaAuth.getSession();

  const loadUser = async () => {
    const {
      data: { user: userData },
    } = await auth.getUser();
    setUser(userData);
  };

  loadUser();

  createEffect(() => {
    getProfile(session);
  });

  const getProfile = async (user) => {
    try {
      setLoading(true);
      // const { user } = auth.getUser();

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
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
  };

  const updateProfile = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);
      // const { user } = session;
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updates = {
        id: user.id,
        username: username(),
        website: website(),
        avatar_url: avatarUrl(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite">
      <form onSubmit={updateProfile} class="form-widget">
        <Avatar
          url={avatarUrl()}
          size={150}
          onUpload={(e: Event, url: string) => {
            setAvatarUrl(url);
            updateProfile(e);
          }}
        />
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" value={user()?.email} disabled />
        </div>
        <div>
          <label for="username">Name</label>
          <input
            id="username"
            type="text"
            value={username() || ""}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          <label for="website">Website</label>
          <input
            id="website"
            type="text"
            value={website() || ""}
            onChange={(e) => setWebsite(e.currentTarget.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            class="button primary block"
            disabled={loading()}>
            {loading() ? "Saving ..." : "Update profile"}
          </button>
        </div>
        <button
          type="button"
          class="button block"
          onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Profile;
