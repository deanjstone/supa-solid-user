import { A } from "@solidjs/router";
import { Button } from "@ui/button";
import { IconLogOut } from "@ui/icons";
import { useSupabase } from "solid-supabase";

export function SignOut() {
  const supabase = useSupabase();
  return (
    <Button
      variant="destructive"
      as={A}
      href="/signed-out"
      onClick={() => {
        supabase.auth.signOut();
      }}>
      Sign Out
      <IconLogOut />
    </Button>
  );
}
