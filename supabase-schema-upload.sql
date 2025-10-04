-- People's Justice Database Schema for Supabase
-- Run this in Supabase SQL Editor
-- Multi-brand legal directory platform

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. BRANDS & CONFIGURATION
-- ========================================

CREATE TABLE brands (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  domain VARCHAR(255) UNIQUE NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_brands_domain ON brands(domain) WHERE active = TRUE;
CREATE INDEX idx_brands_slug ON brands(slug);

-- ========================================
-- 2. CASE TYPES & TAXONOMY
-- ========================================

CREATE TABLE case_types (
  id BIGSERIAL PRIMARY KEY,
  brand_id BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  pillar_slug VARCHAR(100),
  state_slug VARCHAR(100),
  city_slug VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  updated_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(brand_id, slug)
);

CREATE INDEX idx_case_types_brand ON case_types(brand_id);
CREATE INDEX idx_case_types_slug ON case_types(slug);
CREATE INDEX idx_case_types_status ON case_types(status) WHERE status = 'active';

-- ========================================
-- 3. INJURIES & CONDITIONS
-- ========================================

CREATE TABLE injuries (
  id BIGSERIAL PRIMARY KEY,
  case_type_id BIGINT NOT NULL REFERENCES case_types(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  synonyms TEXT[],
  dx_criteria TEXT,
  records_needed TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_injuries_case_type ON injuries(case_type_id);
CREATE INDEX idx_injuries_slug ON injuries(slug);

-- ========================================
-- 4. GEOGRAPHY
-- ========================================

CREATE TABLE geos (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  code VARCHAR(10),
  name VARCHAR(200) NOT NULL,
  parent_id BIGINT REFERENCES geos(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_geos_type ON geos(type);
CREATE INDEX idx_geos_code ON geos(code) WHERE code IS NOT NULL;
CREATE INDEX idx_geos_parent ON geos(parent_id) WHERE parent_id IS NOT NULL;

-- ========================================
-- 5. FIRMS & ATTORNEYS
-- ========================================

CREATE TABLE firms (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  website VARCHAR(500),
  phones TEXT[],
  languages TEXT[],
  bar_states TEXT[],
  reviews_count INT DEFAULT 0,
  avg_rating DECIMAL(3,2),
  intake_sla_sec INT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_firms_slug ON firms(slug);
CREATE INDEX idx_firms_active ON firms(active) WHERE active = TRUE;

CREATE TABLE firm_capabilities (
  id BIGSERIAL PRIMARY KEY,
  firm_id BIGINT NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  case_type_id BIGINT REFERENCES case_types(id) ON DELETE SET NULL,
  injury_id BIGINT REFERENCES injuries(id) ON DELETE SET NULL,
  geo_id BIGINT REFERENCES geos(id) ON DELETE SET NULL,
  accepts BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_firm_capabilities_firm ON firm_capabilities(firm_id);
CREATE INDEX idx_firm_capabilities_case_type ON firm_capabilities(case_type_id);
CREATE INDEX idx_firm_capabilities_geo ON firm_capabilities(geo_id);

-- ========================================
-- 6. SPONSORED PLACEMENTS
-- ========================================

CREATE TABLE placements (
  id BIGSERIAL PRIMARY KEY,
  firm_id BIGINT NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  scope VARCHAR(50),
  scope_id BIGINT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  price DECIMAL(10,2),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_placements_firm ON placements(firm_id);
CREATE INDEX idx_placements_active ON placements(active, start_at, end_at) WHERE active = TRUE;

-- ========================================
-- 7. FORMS & QUALIFIERS
-- ========================================

CREATE TABLE qualifier_sets (
  id BIGSERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  case_type_id BIGINT REFERENCES case_types(id) ON DELETE SET NULL,
  locale VARCHAR(10) DEFAULT 'en',
  questions JSONB NOT NULL,
  contact_fields JSONB NOT NULL,
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_qualifier_sets_key ON qualifier_sets(key);
CREATE INDEX idx_qualifier_sets_case_type ON qualifier_sets(case_type_id);

CREATE TABLE form_configs (
  id BIGSERIAL PRIMARY KEY,
  route_pattern VARCHAR(200) NOT NULL,
  provider VARCHAR(50) DEFAULT 'native',
  variant VARCHAR(50) DEFAULT 'short',
  locale VARCHAR(10) DEFAULT 'en',
  qualifier_set_id BIGINT REFERENCES qualifier_sets(id) ON DELETE SET NULL,
  routing_profile VARCHAR(100),
  embed_props JSONB,
  fallback_provider VARCHAR(50) DEFAULT 'native',
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_form_configs_route ON form_configs(route_pattern);
CREATE INDEX idx_form_configs_enabled ON form_configs(enabled) WHERE enabled = TRUE;

-- ========================================
-- 8. LEADS & INTAKE (CRITICAL - TCPA COMPLIANCE)
-- ========================================

CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  brand_id BIGINT NOT NULL REFERENCES brands(id),
  source VARCHAR(100),
  case_type_id BIGINT REFERENCES case_types(id) ON DELETE SET NULL,
  injury_id BIGINT REFERENCES injuries(id) ON DELETE SET NULL,
  geo_id BIGINT REFERENCES geos(id) ON DELETE SET NULL,
  qualifiers JSONB,
  payload JSONB,
  phone VARCHAR(20),
  email VARCHAR(255),
  consent_snapshot JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  form_provider VARCHAR(50),
  form_version VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_brand ON leads(brand_id);
CREATE INDEX idx_leads_case_type ON leads(case_type_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_email ON leads(email);

-- ========================================
-- 9. LEAD ROUTING & BUYERS
-- ========================================

CREATE TABLE buyers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  criteria JSONB,
  webhook_url VARCHAR(500),
  sla_sec INT,
  paused BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_buyers_paused ON buyers(paused) WHERE paused = FALSE;

CREATE TABLE router_logs (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  attempts JSONB,
  outcome VARCHAR(50),
  accepted_by BIGINT REFERENCES buyers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_router_logs_lead ON router_logs(lead_id);
CREATE INDEX idx_router_logs_buyer ON router_logs(accepted_by);

-- ========================================
-- 10. AUDIT LOGGING (COMPLIANCE CRITICAL)
-- ========================================

CREATE TABLE lead_audit_log (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  actor VARCHAR(100),
  metadata JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lead_audit_log_lead ON lead_audit_log(lead_id);
CREATE INDEX idx_lead_audit_log_created_at ON lead_audit_log(created_at DESC);

-- ========================================
-- 11. VERDICTS & RESOURCES
-- ========================================

CREATE TABLE verdicts (
  id BIGSERIAL PRIMARY KEY,
  case_type_id BIGINT REFERENCES case_types(id) ON DELETE SET NULL,
  defendant VARCHAR(200),
  court VARCHAR(200),
  state VARCHAR(10),
  date DATE,
  amount BIGINT,
  link VARCHAR(500),
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_verdicts_case_type ON verdicts(case_type_id);
CREATE INDEX idx_verdicts_state ON verdicts(state);
CREATE INDEX idx_verdicts_date ON verdicts(date DESC);

-- ========================================
-- 12. AUTO-UPDATE TRIGGERS
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_firms_updated_at BEFORE UPDATE ON firms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buyers_updated_at BEFORE UPDATE ON buyers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 13. SEED DATA
-- ========================================

INSERT INTO brands (slug, name, domain, active) VALUES
  ('peoples-justice', 'People''s Justice', 'peoplesjustice.com', TRUE),
  ('peoples-justice-local', 'People''s Justice (Local)', 'localhost', TRUE);

-- ========================================
-- DONE!
-- Next: Set up Row-Level Security policies
-- ========================================
