# NextLMS Deployment Guide

This guide covers deploying the NextLMS application to various platforms, with Vercel being the recommended option.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites
- GitHub repository with your code
- Vercel account
- All external services configured (MongoDB, Stripe, Mux, Uploadthing)

### Step 1: Prepare Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Select the repository and click "Import"**

### Step 3: Configure Build Settings
Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)

### Step 4: Environment Variables
Add all required environment variables in Vercel dashboard:

```env
# Database (Production)
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/lmsdb"

# NextAuth (Production)
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe (Production)
STRIPE_API_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Mux (Production)
MUX_TOKEN_ID="your-production-mux-token-id"
MUX_TOKEN_SECRET="your-production-mux-token-secret"

# Uploadthing (Production)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-production-app-id"

# App (Production)
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

### Step 5: Deploy
1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Test the deployed application**

### Step 6: Configure Custom Domain (Optional)
1. **Go to Project Settings → Domains**
2. **Add your custom domain**
3. **Configure DNS records**
4. **Update environment variables with new domain**

## 🌐 Other Deployment Options

### Netlify Deployment

#### Prerequisites
- Netlify account
- GitHub repository

#### Steps
1. **Connect Repository**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   ```yaml
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**:
   - Add all required environment variables
   - Use production values

4. **Deploy**:
   - Click "Deploy site"
   - Wait for build completion

### Railway Deployment

#### Prerequisites
- Railway account
- GitHub repository

#### Steps
1. **Create New Project**:
   - Go to Railway Dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure Service**:
   - Select your repository
   - Railway will auto-detect Next.js

3. **Environment Variables**:
   - Add all required environment variables
   - Use production values

4. **Deploy**:
   - Railway will automatically deploy
   - Get your deployment URL

### DigitalOcean App Platform

#### Prerequisites
- DigitalOcean account
- GitHub repository

#### Steps
1. **Create App**:
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

2. **Configure App Spec**:
   ```yaml
   name: nextlms
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/lms
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
   ```

3. **Environment Variables**:
   - Add all required environment variables
   - Use production values

4. **Deploy**:
   - Click "Create Resources"
   - Wait for deployment

## 🗄️ Database Setup for Production

### MongoDB Atlas Production Setup

1. **Create Production Cluster**:
   - Choose appropriate tier (M10+ for production)
   - Select region closest to your users
   - Configure backup settings

2. **Security Configuration**:
   - Create dedicated database user
   - Use strong password
   - Enable IP whitelisting (add Vercel IPs)

3. **Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lmsdb?retryWrites=true&w=majority
   ```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Create admin accounts
npm run create-admin
```

## 💳 Payment Setup for Production

### Stripe Production Setup

1. **Activate Account**:
   - Complete Stripe account verification
   - Add business information
   - Enable live payments

2. **Get Production Keys**:
   - Go to Stripe Dashboard → API Keys
   - Copy live publishable and secret keys
   - Update environment variables

3. **Configure Webhooks**:
   - Go to Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/webhook`
   - Events: `checkout.session.completed`
   - Copy webhook secret

4. **Test Payments**:
   - Use test cards in development
   - Test with real cards in production
   - Monitor payment success rates

## 🎥 Video Streaming Setup

### Mux Production Setup

1. **Create Production Project**:
   - Go to Mux Dashboard
   - Create new project for production
   - Configure video settings

2. **Get Production Credentials**:
   - Go to Settings → API Access Tokens
   - Create production token
   - Copy token ID and secret

3. **Configure Webhooks**:
   - Set up webhooks for video processing
   - Monitor video upload success rates

## 📁 File Upload Setup

### Uploadthing Production Setup

1. **Create Production App**:
   - Go to Uploadthing Dashboard
   - Create new app for production
   - Configure file size limits

2. **Get Production Credentials**:
   - Copy app ID and secret
   - Update environment variables

3. **Configure CORS**:
   - Add production domain to CORS settings
   - Test file uploads

## 🔒 Security Configuration

### SSL/HTTPS
- **Vercel**: Automatic SSL certificates
- **Custom Domain**: Configure SSL in domain provider
- **Force HTTPS**: Redirect HTTP to HTTPS

### Environment Variables Security
- **Never commit `.env` files**
- **Use strong, unique secrets**
- **Rotate keys regularly**
- **Use different keys for different environments**

### Database Security
- **Use connection string with SSL**
- **Enable IP whitelisting**
- **Use strong passwords**
- **Enable database auditing**

### API Security
- **Implement rate limiting**
- **Validate all inputs**
- **Use HTTPS for all requests**
- **Implement proper CORS**

## 📊 Monitoring and Analytics

### Application Monitoring
1. **Vercel Analytics**:
   - Enable in project settings
   - Monitor performance metrics
   - Track user behavior

2. **Error Tracking**:
   - Integrate Sentry for error tracking
   - Set up alerts for critical errors
   - Monitor error rates

3. **Uptime Monitoring**:
   - Use services like UptimeRobot
   - Set up alerts for downtime
   - Monitor response times

### Database Monitoring
1. **MongoDB Atlas Monitoring**:
   - Monitor connection counts
   - Track query performance
   - Set up alerts for issues

2. **Performance Metrics**:
   - Monitor slow queries
   - Track database size
   - Optimize indexes

### Payment Monitoring
1. **Stripe Dashboard**:
   - Monitor payment success rates
   - Track failed payments
   - Set up webhook monitoring

2. **Revenue Tracking**:
   - Track course sales
   - Monitor refund rates
   - Analyze payment patterns

## 🚀 Performance Optimization

### Frontend Optimization
1. **Image Optimization**:
   - Use Next.js Image component
   - Implement lazy loading
   - Optimize image formats

2. **Code Splitting**:
   - Automatic with Next.js
   - Lazy load components
   - Optimize bundle size

3. **Caching**:
   - Implement proper caching headers
   - Use CDN for static assets
   - Cache API responses

### Backend Optimization
1. **Database Optimization**:
   - Add proper indexes
   - Optimize queries
   - Use connection pooling

2. **API Optimization**:
   - Implement pagination
   - Use efficient data structures
   - Minimize database calls

3. **Caching**:
   - Cache frequently accessed data
   - Use Redis for session storage
   - Implement API response caching

## 🔄 CI/CD Pipeline

### GitHub Actions Setup
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment-Specific Deployments
1. **Development**: Auto-deploy on push to `develop`
2. **Staging**: Auto-deploy on push to `staging`
3. **Production**: Auto-deploy on push to `main`

## 🧪 Testing in Production

### Pre-Deployment Testing
1. **Staging Environment**:
   - Deploy to staging first
   - Test all functionality
   - Verify external integrations

2. **Load Testing**:
   - Test with multiple users
   - Monitor performance under load
   - Optimize bottlenecks

3. **Security Testing**:
   - Test authentication flows
   - Verify payment processing
   - Check file upload security

### Post-Deployment Testing
1. **Smoke Tests**:
   - Test critical user flows
   - Verify external integrations
   - Check error handling

2. **User Acceptance Testing**:
   - Test with real users
   - Gather feedback
   - Fix critical issues

## 📞 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check build logs
vercel logs your-project-id

# Common fixes
npm install
npm run build
```

#### Environment Variable Issues
- Verify all required variables are set
- Check variable names and values
- Restart deployment after changes

#### Database Connection Issues
- Verify connection string
- Check IP whitelisting
- Test connection locally

#### Payment Issues
- Verify Stripe keys are correct
- Check webhook configuration
- Test with Stripe test mode first

### Getting Help
1. **Check Vercel Logs**: Use Vercel dashboard
2. **Monitor External Services**: Check Stripe, Mux, etc.
3. **Review Error Tracking**: Use Sentry or similar
4. **Community Support**: GitHub issues, Discord, etc.

---

**Your NextLMS application is now deployed and ready for production! 🚀**
