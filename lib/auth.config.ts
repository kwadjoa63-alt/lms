import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuth = nextUrl.pathname.startsWith('/sign-in') || nextUrl.pathname.startsWith('/sign-up');
      
      // Allow auth pages for everyone
      if (isOnAuth) {
        return true;
      }
      
      // Protect all other routes
      if (!isLoggedIn) {
        return false;
      }
      
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

