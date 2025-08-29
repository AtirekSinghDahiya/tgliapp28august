/*
  # Fix donation RLS policies

  1. Security Updates
    - Update INSERT policy for donations table to allow both authenticated and anonymous users
    - Ensure donations can be submitted by anyone (guests and logged-in users)
    - Fix RLS policy that was blocking donation submissions

  2. Changes
    - Drop existing restrictive INSERT policy
    - Create new permissive INSERT policy for donations
    - Allow both authenticated and anonymous users to submit donations
*/

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can submit donations" ON donations;
DROP POLICY IF EXISTS "Anyone can make donations" ON donations;

-- Create new INSERT policy that allows both authenticated and anonymous users
CREATE POLICY "Anyone can submit donations"
  ON donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure SELECT policy exists for users to view their own donations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'donations' 
    AND policyname = 'Users can view own donations'
  ) THEN
    CREATE POLICY "Users can view own donations"
      ON donations
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;