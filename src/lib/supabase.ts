import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  created_at: string;
}

export interface Dataset {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  record_count: number;
  geographic_coverage: string;
  update_frequency: string;
  data_format: string[];
  fields_structure: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  sample_data: Array<Record<string, any>>;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  published_at: string;
  created_at: string;
}

export interface DemoRequest {
  name: string;
  company: string;
  email: string;
  dataset_requested: string;
  message?: string;
  dataset_id?: string;
}
