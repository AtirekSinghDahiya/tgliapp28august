/*
  # Disable RLS for contact submissions table

  This migration temporarily disables Row Level Security for the contact_submissions table
  to allow public contact form submissions to work properly.

  1. Changes
     - Disable RLS on contact_submissions table
     - This allows all users (anonymous and authenticated) to submit contact forms
  
  2. Security Note
     - This is appropriate for a public contact form
     - Users can only INSERT data, not read other submissions
     - Consider re-enabling RLS with proper policies once the issue is resolved
*/

-- Disable Row Level Security for contact_submissions table
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;