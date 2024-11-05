"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
}

export function CardPreview({
  cardNumber,
  cardholderName,
  expiryMonth,
  expiryYear,
}: CardPreviewProps) {
  return (
    <div className="relative w-full aspect-[1.586/1] max-w-[400px] mx-auto">
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl p-6",
          "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
          "shadow-xl backdrop-blur-sm",
          "border border-white/10"
        )}
        initial={false}
        animate={{
          rotateY: 0,
          transition: { duration: 0.6 }
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-8 rounded bg-gradient-to-br from-yellow-400 to-yellow-200 opacity-80" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-white/60"
              >
                Credit Card
              </motion.div>
            </div>

            <motion.div
              className="pt-4 text-2xl tracking-[0.2em] text-white font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {cardNumber || "•••• •••• •••• ••••"}
            </motion.div>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <div className="text-xs text-white/60">Card Holder</div>
              <motion.div
                className="font-medium text-white tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {cardholderName || "YOUR NAME"}
              </motion.div>
            </div>

            <div className="text-right space-y-0.5">
              <div className="text-xs text-white/60">Expires</div>
              <motion.div
                className="font-medium text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {expiryMonth || "MM"}/{expiryYear || "YY"}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}