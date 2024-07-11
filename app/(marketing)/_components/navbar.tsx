"use client";

import { useConvexAuth } from "convex/react";
import { useTopScroll } from "@/hooks/use-top-scroll";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/Logo.svg";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import Spinner from "@/components/spinner";

const Navbar = () => {
  const scrolled = useTopScroll();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="bg-white shadow-md">
      <div
        className={cn(
          "container mx-auto flex justify-between items-center py-4 px-6",
          scrolled
        )}
      >
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Brand Logo"
            width={50}
            height={50}
            className="mr-4 filter grayscale" // Apply grayscale filter for black and white effect
          />
          <span className="text-xl font-semibold text-black">Lotion</span>
        </div>
        <div className="flex space-x-4">
          {isLoading && (
            <div>
              <Spinner />
            </div>
          )}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  className="  px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                  variant="ghost"
                >
                  Login
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  className="  px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Get Lotion free
                </Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/documents">Enter Lotion</Link>
              </Button>
              <div className="filter grayscale">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
