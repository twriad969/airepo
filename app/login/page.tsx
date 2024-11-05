"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { GoogleButton } from "@/components/auth/google-button";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
          requestsRemaining: 10,
          isPro: false,
          enhancementHistory: [],
        });
      }

      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onLogin(values: any) {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn(
      "min-h-screen w-full flex items-center justify-center p-4",
      "bg-gray-50 dark:bg-black/[0.96]"
    )}>
      <Card className={cn(
        "w-full max-w-md",
        "bg-white dark:bg-black",
        "border-gray-200 dark:border-gray-800"
      )}>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <div className={cn(
              "inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full",
              "bg-gray-100 dark:bg-white/5"
            )}>
              <Lock className={cn(
                "h-5 w-5",
                "text-gray-900 dark:text-white"
              )} />
              <span className={cn(
                "text-sm font-medium",
                "text-gray-900 dark:text-white"
              )}>Welcome Back</span>
            </div>
          </div>
          <CardTitle className={cn(
            "text-2xl text-center",
            "text-gray-900 dark:text-white"
          )}>
            Sign in to your account
          </CardTitle>
          <CardDescription className={cn(
            "text-center",
            "text-gray-500 dark:text-gray-400"
          )}>
            Continue your journey with enhanced prompts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={cn(
                  "w-full border-t",
                  "border-gray-200 dark:border-gray-800"
                )} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={cn(
                  "px-2",
                  "bg-white text-gray-500",
                  "dark:bg-black dark:text-gray-400"
                )}>
                  Or continue with email
                </span>
              </div>
            </div>

            <AuthForm type="login" onSubmit={onLogin} isLoading={isLoading} />

            <p className={cn(
              "text-sm text-center",
              "text-gray-500 dark:text-gray-400"
            )}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className={cn(
                  "font-medium",
                  "text-gray-900 hover:text-gray-900/90",
                  "dark:text-white dark:hover:text-white/90",
                  "transition-colors"
                )}
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}