# 🚀 Final Setup Guide - Clerk to NextAuth Migration

## ✅ **Migration Complete! Follow these steps to finish setup:**

---

## 📋 **Step-by-Step Setup**

### **Step 1: Stop the Development Server**

If your server is still running, stop it with `Ctrl + C`.

### **Step 2: Generate Prisma Client**

```bash
npx prisma generate
```

If you get a permission error, close all terminal windows and try again.

### **Step 3: Push Database Schema**

```bash
npx prisma db push
```

This will update your MongoDB database with the new `User` model.

### **Step 4: Update Remaining API Routes** ⚠️

Some API routes still need manual updates. Use this pattern:

**Find and replace in all API route files:**

**OLD:**
```typescript
import { auth } from "@clerk/nextjs/server";
const { userId } = await auth();
```

**NEW:**
```typescript
import { auth } from "@/lib/auth-new";
const session = await auth();
const userId = session?.user?.id;
```

**Files to update:**
- `app/api/courses/*.ts` (all course routes)
- `app/api/uploadthing/core.ts`
- `actions/get-safe-profile.ts`
- Any other file importing from `@clerk/nextjs`

### **Step 5: Start the Development Server**

```bash
npm run dev
```

The server should start without errors!

### **Step 6: Test Authentication** 🧪

1. **Open** http://localhost:3000
2. **You should be redirected** to `/sign-in`
3. **Click "Sign up"** link
4. **Create an account:**
   - Name: Your Name
   - Email: test@example.com
   - Password: password123 (min 6 characters)
5. **You should auto-login** and see the dashboard!

### **Step 7: Promote Your Account to Teacher** (Optional)

To access teacher features:

1. **Open Prisma Studio:**
   ```bash
   npx prisma studio
   ```

2. **Navigate to the `User` model**
3. **Find your user**
4. **Change `role` from `STUDENT` to `TEACHER` or `ADMIN`**
5. **Save changes**
6. **Refresh your browser**
7. **You should now see "Teacher Mode" button!**

---

## 🔧 **Quick Reference: Auth Functions**

### **Server Components & API Routes:**

```typescript
import { auth } from "@/lib/auth-new";
import { getCurrentUser, getCurrentUserId, isTeacher } from "@/lib/auth-utils";

// Get session
const session = await auth();
const userId = session?.user?.id;

// Get user with details
const user = await getCurrentUser();

// Get just the ID
const userId = await getCurrentUserId();

// Check if teacher
const userIsTeacher = await isTeacher();
```

### **Client Components:**

```typescript
import { useCurrentUser, useAuth } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

// In component
const { user, isLoaded, isSignedIn } = useCurrentUser();
const { userId } = useAuth();

// Sign out
await signOut({ callbackUrl: '/sign-in' });
```

---

## 🎨 **UI Components**

### **User Menu:**
```typescript
import { UserButton } from "@/components/user-button";

<UserButton />
```

### **Protect Client Components:**
```typescript
const { isSignedIn, isLoaded } = useCurrentUser();

if (!isLoaded) return <div>Loading...</div>;
if (!isSignedIn) return <div>Please sign in</div>;
```

---

## 🐛 **Troubleshooting**

### **Error: "Module not found: Can't resolve '@/lib/auth-new'"**
- **Solution:** Restart your dev server

### **Error: "Prisma Client did not initialize yet"**
- **Solution:** Run `npx prisma generate`

### **Error: "Invalid `prisma.user.findUnique()` invocation"**
- **Solution:** Run `npx prisma db push`

### **Can't sign in after signup**
- **Solution:** Check browser console for errors
- Make sure `AUTH_SECRET` is set in `.env`
- Try clearing cookies and signing up again

### **Redirect loop on homepage**
- **Solution:** Check middleware.ts is using NextAuth
- Verify `AUTH_SECRET` is set in `.env`

---

## 🔒 **Security Checklist**

- ✅ **AUTH_SECRET** is set and kept secret
- ✅ **Passwords** are hashed with bcrypt
- ✅ **Sessions** use JWT tokens
- ✅ **.env file** is in `.gitignore`
- ⚠️ **For production:** Generate a new `AUTH_SECRET`!

### **Generate Production Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📦 **Optional: Remove Clerk Package**

Once everything is working, you can remove Clerk:

```bash
npm uninstall @clerk/nextjs
```

**WARNING:** Only do this after you've updated ALL files that import from `@clerk/nextjs`!

---

## 🎯 **Features Now Available**

✅ **Custom authentication** with email/password  
✅ **User roles:** Student, Teacher, Admin  
✅ **Secure sessions** with JWT  
✅ **Custom sign-in/sign-up** pages  
✅ **User menu** with profile dropdown  
✅ **Protected routes** via middleware  
✅ **Full control** over auth logic  

---

## 📚 **Common Tasks**

### **Add a New User Manually:**
```typescript
// In Prisma Studio or via API
{
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // Use bcrypt.hash() first!
  role: "STUDENT"
}
```

### **Hash a Password:**
```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash('mypassword', 10);
```

### **Check User Role:**
```typescript
import { isTeacher } from "@/lib/auth-utils";

const userIsTeacher = await isTeacher();
```

---

## 🎉 **You're All Set!**

Your LMS platform now uses NextAuth.js for authentication!

### **Next Steps:**
1. Test all features thoroughly
2. Update any remaining Clerk imports
3. Customize the sign-in/sign-up pages to match your brand
4. Add more user fields if needed
5. Consider adding "Forgot Password" functionality

---

## 📝 **Need Help?**

- Check `NEXTAUTH_MIGRATION.md` for detailed migration notes
- Review NextAuth.js documentation: https://authjs.dev
- Check console/network tab for errors

**Happy coding! 🚀**



