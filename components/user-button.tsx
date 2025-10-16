'use client';

import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';

export const UserButton = () => {
  const { user } = useCurrentUser();

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/sign-in' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-primary/50 group-hover:scale-105">
            <Avatar className="h-full w-full">
              <AvatarImage 
                src={user.image || undefined} 
                alt={user.name || 'User'}
                className="object-cover"
              />
              <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="pb-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
              <Avatar className="h-full w-full">
                <AvatarImage 
                  src={user.image || undefined} 
                  alt={user.name || 'User'}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-1 flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none truncate">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



