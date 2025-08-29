/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `date` (date, not null)
      - `time` (text, not null)
      - `location` (text, not null)
      - `capacity` (integer, optional)
      - `registered` (integer, default 0)
      - `category` (text, default 'general')
      - `active` (boolean, default true)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `events` table
    - Add policy for anyone to read active events
*/

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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Insert some sample events
INSERT INTO events (title, description, date, time, location, capacity, registered, category) VALUES
('Community Leadership Workshop', 'Learn essential leadership skills for community impact.', '2024-02-15', '10:00 AM - 4:00 PM', 'TGLI Main Office', 50, 32, 'Workshop'),
('Job Fair 2024', 'Connect with employers and explore career opportunities.', '2024-02-20', '9:00 AM - 5:00 PM', 'Convention Centre', 500, 287, 'Career'),
('Youth Mentorship Program Launch', 'Join our new mentorship program for young leaders.', '2024-02-25', '2:00 PM - 5:00 PM', 'Community Center', 100, 45, 'Program');