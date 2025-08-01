import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { magicLinkLogin } from './actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function LoginPage() {
  const supabase = createClient()

  // This code checks if the user is already logged in
  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    // If they are, redirect them to the dashboard
    redirect('/dashboard')
  }

  // If there is no user, we show the login form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to receive a magic link.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="me@example.com"
                required
              />
            </div>
            <Button formAction={magicLinkLogin} className="w-full">
              Send Magic Link
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}