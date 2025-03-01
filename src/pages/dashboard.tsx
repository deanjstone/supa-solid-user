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
    <>
      <div class="container flex-col mt-8">
        <div class="flex items-center justify-center">
          <h1 class="text-2xl w-full">Dashboard</h1>
          <div class="w-full">
            <div class="flex items-center justify-between">
              <Button href="/profile" as={A} variant="outline">
                Profile
              </Button>

              <SignOut />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
