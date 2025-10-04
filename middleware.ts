/**
 * Next.js Middleware
 *
 * Handles:
 * - Domain-based brand detection
 * - Canonical URL redirects (state abbreviations, URL variants)
 * - Security headers
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|css|js)$/)
  ) {
    return NextResponse.next()
  }

  // Create response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // HSTS (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
  }

  // State abbreviation redirects (e.g., /state/ca/ → /state/california/)
  const stateAbbrevMatch = pathname.match(/^\/state\/([a-z]{2})(\/|$)/)
  if (stateAbbrevMatch) {
    const abbrev = stateAbbrevMatch[1].toUpperCase()
    const stateMap: Record<string, string> = {
      CA: 'california',
      TX: 'texas',
      FL: 'florida',
      NY: 'new-york',
      PA: 'pennsylvania',
      IL: 'illinois',
      OH: 'ohio',
      GA: 'georgia',
      NC: 'north-carolina',
      MI: 'michigan',
    }

    const fullStateName = stateMap[abbrev]
    if (fullStateName) {
      const newUrl = request.nextUrl.clone()
      newUrl.pathname = pathname.replace(`/state/${abbrev.toLowerCase()}`, `/state/${fullStateName}`)
      return NextResponse.redirect(newUrl, 301) // Permanent redirect
    }
  }

  // Canonical redirects for trailing slashes
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(newUrl, 301)
  }

  // Add brand header for debugging (optional)
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Brand-Domain', host)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|ico)$).*)',
  ],
}
