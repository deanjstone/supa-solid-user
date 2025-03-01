import { Component, createEffect, createSignal } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { Toaster } from "solid-toast";

import Login from "./components/Login";
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
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/**404" component={NotFound} />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
