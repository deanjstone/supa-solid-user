import { A } from "@solidjs/router";
import { createResource } from "solid-js";
import { useSupabase } from "solid-supabase";

import { Avatar, AvatarFallback, AvatarImage } from "~ui/avatar";
import { Button } from "~ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~ui/dropdown-menu";
import { IconSettings, IconUser } from "~ui/icons";

export function UserNav() {
  const supabase = useSupabase();

  const [userDetails] = createResource(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    // Get profile data (username, avatar) from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();

    return {
      email: user.email,
      name: profile?.username || user.email?.split("@")[0] || "User",
      avatar: profile?.avatar_url,
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  // Get initials from name or email
  const getInitials = () => {
    const name = userDetails()?.name || "";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        class="relative size-8 rounded-full">
        <Avatar class="size-9">
          <AvatarImage
            src={userDetails()?.avatar || ""}
            alt={userDetails()?.name || ""}
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel class="font-normal">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
              {userDetails()?.name}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {userDetails()?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem as={A} href="/profile">
            <IconUser class="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem as={A} href="/settings">
            <IconSettings class="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
