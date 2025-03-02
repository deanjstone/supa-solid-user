import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { Toaster } from "solid-toast";

import { AuthLayout } from "./components/auth-layout";
import Login from "./components/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import About from "./pages/about";
import NotFound from "./pages/404";

const App: Component = () => {
  // Get the base path from the environment or default to '/'
  const base = import.meta.env.BASE_URL || "/";

  return (
    <>
      <Router base={base}>
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />

        {/* Protected routes with AuthLayout */}
        <Route
          path="/dashboard"
          component={() => (
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <AuthLayout>
              <Profile />
            </AuthLayout>
          )}
        />
        <Route
          path="/about"
          component={() => (
            <AuthLayout>
              <About />
            </AuthLayout>
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
