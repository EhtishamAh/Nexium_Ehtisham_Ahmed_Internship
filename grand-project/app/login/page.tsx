// /grand-project/app/login/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client' // <-- This is the corrected import path
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // This must match the URL in your Supabase dashboard settings
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in:', error)
      setError(error.message)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a magic link to <strong>{email}</strong>. Click the link in the email to log in.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Enter your email to receive a magic login link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send Magic Link</Button>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}