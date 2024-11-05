"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  variant?: "default" | "outline";
  popular?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  variant = "default",
  popular,
}: PricingCardProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push("/payment");
  };

  return (
    <div
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

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full",
          popular && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}