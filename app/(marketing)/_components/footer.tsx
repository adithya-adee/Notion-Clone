"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white h-10 absolute bottom-0 w-full">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Image
          src={Logo}
          alt="Logo"
          style={{ height: "30px", width: "30px" }}
          className="filter grayscale" // Apply grayscale filter for black and white effect
        />
        <div className="flex">
          <Button variant="ghost" className="text-black">
            Privacy Policy
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
