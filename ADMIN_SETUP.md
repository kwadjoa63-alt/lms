# Admin & Teacher Setup Guide

This guide explains how to create admin and teacher accounts for your Kwadjo Learning Platform.

## 🎯 Quick Setup Options

### Option 1: Setup Page (Recommended)
The easiest way to create admin/teacher accounts:

1. **Navigate to the setup page:**
   ```
   http://localhost:3000/setup
   ```

2. **Choose role:** Admin or Teacher

3. **Fill in details:**
   - Full Name
   - Email Address
   - Password (minimum 6 characters)

4. **Click "Create Account"**

5. **Sign in** at `/sign-in` with your new credentials

---

### Option 2: Command Line Script
Create accounts directly via terminal:

1. **Run the script:**
   ```bash
   npm run create-admin
   ```

2. **This creates two default accounts:**
   - **Admin:** admin@kwadjo.com / admin123
   - **Teacher:** teacher@kwadjo.com / teacher123

3. **Sign in** at `/sign-in` with these credentials

---

## 🔑 Default Test Credentials

For quick testing, use these suggested credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kwadjo.com | admin123 |
| Teacher | teacher@kwadjo.com | teacher123 |
| Student | (any new signup) | (any password 6+ chars) |

---

## 👥 Role Permissions

### 🔴 ADMIN
- **Full platform access**
- Manage all users and assign roles
- Create and manage courses
- View analytics
- Access admin panel at `/teacher/users`

### 🔵 TEACHER  
- Create and manage courses
- View their own course analytics
- Cannot manage users

### ⚪ STUDENT
- Browse and enroll in courses
- Track course progress
- View purchased courses

---

## 🚀 Getting Started

### First Time Setup:

1. **Create your first admin:**
   - Visit `/setup` OR run `npm run create-admin`

2. **Sign in as admin:**
   - Go to `/sign-in`
   - Use admin credentials

3. **Access admin panel:**
   - Click "Admin Panel" button (red) in the navbar
   - Or navigate to `/teacher/users`

4. **Promote users to teachers:**
   - Click "Edit" on any user
   - Change role from STUDENT → TEACHER
   - Click "Save"

---

## 🔒 Security Notes

- **Change default passwords** in production
- Admin accounts have full access - protect credentials carefully
- The setup page (`/setup`) should be disabled in production
- Consider adding rate limiting for signup endpoints

---

## 🛠️ Manual Database Setup (Advanced)

If you prefer to create accounts directly in the database:

1. **Hash a password:**
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = await bcrypt.hash('yourpassword', 10);
   console.log(hash);
   ```

2. **Insert user into database:**
   ```javascript
   await prisma.user.create({
     data: {
       name: "Admin User",
       email: "admin@example.com",
       password: "HASHED_PASSWORD_HERE",
       role: "ADMIN"
     }
   });
   ```

---

## 🎓 Next Steps

After creating admin/teacher accounts:

1. **Teachers** can create courses at `/teacher/courses`
2. **Admins** can manage users at `/teacher/users`
3. **Students** sign up normally at `/sign-up`

---

## ❓ Troubleshooting

**Problem:** "User already exists"  
**Solution:** Email is already taken. Use a different email or sign in.

**Problem:** Can't access admin panel  
**Solution:** Ensure your account has ADMIN role. Check database or ask another admin to promote you.

**Problem:** Setup page not working  
**Solution:** Ensure database is running and `npm run dev` is active.

---

## 📞 Support

For issues or questions:
- Contact: kwadjo@learning.com
- Check logs for errors
- Verify database connection


