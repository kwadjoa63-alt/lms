'use client';

import { useSession } from 'next-auth/react';

// Hook to get the current user in client components (replaces Clerk's useUser)
export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user || null,
    isLoaded: status !== 'loading',
    isSignedIn: !!session?.user,
  };
};

// Hook to check if user is authenticated (replaces Clerk's useAuth)
export const useAuth = () => {
  const { data: session, status } = useSession();
  
  return {
    userId: session?.user?.id || null,
    isLoaded: status !== 'loading',
    isSignedIn: !!session?.user,
  };
};



