"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Code2, Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const features = [
  {
    icon: Sparkles,
    title: "Smart Enhancement",
    description: "AI-powered analysis improves your prompts for better results"
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Get enhanced prompts in seconds with our optimized system"
  },
  {
    icon: Star,
    title: "Premium Features",
    description: "Access advanced capabilities with our Pro subscription"
  }
];

export default function DocsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container max-w-6xl mx-auto py-16 px-4 space-y-16">
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to enhance your prompts and get the most out of our AI-powered tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader>
                <feature.icon className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Getting Started</h2>
              <div className="prose prose-neutral dark:prose-invert">
                <p>
                  Welcome to our comprehensive documentation. This guide will help you master our AI-powered prompt enhancement tool and unlock its full potential.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Basic Usage</h2>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</span>
                      <div>
                        <h3 className="font-semibold mb-1">Enter Your Prompt</h3>
                        <p className="text-muted-foreground">Type or paste your initial prompt in the text area</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</span>
                      <div>
                        <h3 className="font-semibold mb-1">Click Enhance</h3>
                        <p className="text-muted-foreground">Let our AI analyze and improve your prompt</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</span>
                      <div>
                        <h3 className="font-semibold mb-1">Get Results</h3>
                        <p className="text-muted-foreground">Review and use your enhanced prompt</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Pro Features</h2>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Advanced context analysis for better understanding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Priority processing with faster response times</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Unlimited requests without monthly caps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Premium support with dedicated assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/10 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  API Reference
                </CardTitle>
                <CardDescription>
                  Coming soon: Integrate directly with your applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Documentation Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}