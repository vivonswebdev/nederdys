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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_icon: string
          badge_name: string
          category: string
          child_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          badge_icon?: string
          badge_name: string
          category?: string
          child_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          badge_icon?: string
          badge_name?: string
          category?: string
          child_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      child_coins: {
        Row: {
          child_id: string
          coins: number
          created_at: string
          id: string
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id: string
          coins?: number
          created_at?: string
          id?: string
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string
          coins?: number
          created_at?: string
          id?: string
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_coins_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      child_levels: {
        Row: {
          child_id: string
          created_at: string
          games_played: number
          id: string
          level: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          child_id: string
          created_at?: string
          games_played?: number
          id?: string
          level?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          child_id?: string
          created_at?: string
          games_played?: number
          id?: string
          level?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "child_levels_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      child_settings: {
        Row: {
          child_id: string
          colorblind_mode: boolean
          created_at: string
          dyslexic_font: boolean
          id: string
          reduced_motion: boolean
          sound_effects: boolean
          timer_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id: string
          colorblind_mode?: boolean
          created_at?: string
          dyslexic_font?: boolean
          id?: string
          reduced_motion?: boolean
          sound_effects?: boolean
          timer_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string
          colorblind_mode?: boolean
          created_at?: string
          dyslexic_font?: boolean
          id?: string
          reduced_motion?: boolean
          sound_effects?: boolean
          timer_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_settings_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age: number
          avatar_emoji: string
          created_at: string
          dys_level: string
          first_name: string
          font_preference: string
          high_contrast: boolean
          id: string
          school_level: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number
          avatar_emoji?: string
          created_at?: string
          dys_level?: string
          first_name: string
          font_preference?: string
          high_contrast?: boolean
          id?: string
          school_level?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number
          avatar_emoji?: string
          created_at?: string
          dys_level?: string
          first_name?: string
          font_preference?: string
          high_contrast?: boolean
          id?: string
          school_level?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_streaks: {
        Row: {
          child_id: string
          created_at: string
          date: string
          id: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          child_id: string
          created_at?: string
          date?: string
          id?: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          child_id?: string
          created_at?: string
          date?: string
          id?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_streaks_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      game_difficulties: {
        Row: {
          child_id: string
          created_at: string
          difficulty: string
          game_type: string
          id: string
          recent_error_rate: number
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          difficulty?: string
          game_type: string
          id?: string
          recent_error_rate?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          difficulty?: string
          game_type?: string
          id?: string
          recent_error_rate?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_difficulties_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          child_id: string
          completed: boolean
          created_at: string
          duration_seconds: number
          errors_count: number
          game_type: string
          id: string
          max_score: number
          score: number
          subject: string
          user_id: string
        }
        Insert: {
          child_id: string
          completed?: boolean
          created_at?: string
          duration_seconds?: number
          errors_count?: number
          game_type: string
          id?: string
          max_score?: number
          score?: number
          subject?: string
          user_id: string
        }
        Update: {
          child_id?: string
          completed?: boolean
          created_at?: string
          duration_seconds?: number
          errors_count?: number
          game_type?: string
          id?: string
          max_score?: number
          score?: number
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_pin: {
        Row: {
          created_at: string
          failed_attempts: number
          locked_until: string | null
          parent_id: string
          pin_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          failed_attempts?: number
          locked_until?: string | null
          parent_id: string
          pin_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          failed_attempts?: number
          locked_until?: string | null
          parent_id?: string
          pin_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      parent_settings: {
        Row: {
          created_at: string
          failed_attempts: number
          id: string
          locked_until: string | null
          parent_email: string | null
          pin_hash: string | null
          stagnation_alert: boolean
          updated_at: string
          user_id: string
          weekly_email: boolean
        }
        Insert: {
          created_at?: string
          failed_attempts?: number
          id?: string
          locked_until?: string | null
          parent_email?: string | null
          pin_hash?: string | null
          stagnation_alert?: boolean
          updated_at?: string
          user_id: string
          weekly_email?: boolean
        }
        Update: {
          created_at?: string
          failed_attempts?: number
          id?: string
          locked_until?: string | null
          parent_email?: string | null
          pin_hash?: string | null
          stagnation_alert?: boolean
          updated_at?: string
          user_id?: string
          weekly_email?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchased_items: {
        Row: {
          child_id: string
          equipped: boolean
          id: string
          item_id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          child_id: string
          equipped?: boolean
          id?: string
          item_id: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          child_id?: string
          equipped?: boolean
          id?: string
          item_id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchased_items_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_parent_pin: { Args: never; Returns: boolean }
      set_parent_pin: {
        Args: { new_pin: string; old_pin?: string }
        Returns: Json
      }
      verify_parent_pin: { Args: { input_pin: string }; Returns: Json }
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
