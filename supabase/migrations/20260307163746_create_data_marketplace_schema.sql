/*
  # Data Marketplace Schema

  ## Overview
  Creates the database schema for a Moroccan data marketplace platform
  with support for dataset management, categories, demo requests, and blog posts.

  ## New Tables

  ### `categories`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name in French
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `icon` (text) - Icon identifier for UI
  - `color` (text) - Color code for category badge
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp

  ### `datasets`
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Reference to categories
  - `name` (text) - Dataset name in French
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Short description
  - `long_description` (text) - Detailed description for dataset page
  - `record_count` (integer) - Number of records in dataset
  - `geographic_coverage` (text) - Geographic scope
  - `update_frequency` (text) - How often data is updated
  - `data_format` (text[]) - Available formats (CSV, JSON, API)
  - `fields_structure` (jsonb) - Schema/field definitions
  - `sample_data` (jsonb) - Sample preview data
  - `is_featured` (boolean) - Show on homepage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `demo_requests`
  - `id` (uuid, primary key) - Unique identifier
  - `dataset_id` (uuid, foreign key, nullable) - Referenced dataset
  - `name` (text) - Requester name
  - `company` (text) - Company name
  - `email` (text) - Contact email
  - `dataset_requested` (text) - Dataset of interest
  - `message` (text) - Additional message
  - `created_at` (timestamptz) - Request timestamp

  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article title
  - `slug` (text, unique) - URL-friendly identifier
  - `excerpt` (text) - Short excerpt
  - `content` (text) - Full article content
  - `keywords` (text[]) - SEO keywords
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for categories, datasets, and blog_posts
  - Authenticated write access for demo_requests
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text DEFAULT '#DC2626',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  record_count integer DEFAULT 0,
  geographic_coverage text NOT NULL,
  update_frequency text NOT NULL,
  data_format text[] DEFAULT ARRAY['CSV', 'JSON'],
  fields_structure jsonb DEFAULT '[]'::jsonb,
  sample_data jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id uuid REFERENCES datasets(id) ON DELETE SET NULL,
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  dataset_requested text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  keywords text[] DEFAULT ARRAY[]::text[],
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Datasets policies (public read)
CREATE POLICY "Anyone can view datasets"
  ON datasets FOR SELECT
  TO anon, authenticated
  USING (true);

-- Demo requests policies (anyone can insert)
CREATE POLICY "Anyone can submit demo requests"
  ON demo_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Blog posts policies (public read)
CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_datasets_category ON datasets(category_id);
CREATE INDEX IF NOT EXISTS idx_datasets_featured ON datasets(is_featured);
CREATE INDEX IF NOT EXISTS idx_datasets_slug ON datasets(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created ON demo_requests(created_at DESC);