export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number | null;
          created_at: string | null;
          id: string;
          target_id: string | null;
          target_type: string | null;
          updated_at: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string | null;
          id?: string;
          target_id?: string | null;
          target_type?: string | null;
          updated_at?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string | null;
          id?: string;
          target_id?: string | null;
          target_type?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          api_url: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          language: string | null;
          maintainer: string | null;
          name: string | null;
          owner_id: string | null;
          public_url: string | null;
          stars_count: number | null;
          updated_at: string | null;
          wallet_address: string | null;
        };
        Insert: {
          api_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          language?: string | null;
          maintainer?: string | null;
          name?: string | null;
          owner_id?: string | null;
          public_url?: string | null;
          stars_count?: number | null;
          updated_at?: string | null;
          wallet_address?: string | null;
        };
        Update: {
          api_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          language?: string | null;
          maintainer?: string | null;
          name?: string | null;
          owner_id?: string | null;
          public_url?: string | null;
          stars_count?: number | null;
          updated_at?: string | null;
          wallet_address?: string | null;
        };
        Relationships: [];
      };
      pull_requests: {
        Row: {
          api_url: string | null;
          author: string | null;
          created_at: string | null;
          id: string;
          public_url: string | null;
          state: string | null;
          title: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          api_url?: string | null;
          author?: string | null;
          created_at?: string | null;
          id?: string;
          public_url?: string | null;
          state?: string | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          api_url?: string | null;
          author?: string | null;
          created_at?: string | null;
          id?: string;
          public_url?: string | null;
          state?: string | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
