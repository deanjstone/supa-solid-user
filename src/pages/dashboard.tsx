import { createSignal, createEffect } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { useSupabase } from "solid-supabase";

import { Button } from "@ui/button";

import { SignOut } from "~/components/buttons";
import Footer from "~/components/footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const supabase = useSupabase();

  // createEffect(async () => {}, []);

  return (
    <div class="flex min-h-screen flex-col">
      <div class="container flex-1 py-8">
        <div class="mb-8">
          <h1 class="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p class="mt-2 text-muted-foreground">
            Manage your account and settings
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Navigation cards can be added here */}
        </div>

        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            href="/profile"
            as={A}
            variant="outline"
            class="w-full sm:w-auto">
            Profile
          </Button>

          <SignOut class="w-full sm:w-auto" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
