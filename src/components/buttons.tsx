import { A } from "@solidjs/router";
import { Button } from "@ui/button";
import { IconLogOut } from "@ui/icons";
import { useSupabase } from "solid-supabase";

export function SignOut(props: {
  size?: "default" | "sm" | "lg" | "icon";
  class?: string;
  showText?: boolean;
}) {
  const supabase = useSupabase();
  const { size = "default", showText = true, class: className = "" } = props;

  return (
    <Button
      variant="outline"
      size={size}
      as={A}
      href="/signed-out"
      class={className}
      onClick={() => {
        // supabase.auth.signOut();
      }}>
      {showText !== false && <span class="hidden sm:inline">Sign Out</span>}
      <IconLogOut class="size-4 sm:ml-2" />
      <span class="sr-only">Sign out</span>
    </Button>
  );
}
