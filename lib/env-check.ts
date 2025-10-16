// Environment variable validation for deployment
export function validateEnvironment() {
  const requiredEnvVars = [
    'AUTH_SECRET',
    'DATABASE_URL',
    'NEXTAUTH_URL',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    return false;
  }
  
  return true;
}

// Check if we're in a valid environment
export const isEnvironmentValid = validateEnvironment();
