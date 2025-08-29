/*
  # Fix donations table RLS policy

  1. Security Updates
    - Drop existing restrictive INSERT policy on donations table
    - Add new policy allowing both authenticated and anonymous users to insert donations
    - This enables donation submissions from both logged-in users and guests

  2. Changes
    - Remove old INSERT policy that was blocking donations
    - Add comprehensive INSERT policy for all users
    - Maintain existing table structure and other policies
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can make donations" ON donations;

-- Create a new policy that allows both authenticated and anonymous users to insert donations
CREATE POLICY "Anyone can make donations"
  ON donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);