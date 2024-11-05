import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MovingGradient } from "@/components/ui/moving-gradient";
import { PricingCard } from "@/components/pricing-card";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <GridPattern />
      <MovingGradient />
      
      <div className="relative z-10 container max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-primary/80" />
            <span className="text-sm font-medium text-primary/80">Simple Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get started with our free plan or upgrade to Pro for advanced features and unlimited access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for getting started"
            features={[
              "Basic prompt enhancement",
              "100 requests per month",
              "Standard processing",
              "Community support"
            ]}
            buttonText="Get Started"
            variant="outline"
          />

          <PricingCard
            title="Pro"
            price="$5"
            period="/month"
            description="For power users"
            features={[
              "Advanced prompt enhancement",
              "Unlimited requests",
              "Priority processing",
              "Premium support",
              "Early access to features"
            ]}
            buttonText="Upgrade to Pro"
            variant="default"
            popular={true}
          />
        </div>
      </div>
    </div>
  );
}