import { useNavigate, A } from "@solidjs/router";
import { useSupabase } from "solid-supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const supabase = useSupabase();

  return (
    <div class="flex flex-col">
      <div class="container flex-1 py-8">
        <div class="mb-8">
          <h1 class="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p class="mt-2 text-muted-foreground">
            View your available applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
