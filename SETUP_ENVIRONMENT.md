# Environment Setup Guide

## The Problem

You're seeing a MongoDB connection error because the `.env` file is missing. This file contains all the necessary configuration for your application to connect to external services.

## Solution

Create a `.env` file in the root directory of your project with the following content:

```env
# Database
# Get your MongoDB connection string from https://mongodb.com/atlas
DATABASE_URL="your-mongodb-connection-string-here"

# Clerk Authentication
# Get these from https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# UploadThing
# Get these from https://uploadthing.com
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Mux (Video Processing)
# Get these from https://mux.com
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# Stripe (Payment Processing)
# Get these from https://stripe.com
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Teacher IDs (comma-separated list of Clerk user IDs who can be teachers)
NEXT_PUBLIC_TEACHER_ID=
```

## Step-by-Step Setup

### 1. MongoDB Atlas (REQUIRED - This is causing your current error)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new cluster (free tier is available)
4. Once your cluster is ready:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with your database name (e.g., `lms`)
5. **IMPORTANT**: Add your IP address to the IP Whitelist:
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development) or add your specific IP
6. Paste the connection string in `DATABASE_URL`

Example:
```
DATABASE_URL="mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/lms?retryWrites=true&w=majority"
```

### 2. Clerk Authentication (REQUIRED)

1. Go to [Clerk](https://clerk.com)
2. Create an account and a new application
3. In your Clerk dashboard:
   - Go to "API Keys"
   - Copy the "Publishable Key" to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy the "Secret Key" to `CLERK_SECRET_KEY`

### 3. UploadThing (For file uploads)

1. Go to [UploadThing](https://uploadthing.com)
2. Create an account and a new app
3. Get your secret and app ID from the dashboard

### 4. Mux (For video processing)

1. Go to [Mux](https://mux.com)
2. Create an account
3. Create a new access token with "Mux Video" permissions
4. Copy the Token ID and Token Secret

### 5. Stripe (For payments)

1. Go to [Stripe](https://stripe.com)
2. Create an account
3. In test mode, get your API keys from the dashboard
4. For webhook secret:
   - Install Stripe CLI or use Stripe dashboard webhooks
   - Set up a webhook endpoint at `http://localhost:3000/api/webhook`
   - Copy the webhook signing secret

## After Setting Up Environment Variables

1. **Push the schema to your database:**
   ```bash
   npx prisma db push
   ```

2. **Seed the database (optional):**
   ```bash
   node scripts/seed.ts
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Quick Start (Minimum Required)

To get the app running quickly, you only need:

1. **DATABASE_URL** - MongoDB connection string
2. **Clerk keys** - For authentication

The other services can be added later as you need those features.

## Troubleshooting

### MongoDB Connection Issues

If you still see connection errors after setting up MongoDB:

1. **Check IP Whitelist**: Make sure your IP is whitelisted in MongoDB Atlas
2. **Verify credentials**: Double-check your username and password in the connection string
3. **Network issues**: Try accessing MongoDB Atlas from your browser to ensure you're not blocked by a firewall
4. **Connection string format**: Ensure the connection string is properly formatted with no spaces

### Common Errors

- **"Server selection timeout"**: Usually means IP not whitelisted or network issues
- **"Authentication failed"**: Wrong username or password
- **"SSL/TLS error"**: Could be a network/firewall issue blocking the MongoDB connection

## Need Help?

Refer to the tutorial video mentioned in the README: https://www.youtube.com/watch?v=Big_aFLmekI



