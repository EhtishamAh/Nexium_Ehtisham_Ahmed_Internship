// In app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { logout } from '@/app/login/actions'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    // If there is an error or no user, redirect back to the login page
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950">
      <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-xl font-bold">AI Pitch Writer</h1>
        <form>
          <Button formAction={logout} variant="outline">
            Logout
          </Button>
        </form>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You are successfully logged in as: <strong>{data.user.email}</strong></p>
            <p className="mt-4">This is a protected area. The generator and your saved pitches will appear here soon.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}