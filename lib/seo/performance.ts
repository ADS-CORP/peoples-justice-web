/**
 * Performance Optimization Utilities
 *
 * Per techSpec.md §12 (Performance budgets):
 * - HTML ≤ 120 KB
 * - JS ≤ 150 KB hydrated
 * - CSS ≤ 100 KB
 * - Hero image ≤ 200 KB
 * - LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
 */

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  /**
   * Generate optimized image URLs with Next.js Image or Cloudinary/Imgix
   */
  getOptimizedUrl(
    src: string,
    params: {
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'avif' | 'jpeg' | 'png'
      fit?: 'cover' | 'contain' | 'fill'
    } = {}
  ): string {
    const {
      width,
      height,
      quality = 80,
      format = 'webp',
      fit = 'cover',
    } = params

    // If using Cloudinary/Imgix, transform URL
    // For now, return as-is (Next.js Image will handle)
    return src
  },

  /**
   * Generate srcset for responsive images
   */
  generateSrcSet(
    src: string,
    widths: number[] = [640, 768, 1024, 1280, 1536]
  ): string {
    return widths
      .map(width => `${this.getOptimizedUrl(src, { width })} ${width}w`)
      .join(', ')
  },

  /**
   * Get optimal image dimensions based on viewport
   */
  getResponsiveSizes(context: 'hero' | 'card' | 'thumbnail' | 'fullwidth'): string {
    const sizes = {
      hero: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
      card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
      thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px',
      fullwidth: '100vw',
    }
    return sizes[context]
  },

  /**
   * Validate image meets budget (≤200KB for hero)
   */
  validateImageSize(
    sizeInBytes: number,
    context: 'hero' | 'general'
  ): { valid: boolean; recommendation: string } {
    const limits = {
      hero: 200 * 1024, // 200 KB
      general: 100 * 1024, // 100 KB
    }

    const limit = limits[context]
    const sizeInKB = Math.round(sizeInBytes / 1024)

    if (sizeInBytes <= limit) {
      return {
        valid: true,
        recommendation: `Image size optimal (${sizeInKB} KB)`,
      }
    }

    return {
      valid: false,
      recommendation: `Image too large (${sizeInKB} KB, max ${Math.round(limit / 1024)} KB). Compress or use WebP/AVIF.`,
    }
  },
}

/**
 * Resource hints for critical resources
 */
export const resourceHints = {
  /**
   * Generate preconnect links for external domains
   */
  getPreconnectLinks(): Array<{ href: string; crossOrigin?: 'anonymous' | 'use-credentials' }> {
    return [
      { href: 'https://fonts.googleapis.com' },
      { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Add Supabase if using CDN for images
      { href: process.env.NEXT_PUBLIC_SUPABASE_URL || '', crossOrigin: 'anonymous' },
    ].filter(link => link.href) // Remove empty URLs
  },

  /**
   * Generate preload links for critical assets
   */
  getPreloadLinks(page: 'home' | 'pillar' | 'directory'): Array<{
    href: string
    as: 'image' | 'font' | 'style' | 'script'
    type?: string
    crossOrigin?: 'anonymous'
  }> {
    const links: Array<{
      href: string
      as: 'image' | 'font' | 'style' | 'script'
      type?: string
      crossOrigin?: 'anonymous'
    }> = []

    // Preload critical fonts
    links.push({
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    })

    // Page-specific preloads
    if (page === 'pillar') {
      links.push({
        href: '/images/hero-roundup.webp',
        as: 'image',
      })
    }

    return links
  },

  /**
   * Generate prefetch links for likely next navigation
   */
  getPrefetchLinks(currentPage: {
    type: 'pillar' | 'injury' | 'state'
    caseSlug?: string
    state?: string
  }): string[] {
    const prefetch: string[] = []

    // If on pillar, prefetch top injuries
    if (currentPage.type === 'pillar' && currentPage.caseSlug) {
      prefetch.push(`/cases/${currentPage.caseSlug}/non-hodgkin-lymphoma/`)
    }

    // If on injury/state, prefetch directory
    if (currentPage.type === 'injury' || currentPage.type === 'state') {
      if (currentPage.caseSlug && currentPage.state) {
        prefetch.push(`/find/${currentPage.caseSlug}/${currentPage.state}/`)
      }
    }

    return prefetch
  },
}

/**
 * Core Web Vitals optimization utilities
 */
export const coreWebVitals = {
  /**
   * LCP (Largest Contentful Paint) optimization checks
   * Target: ≤ 2.5s
   */
  validateLCP(
    elements: Array<{ selector: string; isAboveFold: boolean; hasPlaceholder: boolean }>
  ): {
    recommendations: string[]
  } {
    const recommendations: string[] = []

    elements.forEach(el => {
      if (el.isAboveFold && !el.hasPlaceholder) {
        recommendations.push(
          `Add placeholder for ${el.selector} to prevent layout shift`
        )
      }
    })

    return { recommendations }
  },

  /**
   * CLS (Cumulative Layout Shift) prevention
   * Target: ≤ 0.1
   */
  preventCLS(): string[] {
    return [
      'Set explicit width/height on all images',
      'Reserve space for ads/embeds with min-height',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio for responsive media',
      'Preload fonts to avoid FOIT/FOUT',
    ]
  },

  /**
   * INP (Interaction to Next Paint) optimization
   * Target: ≤ 200ms
   */
  optimizeINP(): string[] {
    return [
      'Debounce rapid user inputs (scroll, resize)',
      'Use requestIdleCallback for non-critical work',
      'Break up long JavaScript tasks with setTimeout',
      'Minimize DOM size (keep under 1500 nodes)',
      'Use CSS containment for complex components',
    ]
  },
}

/**
 * Bundle size validation
 */
export const bundleValidation = {
  /**
   * Validate page weight against budgets
   */
  validatePageWeight(metrics: {
    htmlSizeKB: number
    jsSizeKB: number
    cssSizeKB: number
    imagesSizeKB: number
  }): {
    score: number // 0-100
    issues: string[]
    passes: string[]
  } {
    const { htmlSizeKB, jsSizeKB, cssSizeKB, imagesSizeKB } = metrics
    const issues: string[] = []
    const passes: string[] = []
    let score = 100

    // HTML budget: ≤ 120 KB
    if (htmlSizeKB > 120) {
      issues.push(`HTML too large (${htmlSizeKB} KB, budget: 120 KB)`)
      score -= 15
    } else {
      passes.push(`HTML within budget (${htmlSizeKB} KB / 120 KB)`)
    }

    // JavaScript budget: ≤ 150 KB
    if (jsSizeKB > 150) {
      issues.push(`JavaScript too large (${jsSizeKB} KB, budget: 150 KB)`)
      score -= 20
    } else {
      passes.push(`JavaScript within budget (${jsSizeKB} KB / 150 KB)`)
    }

    // CSS budget: ≤ 100 KB
    if (cssSizeKB > 100) {
      issues.push(`CSS too large (${cssSizeKB} KB, budget: 100 KB)`)
      score -= 15
    } else {
      passes.push(`CSS within budget (${cssSizeKB} KB / 100 KB)`)
    }

    // Images budget (cumulative hero + above-fold): ≤ 400 KB
    if (imagesSizeKB > 400) {
      issues.push(`Images too large (${imagesSizeKB} KB, budget: 400 KB)`)
      score -= 10
    } else {
      passes.push(`Images within budget (${imagesSizeKB} KB / 400 KB)`)
    }

    return {
      score: Math.max(0, score),
      issues,
      passes,
    }
  },

  /**
   * Get bundle size recommendations
   */
  getOptimizationTips(bundleType: 'html' | 'js' | 'css'): string[] {
    const tips = {
      html: [
        'Minimize inline styles/scripts',
        'Remove unnecessary whitespace (minify)',
        'Defer non-critical HTML to client-side hydration',
        'Use SSR streaming for large pages',
      ],
      js: [
        'Code split by route',
        'Lazy load components below fold',
        'Tree shake unused exports',
        'Use dynamic imports for conditional features',
        'Replace moment.js with date-fns or dayjs',
        'Analyze bundle with @next/bundle-analyzer',
      ],
      css: [
        'Remove unused CSS (PurgeCSS)',
        'Use CSS containment (@layer)',
        'Inline critical CSS (<14KB)',
        'Defer non-critical CSS',
        'Use CSS variables instead of Sass functions',
      ],
    }

    return tips[bundleType] || []
  },
}

/**
 * Third-party script optimization
 */
export const thirdPartyScripts = {
  /**
   * Get recommended loading strategy for analytics
   */
  getLoadingStrategy(
    scriptType: 'analytics' | 'ads' | 'chatbot' | 'social' | 'consent'
  ): 'defer' | 'async' | 'lazyOnload' | 'worker' {
    const strategies = {
      analytics: 'defer', // GA4, GTM
      ads: 'lazyOnload', // Google Ads, Facebook Pixel (load after interaction)
      chatbot: 'lazyOnload', // Drift, Intercom (load on scroll or after 5s)
      social: 'async', // Social share buttons
      consent: 'defer', // CMP (required before analytics)
    }

    return strategies[scriptType] || 'defer'
  },

  /**
   * Generate script tag with optimal attributes
   */
  generateScriptTag(params: {
    src: string
    strategy: 'defer' | 'async' | 'lazyOnload'
    id?: string
    nonce?: string
  }): string {
    const { src, strategy, id, nonce } = params

    const attrs = [
      `src="${src}"`,
      id ? `id="${id}"` : '',
      nonce ? `nonce="${nonce}"` : '',
      strategy === 'defer' ? 'defer' : '',
      strategy === 'async' ? 'async' : '',
    ].filter(Boolean).join(' ')

    if (strategy === 'lazyOnload') {
      return `
        <script ${id ? `id="${id}"` : ''}>
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              const script = document.createElement('script');
              script.src = '${src}';
              ${nonce ? `script.nonce = '${nonce}';` : ''}
              document.body.appendChild(script);
            });
          } else {
            setTimeout(() => {
              const script = document.createElement('script');
              script.src = '${src}';
              ${nonce ? `script.nonce = '${nonce}';` : ''}
              document.body.appendChild(script);
            }, 1000);
          }
        </script>
      `
    }

    return `<script ${attrs}></script>`
  },
}

/**
 * Generate performance report for CI/CD
 */
export function generatePerformanceReport(metrics: {
  htmlSizeKB: number
  jsSizeKB: number
  cssSizeKB: number
  imagesSizeKB: number
  lcpMs?: number
  cls?: number
  inpMs?: number
}): {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  summary: string
  details: {
    budgets: ReturnType<typeof bundleValidation.validatePageWeight>
    coreWebVitals?: {
      lcp: { value: number; target: number; pass: boolean }
      cls: { value: number; target: number; pass: boolean }
      inp: { value: number; target: number; pass: boolean }
    }
  }
} {
  const budgets = bundleValidation.validatePageWeight(metrics)

  const coreWebVitals = metrics.lcpMs && metrics.cls && metrics.inpMs
    ? {
        lcp: { value: metrics.lcpMs, target: 2500, pass: metrics.lcpMs <= 2500 },
        cls: { value: metrics.cls, target: 0.1, pass: metrics.cls <= 0.1 },
        inp: { value: metrics.inpMs, target: 200, pass: metrics.inpMs <= 200 },
      }
    : undefined

  // Calculate overall score
  let score = budgets.score

  if (coreWebVitals) {
    if (!coreWebVitals.lcp.pass) score -= 10
    if (!coreWebVitals.cls.pass) score -= 10
    if (!coreWebVitals.inp.pass) score -= 5
  }

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'

  const summary = `Performance Score: ${score}/100 (Grade ${grade}). ${budgets.issues.length} budget violations.`

  return {
    score,
    grade,
    summary,
    details: {
      budgets,
      coreWebVitals,
    },
  }
}
