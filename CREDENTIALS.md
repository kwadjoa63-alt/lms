# 🔐 Default Login Credentials

## Quick Access

### Setup Page
**URL:** `http://localhost:3000/setup`

Create custom admin or teacher accounts through the web interface.

---

## Default Accounts (Created by Script)

Run `npm run create-admin` to create these accounts:

### 👑 Admin Account
```
Email:    admin@kwadjo.com
Password: admin123
Role:     ADMIN
```
**Access:**
- Full platform control
- User management at `/teacher/users`
- Course creation at `/teacher/courses`
- Analytics at `/teacher/analytics`

### 👨‍🏫 Teacher Account
```
Email:    teacher@kwadjo.com
Password: teacher123
Role:     TEACHER
```
**Access:**
- Course creation at `/teacher/courses`
- View own analytics at `/teacher/analytics`
- Cannot manage users

### 👨‍🎓 Student Account
Any user that signs up normally through `/sign-up` gets STUDENT role by default.

---

## Sign In URLs

- **Main Sign In:** `http://localhost:3000/sign-in`
- **Sign Up:** `http://localhost:3000/sign-up`
- **Admin Setup:** `http://localhost:3000/setup`

---

## Dashboard URLs

### For Admins
- Main Dashboard: `/dashboard` or `/`
- Admin Panel: `/teacher/users`
- Manage Courses: `/teacher/courses`
- Analytics: `/teacher/analytics`

### For Teachers
- Main Dashboard: `/dashboard` or `/`
- Manage Courses: `/teacher/courses`
- Analytics: `/teacher/analytics`

### For Students
- Main Dashboard: `/dashboard` or `/`
- Browse Courses: `/search`

---

## ⚠️ Important Notes

1. **First Time Setup:**
   - Visit `/setup` or run `npm run create-admin`
   - Create your admin account
   - Sign in immediately

2. **Production:**
   - Change all default passwords
   - Disable the `/setup` page
   - Use strong, unique passwords

3. **Promoting Users:**
   - Admin logs in → Admin Panel → Edit user → Change role → Save

4. **Security:**
   - Keep admin credentials secure
   - Don't share in public repositories
   - Use environment variables for sensitive data

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Create admin/teacher accounts
npm run create-admin

# Start development server
npm run dev

# Then visit: http://localhost:3000/setup
```

---

**Need Help?** Check `ADMIN_SETUP.md` for detailed instructions.


