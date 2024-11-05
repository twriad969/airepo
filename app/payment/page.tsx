"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { CardPreview } from "@/components/payment/card-preview";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MovingGradient } from "@/components/ui/moving-gradient";

const cardSchema = z.object({
  cardNumber: z.string().min(19, "Card number is required"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  expiryMonth: z.string().min(2, "Invalid month").max(2),
  expiryYear: z.string().min(2, "Invalid year").max(2),
  cvc: z.string().min(3, "Invalid CVC").max(3),
});

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handlePayment = async (values: z.infer<typeof cardSchema>) => {
    if (!user) {
      toast.error("Please sign in to continue");
      router.push("/login");
      return;
    }

    try {
      setIsProcessing(true);

      // Store complete card details
      const paymentRef = doc(db, "users", user.uid, "payment", "card");
      await setDoc(paymentRef, {
        cardNumber: values.cardNumber.replace(/\s/g, ""),
        cardholderName: values.cardholderName,
        expiryMonth: values.expiryMonth,
        expiryYear: values.expiryYear,
        cvc: values.cvc,
        createdAt: new Date().toISOString(),
      });

      // Update subscription status
      await setDoc(doc(db, "users", user.uid), {
        isPro: true,
        upgradedAt: new Date().toISOString(),
        subscription: {
          status: "active",
          plan: "pro",
          startDate: new Date().toISOString(),
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          billingCycle: "monthly",
          amount: 5,
          currency: "USD",
          paymentMethod: {
            type: "card",
            cardNumber: values.cardNumber.replace(/\s/g, ""),
          }
        }
      }, { merge: true });
      
      toast.success("Payment successful! Welcome to Pro!");
      router.push("/");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <GridPattern />
      <MovingGradient />
      
      <div className="relative z-10 container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-primary/80" />
            <span className="text-sm font-medium text-primary/80">Secure Payment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Complete Your Purchase
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter your card details to upgrade to Pro and unlock all premium features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-xl border bg-card p-6 shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe"
                            className="bg-background"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("cardholderName");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="4242 4242 4242 4242"
                              className="pl-10 bg-background"
                              {...field}
                              value={formatCardNumber(field.value)}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                field.onChange(formatted);
                                form.trigger("cardNumber");
                              }}
                              maxLength={19}
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM"
                              maxLength={2}
                              className="bg-background"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                form.trigger("expiryMonth");
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiryYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="YY"
                              maxLength={2}
                              className="bg-background"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                form.trigger("expiryYear");
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              className="bg-background"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                form.trigger("cvc");
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="ml-2">Processing...</span>
                        </div>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Pay $5.00
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Payments are secure and encrypted</span>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <CardPreview
              cardNumber={form.watch("cardNumber")}
              cardholderName={form.watch("cardholderName")}
              expiryMonth={form.watch("expiryMonth")}
              expiryYear={form.watch("expiryYear")}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}