"use client";

import { UserAccount } from "@/components/user-account";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const logoVariants = {
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const NavLinks = () => (
    <>
      <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
        Features
      </Link>
      <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
        Pricing
      </Link>
      <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
        Documentation
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover="hover"
              variants={logoVariants}
              className="flex items-center space-x-2"
            >
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold">Prompthancer</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <NavLinks />
          </nav>

          <div className="flex items-center space-x-4">
            {!user && (
              <div className="hidden md:flex space-x-2">
                <Link href="/login">
                  <Button 
                    variant="ghost"
                    className="hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
            <UserAccount />
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                  {!user && (
                    <Link href="/login">
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}