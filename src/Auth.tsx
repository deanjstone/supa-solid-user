import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { toast } from 'solid-toast'

export default function Auth() {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('')
  const [token, setToken] = createSignal('')
  const [showTokenInput, setShowTokenInput] = createSignal(false)

  const handleSendToken = async (e: SubmitEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: email()
      })
      if (error) throw error
      setShowTokenInput(true)
      // Replaced alert with toast
      toast.success('Check your email for the verification code!')
    } catch (error) {
      if (error instanceof Error) {
        // Replaced alert with toast
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyToken = async (e: SubmitEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.verifyOtp({
        email: email(),
        token: token(),
        type: 'email'
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        // Replaced alert with toast
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="row flex-center flex">
      <div class="col-6 form-widget" aria-live="polite">
        <h1 class="header">Supabase + SolidJS</h1>
        {!showTokenInput() ? (
          <>
            <p class="description">Sign in with your email below</p>
            <form class="form-widget" onSubmit={handleSendToken}>
              <div>
                <label for="email">Email</label>
                <input
                  id="email"
                  class="inputField"
                  type="email"
                  placeholder="Your email"
                  value={email()}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div>
                <button type="submit" class="button block" aria-live="polite">
                  {loading() ? <span>Loading</span> : <span>Send verification code</span>}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p class="description">Enter the verification code sent to your email</p>
            <form class="form-widget" onSubmit={handleVerifyToken}>
              <div>
                <label for="token">Verification Code</label>
                <input
                  id="token"
                  class="inputField"
                  type="text"
                  placeholder="6-digit code"
                  value={token()}
                  onChange={(e) => setToken(e.currentTarget.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </div>
              <div>
                <button type="submit" class="button block" aria-live="polite">
                  {loading() ? <span>Verifying...</span> : <span>Verify code</span>}
                </button>
              </div>
              <div>
                <button type="button" class="button block" onClick={() => setShowTokenInput(false)}>
                  Back to email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}