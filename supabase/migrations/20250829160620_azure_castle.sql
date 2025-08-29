/*
  # Create TGLI Mobile App Tables

  1. New Tables
    - `profiles` - User profile information
    - `services` - Available services/programs
    - `donations` - Donation records
    - `news_articles` - News and announcements
    - `job_postings` - Career opportunities
    - `events` - Community events
    - `contact_submissions` - Contact form submissions
    - `program_applications` - Service applications

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Secure data access patterns
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  bio text,
  interests text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  duration text,
  location text,
  requirements text[],
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active services" ON services
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create donations" ON donations
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can read own donations" ON donations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- News articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text,
  author text NOT NULL,
  category text DEFAULT 'general',
  image_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles" ON news_articles
  FOR SELECT TO anon, authenticated
  USING (published = true);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  job_type text DEFAULT 'full-time',
  description text NOT NULL,
  requirements text[],
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active jobs" ON job_postings
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  capacity integer,
  registered integer DEFAULT 0,
  category text DEFAULT 'general',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active events" ON events
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  department text DEFAULT 'general',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Program applications table
CREATE TABLE IF NOT EXISTS program_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  service_id text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  motivation text NOT NULL,
  availability text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE program_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can submit applications" ON program_applications
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can read own applications" ON program_applications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);