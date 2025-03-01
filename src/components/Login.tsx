import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSupabaseAuth } from "solid-supabase";
import { toast } from "solid-toast";

import { Button } from "@ui/button";
import { IconSend } from "@ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "@ui/text-field";

const Login = () => {
  const [loading, setLoading] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [token, setToken] = createSignal("");
  const [showTokenInput, setShowTokenInput] = createSignal(false);

  const navigate = useNavigate();
  const supaAuth = useSupabaseAuth();

  // createEffect(() => {
  //   supaAuth.getSession().then(({ data: { session } }) => {
  //     if (session) {
  //       navigate("/dashboard");
  //     }
  //   });
  // });

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
    <div class="flex mt-20 items-center justify-center">
      <Card class="shadow-lg">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">Supa Solid User</CardTitle>
          <CardDescription>Supabase + SolidJS</CardDescription>
        </CardHeader>
        {!showTokenInput() ? (
          <form onSubmit={handleSendToken}>
            <CardContent class="grid gap-4">
              <p class="text-sm text-gray-500">Sign in with your email below</p>
              <TextField class="grid gap-2">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  value={email()}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </TextField>
            </CardContent>
            <CardFooter class="grid grid-cols-2 gap-6">
              <Button
                variant="outline"
                class="w-full"
                onClick={() => {
                  setEmail("");
                  setShowTokenInput(false);
                }}>
                Cancel
              </Button>
              <Button
                class="w-full transition-all duration-200 hover:scale-105"
                type="submit">
                {loading() ? (
                  <span>Loading...</span>
                ) : (
                  <span class="flex">
                    <IconSend class="mr-2" /> Send code
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyToken}>
            <CardContent class="grid gap-4">
              <p>Enter the verification code sent to</p>
              <p class="truncate font-medium">{email()}</p>
              <TextField class="grid gap-2">
                <TextFieldLabel>Verification Code</TextFieldLabel>
                <TextFieldInput
                  id="token"
                  class="mt-2 border p-2 rounded-sm bg-bg-000 border-border-200  hover:border-border-100  transition-colors  placeholder:text-text-500  focus:border-accent-secondary-100  focus-within:!border-accent-secondary-100  focus:ring-0  focus:outline-none  disabled:cursor-not-allowed  disabled:opacity-50 h-11 px-3 w-full text-center"
                  type="text"
                  placeholder="6-digit code"
                  value={token()}
                  onChange={(e) => setToken(e.currentTarget.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </TextField>
            </CardContent>
            <CardFooter class="grid grid-cols-2 gap-6">
              <Button
                variant="outline"
                class="w-full"
                onClick={() => {
                  setEmail("");
                  setShowTokenInput(false);
                }}>
                Cancel
              </Button>
              <Button
                class="w-28 transition-all duration-200 hover:scale-105"
                type="submit">
                {loading() ? (
                  <span>Verifying...</span>
                ) : (
                  <span>Verify code</span>
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Login;
