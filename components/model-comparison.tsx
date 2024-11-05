"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const demoPrompt = "Create a landing page for a SaaS product";

const models = {
  free: {
    name: "PH Basic",
    icon: Brain,
    color: "text-blue-500",
    features: [
      "Basic context understanding",
      "Standard response time",
      "Good for simple enhancements",
      "1k requests per month",
      "Community support"
    ],
    sample: `Enhanced with PH Basic:

Create a landing page for a SaaS product that:
- Highlights key features
- Shows pricing plans
- Includes customer testimonials
- Has a clear call-to-action
- Is mobile responsive`
  },
  pro: {
    name: "PH1 Pro",
    icon: Cpu,
    color: "text-yellow-500",
    features: [
      "Advanced context analysis",
      "Priority processing",
      "Complex prompt optimization",
      "Unlimited requests",
      "Premium support",
      "50 Free requests"
    ],
    sample: `Enhanced with PH1 Pro:

Create a landing page for a SaaS product with:

1. Strategic Layout:
   - Hero section with value proposition
   - Feature grid with micro-interactions
   - Social proof section with metrics
   - Interactive pricing calculator
   - Multi-step conversion funnel

2. UX Optimization:
   - Progressive disclosure of features
   - Contextual tooltips
   - Scroll-triggered animations
   - Smart form validation
   - Personalized CTAs

3. Technical Requirements:
   - Next.js 13 with App Router
   - Tailwind CSS for styling
   - TypeScript for type safety
   - Optimized Core Web Vitals
   - Analytics integration

4. Conversion Elements:
   - A/B testing ready
   - Heat map tracking
   - User session recording
   - Custom event tracking
   - Funnel optimization`
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ModelComparison() {
  const [activeModel, setActiveModel] = useState<"free" | "pro">("free");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModelSwitch = (model: "free" | "pro") => {
    setIsAnimating(true);
    setActiveModel(model);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTryDemo = () => {
    toast.success("Try the prompt enhancer above!");
  };

  const ModelIcon = models[activeModel].icon;

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-12"
        variants={textVariants}
      >
        <h2 className="text-3xl font-bold mb-4">Compare Models</h2>
        <p className="text-muted-foreground">
          Choose the right model for your needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(Object.entries(models) as [keyof typeof models, typeof models[keyof typeof models]][]).map(([key, model]) => (
          <motion.div
            key={key}
            className={`relative rounded-xl border p-6 ${
              activeModel === key ? "border-primary" : "border-border"
            } bg-background/50 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl flex flex-col`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              variants={textVariants}
            >
              <model.icon className={`h-6 w-6 ${model.color}`} />
              <h3 className="text-xl font-semibold">{model.name}</h3>
              {key === "pro" && (
                <span className="flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
                  <Zap className="h-3 w-3" />
                  PRO
                </span>
              )}
            </motion.div>

            <ul className="space-y-3 mb-6 flex-grow">
              {model.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              className="mt-auto pt-4"
              variants={textVariants}
            >
              <Button
                variant={activeModel === key ? "default" : "outline"}
                className="w-full h-10"
                onClick={() => handleModelSwitch(key)}
              >
                View Sample Output
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 rounded-xl border bg-primary/5 backdrop-blur-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          variants={textVariants}
        >
          <div className="flex items-center gap-2">
            <ModelIcon className={`h-5 w-5 ${models[activeModel].color}`} />
            <h4 className="font-semibold">Sample Enhancement</h4>
          </div>
          <ArrowRight className="h-4 w-4" />
          <div className="text-sm text-muted-foreground">{demoPrompt}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0 : 1 }}
          className="prose prose-sm dark:prose-invert max-w-none"
        >
          <pre className="whitespace-pre-wrap bg-transparent border-none p-0">
            {models[activeModel].sample}
          </pre>
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          variants={textVariants}
        >
          <Button 
            onClick={handleTryDemo}
            className="h-10 px-6"
          >
            Try it yourself
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}