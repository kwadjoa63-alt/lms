# 🔐 Clerk to NextAuth Migration Guide

## ✅ **Migration Status: In Progress**

This document tracks the migration from Clerk to NextAuth.js (credentials-based authentication).

---

## 📋 **What's Been Done**

### ✅ **1. Dependencies Installed**
- ✅ `next-auth@beta` (v5)
- ✅ `bcryptjs`
- ✅ `@types/bcryptjs`
- ✅ `@radix-ui/react-avatar`

### ✅ **2. Database Schema Updated**
- ✅ Changed `Profile` model to `User` model
- ✅ Added `password` field for credential authentication
- ✅ Made `email` unique for login

**Schema Changes:**
```prisma
model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String
  email String @unique
  password String  // NEW: for authentication
  imageUrl String?  
  role MemberRole @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### ✅ **3. NextAuth Configuration Created**
- ✅ `lib/auth.config.ts` - NextAuth configuration
- ✅ `lib/auth-new.ts` - Main auth setup with credentials provider
- ✅ `lib/auth-utils.ts` - Utility functions (replaces Clerk helpers)
- ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route
- ✅ `app/api/auth/signup/route.ts` - User registration endpoint

### ✅ **4. Authentication Pages Created**
- ✅ `app/(auth)/(routes)/sign-in/page.tsx` - Custom sign-in page
- ✅ `app/(auth)/(routes)/sign-up/page.tsx` - Custom sign-up page
- ✅ Removed old Clerk pages

### ✅ **5. Auth Hooks & Utilities**
- ✅ `hooks/use-current-user.ts` - Client-side auth hooks
- ✅ Server-side utility functions in `lib/auth-utils.ts`

### ✅ **6. UI Components**
- ✅ `components/user-button.tsx` - Custom user menu (replaces Clerk's UserButton)
- ✅ `components/ui/avatar.tsx` - Avatar component
- ✅ `components/providers/session-provider.tsx` - NextAuth session provider

### ✅ **7. Core Files Updated**
- ✅ `app/layout.tsx` - Replaced ClerkProvider with SessionProvider
- ✅ `middleware.ts` - Updated to use NextAuth middleware
- ✅ `lib/current-profile.ts` - Updated to use NextAuth
- ✅ `components/navbar-routes.tsx` - Updated to use custom UserButton
- ✅ `.env` - Updated environment variables

---

## 🔄 **Files That Still Need Updating**

The following files still import from `@clerk/nextjs` and need to be updated:

### **Critical Files:**
1. `lib/auth.ts` - Update to use NextAuth
2. `app/(dashboard)/(routes)/(root)/page.tsx` - Dashboard page
3. `app/(course)/courses/[courseId]/layout.tsx` - Course layout
4. `app/(course)/courses/[courseId]/chapters/[chapterId]/page.tsx` - Chapter page
5. `actions/get-safe-profile.ts` - Profile actions

### **API Routes:**
1. `app/api/courses/*.ts` - All course API routes
2. `app/api/profile/[id]/route.ts` - Profile API
3. `app/api/uploadthing/core.ts` - Upload configuration

### **Teacher Pages:**
1. `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/page.tsx`
2. `app/(dashboard)/(routes)/teacher/users/[id]/page.tsx`
3. `app/(dashboard)/(routes)/search/page.tsx`

---

## 🔄 **Migration Pattern**

### **For Server Components (pages, layouts):**

**Before (Clerk):**
```typescript
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
```

**After (NextAuth):**
```typescript
import { auth } from "@/lib/auth-new";

const session = await auth();
const userId = session?.user?.id;
```

### **For Client Components:**

**Before (Clerk):**
```typescript
import { useUser } from "@clerk/nextjs";

const { user, isLoaded } = useUser();
```

**After (NextAuth):**
```typescript
import { useCurrentUser } from "@/hooks/use-current-user";

const { user, isLoaded, isSignedIn } = useCurrentUser();
```

### **For API Routes:**

**Before (Clerk):**
```typescript
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) {
  return new NextResponse("Unauthorized", { status: 401 });
}
```

**After (NextAuth):**
```typescript
import { auth } from "@/lib/auth-new";

const session = await auth();
if (!session?.user?.id) {
  return new NextResponse("Unauthorized", { status: 401 });
}
const userId = session.user.id;
```

---

## 🔧 **Environment Variables**

### **Removed (Clerk):**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=...
NEXT_PUBLIC_CLERK_SIGN_UP_URL=...
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=...
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=...
```

### **Added (NextAuth):**
```env
AUTH_SECRET=4vkznq7rTBnXGnVPd6q0onid7wv+5BFSAVF8omWF00g=
NEXTAUTH_URL=http://localhost:3000
```

---

## 📝 **Next Steps to Complete Migration**

1. **Update remaining files** that use Clerk (see list above)
2. **Run Prisma migration:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Create initial admin/teacher account:**
   - Sign up through `/sign-up`
   - Manually update role in database to `TEACHER` or `ADMIN`
4. **Remove Clerk package:**
   ```bash
   npm uninstall @clerk/nextjs
   ```
5. **Test all functionality:**
   - Sign up
   - Sign in
   - Sign out
   - Teacher mode access
   - Course creation
   - User progress tracking

---

## 🎯 **Key Differences**

| Feature | Clerk | NextAuth |
|---------|-------|----------|
| **Provider** | ClerkProvider | SessionProvider |
| **Auth Hook** | `useUser()`, `useAuth()` | `useCurrentUser()` |
| **Server Auth** | `auth()` from `@clerk/nextjs/server` | `auth()` from `@/lib/auth-new` |
| **User Object** | `user` | `session.user` |
| **User ID** | `userId` | `session.user.id` |
| **Sign Out** | `<UserButton />` with `afterSignOutUrl` | `signOut({ callbackUrl: '/sign-in' })` |
| **Protected Routes** | Clerk Middleware | NextAuth Middleware + callbacks |

---

## 🔐 **Security Notes**

- ✅ Passwords are hashed using `bcrypt` (10 rounds)
- ✅ JWT tokens are used for sessions
- ✅ Secure session management
- ✅ CSRF protection built-in
- ⚠️ **Remember to set a strong `AUTH_SECRET` in production!**

---

## 📚 **Resources**

- [NextAuth.js Documentation](https://authjs.dev)
- [NextAuth.js v5 Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Credentials Provider](https://authjs.dev/guides/providers/credentials)

---

**Last Updated:** October 14, 2025



