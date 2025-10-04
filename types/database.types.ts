export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          active: boolean | null
          created_at: string
          domain: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          domain: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          domain?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      buyers: {
        Row: {
          created_at: string
          criteria: Json | null
          id: number
          name: string
          paused: boolean | null
          sla_sec: number | null
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          created_at?: string
          criteria?: Json | null
          id?: number
          name: string
          paused?: boolean | null
          sla_sec?: number | null
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          created_at?: string
          criteria?: Json | null
          id?: number
          name?: string
          paused?: boolean | null
          sla_sec?: number | null
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      case_types: {
        Row: {
          brand_id: number
          category: string
          city_slug: string | null
          created_at: string
          id: number
          name: string
          pillar_slug: string | null
          slug: string
          state_slug: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          brand_id: number
          category: string
          city_slug?: string | null
          created_at?: string
          id?: number
          name: string
          pillar_slug?: string | null
          slug: string
          state_slug?: string | null
          status?: string | null
          updated_at: string
        }
        Update: {
          brand_id?: number
          category?: string
          city_slug?: string | null
          created_at?: string
          id?: number
          name?: string
          pillar_slug?: string | null
          slug?: string
          state_slug?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_types_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      firm_capabilities: {
        Row: {
          accepts: boolean | null
          case_type_id: number | null
          created_at: string
          firm_id: number
          geo_id: number | null
          id: number
          injury_id: number | null
          notes: string | null
        }
        Insert: {
          accepts?: boolean | null
          case_type_id?: number | null
          created_at?: string
          firm_id: number
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          notes?: string | null
        }
        Update: {
          accepts?: boolean | null
          case_type_id?: number | null
          created_at?: string
          firm_id?: number
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "firm_capabilities_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "firm_capabilities_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "firm_capabilities_geo_id_fkey"
            columns: ["geo_id"]
            isOneToOne: false
            referencedRelation: "geos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "firm_capabilities_injury_id_fkey"
            columns: ["injury_id"]
            isOneToOne: false
            referencedRelation: "injuries"
            referencedColumns: ["id"]
          },
        ]
      }
      firms: {
        Row: {
          active: boolean | null
          avg_rating: number | null
          bar_states: string[] | null
          created_at: string
          id: number
          intake_sla_sec: number | null
          languages: string[] | null
          name: string
          phones: string[] | null
          reviews_count: number | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          active?: boolean | null
          avg_rating?: number | null
          bar_states?: string[] | null
          created_at?: string
          id?: number
          intake_sla_sec?: number | null
          languages?: string[] | null
          name: string
          phones?: string[] | null
          reviews_count?: number | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          active?: boolean | null
          avg_rating?: number | null
          bar_states?: string[] | null
          created_at?: string
          id?: number
          intake_sla_sec?: number | null
          languages?: string[] | null
          name?: string
          phones?: string[] | null
          reviews_count?: number | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      form_configs: {
        Row: {
          created_at: string
          embed_props: Json | null
          enabled: boolean | null
          fallback_provider: string | null
          id: number
          locale: string | null
          provider: string | null
          qualifier_set_id: number | null
          route_pattern: string
          routing_profile: string | null
          variant: string | null
        }
        Insert: {
          created_at?: string
          embed_props?: Json | null
          enabled?: boolean | null
          fallback_provider?: string | null
          id?: number
          locale?: string | null
          provider?: string | null
          qualifier_set_id?: number | null
          route_pattern: string
          routing_profile?: string | null
          variant?: string | null
        }
        Update: {
          created_at?: string
          embed_props?: Json | null
          enabled?: boolean | null
          fallback_provider?: string | null
          id?: number
          locale?: string | null
          provider?: string | null
          qualifier_set_id?: number | null
          route_pattern?: string
          routing_profile?: string | null
          variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_configs_qualifier_set_id_fkey"
            columns: ["qualifier_set_id"]
            isOneToOne: false
            referencedRelation: "qualifier_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      geos: {
        Row: {
          code: string | null
          created_at: string
          id: number
          name: string
          parent_id: number | null
          type: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          name: string
          parent_id?: number | null
          type: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string
          parent_id?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "geos_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "geos"
            referencedColumns: ["id"]
          },
        ]
      }
      injuries: {
        Row: {
          case_type_id: number
          created_at: string
          dx_criteria: string | null
          id: number
          name: string
          records_needed: string[] | null
          slug: string
          synonyms: string[] | null
        }
        Insert: {
          case_type_id: number
          created_at?: string
          dx_criteria?: string | null
          id?: number
          name: string
          records_needed?: string[] | null
          slug: string
          synonyms?: string[] | null
        }
        Update: {
          case_type_id?: number
          created_at?: string
          dx_criteria?: string | null
          id?: number
          name?: string
          records_needed?: string[] | null
          slug?: string
          synonyms?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "injuries_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_audit_log: {
        Row: {
          actor: string | null
          created_at: string
          event_type: string
          id: number
          ip_address: unknown | null
          lead_id: number
          metadata: Json | null
        }
        Insert: {
          actor?: string | null
          created_at?: string
          event_type: string
          id?: number
          ip_address?: unknown | null
          lead_id: number
          metadata?: Json | null
        }
        Update: {
          actor?: string | null
          created_at?: string
          event_type?: string
          id?: number
          ip_address?: unknown | null
          lead_id?: number
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_audit_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_audit_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_enriched"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          brand_id: number
          case_type_id: number | null
          consent_snapshot: Json
          created_at: string
          email: string | null
          fingerprint_data: Json | null
          first_name: string | null
          form_provider: string | null
          form_version: string | null
          geo_id: number | null
          id: number
          injury_id: number | null
          last_name: string | null
          page_context: Json | null
          payload: Json | null
          phone: string | null
          qualifiers: Json | null
          session_id: string | null
          source: string | null
          status: string | null
          updated_at: string
          user_agent: string | null
          zip_code: string | null
        }
        Insert: {
          brand_id: number
          case_type_id?: number | null
          consent_snapshot: Json
          created_at?: string
          email?: string | null
          fingerprint_data?: Json | null
          first_name?: string | null
          form_provider?: string | null
          form_version?: string | null
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          last_name?: string | null
          page_context?: Json | null
          payload?: Json | null
          phone?: string | null
          qualifiers?: Json | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
          zip_code?: string | null
        }
        Update: {
          brand_id?: number
          case_type_id?: number | null
          consent_snapshot?: Json
          created_at?: string
          email?: string | null
          fingerprint_data?: Json | null
          first_name?: string | null
          form_provider?: string | null
          form_version?: string | null
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          last_name?: string | null
          page_context?: Json | null
          payload?: Json | null
          phone?: string | null
          qualifiers?: Json | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_geo_id_fkey"
            columns: ["geo_id"]
            isOneToOne: false
            referencedRelation: "geos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_injury_id_fkey"
            columns: ["injury_id"]
            isOneToOne: false
            referencedRelation: "injuries"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          brand_id: number
          case_type_id: number | null
          clicks_count: number | null
          form_interactions: number | null
          geo_id: number | null
          id: number
          injury_id: number | null
          ip_address: unknown | null
          page_type: string | null
          path: string
          pillar_slug: string | null
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
          url: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          viewed_at: string
        }
        Insert: {
          brand_id: number
          case_type_id?: number | null
          clicks_count?: number | null
          form_interactions?: number | null
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          ip_address?: unknown | null
          page_type?: string | null
          path: string
          pillar_slug?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
          url: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewed_at?: string
        }
        Update: {
          brand_id?: number
          case_type_id?: number | null
          clicks_count?: number | null
          form_interactions?: number | null
          geo_id?: number | null
          id?: number
          injury_id?: number | null
          ip_address?: unknown | null
          page_type?: string | null
          path?: string
          pillar_slug?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
          url?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_views_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_views_geo_id_fkey"
            columns: ["geo_id"]
            isOneToOne: false
            referencedRelation: "geos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_views_injury_id_fkey"
            columns: ["injury_id"]
            isOneToOne: false
            referencedRelation: "injuries"
            referencedColumns: ["id"]
          },
        ]
      }
      placements: {
        Row: {
          active: boolean | null
          created_at: string
          end_at: string
          firm_id: number
          id: number
          price: number | null
          scope: string | null
          scope_id: number | null
          start_at: string
          type: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          end_at: string
          firm_id: number
          id?: number
          price?: number | null
          scope?: string | null
          scope_id?: number | null
          start_at: string
          type: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          end_at?: string
          firm_id?: number
          id?: number
          price?: number | null
          scope?: string | null
          scope_id?: number | null
          start_at?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "placements_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      qualifier_sets: {
        Row: {
          case_type_id: number | null
          contact_fields: Json
          created_at: string
          id: number
          key: string
          locale: string | null
          questions: Json
          version: number | null
        }
        Insert: {
          case_type_id?: number | null
          contact_fields: Json
          created_at?: string
          id?: number
          key: string
          locale?: string | null
          questions: Json
          version?: number | null
        }
        Update: {
          case_type_id?: number | null
          contact_fields?: Json
          created_at?: string
          id?: number
          key?: string
          locale?: string | null
          questions?: Json
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "qualifier_sets_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
        ]
      }
      router_logs: {
        Row: {
          accepted_by: number | null
          attempts: Json | null
          created_at: string
          id: number
          lead_id: number
          outcome: string | null
        }
        Insert: {
          accepted_by?: number | null
          attempts?: Json | null
          created_at?: string
          id?: number
          lead_id: number
          outcome?: string | null
        }
        Update: {
          accepted_by?: number | null
          attempts?: Json | null
          created_at?: string
          id?: number
          lead_id?: number
          outcome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "router_logs_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "router_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "router_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_enriched"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          brand_id: number
          converted_at: string | null
          created_at: string
          fingerprint_hash: string | null
          first_touch: Json | null
          first_visit_at: string
          id: number
          ip_address: unknown | null
          last_touch: Json | null
          last_visit_at: string
          lead_id: number | null
          pages_viewed: Json | null
          session_id: string
          total_time_on_site: number | null
          updated_at: string
          user_agent: string | null
          visit_count: number
        }
        Insert: {
          brand_id: number
          converted_at?: string | null
          created_at?: string
          fingerprint_hash?: string | null
          first_touch?: Json | null
          first_visit_at?: string
          id?: number
          ip_address?: unknown | null
          last_touch?: Json | null
          last_visit_at?: string
          lead_id?: number | null
          pages_viewed?: Json | null
          session_id: string
          total_time_on_site?: number | null
          updated_at?: string
          user_agent?: string | null
          visit_count?: number
        }
        Update: {
          brand_id?: number
          converted_at?: string | null
          created_at?: string
          fingerprint_hash?: string | null
          first_touch?: Json | null
          first_visit_at?: string
          id?: number
          ip_address?: unknown | null
          last_touch?: Json | null
          last_visit_at?: string
          lead_id?: number | null
          pages_viewed?: Json | null
          session_id?: string
          total_time_on_site?: number | null
          updated_at?: string
          user_agent?: string | null
          visit_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessions_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_enriched"
            referencedColumns: ["id"]
          },
        ]
      }
      verdicts: {
        Row: {
          amount: number | null
          case_type_id: number | null
          court: string | null
          created_at: string
          date: string | null
          defendant: string | null
          id: number
          link: string | null
          state: string | null
          summary: string | null
        }
        Insert: {
          amount?: number | null
          case_type_id?: number | null
          court?: string | null
          created_at?: string
          date?: string | null
          defendant?: string | null
          id?: number
          link?: string | null
          state?: string | null
          summary?: string | null
        }
        Update: {
          amount?: number | null
          case_type_id?: number | null
          court?: string | null
          created_at?: string
          date?: string | null
          defendant?: string | null
          id?: number
          link?: string | null
          state?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verdicts_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leads_enriched: {
        Row: {
          brand_id: number | null
          case_type_id: number | null
          consent_ip: string | null
          consent_snapshot: Json | null
          consent_timestamp: string | null
          created_at: string | null
          email: string | null
          fingerprint_data: Json | null
          fingerprint_hash: string | null
          first_name: string | null
          first_touch: Json | null
          first_visit_at: string | null
          form_provider: string | null
          form_version: string | null
          geo_id: number | null
          id: number | null
          injury_id: number | null
          last_name: string | null
          last_touch: Json | null
          last_visit_at: string | null
          page_context: Json | null
          page_type: string | null
          pages_viewed: Json | null
          payload: Json | null
          phone: string | null
          pillar_slug: string | null
          qualifiers: Json | null
          scroll_depth: string | null
          session_id: string | null
          source: string | null
          status: string | null
          time_on_page: string | null
          total_time_on_site: number | null
          updated_at: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visit_count: number | null
          zip_code: string | null
          zip_code_from_payload: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_case_type_id_fkey"
            columns: ["case_type_id"]
            isOneToOne: false
            referencedRelation: "case_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_geo_id_fkey"
            columns: ["geo_id"]
            isOneToOne: false
            referencedRelation: "geos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_injury_id_fkey"
            columns: ["injury_id"]
            isOneToOne: false
            referencedRelation: "injuries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
