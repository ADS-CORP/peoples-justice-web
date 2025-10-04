/**
 * AI-Specific SEO Optimizations
 *
 * Implements 2025 AI SEO best practices:
 * - SeekToAction for video key moments
 * - ImageObject with IPTC metadata
 * - Speculation Rules API
 * - data-nosnippet controls
 * - AI crawler policy management
 */

/**
 * Generate SeekToAction for video chapters/key moments
 * Per Google: https://developers.google.com/search/docs/appearance/structured-data/video
 */
export function generateVideoSeekToAction(chapters: Array<{
  name: string
  startOffset: number // seconds
  url?: string
}>) {
  return {
    '@type': 'SeekToAction',
    target: chapters.map(chapter => ({
      '@type': 'EntryPoint',
      urlTemplate: chapter.url || `{video_url}?t=${chapter.startOffset}`,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
        'http://schema.org/IOSPlatform',
        'http://schema.org/AndroidPlatform',
      ],
    })),
    'startOffset-input': 'required name=startOffset',
  }
}

/**
 * Alternative: Generate Clip markup for video segments
 */
export function generateVideoClips(clips: Array<{
  name: string
  startOffset: number
  endOffset: number
  url: string
}>) {
  return clips.map((clip, index) => ({
    '@type': 'Clip',
    name: clip.name,
    startOffset: clip.startOffset,
    endOffset: clip.endOffset,
    url: clip.url,
    position: index + 1,
  }))
}

/**
 * Generate ImageObject with IPTC creator/credit metadata
 * Improves image attribution in AI summaries
 */
export function generateImageObject(params: {
  url: string
  width: number
  height: number
  caption?: string
  creator?: string
  creditText?: string
  copyrightNotice?: string
  license?: string
}): object {
  const { url, width, height, caption, creator, creditText, copyrightNotice, license } = params

  return {
    '@type': 'ImageObject',
    url,
    width,
    height,
    ...(caption && { caption }),
    ...(creator && {
      creator: {
        '@type': 'Person',
        name: creator,
      },
    }),
    ...(creditText && { creditText }),
    ...(copyrightNotice && { copyrightNotice }),
    ...(license && { license }),
  }
}

/**
 * Speculation Rules API configuration
 * For preloading/prerendering high-CTR links
 *
 * Usage: Add to <head> or inject via script
 */
export function generateSpeculationRules(config: {
  prerender?: {
    urls?: string[]
    where?: {
      href_matches?: string
      selector_matches?: string
    }
    eagerness?: 'immediate' | 'eager' | 'moderate' | 'conservative'
  }
  prefetch?: {
    urls?: string[]
    where?: {
      href_matches?: string
      selector_matches?: string
    }
    eagerness?: 'immediate' | 'eager' | 'moderate' | 'conservative'
  }
}): string {
  const rules: Record<string, unknown>[] = []

  if (config.prerender) {
    const rule: Record<string, unknown> = {
      source: 'list',
      ...(config.prerender.urls && { urls: config.prerender.urls }),
      ...(config.prerender.where && { where: config.prerender.where }),
      ...(config.prerender.eagerness && { eagerness: config.prerender.eagerness }),
    }
    rules.push({ prerender: [rule] })
  }

  if (config.prefetch) {
    const rule: Record<string, unknown> = {
      source: 'list',
      ...(config.prefetch.urls && { urls: config.prefetch.urls }),
      ...(config.prefetch.where && { where: config.prefetch.where }),
      ...(config.prefetch.eagerness && { eagerness: config.prefetch.eagerness }),
    }
    rules.push({ prefetch: [rule] })
  }

  return JSON.stringify(rules.length === 1 ? rules[0] : rules, null, 2)
}

/**
 * Generate speculation rules script tag
 */
export function SpeculationRulesScript({
  prerender,
  prefetch,
}: {
  prerender?: {
    urls?: string[]
    where?: { href_matches?: string; selector_matches?: string }
    eagerness?: 'immediate' | 'eager' | 'moderate' | 'conservative'
  }
  prefetch?: {
    urls?: string[]
    where?: { href_matches?: string; selector_matches?: string }
    eagerness?: 'immediate' | 'eager' | 'moderate' | 'conservative'
  }
}) {
  const rules = generateSpeculationRules({ prerender, prefetch })

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: rules }}
    />
  )
}

/**
 * Add data-nosnippet to sensitive content
 * Limits verbatim quoting without de-indexing
 */
export function NoSnippet({ children }: { children: React.ReactNode }) {
  return <span data-nosnippet>{children}</span>
}

/**
 * AI Crawler Policy Manager
 * Generates robots.txt directives for AI crawlers
 */
export const aiCrawlerPolicy = {
  /**
   * Common AI crawler user-agents (2025)
   */
  crawlers: {
    // Google AI
    'Google-Extended': 'Google AI training (separate from Search)',
    Googlebot: 'Google Search (required for indexing)',

    // OpenAI
    GPTBot: 'OpenAI GPT training',
    'ChatGPT-User': 'ChatGPT browsing',

    // Anthropic
    ClaudeBot: 'Anthropic Claude training',
    'anthropic-ai': 'Anthropic AI (legacy)',

    // Perplexity
    PerplexityBot: 'Perplexity AI search',

    // Others
    CCBot: 'Common Crawl (used by many AI companies)',
    'Omgilibot': 'Omgili crawler',
    'FacebookBot': 'Meta AI training',
    Diffbot: 'Diffbot knowledge graph',
  },

  /**
   * Generate robots.txt rules for AI crawlers
   */
  generateRobotsTxt(policy: {
    allowSearch: boolean // Googlebot
    allowAITraining: boolean // Google-Extended, GPTBot, etc.
    crawlDelay?: number // seconds
    blockList?: string[] // specific bots to block
  }): string {
    const { allowSearch, allowAITraining, crawlDelay = 10, blockList = [] } = policy

    const rules: string[] = []

    // Google Search (required)
    if (allowSearch) {
      rules.push('User-agent: Googlebot')
      rules.push('Allow: /')
      rules.push('')
    }

    // AI Training bots
    const trainingBots = [
      'Google-Extended',
      'GPTBot',
      'ChatGPT-User',
      'ClaudeBot',
      'anthropic-ai',
      'PerplexityBot',
      'CCBot',
      'Omgilibot',
      'FacebookBot',
      'Diffbot',
    ]

    if (allowAITraining) {
      trainingBots.forEach(bot => {
        if (!blockList.includes(bot)) {
          rules.push(`User-agent: ${bot}`)
          rules.push('Allow: /')
          if (crawlDelay) {
            rules.push(`Crawl-delay: ${crawlDelay}`)
          }
          rules.push('')
        }
      })
    } else {
      // Block AI training
      trainingBots.forEach(bot => {
        rules.push(`User-agent: ${bot}`)
        rules.push('Disallow: /')
        rules.push('')
      })
    }

    // Additional blocks
    blockList.forEach(bot => {
      rules.push(`User-agent: ${bot}`)
      rules.push('Disallow: /')
      rules.push('')
    })

    return rules.join('\n')
  },

  /**
   * HTTP header for Google-Extended control
   * Alternative to robots.txt
   */
  generateHTTPHeader(allow: boolean): Record<string, string> {
    return {
      'X-Robots-Tag': allow ? 'all' : 'noai, noimageai',
    }
  },
}

/**
 * Inline source/citation boxes for AI extraction
 * Makes facts easily attributable
 */
export function SourceBox({
  sources,
  title = 'Sources',
}: {
  sources: Array<{
    text: string
    url: string
    author?: string
    date?: string
  }>
  title?: string
}) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <h4 className="font-semibold text-blue-900 mb-2">{title}</h4>
      <ul className="space-y-2 text-sm">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 underline"
              id={`source-${index + 1}`}
            >
              {source.text}
            </a>
            {source.author && <span className="text-gray-600"> — {source.author}</span>}
            {source.date && <span className="text-gray-500"> ({source.date})</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * ProfilePage schema for author pages
 * Ties forum/Q&A content back to your site (entity consolidation)
 */
export function generateProfilePageSchema(params: {
  url: string
  name: string
  jobTitle?: string
  description?: string
  image?: string
  sameAs?: string[] // LinkedIn, Twitter, etc.
  worksFor?: {
    name: string
    url: string
  }
  knowsAbout?: string[]
}) {
  const { url, name, jobTitle, description, image, sameAs = [], worksFor, knowsAbout = [] } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name,
      url,
      ...(jobTitle && { jobTitle }),
      ...(description && { description }),
      ...(image && { image }),
      ...(sameAs.length > 0 && { sameAs }),
      ...(worksFor && {
        worksFor: {
          '@type': 'Organization',
          name: worksFor.name,
          url: worksFor.url,
        },
      }),
      ...(knowsAbout.length > 0 && { knowsAbout }),
    },
  }
}

/**
 * Update Organization schema with sameAs for entity clarity
 */
export function enhanceOrganizationSchema(baseSchema: Record<string, unknown>, sameAs: {
  wikidata?: string
  crunchbase?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  facebook?: string
}) {
  const sameAsUrls: string[] = []

  if (sameAs.wikidata) sameAsUrls.push(sameAs.wikidata)
  if (sameAs.crunchbase) sameAsUrls.push(sameAs.crunchbase)
  if (sameAs.linkedin) sameAsUrls.push(sameAs.linkedin)
  if (sameAs.twitter) sameAsUrls.push(sameAs.twitter)
  if (sameAs.youtube) sameAsUrls.push(sameAs.youtube)
  if (sameAs.facebook) sameAsUrls.push(sameAs.facebook)

  return {
    ...baseSchema,
    sameAs: sameAsUrls,
  }
}

/**
 * Generate rel="me" links for author verification
 * Connects your profiles to your website
 */
export function RelMeLinks({ profiles }: { profiles: Array<{ url: string; platform: string }> }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <link key={index} rel="me" href={profile.url} />
      ))}
    </>
  )
}
