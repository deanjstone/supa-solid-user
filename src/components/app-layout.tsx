import { Show, JSX, createEffect, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { useSupabase } from "solid-supabase";

import { UserNav } from "~/components/user-nav";
import { SiteNav } from "~/components/site-nav";
import Footer from "~/components/footer";

interface AppLayoutProps {
  children: JSX.Element;
}

export function AppLayout(props: AppLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const navigate = useNavigate();
  const supabase = useSupabase();

  createEffect(async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigate("/login", { replace: true });
      return;
    }

    setIsAuthenticated(true);
  });

  return (
    <Show when={isAuthenticated()}>
      <div class="min-h-screen flex flex-col">
        <header class="border-b sticky top-0 z-30 bg-background">
          <div class="container flex h-16 items-center justify-between py-4">
            <div class="flex gap-6 items-center">
              <A
                href="/dashboard"
                class="font-semibold flex items-center gap-2">
                Supa Solid User
              </A>
              <SiteNav />
            </div>
            <UserNav />
          </div>
        </header>
        <main class="flex-1">{props.children}</main>
        <Footer />
      </div>
    </Show>
  );
}
