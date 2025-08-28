/*
  # Create TGLI Application Tables

  1. New Tables
    - `profiles` - User profile information
    - `contact_submissions` - Contact form submissions
    - `program_applications` - Program application submissions
    - `donations` - Donation records
    - `news_articles` - News and announcements
    - `job_postings` - Career opportunities

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
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

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

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

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Program applications table
CREATE TABLE IF NOT EXISTS program_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  program_id text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  motivation text NOT NULL,
  experience text,
  availability text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE program_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can submit applications"
  ON program_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own applications"
  ON program_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  frequency text DEFAULT 'one-time',
  program text DEFAULT 'general',
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  payment_method text DEFAULT 'card',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can make donations"
  ON donations
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- News articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  category text DEFAULT 'general',
  image_url text,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles"
  ON news_articles
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  job_type text DEFAULT 'full-time',
  salary_range text,
  experience_level text,
  description text NOT NULL,
  requirements text[],
  responsibilities text[],
  benefits text[],
  application_deadline date,
  contact_email text NOT NULL,
  active boolean DEFAULT true,
  urgent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active job postings"
  ON job_postings
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Insert sample data
INSERT INTO news_articles (title, excerpt, content, author, category, image_url, published, featured, tags) VALUES
('TGLI Launches New Community Leadership Initiative', 'Empowering local leaders with comprehensive training and mentorship programs to drive positive change in their communities.', 'The Toronto Global Leadership Institute is proud to announce the launch of our new Community Leadership Initiative, designed to empower emerging leaders across the Greater Toronto Area. This comprehensive program combines theoretical knowledge with practical application, providing participants with the tools they need to create meaningful change in their communities.', 'Sarah Johnson', 'Programs', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800', true, true, ARRAY['Leadership', 'Community', 'Training']),
('Record-Breaking Job Fair Connects 500+ Job Seekers', 'Our annual job fair exceeded expectations, facilitating meaningful connections between employers and talented individuals.', 'This year''s TGLI Job Fair was our most successful yet, with over 500 job seekers connecting with 75+ employers from various industries. The event featured workshops on resume writing, interview skills, and networking strategies.', 'Michael Chen', 'Employment', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', true, true, ARRAY['Employment', 'Job Fair', 'Career']);

INSERT INTO job_postings (title, department, location, job_type, salary_range, experience_level, description, requirements, responsibilities, benefits, application_deadline, contact_email, urgent) VALUES
('Community Program Coordinator', 'Programs', 'Toronto, ON', 'Full-time', '$45,000 - $55,000', '2-3 years', 'Lead and coordinate community engagement programs, working directly with participants to ensure program success and community impact.', ARRAY['Bachelor''s degree in Social Work or related field', '2+ years experience in community programming', 'Strong communication skills', 'Bilingual preferred'], ARRAY['Coordinate community programs', 'Build partner relationships', 'Monitor program outcomes', 'Facilitate workshops'], ARRAY['Health and dental coverage', 'Professional development', 'Flexible work arrangements', 'Pension plan'], '2024-03-15', 'careers@tgli.org', false),
('Employment Services Specialist', 'Employment', 'Scarborough, ON', 'Full-time', '$50,000 - $60,000', '3-5 years', 'Provide comprehensive employment services including job search assistance, resume writing, interview preparation, and career counseling.', ARRAY['Bachelor''s degree in HR or Career Development', '3+ years employment services experience', 'Knowledge of labor market trends', 'Strong assessment skills'], ARRAY['Conduct employment assessments', 'Provide job search workshops', 'Build employer relationships', 'Maintain client records'], ARRAY['Competitive salary and benefits', 'Professional development budget', 'Flexible schedule', 'Health programs'], '2024-02-28', 'employment@tgli.org', true);