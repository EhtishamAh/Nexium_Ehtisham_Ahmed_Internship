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
          // The get, set, and remove methods MUST NOT be async.
          get(name: string) {
            return cookies().get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookies().set({ name, value, ...options });
            } catch (error) {
              // Ignore errors.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookies().set({ name, value: '', ...options });
            } catch (error) {
              // Ignore errors.
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