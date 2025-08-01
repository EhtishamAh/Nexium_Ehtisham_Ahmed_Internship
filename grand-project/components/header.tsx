import { ThemeToggle } from "./theme-toggle"
import Link from 'next/link'
import { createClient } from "@/lib/supabase/server"
import { Button } from "./ui/button"
import { logout } from "@/app/login/actions"

export async function Header() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm md:px-6">
      <Link href={data.user ? "/dashboard" : "/"} className="text-xl font-bold">
        AI Pitch Writer
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {data.user ? (
          <form>
            <Button formAction={logout} variant="outline">
              Logout
            </Button>
          </form>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}