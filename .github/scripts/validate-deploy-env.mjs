/**
 * @module ValidateDeployEnv
 * @description Reports missing GitHub Actions secrets required by the production deploy workflow.
 */
const required = [
  "DATABASE_URL",
  "JOINEE_JWT_SECRET",
  "SUPABASE_JWT_SECRET",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_URL",
  "WEB_ORIGIN",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "RAILWAY_TOKEN",
  "VERCEL_TOKEN",
  "VERCEL_ORG_ID",
  "VERCEL_PROJECT_ID",
];

const missing = required.filter((name) => !process.env[name]?.trim());

if (missing.length) {
  throw new Error(`Missing GitHub Actions secrets: ${missing.join(", ")}`);
}

console.log("Required deployment secrets are configured.");
