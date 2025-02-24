import { Component, createEffect, createSignal } from 'solid-js';
import { supabase } from './supabaseClient';
import { AuthSession } from '@supabase/supabase-js';
import Account from './Account';
import Auth from './Auth';
import Dashboard from './Dashboard';
import { Toaster } from 'solid-toast';

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null);
  const [showAccount, setShowAccount] = createSignal(false);

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  return (
    <div class="container" style={{ padding: '50px 0 100px 0' }}>
      {!session() ? <Auth /> : showAccount() ? <Account session={session()!} /> : <Dashboard />}
      {session() && !showAccount() && (
        <button onClick={() => setShowAccount(true)}>Go to Account</button>
      )}
      {session() && showAccount() && (
        <button onClick={() => setShowAccount(false)}>Go to Dashboard</button>
      )}
      <Toaster position="top-center"
        // Spacing between each toast in pixels
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options that each toast will inherit. Will be overwritten by individual toast options
          className: 'toast-message',
          duration: 10000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} />
    </div>
  );
};

export default App;