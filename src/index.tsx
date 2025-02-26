/* @refresh reload */
import { render } from "solid-js/web";
import { supabase } from "./supabaseClient";
import { SupabaseProvider } from "solid-supabase";

import "./index.css";
import App from "./App";

render(
  () => (
    <SupabaseProvider client={supabase}>
      <App />
    </SupabaseProvider>
  ),
  document.getElementById("root")
);
