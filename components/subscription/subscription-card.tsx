"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SubscriptionModal } from "./subscription-modal";

interface SubscriptionCardProps {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  popular?: boolean;
}

export function SubscriptionCard({
  title,
  price,
  description,
  features,
  popular,
}: SubscriptionCardProps) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative rounded-xl border bg-card p-8 shadow-lg transition-shadow hover:shadow-xl",
          popular && "border-primary"
        )}
      >
        {popular && (
          <div className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full text-xs text-primary-foreground">
            Popular
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${price.monthly}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>

          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <Button
            className={cn(
              "w-full",
              popular && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => setShowModal(true)}
          >
            {popular ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Upgrade Now
              </span>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </motion.div>

      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}