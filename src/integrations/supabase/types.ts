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
      admin_logs: {
        Row: {
          action: string
          child_id: string | null
          created_at: string
          error_message: string | null
          id: string
          metadata: Json | null
          page: string | null
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          child_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          page?: string | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          child_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          page?: string | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_config: {
        Row: {
          accessories: string | null
          background_color: string | null
          child_id: string
          clothing_color: string | null
          hair_color: string | null
          hair_style: string | null
          id: string
          seed: string | null
          updated_at: string
        }
        Insert: {
          accessories?: string | null
          background_color?: string | null
          child_id: string
          clothing_color?: string | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          seed?: string | null
          updated_at?: string
        }
        Update: {
          accessories?: string | null
          background_color?: string | null
          child_id?: string
          clothing_color?: string | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          seed?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_config_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_items: {
        Row: {
          category: string
          created_at: string
          dicebear_option: string
          dicebear_value: string
          gender: string
          id: string
          is_premium: boolean
          name: string
          name_nl: string | null
          price: number
          rarity: string
        }
        Insert: {
          category: string
          created_at?: string
          dicebear_option: string
          dicebear_value: string
          gender?: string
          id?: string
          is_premium?: boolean
          name: string
          name_nl?: string | null
          price?: number
          rarity?: string
        }
        Update: {
          category?: string
          created_at?: string
          dicebear_option?: string
          dicebear_value?: string
          gender?: string
          id?: string
          is_premium?: boolean
          name?: string
          name_nl?: string | null
          price?: number
          rarity?: string
        }
        Relationships: []
      }
      avatar_owned_items: {
        Row: {
          acquired_at: string
          child_id: string
          id: string
          item_id: string
        }
        Insert: {
          acquired_at?: string
          child_id: string
          id?: string
          item_id: string
        }
        Update: {
          acquired_at?: string
          child_id?: string
          id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_owned_items_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avatar_owned_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "avatar_items"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_sessions: {
        Row: {
          best_score_pct: number
          chapter_id: string
          child_id: string
          correct_count: number
          created_at: string
          difficulty_level: number
          duration_seconds: number
          id: string
          total_count: number
          user_id: string
          xp_earned: number
        }
        Insert: {
          best_score_pct?: number
          chapter_id: string
          child_id: string
          correct_count?: number
          created_at?: string
          difficulty_level?: number
          duration_seconds?: number
          id?: string
          total_count?: number
          user_id: string
          xp_earned?: number
        }
        Update: {
          best_score_pct?: number
          chapter_id?: string
          child_id?: string
          correct_count?: number
          created_at?: string
          difficulty_level?: number
          duration_seconds?: number
          id?: string
          total_count?: number
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapter_sessions_child_id_fkey"
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
          dark_mode: boolean
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
          dark_mode?: boolean
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
          dark_mode?: boolean
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
          gender: string
          high_contrast: boolean
          id: string
          language: string
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
          gender?: string
          high_contrast?: boolean
          id?: string
          language?: string
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
          gender?: string
          high_contrast?: boolean
          id?: string
          language?: string
          school_level?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          challenge_type: string
          child_id: string
          created_at: string
          current_value: number
          date: string
          id: string
          is_completed: boolean
          target_value: number
          updated_at: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          challenge_type: string
          child_id: string
          created_at?: string
          current_value?: number
          date?: string
          id?: string
          is_completed?: boolean
          target_value?: number
          updated_at?: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          challenge_type?: string
          child_id?: string
          created_at?: string
          current_value?: number
          date?: string
          id?: string
          is_completed?: boolean
          target_value?: number
          updated_at?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
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
      error_reports: {
        Row: {
          browser_info: string | null
          created_at: string
          description: string | null
          error_type: string
          id: string
          page_url: string | null
          resolved: boolean
          resolved_at: string | null
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          browser_info?: string | null
          created_at?: string
          description?: string | null
          error_type: string
          id?: string
          page_url?: string | null
          resolved?: boolean
          resolved_at?: string | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          browser_info?: string | null
          created_at?: string
          description?: string | null
          error_type?: string
          id?: string
          page_url?: string | null
          resolved?: boolean
          resolved_at?: string | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      exercise_mistakes: {
        Row: {
          chapter_id: string
          child_id: string
          correct_answer: string
          created_at: string
          difficulty: number
          exercise_id: string
          given_answer: string | null
          id: string
          question: string
          resolved: boolean
          subject: string
        }
        Insert: {
          chapter_id: string
          child_id: string
          correct_answer: string
          created_at?: string
          difficulty?: number
          exercise_id: string
          given_answer?: string | null
          id?: string
          question: string
          resolved?: boolean
          subject?: string
        }
        Update: {
          chapter_id?: string
          child_id?: string
          correct_answer?: string
          created_at?: string
          difficulty?: number
          exercise_id?: string
          given_answer?: string | null
          id?: string
          question?: string
          resolved?: boolean
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_mistakes_child_id_fkey"
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
      season_claims: {
        Row: {
          child_id: string
          created_at: string
          id: string
          season_id: string
          threshold: number
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          season_id: string
          threshold: number
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          season_id?: string
          threshold?: number
        }
        Relationships: [
          {
            foreignKeyName: "season_claims_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      season_snapshots: {
        Row: {
          child_id: string
          coins_at_start: number
          created_at: string
          id: string
          season_id: string
        }
        Insert: {
          child_id: string
          coins_at_start: number
          created_at?: string
          id?: string
          season_id: string
        }
        Update: {
          child_id?: string
          coins_at_start?: number
          created_at?: string
          id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "season_snapshots_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      sibling_challenges: {
        Row: {
          challenged_id: string
          challenged_session_id: string | null
          challenger_id: string
          challenger_session_id: string | null
          chapter_id: string | null
          completed_at: string | null
          created_at: string
          expires_at: string
          game_type: string | null
          id: string
          status: string
          winner_id: string | null
          xp_reward: number
        }
        Insert: {
          challenged_id: string
          challenged_session_id?: string | null
          challenger_id: string
          challenger_session_id?: string | null
          chapter_id?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at?: string
          game_type?: string | null
          id?: string
          status?: string
          winner_id?: string | null
          xp_reward?: number
        }
        Update: {
          challenged_id?: string
          challenged_session_id?: string | null
          challenger_id?: string
          challenger_session_id?: string | null
          chapter_id?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at?: string
          game_type?: string | null
          id?: string
          status?: string
          winner_id?: string | null
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "sibling_challenges_challenged_id_fkey"
            columns: ["challenged_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sibling_challenges_challenger_id_fkey"
            columns: ["challenger_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sibling_challenges_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_season_reward: {
        Args: {
          p_bonus_coins?: number
          p_child_id: string
          p_item_id?: string
          p_threshold: number
        }
        Returns: Json
      }
      complete_sibling_challenge: {
        Args: {
          p_challenge_id: string
          p_child_id: string
          p_session_id?: string
        }
        Returns: Json
      }
      get_admin_stats: {
        Args: never
        Returns: {
          active_today: number
          active_week: number
          avg_session_minutes: number
          error_count_24h: number
          top_exercise: string
          top_game: string
          total_children: number
          total_exercises_completed: number
          total_games_played: number
          total_parents: number
        }[]
      }
      get_admin_top_games: {
        Args: { p_days?: number }
        Returns: {
          avg_duration_seconds: number
          avg_score: number
          game_type: string
          play_count: number
          unique_players: number
        }[]
      }
      get_admin_users: {
        Args: never
        Returns: {
          created_at: string
          id: string
          kind: string
          label: string
          parent_email: string
          school_level: string
        }[]
      }
      get_error_heatmap: {
        Args: { p_days?: number }
        Returns: {
          chapter_id: string
          error_rate: number
          errors: number
          exercise_id: string
          subject: string
          total_attempts: number
        }[]
      }
      get_game_detail_stats: {
        Args: { p_child_id: string; p_game_type: string; p_weeks?: number }
        Returns: {
          avg_success_rate: number
          difficulty: string
          difficulty_sessions: number
          difficulty_success_rate: number
          sessions_count: number
          week_start: string
        }[]
      }
      get_leaderboard: {
        Args: { p_limit?: number; p_metric?: string }
        Returns: {
          avatar_emoji: string
          badges_earned: number
          child_id: string
          display_name: string
          games_played: number
          gender: string
          is_mine: boolean
          rank: number
          streak_days: number
          total_xp: number
        }[]
      }
      get_season_progress: {
        Args: { p_child_id: string }
        Returns: {
          coins_this_season: number
          season_ends_at: string
          season_id: string
        }[]
      }
      get_time_tracking: {
        Args: { p_child_id: string; p_days?: number }
        Returns: {
          day: string
          minutes_played: number
          sessions_count: number
        }[]
      }
      get_top_games: {
        Args: { p_child_id: string; p_days?: number; p_limit?: number }
        Returns: {
          game_id: string
          last_session: string
          subject: string
          success_rate: number
          times_played: number
        }[]
      }
      get_unlocked_level: {
        Args: { p_chapter_id: string; p_child_id: string }
        Returns: number
      }
      has_parent_pin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      purchase_avatar_item: {
        Args: { p_child_id: string; p_item_id: string }
        Returns: Json
      }
      record_exercise_session: {
        Args: {
          p_chapter_id: string
          p_child_id: string
          p_correct: number
          p_difficulty: number
          p_duration_seconds?: number
          p_total: number
        }
        Returns: Json
      }
      record_game_completion: {
        Args: {
          p_child_id: string
          p_difficulty: number
          p_duration_seconds?: number
          p_errors_count?: number
          p_game_id: string
          p_max_score?: number
          p_score?: number
          p_subject: string
          p_xp_earned: number
        }
        Returns: Json
      }
      set_parent_pin: {
        Args: { new_pin: string; old_pin?: string }
        Returns: Json
      }
      verify_parent_pin: { Args: { input_pin: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
