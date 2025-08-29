/*
  # Fix contact submissions RLS policy

  1. Security Changes
    - Drop existing restrictive policy that blocks anonymous submissions
    - Create new policy allowing both anonymous and authenticated users to submit contact forms
    - Maintain security by only allowing INSERT operations (users cannot read other submissions)

  2. Changes Made
    - Remove policy that was causing 403 errors on contact form submissions
    - Add permissive policy for contact form submissions from all users
    - Enable public contact form functionality without requiring authentication
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Enable contact form submissions for all users" ON contact_submissions;

-- Create a new policy that allows both anonymous and authenticated users to submit contact forms
CREATE POLICY "Allow contact form submissions for everyone"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);