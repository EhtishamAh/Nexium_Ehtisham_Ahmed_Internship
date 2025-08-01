import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  return (
    // Added a relative container for background effects
    <div className="relative isolate flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4 overflow-hidden">
      
      {/* Aurora background effect */}
      <div
        className="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Main content with entry animations */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Create Your Perfect Pitch <span className="text-primary">in Seconds</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Leverage the power of AI to craft compelling, professional pitches that will impress investors and customers. Stop worrying about what to say and start building your dream.
        </p>
        <div className="mt-8">
          {data.user ? (
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/dashboard">Go to Your Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/login">Get Started for Free</Link>
            </Button>
          )}
        </div>
      </div>
      
       {/* Second Aurora background effect for balance */}
      <div
        className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu overflow-hidden blur-3xl sm:top-[-20%]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}