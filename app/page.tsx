import { GridPattern } from "@/components/ui/grid-pattern";
import { MovingGradient } from "@/components/ui/moving-gradient";
import { PromptEnhancer } from "@/components/prompt-enhancer";
import { ModelComparison } from "@/components/model-comparison";
import { Sparkles } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <GridPattern />
      <MovingGradient />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Spotlight className="max-w-4xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-primary/80" />
            <span className="text-sm font-medium text-primary/80">AI-Powered</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Prompt Enhancer
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Transform your basic prompts into powerful, context-rich instructions.
            Enhance your AI interactions with our advanced prompt engineering tool.
          </p>
        </Spotlight>

        <PromptEnhancer />
        <ModelComparison />
      </div>
    </div>
  );
}