"use client";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Spinner from "@/components/spinner";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-black">
        Your Ideas, Documents & Plans.
        <br />
        Unified. Welcome to <span className="underline text-black">Lotion</span>
      </h1>
      <h3 className="text-lg sm:text-xl md:text-2xl text-black">
        A place to organize your ideas, documents, and plans. All in one place.
      </h3>
      {!isAuthenticated && !isLoading && (
        <>
          <Button className="bg-black hover:bg-black text-white px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </>
      )}
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <Button className="bg-black hover:bg-black text-white px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <Link href="/documents">Enter Lotion</Link>

            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Heading;
