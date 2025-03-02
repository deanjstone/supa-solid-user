import { createStore } from "solid-js/store";
import { createContext, createEffect, useContext } from "solid-js";
import type { JSX } from "solid-js";
import { useSupabase } from "solid-supabase";

// Define user profile type
export interface UserProfile {
  id: string;
  email: string | undefined;
  name: string;
  avatar: string | null;
  username: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Create initial state
const initialState: UserProfile = {
  id: "",
  email: undefined,
  name: "",
  avatar: null,
  username: null,
  loading: true,
  isAuthenticated: false,
};

// Interface for the store context
export interface UserStoreContextValue {
  user: UserProfile;
}

// Create context
const UserStoreContext = createContext<UserStoreContextValue>();

// Create provider component
export function UserStoreProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = createStore<UserProfile>(initialState);
  const supabase = useSupabase();

  // Setup auth state listener
  createEffect(() => {
    // Initial auth check
    checkAndSetUser();

    // Setup auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        await fetchAndSetUserData();
      } else if (event === "SIGNED_OUT") {
        resetUserData();
      }
    });

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  });

  // Check current auth status and set user data
  async function checkAndSetUser() {
    setUser("loading", true);
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      await fetchAndSetUserData();
    } else {
      resetUserData();
    }
  }

  // Fetch user data from auth and profiles table
  async function fetchAndSetUserData() {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        resetUserData();
        return;
      }

      // Get profile data from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", authUser.id)
        .single();

      setUser({
        id: authUser.id,
        email: authUser.email,
        name: profile?.username || authUser.email?.split("@")[0] || "User",
        avatar: profile?.avatar_url,
        username: profile?.username,
        loading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      resetUserData();
    }
  }

  // Reset user data on logout
  function resetUserData() {
    setUser({
      ...initialState,
      loading: false,
    });
  }

  return (
    <UserStoreContext.Provider value={{ user }}>
      {props.children}
    </UserStoreContext.Provider>
  );
}

// Create a hook to use the user store
export function useUserStore(): UserStoreContextValue {
  const context = useContext(UserStoreContext);
  if (context === undefined) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }
  return context;
}
