# NextLMS - Learning Management System

A modern, full-featured Learning Management System built with Next.js 14, featuring role-based access control, quiz functionality, video streaming, and payment integration.

## 🚀 Features

### 🎓 **Core Learning Features**
- **Video-based Learning**: Mux-powered video streaming with progress tracking
- **Interactive Quizzes**: Multi-choice questions with auto-grading and retake functionality
- **Course Progress**: Real-time progress tracking requiring both video completion and quiz passing
- **Chapter Management**: Organized course structure with free and premium content
- **File Attachments**: PDF and document support for course materials

### 👥 **Role-Based Access Control**
- **Students**: Enroll in courses, take quizzes, track progress
- **Teachers**: Create and manage courses, view analytics, manage quizzes
- **Admins**: Full platform control, user management, course oversight

### 💳 **Payment Integration**
- **Stripe Integration**: Secure payment processing
- **Course Purchases**: One-time payments for premium courses
- **Webhook Support**: Automatic enrollment after successful payment

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching support
- **Component Library**: Shadcn/ui components for consistent design
- **Real-time Updates**: Optimistic UI updates and real-time progress

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **NextAuth.js**: Authentication and session management
- **Prisma**: Database ORM
- **MongoDB**: NoSQL database
- **Mux**: Video streaming platform

### **External Services**
- **Stripe**: Payment processing
- **Uploadthing**: File upload service
- **Mux**: Video hosting and streaming

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/kwadjoa63-alt/lms.git
cd lms
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/lmsdb"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Mux
MUX_TOKEN_ID="your-mux-token-id"
MUX_TOKEN_SECRET="your-mux-token-secret"

# Uploadthing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create default admin and teacher accounts
npm run create-admin
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Detailed Setup Guide

### Database Configuration

#### MongoDB Setup
1. **Create MongoDB Atlas Account** (recommended) or use local MongoDB
2. **Create a new cluster** and database
3. **Get connection string** and add to `DATABASE_URL`
4. **Whitelist your IP** in MongoDB Atlas network access

#### Prisma Schema
The database schema includes these main models:
- **User**: Authentication and role management
- **Course**: Course information and metadata
- **Chapter**: Individual lessons with video content
- **Quiz**: Interactive assessments
- **Question**: Quiz questions with multiple choice options
- **QuizAttempt**: Student quiz submissions and scores
- **Purchase**: Course enrollment records
- **UserProgress**: Video completion tracking

### Authentication Setup

#### NextAuth Configuration
The app uses NextAuth.js with credentials provider:
- **Email/Password**: Standard authentication
- **Role-based Access**: ADMIN, TEACHER, STUDENT roles
- **Session Management**: Secure session handling

#### Default Accounts
After running `npm run create-admin`, you'll have:
- **Admin**: `admin@lms.com` / `admin123`
- **Teacher**: `teacher@lms.com` / `teacher123`

### Payment Integration

#### Stripe Setup
1. **Create Stripe Account** and get API keys
2. **Set up Webhooks** for payment confirmation
3. **Configure Products** for course pricing
4. **Test with Stripe Test Mode**

#### Payment Flow
1. Student clicks "Enroll" on a course
2. Stripe Checkout session created
3. Payment processed securely
4. Webhook confirms payment
5. Student automatically enrolled

### Video Streaming

#### Mux Setup
1. **Create Mux Account** and get API credentials
2. **Configure video settings** for optimal streaming
3. **Set up webhooks** for video processing status

#### Video Features
- **Adaptive Streaming**: Automatic quality adjustment
- **Progress Tracking**: Resume from last watched position
- **Mobile Optimized**: Works on all devices

## 📚 Usage Guide

### For Students

#### Enrolling in Courses
1. **Browse Courses**: Use the search page to find courses
2. **View Course Details**: Click on any course to see description and chapters
3. **Purchase Course**: Click "Enroll" for premium courses
4. **Start Learning**: Access course content after enrollment

#### Taking Quizzes
1. **Complete Video**: Watch the chapter video first
2. **Take Quiz**: Scroll to the quiz section at the bottom
3. **Answer Questions**: Select your answers for each question
4. **Submit Quiz**: Click "Submit Quiz" when done
5. **View Results**: See your score and detailed feedback
6. **Retake if Needed**: Click "Retake Quiz" to try again

#### Tracking Progress
- **Course Progress**: See overall completion percentage
- **Chapter Status**: Green checkmarks for completed chapters
- **Quiz Results**: View previous quiz attempts and scores

### For Teachers

#### Creating Courses
1. **Access Teacher Mode**: Click "Teacher Mode" in the navbar
2. **Create New Course**: Click "New Course" button
3. **Add Course Details**: Title, description, price, category
4. **Upload Course Image**: Add a cover image
5. **Publish Course**: Make it visible to students

#### Managing Chapters
1. **Add Chapters**: Click "Add a chapter" in course editor
2. **Upload Videos**: Use Mux integration for video uploads
3. **Add Descriptions**: Provide chapter descriptions
4. **Set Access**: Free or premium content
5. **Publish Chapters**: Make them visible to students

#### Creating Quizzes
1. **Edit Chapter**: Go to chapter editor
2. **Scroll to Quizzes**: Find "Chapter Quizzes" section
3. **Add Quiz**: Click "Add a quiz"
4. **Configure Quiz**: Set title, description, passing score
5. **Add Questions**: Create multiple choice questions
6. **Set Correct Answers**: Mark the correct options
7. **Publish Quiz**: Make it available to students

#### Analytics
- **Student Enrollment**: See how many students enrolled
- **Course Performance**: Track course completion rates
- **Quiz Analytics**: View quiz attempt statistics

### For Admins

#### User Management
1. **Access Admin Panel**: Use admin account to login
2. **View All Users**: See all registered users
3. **Manage Roles**: Change user roles (Student/Teacher/Admin)
4. **User Analytics**: Track user activity and engagement

#### Platform Oversight
- **All Courses**: View and manage all courses
- **User Statistics**: Platform-wide user metrics
- **System Health**: Monitor platform performance

## 🏗️ Project Structure

```
lms/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   └── (routes)/
│   │       ├── sign-in/          # Login page
│   │       ├── sign-up/          # Registration page
│   │       └── setup/            # Admin setup page
│   ├── (course)/                 # Student course pages
│   │   └── courses/
│   │       └── [courseId]/
│   │           ├── chapters/     # Chapter viewing
│   │           └── _components/  # Course-specific components
│   ├── (dashboard)/              # Main dashboard
│   │   ├── (routes)/
│   │   │   ├── dashboard/        # Dashboard home
│   │   │   ├── search/           # Course search
│   │   │   └── teacher/          # Teacher panel
│   │   └── _components/          # Dashboard components
│   └── api/                      # API routes
│       ├── auth/                 # Authentication endpoints
│       ├── courses/              # Course management
│       ├── uploadthing/          # File upload
│       └── webhook/              # Stripe webhooks
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn/ui components
│   └── modals/                   # Modal components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Auth utilities
│   ├── db.ts                     # Database connection
│   ├── stripe.ts                 # Stripe configuration
│   └── utils.ts                  # General utilities
├── actions/                      # Server actions
├── hooks/                        # Custom React hooks
├── prisma/                       # Database schema
└── types.ts                      # TypeScript definitions
```

## 🔒 Security Features

### Authentication & Authorization
- **Secure Sessions**: NextAuth.js session management
- **Role-based Access**: Granular permissions for different user types
- **Protected Routes**: Middleware-based route protection
- **Password Hashing**: bcrypt for secure password storage

### Data Protection
- **Input Validation**: Zod schema validation for all inputs
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: NextAuth.js built-in protection

### Payment Security
- **Stripe Integration**: PCI-compliant payment processing
- **Webhook Verification**: Secure webhook signature validation
- **No Card Storage**: Payment data never stored locally

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect GitHub**: Link your repository to Vercel
2. **Environment Variables**: Add all required env vars
3. **Database**: Use MongoDB Atlas for production
4. **Deploy**: Automatic deployment on git push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🧪 Testing

### Manual Testing
1. **User Registration**: Test sign-up flow
2. **Course Creation**: Create and publish courses
3. **Quiz Functionality**: Test quiz creation and taking
4. **Payment Flow**: Test Stripe integration
5. **Progress Tracking**: Verify completion logic

### Automated Testing
```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database
npx prisma db push --force-reset
```

#### Authentication Issues
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

#### Video Upload Issues
- Verify Mux credentials are correct
- Check file size limits
- Ensure proper video format

#### Payment Issues
- Test with Stripe test mode first
- Verify webhook endpoints
- Check Stripe dashboard for errors

## 📈 Performance Optimization

### Frontend
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components loaded on demand
- **Caching**: Static generation where possible

### Backend
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis for frequently accessed data
- **CDN**: Static asset delivery

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment
- **Shadcn**: For the beautiful component library
- **Stripe**: For payment processing
- **Mux**: For video streaming

## 📞 Support

For support, email support@lms.com or create an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**