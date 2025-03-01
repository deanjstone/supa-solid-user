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

  return (
    <div class="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card class="w-full max-w-md shadow-lg">
        <CardHeader class="space-y-1 text-center">
          <CardTitle class="text-2xl font-bold sm:text-3xl">
            Supa Solid User
          </CardTitle>
          <CardDescription>Supabase + SolidJS</CardDescription>
        </CardHeader>
        {!showTokenInput() ? (
          <form onSubmit={handleSendToken}>
            <CardContent class="grid gap-4 p-6">
              <p class="text-center text-sm text-muted-foreground">
                Sign in with your email below
              </p>
              <TextField class="grid gap-2">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  value={email()}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
              </TextField>
            </CardContent>
            <CardFooter class="flex flex-col sm:flex-row gap-3 px-6 pb-6 pt-2">
              <Button
                variant="outline"
                class="w-full"
                onClick={() => {
                  setEmail("");
                  setShowTokenInput(false);
                }}
                type="button">
                Cancel
              </Button>
              <Button
                class="w-full transition-all duration-200"
                type="submit"
                disabled={loading()}>
                {loading() ? (
                  <span>Loading...</span>
                ) : (
                  <span class="flex items-center justify-center gap-2">
                    <IconSend /> Send code
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyToken}>
            <CardContent class="grid gap-4 p-6">
              <p class="text-center text-sm text-muted-foreground">
                Enter the verification code sent to
              </p>
              <p class="truncate font-medium text-center">{email()}</p>
              <TextField class="grid gap-2">
                {/* <TextFieldLabel>Verification Code</TextFieldLabel> */}
                <TextFieldInput
                  id="token"
                  class="text-center text-lg tracking-wide"
                  type="text"
                  placeholder="Enter verification code"
                  value={token()}
                  onChange={(e) => setToken(e.currentTarget.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                  inputMode="numeric"
                  autocomplete="one-time-code"
                />
              </TextField>
            </CardContent>
            <CardFooter class="flex flex-col sm:flex-row gap-3 px-6 pb-6 pt-2">
              <Button
                variant="outline"
                class="w-full"
                onClick={() => {
                  setEmail("");
                  setShowTokenInput(false);
                }}
                type="button">
                Cancel
              </Button>
              <Button
                class="w-full transition-all duration-200"
                type="submit"
                disabled={loading()}>
                {loading() ? "Verifying..." : "Verify code"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Login;
