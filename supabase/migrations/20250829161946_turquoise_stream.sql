/*
  # Add message column to donations table

  1. Changes
    - Add `message` column to `donations` table as nullable text field
    - This allows users to include optional messages with their donations

  2. Notes
    - Column is nullable since messages are optional
    - Uses IF NOT EXISTS to prevent errors if column already exists
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'message'
  ) THEN
    ALTER TABLE donations ADD COLUMN message text;
  END IF;
END $$;