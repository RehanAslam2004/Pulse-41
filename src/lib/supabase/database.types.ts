export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          num: string
          title: string
          slug: string
          tagline: string
          typical_outcomes: string
          description: string
          core_capabilities: string[]
          capabilities: string[]
          detailed_areas: Json | null
          control_framework: string[] | null
          color: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          num: string
          title: string
          slug: string
          tagline: string
          typical_outcomes: string
          description: string
          core_capabilities?: string[]
          capabilities?: string[]
          detailed_areas?: Json | null
          control_framework?: string[] | null
          color?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          num?: string
          title?: string
          slug?: string
          tagline?: string
          typical_outcomes?: string
          description?: string
          core_capabilities?: string[]
          capabilities?: string[]
          detailed_areas?: Json | null
          control_framework?: string[] | null
          color?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          id: string
          num: string
          title: string
          product_name: string
          slug: string
          tagline: string
          business_need: string
          core_components_text: string
          core_components: string[]
          capabilities: string[]
          description: string
          icon: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          num: string
          title: string
          product_name: string
          slug: string
          tagline: string
          business_need: string
          core_components_text: string
          core_components?: string[]
          capabilities?: string[]
          description: string
          icon?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          num?: string
          title?: string
          product_name?: string
          slug?: string
          tagline?: string
          business_need?: string
          core_components_text?: string
          core_components?: string[]
          capabilities?: string[]
          description?: string
          icon?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          id: string
          name: string
          slug: string
          icon_name: string
          tagline: string
          description: string
          capabilities: string[]
          relevant_solutions: string[]
          is_primary: boolean
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon_name?: string
          tagline: string
          description: string
          capabilities?: string[]
          relevant_solutions?: string[]
          is_primary?: boolean
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon_name?: string
          tagline?: string
          description?: string
          capabilities?: string[]
          relevant_solutions?: string[]
          is_primary?: boolean
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          id: string
          tag: string
          industry: string
          title: string
          slug: string
          challenge: string
          solution_text: string
          result: string
          tech_stack: string[]
          cover_image_url: string | null
          is_featured: boolean
          is_published: boolean
          sort_order: number
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tag: string
          industry: string
          title: string
          slug: string
          challenge: string
          solution_text: string
          result: string
          tech_stack?: string[]
          cover_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          sort_order?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tag?: string
          industry?: string
          title?: string
          slug?: string
          challenge?: string
          solution_text?: string
          result?: string
          tech_stack?: string[]
          cover_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          sort_order?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          category: string
          excerpt: string
          content: string
          cover_image_url: string | null
          read_time: string
          author_name: string
          author_role: string
          is_published: boolean
          is_featured: boolean
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category: string
          excerpt: string
          content: string
          cover_image_url?: string | null
          read_time?: string
          author_name?: string
          author_role?: string
          is_published?: boolean
          is_featured?: boolean
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          read_time?: string
          author_name?: string
          author_role?: string
          is_published?: boolean
          is_featured?: boolean
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          id: string
          title: string
          department: string
          type: string
          location: string
          description: string
          requirements: string[]
          benefits: string[]
          apply_url: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          type?: string
          location?: string
          description: string
          requirements?: string[]
          benefits?: string[]
          apply_url?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          type?: string
          location?: string
          description?: string
          requirements?: string[]
          benefits?: string[]
          apply_url?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          job_id: string | null
          job_title: string
          name: string
          email: string
          phone: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          resume_url: string
          cover_letter: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id?: string | null
          job_title: string
          name: string
          email: string
          phone?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          resume_url: string
          cover_letter?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string | null
          job_title?: string
          name?: string
          email?: string
          phone?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          resume_url?: string
          cover_letter?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          }
        ]
      }
      testimonials: {
        Row: {
          id: string
          name: string
          title: string
          description: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          description: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          description?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          project_type: string | null
          budget: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          project_type?: string | null
          budget?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          project_type?: string | null
          budget?: string | null
          message?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          source: string
          is_active: boolean
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          source?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          source?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          tier: string | null
          project_scope: string | null
          budget: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          tier?: string | null
          project_scope?: string | null
          budget?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          tier?: string | null
          project_scope?: string | null
          budget?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          id: string
          name: string
          industry: string | null
          website: string | null
          country: string | null
          tier: string | null
          status: string
          owner: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          website?: string | null
          country?: string | null
          tier?: string | null
          status?: string
          owner?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          website?: string | null
          country?: string | null
          tier?: string | null
          status?: string
          owner?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          id: string
          organization_id: string | null
          name: string
          email: string
          phone: string | null
          job_title: string | null
          source: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          name: string
          email: string
          phone?: string | null
          job_title?: string | null
          source?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          job_title?: string | null
          source?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          status: string
          last_login: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: string
          status?: string
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          status?: string
          last_login?: string | null
          created_at?: string
        }
        Relationships: []
      }
      admin_activity_logs: {
        Row: {
          id: string
          admin_email: string
          action: string
          entity_type: string
          entity_id: string | null
          details: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_email?: string
          action: string
          entity_type: string
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_email?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Relationships: []
      }
      admin_notifications: {
        Row: {
          id: string
          title: string
          message: string
          type: string
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      content_revisions: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          version_number: number
          snapshot: Json
          author_email: string
          summary: string | null
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          version_number?: number
          snapshot?: Json
          author_email?: string
          summary?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          version_number?: number
          snapshot?: Json
          author_email?: string
          summary?: string | null
          created_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          id: string
          file_name: string
          file_url: string
          file_size: number | null
          mime_type: string | null
          category: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          file_name: string
          file_url: string
          file_size?: number | null
          mime_type?: string | null
          category?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          file_url?: string
          file_size?: number | null
          mime_type?: string | null
          category?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
