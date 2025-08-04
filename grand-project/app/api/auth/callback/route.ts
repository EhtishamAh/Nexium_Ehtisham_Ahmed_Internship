// app/api/auth/callback/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// This ensures the route is always run dynamically.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // These helper functions MUST be synchronous (no "async").
          get(name: string) {
            return cookies().get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookies().set({ name, value, ...options });
            } catch (error) {
              // Ignore errors if middleware is handling cookie refresh.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookies().set({ name, value: '', ...options });
            } catch (error) {
              // Ignore errors if middleware is handling cookie refresh.
            }
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to an error page if something went wrong.
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}