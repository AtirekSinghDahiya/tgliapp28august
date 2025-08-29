/*
# Fix contact submissions RLS policy

1. Policy Updates
   - Drop existing restrictive policy that blocks submissions
   - Create new policy allowing all users to submit contact forms
   - Enable both anonymous and authenticated users to insert

2. Security
   - Maintains RLS protection
   - Only allows INSERT operations for contact submissions
   - Users cannot read other submissions
*/

-- Drop the existing policy that's blocking submissions
DROP POLICY IF EXISTS "Allow contact form submissions for everyone" ON contact_submissions;

-- Create a new policy that properly allows contact form submissions
CREATE POLICY "Enable contact form submissions for all users"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);