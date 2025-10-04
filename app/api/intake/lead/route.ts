/**
 * Lead Intake API Endpoint - Supabase Version
 *
 * Handles form submissions with TCPA-compliant consent snapshot
 * - Server-side IP capture
 * - Full consent text storage
 * - Audit logging
 * - Duplicate detection
 * - Multi-brand support via RLS
 *
 * POST /api/intake/lead
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

// Type definitions
type LeadInsert = Database['public']['Tables']['leads']['Insert']
type BrandRow = Database['public']['Tables']['brands']['Row']
type CaseTypeRow = Database['public']['Tables']['case_types']['Row']

interface ConsentSnapshot {
  text: string
  timestamp: string
  ipAddress: string | null
  userAgent: string | null
  locale: string
  formVersion: string
  provider: string
  checkboxChecked: boolean
  url: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.contact?.phone || !body.contact?.email) {
      return NextResponse.json(
        { error: 'Phone and email are required' },
        { status: 400 }
      )
    }

    if (!body.consent?.checked) {
      return NextResponse.json(
        { error: 'TCPA consent is required' },
        { status: 400 }
      )
    }

    // Server-side IP capture (CRITICAL for TCPA compliance)
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      null

    // Get Supabase admin client (bypasses RLS)
    const supabase = createAdminClient()

    // Get brand by domain (for multi-brand support)
    const host = request.headers.get('host') || 'peoplesjustice.com'
    const domain = host // Keep port for now since we have "localhost:3002" in DB

    console.log('[Lead Intake] Host:', host, 'Domain:', domain)

    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('domain', domain)
      .eq('active', true)
      .single()

    if (brandError || !brand) {
      console.log('[Lead Intake] Brand not found for domain:', domain, 'Error:', brandError)
      return NextResponse.json(
        { error: 'Invalid domain' },
        { status: 400 }
      )
    }

    console.log('[Lead Intake] Found brand:', brand.slug)

    // Get case type (if provided)
    let caseTypeId: number | null = null
    if (body.caseSlug) {
      const { data: caseType } = await supabase
        .from('case_types')
        .select('id')
        .eq('brand_id', brand.id)
        .eq('slug', body.caseSlug)
        .eq('active', true)
        .single()

      caseTypeId = caseType?.id || null
    }

    // Check for duplicate (same phone + case type within 24h)
    if (caseTypeId) {
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

      const { data: duplicate } = await supabase
        .from('leads')
        .select('id')
        .eq('phone', body.contact.phone)
        .eq('case_type_id', caseTypeId)
        .gte('created_at', twentyFourHoursAgo.toISOString())
        .single()

      if (duplicate) {
        // Log duplicate attempt but still return success to user
        await supabase.from('lead_audit_log').insert({
          brand_id: brand.id,
          lead_id: duplicate.id,
          action: 'duplicate_submission',
          actor: 'system',
          metadata: {
            original_lead_id: duplicate.id,
            duplicate_attempt_at: new Date().toISOString(),
          },
        })

        return NextResponse.json({
          success: true,
          leadId: duplicate.id,
          message: 'Your information has been received.',
        })
      }
    }

    // Build TCPA-compliant consent snapshot (enhanced)
    const consentSnapshot = {
      text: body.consent.text || 'Consent text not provided',
      timestamp: new Date().toISOString(),
      ipAddress,
      userAgent: request.headers.get('user-agent'),
      locale: body.locale || 'en',
      formVersion: body.formVersion || '1.0.0',
      provider: body.formProvider || 'native',
      checkboxChecked: body.consent.checked,
      url: body.pageUrl || request.headers.get('referer') || '',
      method: body.consent.method || 'checkbox',
      privacyPolicyUrl: body.consent.privacyPolicyUrl || `${request.headers.get('origin')}/privacy`,
      termsOfServiceUrl: body.consent.termsOfServiceUrl || `${request.headers.get('origin')}/terms`,
      checkboxPosition: body.consent.checkboxPosition || 'above_submit',
      consentLanguage: body.locale || 'en',
    }

    // Build page context
    const pageContext = {
      url: body.pageUrl || request.headers.get('referer') || '',
      path: body.pagePath || new URL(body.pageUrl || request.headers.get('referer') || 'https://example.com').pathname,
      pillarSlug: body.pageContext?.pillarSlug || body.caseSlug || null,
      injurySlug: body.pageContext?.injurySlug || null,
      stateSlug: body.pageContext?.stateSlug || null,
      citySlug: body.pageContext?.citySlug || null,
      pageType: body.pageContext?.pageType || 'T1',
      pageTitle: body.pageContext?.pageTitle || '',
      scrollDepth: body.pageContext?.scrollDepth || 0,
      timeOnPage: body.pageContext?.timeOnPage || 0,
      clicksBeforeSubmit: body.pageContext?.clicksBeforeSubmit || 0,
      formProvider: body.formProvider || 'native',
      formVersion: body.formVersion || '1.0.0',
    }

    // Build fingerprint data
    const fingerprintData = body.fingerprint || {}

    // Create lead record (enhanced with new fields)
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        brand_id: brand.id,
        source: body.source || 'web_form',
        case_type_id: caseTypeId,
        injury_id: null, // TODO: Map from qualifiers
        geo_id: null, // TODO: Geocode from ZIP
        qualifiers: body.qualifiers || {},
        payload: {
          contact: body.contact,
          utm: body.utm || {},
          referrer: request.headers.get('referer'),
          landingPage: body.landingPage || body.pageUrl,
          sessionId: body.sessionId || null,
        },
        phone: body.contact.phone,
        email: body.contact.email,
        first_name: body.contact.firstName || null,
        last_name: body.contact.lastName || null,
        zip_code: body.contact.zipCode || null,
        consent_snapshot: consentSnapshot,
        user_agent: request.headers.get('user-agent'),
        fingerprint_data: fingerprintData,
        page_context: pageContext,
        session_id: body.sessionId || null,
        status: 'new',
        form_provider: body.formProvider || 'native',
        form_version: body.formVersion || '1.0.0',
      })
      .select()
      .single()

    if (leadError || !lead) {
      console.error('[Lead Insert Error]', leadError)
      throw new Error('Failed to create lead')
    }

    // Create audit log entry
    await supabase.from('lead_audit_log').insert({
      brand_id: brand.id,
      lead_id: lead.id,
      action: 'created',
      actor: 'system',
      metadata: {
        source: 'web_form',
        brand_id: brand.id,
        case_type_id: caseTypeId,
      },
    })

    // TODO: Enqueue for routing
    // await routingQueue.add({ leadId: lead.id })

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Thank you! An attorney will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('[Lead Intake Error]', error)

    // Log error but don't expose details to client
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    service: 'lead-intake',
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
