import { Sparkles, Zap, Clock, Shield, Star, Cpu } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MovingGradient } from "@/components/ui/moving-gradient";

const features = [
  {
    icon: Cpu,
    title: "Advanced AI",
    description: "State-of-the-art AI models for superior prompt enhancement."
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Get instant results with our lightning-fast processing."
  },
  {
    icon: Shield,
    title: "Context Awareness",
    description: "Intelligent understanding of context for better results."
  },
  {
    icon: Star,
    title: "Premium Features",
    description: "Access to advanced features and priority processing."
  },
  {
    icon: Zap,
    title: "Unlimited Access",
    description: "No limits on requests with our Pro plan."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for your data and prompts."
  }
];

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <GridPattern />
      <MovingGradient />
      
      <div className="relative z-10 container max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-primary/80" />
            <span className="text-sm font-medium text-primary/80">Powerful Features</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Everything You Need
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover all the powerful features that make our prompt enhancement tool stand out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border bg-background/50 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <feature.icon className="h-8 w-8 text-primary/80 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}