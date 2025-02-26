import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabase } from "solid-supabase";

import { Button } from "~/components/ui/button";

const Dashboard = () => {
  // not needed, left as reference
  // const [notes, setNotes] = createSignal([]);

  const navigate = useNavigate();
  const supabase = useSupabase();

  // not needed, left as reference
  // const fetchNotes = async () => {
  //   try {
  //     const { data, error } = await supabase.from("notes").select("*");
  //     if (data) {
  //       setNotes(data);
  //     }
  //     if (error) {
  //       console.error(error.message);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  createEffect(async () => {
    // do not need the line below
    // await fetchNotes();
  }, []);

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
