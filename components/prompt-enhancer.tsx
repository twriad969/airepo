"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Loader2, Zap, Brain, Cpu, Check, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { enhancePrompt } from "@/lib/api";
import { enhancePromptPro } from "@/lib/pro";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const modelInfo = {
  free: {
    name: "PH Basic",
    icon: Brain,
    features: [
      "Basic context understanding",
      "Standard response time",
      "Good for simple enhancements",
      "100 requests per month"
    ]
  },
  pro: {
    name: "PH1 Pro",
    icon: Cpu,
    features: [
      "Advanced context analysis",
      "Priority processing",
      "Complex prompt optimization",
      "Unlimited requests",
      "Custom instructions support",
      "Enhanced creativity options"
    ]
  }
};

const LOCAL_STORAGE_KEY = "promptEnhancer.model";

export function PromptEnhancer() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [model, setModel] = useState("free");
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  // Load saved model preference from localStorage on component mount
  useEffect(() => {
    try {
      const savedModel = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedModel && (savedModel === "free" || savedModel === "pro")) {
        setModel(savedModel);
      }
    } catch (error) {
      console.error("Failed to load model preference:", error);
    }
  }, []);

  // Save model preference to localStorage whenever it changes
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newModel);
    } catch (error) {
      console.error("Failed to save model preference:", error);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to enhance");
      return;
    }

    try {
      setIsEnhancing(true);
      
      if (model === "pro") {
        if (!auth.currentUser) {
          router.push("/signup?redirect=pro");
          return;
        }
        const enhanced = await enhancePromptPro(prompt);
        setEnhancedPrompt(enhanced);
      } else {
        const enhanced = await enhancePrompt(prompt);
        setEnhancedPrompt(enhanced);
      }
      
      toast.success("Prompt enhanced successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const selectedModel = modelInfo[model as keyof typeof modelInfo];
  const ModelIcon = selectedModel.icon;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="space-y-8"
      >
        <div className="rounded-xl border bg-background/50 backdrop-blur-sm p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Select value={model} onValueChange={handleModelChange}>
                    <SelectTrigger className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <ModelIcon className="h-4 w-4" />
                        <SelectValue placeholder="Select model" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          PH Basic
                        </div>
                      </SelectItem>
                      <SelectItem value="pro">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-yellow-500" />
                          PH1 Pro
                          <Zap className="h-3 w-3 text-yellow-500" />
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ModelIcon className="h-5 w-5 text-primary" />
                      <h4 className="text-sm font-semibold">{selectedModel.name}</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedModel.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <Textarea
                placeholder="Enter your prompt here..."
                className="min-h-[150px] resize-none bg-background/50 backdrop-blur-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isEnhancing}
              />
              <div className="absolute bottom-3 right-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-pink-500/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                  <Button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="relative group-hover:text-white dark:group-hover:text-white"
                    size="sm"
                  >
                    {isEnhancing ? (
                      <motion.div
                        className="flex items-center"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enhancing...
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        Enhance
                        <Wand2 className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                      </motion.div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {enhancedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="rounded-xl border bg-primary/5 backdrop-blur-sm p-6 shadow-lg"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary/60" />
                  <h3 className="font-semibold text-primary/80">Enhanced Prompt</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                >
                  {isCopied ? (
                    <CheckCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="prose prose-sm dark:prose-invert max-w-none"
              >
                <p className="whitespace-pre-wrap text-primary">{enhancedPrompt}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}