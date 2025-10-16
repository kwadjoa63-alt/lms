"use client";

import { UserButton } from "@/components/user-button";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { SafeProfile } from "@/types";

interface NavbarRoutesProps  {
  currentProfile?: SafeProfile | null
}

export const NavbarRoutes : React.FC<NavbarRoutesProps> = ({
  currentProfile
}) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapters");
  const isSearchPage = pathname === "/search";
  const isDashboardPage = pathname === "/dashboard" || pathname === "/" || pathname === "/search";
  
  const isAdmin = currentProfile?.role === "ADMIN";
  const isTeacher = currentProfile?.role === "TEACHER";
  const isStudent = currentProfile?.role === "STUDENT";

  return (<>
    {isSearchPage && (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    )}
    <div className="flex gap-x-2 ml-auto">
      {/* Admin View */}
      {isAdmin && (
        <>
          {/* No buttons needed - admin has full sidebar access */}
        </>
      )}

      {/* Teacher View */}
      {isTeacher && (
        <>
          {isTeacherPage || isPlayerPage ? (
            <Link href="/dashboard">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher Mode
              </Button>
            </Link>
          )}
        </>
      )}

      {/* Student View */}
      {isStudent && isPlayerPage && (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      )}

     <UserButton />
    </div>
  </>);
};