import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider } from "solid-supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <SupabaseProvider client={supabase}>
      <Router>
        <App />
      </Router>
    </SupabaseProvider>
  ),
  root!
);
