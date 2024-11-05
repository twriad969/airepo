"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { GoogleButton } from "@/components/auth/google-button";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

export default function SignupPage() {
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
          requestsRemaining: 50,
          isPro: false,
          enhancementHistory: [],
        });
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSignup(values: any) {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(userCredential.user, {
        displayName: values.username,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: values.username,
        email: values.email,
        createdAt: new Date().toISOString(),
        requestsRemaining: 10,
        isPro: false,
        enhancementHistory: [],
      });

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black/[0.96]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Get Started</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-white">
            Create your account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Start enhancing your prompts today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <AuthForm type="signup" onSubmit={onSignup} isLoading={isLoading} />

            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white hover:text-white/90 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}