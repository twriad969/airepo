"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, Check, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanOption {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
}

const plans: PlanOption[] = [
  {
    id: "pro",
    name: "Pro Plan",
    price: {
      monthly: 9.99,
      yearly: 99.99,
    },
    features: [
      "Advanced prompt enhancement",
      "Unlimited requests",
      "Priority processing",
      "Premium support",
      "Early access to features",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 29.99,
      yearly: 299.99,
    },
    features: [
      "All Pro features",
      "Custom model training",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
  },
];

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    try {
      setIsProcessing(true);

      // Update user subscription in Firebase
      await setDoc(doc(db, "users", user.uid), {
        subscription: {
          plan: selectedPlan.id,
          billingCycle,
          price: selectedPlan.price[billingCycle],
          startDate: new Date().toISOString(),
          status: "active",
        },
      }, { merge: true });

      toast.success("Subscription updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to process subscription");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose a plan that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="flex justify-center space-x-4">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </Button>
          </div>

          <RadioGroup
            defaultValue={selectedPlan.id}
            onValueChange={(value) => setSelectedPlan(plans.find(p => p.id === value) || plans[0])}
          >
            <div className="grid gap-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label
                    htmlFor={plan.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${plan.price[billingCycle]}/{billingCycle === "monthly" ? "mo" : "yr"}
                        </p>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Label>
                </motion.div>
              ))}
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <div className="relative">
                <Input
                  id="card"
                  placeholder="4242 4242 4242 4242"
                  className="pl-10"
                />
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleSubscribe}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Subscribe - $${selectedPlan.price[billingCycle]}/${
                billingCycle === "monthly" ? "mo" : "yr"
              }`
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By subscribing, you agree to our terms and conditions. You can cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}