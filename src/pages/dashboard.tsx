import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabase } from "solid-supabase";

import { Button } from "~/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const supabase = useSupabase();

  createEffect(async () => {}, []);

  return (
    <div class="mt-10 flex items-center justify-center">
      <div class="w-full">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl">Dashboard</h1>
          <Button onClick={() => navigate("/profile")} class="bg-blue-500">
            Profile
          </Button>
          <Button
            onClick={() => {
              supabase.auth.signOut();
              navigate("/");
            }}
            class="bg-red-400">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
