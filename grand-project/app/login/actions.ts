'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function magicLinkLogin(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const origin = process.env.NEXT_PUBLIC_SITE_URL!

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // This now points to our new, more reliable callback route
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login?message=Check your email for a login link')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}