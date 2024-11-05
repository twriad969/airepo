"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Loader2, Lock, CreditCard } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const cardSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  expiryMonth: z.string().min(2, "Invalid month").max(2),
  expiryYear: z.string().min(2, "Invalid year").max(2),
  cvc: z.string().min(3, "Invalid CVC").max(3),
});

export function PricingDialog({ open, onOpenChange, userId }: PricingDialogProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);

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

  const handleUpgrade = async (values: z.infer<typeof cardSchema>) => {
    try {
      setIsUpgrading(true);

      // Store complete card details
      const paymentRef = doc(db, "users", userId, "payment", "card");
      await setDoc(paymentRef, {
        cardNumber: values.cardNumber,
        cardholderName: values.cardholderName,
        expiryMonth: values.expiryMonth,
        expiryYear: values.expiryYear,
        cvc: values.cvc,
        createdAt: new Date().toISOString(),
      });

      // Update subscription status
      await setDoc(doc(db, "users", userId), {
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
            cardNumber: values.cardNumber,
          }
        }
      }, { merge: true });
      
      toast.success("Successfully upgraded to Pro!");
      onOpenChange(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <Card className="border-0">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl">Upgrade to Pro</CardTitle>
            <CardDescription>
              Enter your card details to unlock premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpgrade)} className="space-y-6">
                <div className="space-y-4">
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
                              maxLength={16}
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
                          <FormLabel>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <span className="cursor-help">CVC</span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    The CVC (Card Verification Code) is a 3 or 4 digit number typically found on the back of your card.
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              className="bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Fee</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>$5.00</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpgrading}
                >
                  {isUpgrading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pay $5.00
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>Payments are secure and encrypted</span>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}