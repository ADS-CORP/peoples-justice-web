/**
 * Supabase Client - Browser/Client Components
 *
 * For use in React Client Components
 * Uses anon key (safe to expose to browser)
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
