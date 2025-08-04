// app/api/auth/callback/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// This ensures the route is always run dynamically for every request.
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
          // This method reads a cookie from the incoming request.
          get(name: string) {
            return cookies().get(name)?.value;
          },
          // This method sets a cookie on the outgoing response.
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookies().set({ name, value, ...options });
            } catch (error) {
              // Errors can be ignored if middleware is used to refresh sessions.
            }
          },
          // This method removes a cookie from the outgoing response.
          remove(name: string, options: CookieOptions) {
            try {
              cookies().set({ name, value: '', ...options });
            } catch (error) {
              // Errors can be ignored if middleware is used to refresh sessions.
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

  // Redirect to an error page if there's no code or if an error occurred.
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}