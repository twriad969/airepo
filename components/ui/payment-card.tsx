"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PaymentResponse } from "@/lib/types";

interface PaymentCardProps {
  data: PaymentResponse;
}

export function PaymentCard({ data }: PaymentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden backdrop-blur-sm bg-background/50">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Payment Message</h3>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {format(new Date(data.timestamp), "MMM d, yyyy HH:mm")}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-foreground">{data.message}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}