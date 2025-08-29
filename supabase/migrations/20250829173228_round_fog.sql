/*
  # Fix contact submissions RLS policy

  1. Security Updates
    - Drop existing restrictive INSERT policy on `contact_submissions` table
    - Create new permissive INSERT policy allowing both anonymous and authenticated users to submit contact forms
    - Maintain existing SELECT policies for data protection

  This resolves the RLS policy violation error that was preventing contact form submissions.
*/

-- Drop the existing restrictive policy if it exists
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

-- Create a new permissive policy for contact form submissions
CREATE POLICY "Enable contact form submissions for all users"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);