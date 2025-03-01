import { A } from "@solidjs/router";
import { Button } from "@ui/button";
import { IconLogOut } from "@ui/icons";

export function SignOut() {
  return (
    <Button
      variant="destructive"
      as={A}
      href="/signed-out"
      onClick={() => {
        // supabase.auth.signOut();
      }}>
      Sign Out
      <IconLogOut />
    </Button>
  );
}
