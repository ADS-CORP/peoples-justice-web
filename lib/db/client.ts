/**
 * Database Client - PostgreSQL Connection
 *
 * Multi-brand legal directory platform
 * Uses pg for PostgreSQL connections
 */

import { Pool, QueryResult } from 'pg'

// Database configuration from environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Type-safe query function
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now()
  const result = await pool.query<T>(text, params)
  const duration = Date.now() - start

  if (process.env.NODE_ENV === 'development') {
    console.log('[DB Query]', { text, duration, rows: result.rowCount })
  }

  return result
}

// Transaction helper
export async function transaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

// Type definitions for database models
export interface Brand {
  id: number
  slug: string
  name: string
  domain: string
  active: boolean
  created_at: Date
  updated_at: Date
}

export interface CaseType {
  id: number
  brand_id: number
  slug: string
  name: string
  category: 'massAction' | 'singleEventPI' | 'institutionalAbuse' | 'consumer' | 'other'
  pillar_slug: string | null
  state_slug: string | null
  city_slug: string | null
  status: 'active' | 'paused' | 'archived'
  updated_at: Date
  created_at: Date
}

export interface Lead {
  id: number
  brand_id: number
  source: string | null
  case_type_id: number | null
  injury_id: number | null
  geo_id: number | null
  qualifiers: Record<string, any> | null
  payload: Record<string, any> | null
  phone: string | null
  email: string | null
  consent_snapshot: ConsentSnapshot
  status: string
  form_provider: string | null
  form_version: string | null
  created_at: Date
  updated_at: Date
}

export interface ConsentSnapshot {
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

export interface LeadAuditLog {
  id: number
  lead_id: number
  event_type: string
  actor: string | null
  metadata: Record<string, any> | null
  ip_address: string | null
  created_at: Date
}

// Database helper functions
export const db = {
  // Brands
  async getBrandByDomain(domain: string): Promise<Brand | null> {
    const result = await query<Brand>(
      'SELECT * FROM brands WHERE domain = $1 AND active = TRUE',
      [domain]
    )
    return result.rows[0] || null
  },

  // Case Types
  async getCaseTypeBySlug(brandId: number, slug: string): Promise<CaseType | null> {
    const result = await query<CaseType>(
      'SELECT * FROM case_types WHERE brand_id = $1 AND slug = $2 AND status = $3',
      [brandId, slug, 'active']
    )
    return result.rows[0] || null
  },

  // Leads
  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
    const result = await query<Lead>(
      `INSERT INTO leads (
        brand_id, source, case_type_id, injury_id, geo_id,
        qualifiers, payload, phone, email, consent_snapshot,
        status, form_provider, form_version
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        lead.brand_id,
        lead.source,
        lead.case_type_id,
        lead.injury_id,
        lead.geo_id,
        JSON.stringify(lead.qualifiers),
        JSON.stringify(lead.payload),
        lead.phone,
        lead.email,
        JSON.stringify(lead.consent_snapshot),
        lead.status,
        lead.form_provider,
        lead.form_version,
      ]
    )
    return result.rows[0]
  },

  // Audit Log
  async createAuditLog(log: Omit<LeadAuditLog, 'id' | 'created_at'>): Promise<LeadAuditLog> {
    const result = await query<LeadAuditLog>(
      `INSERT INTO lead_audit_log (lead_id, event_type, actor, metadata, ip_address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        log.lead_id,
        log.event_type,
        log.actor,
        JSON.stringify(log.metadata),
        log.ip_address,
      ]
    )
    return result.rows[0]
  },

  // Check for duplicate leads (24h window)
  async findRecentDuplicate(
    phone: string,
    caseTypeId: number,
    hoursWindow: number = 24
  ): Promise<Lead | null> {
    const result = await query<Lead>(
      `SELECT * FROM leads
       WHERE phone = $1
         AND case_type_id = $2
         AND created_at > NOW() - INTERVAL '${hoursWindow} hours'
       ORDER BY created_at DESC
       LIMIT 1`,
      [phone, caseTypeId]
    )
    return result.rows[0] || null
  },
}

export default db
