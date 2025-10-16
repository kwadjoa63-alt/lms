# NextLMS Setup Guide

This guide will walk you through setting up the NextLMS project from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/atlas)
- [ ] **Stripe Account** - [Sign up here](https://stripe.com/)
- [ ] **Mux Account** - [Sign up here](https://mux.com/)
- [ ] **Uploadthing Account** - [Sign up here](https://uploadthing.com/)

## 🚀 Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/kwadjoa63-alt/lms.git
cd lms

# Install dependencies
npm install
```

### Step 2: Database Setup

#### MongoDB Atlas Setup
1. **Create New Project** in MongoDB Atlas
2. **Build a Database** → Choose "Free" tier
3. **Create Cluster** → Choose your region
4. **Create Database User**:
   - Username: `lms-user`
   - Password: Generate a strong password
5. **Network Access** → Add IP Address (0.0.0.0/0 for development)
6. **Get Connection String**:
   ```
   mongodb+srv://lms-user:<password>@cluster0.xxxxx.mongodb.net/lmsdb
   ```

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://lms-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lmsdb"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Test Mode)
STRIPE_API_KEY="sk_test_51..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51..."

# Mux
MUX_TOKEN_ID="your-mux-token-id"
MUX_TOKEN_SECRET="your-mux-token-secret"

# Uploadthing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Database Initialization

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create default admin and teacher accounts
npm run create-admin
```

### Step 5: External Services Setup

#### Stripe Setup
1. **Get API Keys**:
   - Go to Stripe Dashboard → Developers → API Keys
   - Copy "Publishable key" and "Secret key"
2. **Set up Webhook**:
   - Go to Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `checkout.session.completed`
   - Copy webhook secret

#### Mux Setup
1. **Get API Credentials**:
   - Go to Mux Dashboard → Settings → API Access Tokens
   - Create new token with "Full Access"
   - Copy Token ID and Secret

#### Uploadthing Setup
1. **Create App**:
   - Go to Uploadthing Dashboard
   - Create new app
   - Copy App ID and Secret

### Step 6: Run the Application

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Default Login Credentials

After running `npm run create-admin`, you can login with:

### Admin Account
- **Email**: `admin@lms.com`
- **Password**: `admin123`
- **Access**: Full platform control

### Teacher Account
- **Email**: `teacher@lms.com`
- **Password**: `teacher123`
- **Access**: Course creation and management

## 🧪 Testing the Setup

### 1. Test Authentication
1. Go to [http://localhost:3000/sign-in](http://localhost:3000/sign-in)
2. Login with admin credentials
3. Verify you see the admin dashboard

### 2. Test Course Creation
1. Click "Teacher Mode" or go to `/teacher/courses`
2. Click "New Course"
3. Fill in course details
4. Upload a course image
5. Click "Publish"

### 3. Test Video Upload
1. Edit a course → Add Chapter
2. Upload a video file
3. Verify video processes and plays

### 4. Test Quiz Creation
1. Edit a chapter
2. Scroll to "Chapter Quizzes"
3. Add a quiz with questions
4. Publish the quiz

### 5. Test Student Experience
1. Create a student account
2. Browse courses
3. Enroll in a course
4. Take a quiz
5. Verify progress tracking

## 🚨 Common Issues and Solutions

### Database Connection Issues
```bash
# Check if MongoDB is accessible
npx prisma db push

# If connection fails, verify:
# - DATABASE_URL is correct
# - IP address is whitelisted in MongoDB Atlas
# - Username/password are correct
```

### Authentication Issues
```bash
# Clear NextAuth cache
rm -rf .next

# Restart development server
npm run dev
```

### Video Upload Issues
- Check Mux credentials
- Verify file format (MP4 recommended)
- Check file size limits

### Payment Issues
- Use Stripe test mode first
- Verify webhook endpoint is accessible
- Check Stripe dashboard for errors

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check

# Database commands
npx prisma studio          # Open database GUI
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema changes
npx prisma db seed         # Seed database with sample data
```

## 📱 Mobile Testing

Test the responsive design:

1. **Chrome DevTools**:
   - Press F12 → Toggle device toolbar
   - Test different screen sizes

2. **Real Devices**:
   - Use ngrok for local network access
   - Test on actual mobile devices

## 🚀 Production Deployment

### Vercel Deployment
1. **Connect Repository**:
   - Go to Vercel Dashboard
   - Import your GitHub repository

2. **Environment Variables**:
   - Add all production environment variables
   - Use production MongoDB Atlas cluster
   - Use production Stripe keys

3. **Deploy**:
   - Vercel will automatically deploy on git push
   - Update webhook URLs to production domain

### Other Platforms
- **Netlify**: For static deployment
- **Railway**: For full-stack deployment
- **DigitalOcean**: For VPS deployment

## 📊 Monitoring and Analytics

### Database Monitoring
- Use MongoDB Atlas monitoring
- Set up alerts for connection issues
- Monitor query performance

### Application Monitoring
- Use Vercel Analytics
- Set up error tracking (Sentry)
- Monitor API response times

### Payment Monitoring
- Use Stripe Dashboard
- Set up webhook monitoring
- Track failed payments

## 🔒 Security Checklist

- [ ] **Environment Variables**: Never commit `.env` file
- [ ] **Database Security**: Use strong passwords
- [ ] **API Keys**: Rotate keys regularly
- [ ] **HTTPS**: Use SSL certificates in production
- [ ] **CORS**: Configure properly for production
- [ ] **Rate Limiting**: Implement API rate limiting
- [ ] **Input Validation**: Validate all user inputs
- [ ] **File Uploads**: Scan uploaded files for malware

## 📞 Getting Help

If you encounter issues:

1. **Check Logs**: Look at browser console and server logs
2. **Verify Setup**: Go through this guide step by step
3. **Check Dependencies**: Ensure all packages are installed
4. **Database Status**: Verify MongoDB connection
5. **External Services**: Check Stripe, Mux, Uploadthing status

For additional support:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the main README.md file

---

**Happy coding! 🚀**
