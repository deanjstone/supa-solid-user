/* @refresh reload */
import "./index.css";

import { render, Suspense } from "solid-js/web";
import { Router } from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider } from "solid-supabase";

import { routes } from "./routes";
import App from "./App";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <SupabaseProvider client={supabase}>
      <Router root={(props) => <App>{props.children}</App>}>{routes}</Router>
    </SupabaseProvider>
  ),
  root
);
