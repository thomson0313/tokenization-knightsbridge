export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_credentials: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      copilot_chats: {
        Row: {
          created_at: string
          id: string
          messages: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "copilot_chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "copilot_users"
            referencedColumns: ["id"]
          },
        ]
      }
      copilot_users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          password: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          password?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          password?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      exchange_listings: {
        Row: {
          created_at: string | null
          exchange_name: string
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          exchange_name: string
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          exchange_name?: string
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exchange_listings_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      exchange_listings_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferences: string | null
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferences?: string | null
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferences?: string | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exchange_listings_preferences_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          business_plan_executive_summary: string | null
          business_plan_financial_projections: string | null
          business_plan_guidelines: string | null
          business_plan_market_analysis: string | null
          business_plan_type: string | null
          contact_email: string
          contact_phone: string
          created_at: string | null
          custodian_address: string | null
          custodian_contact: string | null
          custodian_name: string | null
          custodian_registration: string | null
          custodian_services: string | null
          id: string
          is_stablecoin: boolean | null
          issuer_address: string | null
          issuer_business_type: string | null
          issuer_contact_info: string | null
          issuer_contact_person: string | null
          issuer_entity_name: string | null
          issuer_jurisdiction: string | null
          issuer_registration_number: string | null
          kyc_address: string | null
          kyc_date_of_birth: string | null
          kyc_employer: string | null
          kyc_full_name: string | null
          kyc_id_number: string | null
          kyc_income_source: string | null
          kyc_nationality: string | null
          kyc_occupation: string | null
          payment_amount: number | null
          pension_plan_guidelines: string | null
          savings_plan_guidelines: string | null
          status: string | null
          submission_date: string | null
          target_price: string | null
          token_chain: string | null
          token_decimals: string | null
          token_name: string | null
          token_ticker: string | null
          treasury_address: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          business_plan_executive_summary?: string | null
          business_plan_financial_projections?: string | null
          business_plan_guidelines?: string | null
          business_plan_market_analysis?: string | null
          business_plan_type?: string | null
          contact_email: string
          contact_phone: string
          created_at?: string | null
          custodian_address?: string | null
          custodian_contact?: string | null
          custodian_name?: string | null
          custodian_registration?: string | null
          custodian_services?: string | null
          id?: string
          is_stablecoin?: boolean | null
          issuer_address?: string | null
          issuer_business_type?: string | null
          issuer_contact_info?: string | null
          issuer_contact_person?: string | null
          issuer_entity_name?: string | null
          issuer_jurisdiction?: string | null
          issuer_registration_number?: string | null
          kyc_address?: string | null
          kyc_date_of_birth?: string | null
          kyc_employer?: string | null
          kyc_full_name?: string | null
          kyc_id_number?: string | null
          kyc_income_source?: string | null
          kyc_nationality?: string | null
          kyc_occupation?: string | null
          payment_amount?: number | null
          pension_plan_guidelines?: string | null
          savings_plan_guidelines?: string | null
          status?: string | null
          submission_date?: string | null
          target_price?: string | null
          token_chain?: string | null
          token_decimals?: string | null
          token_name?: string | null
          token_ticker?: string | null
          treasury_address?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          business_plan_executive_summary?: string | null
          business_plan_financial_projections?: string | null
          business_plan_guidelines?: string | null
          business_plan_market_analysis?: string | null
          business_plan_type?: string | null
          contact_email?: string
          contact_phone?: string
          created_at?: string | null
          custodian_address?: string | null
          custodian_contact?: string | null
          custodian_name?: string | null
          custodian_registration?: string | null
          custodian_services?: string | null
          id?: string
          is_stablecoin?: boolean | null
          issuer_address?: string | null
          issuer_business_type?: string | null
          issuer_contact_info?: string | null
          issuer_contact_person?: string | null
          issuer_entity_name?: string | null
          issuer_jurisdiction?: string | null
          issuer_registration_number?: string | null
          kyc_address?: string | null
          kyc_date_of_birth?: string | null
          kyc_employer?: string | null
          kyc_full_name?: string | null
          kyc_id_number?: string | null
          kyc_income_source?: string | null
          kyc_nationality?: string | null
          kyc_occupation?: string | null
          payment_amount?: number | null
          pension_plan_guidelines?: string | null
          savings_plan_guidelines?: string | null
          status?: string | null
          submission_date?: string | null
          target_price?: string | null
          token_chain?: string | null
          token_decimals?: string | null
          token_name?: string | null
          token_ticker?: string | null
          treasury_address?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_document_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferences: string | null
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferences?: string | null
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferences?: string | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_document_preferences_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_documents: {
        Row: {
          created_at: string | null
          document_type: string
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_documents_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      letterhead_services: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          guidelines: string | null
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          guidelines?: string | null
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          guidelines?: string | null
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letterhead_services_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      raise_document_regions: {
        Row: {
          created_at: string | null
          id: string
          region: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          region: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          region?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raise_document_regions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      raise_documents: {
        Row: {
          address: string | null
          company: string | null
          contact_name: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          position: string | null
          submission_id: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          contact_name?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          submission_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          contact_name?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          submission_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raise_documents_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      token_features: {
        Row: {
          created_at: string | null
          feature_name: string
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_name: string
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_name?: string
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_features_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_documents: {
        Row: {
          created_at: string | null
          field_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          original_filename: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          original_filename: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          original_filename?: string
          submission_id?: string | null
        }
        Relationships: []
      }
      website_plans: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          guidelines: string | null
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          guidelines?: string | null
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          guidelines?: string | null
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_plans_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      whitepapers: {
        Row: {
          created_at: string | null
          guidelines: string | null
          id: string
          pages: string | null
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          guidelines?: string | null
          id?: string
          pages?: string | null
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          guidelines?: string | null
          id?: string
          pages?: string | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whitepapers_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
