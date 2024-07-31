import { execSync } from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config();

const command = `npx supabase gen types --lang=typescript --project-id ${process.env.SUPABASE_PROJECT_ID} --schema public > src/types/supabase.ts`;

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Types generated successfully');
} catch (error) {
  console.error('Error executing command:', error);
}
