# Environment Variables Setup

Create a `.env` file in the root directory with these variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"

# NextAuth
AUTH_SECRET="your-auth-secret-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Get from https://dashboard.stripe.com/apikeys)
STRIPE_API_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App URL (REQUIRED for payment redirects)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Mux (for video hosting - optional)
MUX_TOKEN_ID="your-mux-token-id"
MUX_TOKEN_SECRET="your-mux-token-secret"

# UploadThing (for file uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

## Generate AUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or in Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Important Notes

- **`NEXT_PUBLIC_APP_URL`** is required for payment success redirects
- Without it, you'll get redirect errors after payment
- In production, set this to your actual domain (e.g., `https://yourdomain.com`)
- In development, use `http://localhost:3000`

