"use client";
import { useTheme } from "./providers/theme-provider"
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/user-button";
import Link from "next/link";
import { FaArrowUp, FaUser } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn, isLoaded } = useCurrentUser();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 flex gap-4">
        <button
          title="Toggle theme"
          className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          onClick={toggleTheme}
        >
          {theme === "light" ? <BsSun /> : <BsMoon />}
        </button>

        <button
          title="Scroll to top"
          className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>

        {isLoaded && (
          <>
            {isSignedIn ? (
              <div className="scale-150 origin-center">
                <UserButton />
              </div>
            ) : (
              <Link href="/sign-in">
                <button
                  title="Sign in"
                  className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
                >
                  <FaUser />
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
}