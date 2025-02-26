import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabaseAuth } from "solid-supabase";
import { toast } from "solid-toast";

import { Button } from "~/components/ui/button";

const Login = () => {
  const [loading, setLoading] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [token, setToken] = createSignal("");
  const [showTokenInput, setShowTokenInput] = createSignal(false);

  const navigate = useNavigate();
  const supaAuth = useSupabaseAuth();

  createEffect(() => {
    supaAuth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  });

  const handleSendToken = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supaAuth.signInWithOtp({
        email: email(),
      });
      if (error) throw error;
      setShowTokenInput(true);
      // Replaced alert with toast
      toast.success("Check your email for the verification code!");
    } catch (error) {
      if (error instanceof Error) {
        // Replaced alert with toast
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supaAuth.verifyOtp({
        email: email(),
        token: token(),
        type: "email",
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        // Replaced alert with toast
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supaAuth.signInWithOtp({ email: email() });
      if (error) {
        throw error;
      }
      alert("Chek your email to verify your account");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div class="flex mt-20 items-center justify-center">
    //   <div class="flex flex-col border p-4 rounded-lg shadow-lg w-64">
    //     <h1 class="text-2xl">Login.</h1>
    //     {loading() ? (
    //       <div class="text-center">Sending magic link...</div>
    //     ) : (
    //       <>
    //         <input
    //           id="email"
    //           class="mt-2 border p-2 rounded-sm"
    //           type="email"
    //           placeholder="Your email"
    //           value={email()}
    //           onChange={(e) => setEmail(e.target.value)}></input>
    //         <Button onClick={handleLogin} classes="">
    //           Send Magic Link
    //         </Button>
    //       </>
    //     )}
    //   </div>
    // </div>
    <div class="flex mt-20 items-center justify-center">
      <div
        class="flex flex-col border p-4 rounded-lg shadow-lg w-64"
        aria-live="polite">
        <h1 class="text-2xl">Supabase + SolidJS</h1>
        {!showTokenInput() ? (
          <>
            <p class="description">Sign in with your email below</p>
            <form
              class="mt-4 items-center justify-center"
              onSubmit={handleSendToken}>
              <div>
                <input
                  id="email"
                  class="mt-2 border p-2 rounded-sm"
                  type="email"
                  placeholder="email@domain.com"
                  value={email()}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="mt-4 px-2 py-2 bg-black text-white rounded-lg transition-all duration-200 hover:scale-105"
                  aria-live="polite">
                  {loading() ? (
                    <span>Loading</span>
                  ) : (
                    <span>Send verification code</span>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p class="description">
              Enter the verification code sent to your email
            </p>
            <form
              class="mt-4 items-center justify-center"
              onSubmit={handleVerifyToken}>
              <div>
                <label for="token">Verification Code</label>
                <input
                  id="token"
                  class="mt-2 border p-2 rounded-sm"
                  type="text"
                  placeholder="6-digit code"
                  value={token()}
                  onChange={(e) => setToken(e.currentTarget.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="submit"
                  class="mt-4 px-2 py-2 bg-black text-white rounded-lg transition-all duration-200 hover:scale-105"
                  aria-live="polite">
                  {loading() ? (
                    <span>Verifying...</span>
                  ) : (
                    <span>Verify code</span>
                  )}
                </button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmail("");
                    setShowTokenInput(false);
                  }}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
