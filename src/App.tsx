import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { Toaster } from "solid-toast";

import { AppLayout } from "~/components/app-layout";
import Login from "~/pages/Login1";
import Dashboard from "~/pages/dashboard";
import Profile from "~/pages/profile";
import About from "~/pages/about";
import NotFound from "~/pages/404";

const App: Component = () => {
  // Get the base path from the environment or default to '/'
  const base = import.meta.env.BASE_URL || "/";

  return (
    <>
      <Router base={base}>
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />

        {/* Protected routes with AppLayout */}
        <Route
          path="/dashboard"
          component={() => (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <AppLayout>
              <Profile />
            </AppLayout>
          )}
        />
        <Route
          path="/about"
          component={() => (
            <AppLayout>
              <About />
            </AppLayout>
          )}
        />
        {/* 404 route */}
        <Route path="/**404" component={NotFound} />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
