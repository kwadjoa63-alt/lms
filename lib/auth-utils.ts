import { auth } from './auth-new';
import { db } from './db';

// Get the current authenticated user (replaces Clerk's auth())
export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user || null;
};

// Get the current user's ID (replaces Clerk's auth().userId)
export const getCurrentUserId = async () => {
  const session = await auth();
  return session?.user?.id || null;
};

// Get the current user with full details from database
export const getCurrentUserWithDetails = async () => {
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

// Check if user is a teacher
export const isTeacher = async (userId?: string) => {
  const id = userId || (await getCurrentUserId());
  
  if (!id) return false;

  const user = await db.user.findUnique({
    where: { id },
    select: { role: true },
  });

  return user?.role === 'TEACHER' || user?.role === 'ADMIN';
};

// Get user by ID (replaces various Clerk user lookups)
export const getUserById = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
  });
};



