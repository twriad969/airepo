'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, SendHorizontal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PaymentCard } from '@/components/ui/payment-card';
import { toast } from 'sonner';
import { fetchPaymentMessage } from '@/lib/api';
import type { PaymentResponse } from '@/lib/types';

const formSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});

export function PaymentForm() {
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // Fetch the enhanced message directly
      const enhancedMessage = await fetchPaymentMessage(values.message);

      // Assuming the response is a string, set it in response state
      setResponse({ message: enhancedMessage } as PaymentResponse);

      toast.success('Payment message received successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to fetch payment message');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto space-y-8"
    >
      <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Shield className="h-4 w-4" />
              <span>End-to-end encrypted messaging</span>
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your payment message..."
                      {...field}
                      disabled={isLoading}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full group">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Send Message
                  <SendHorizontal className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <AnimatePresence mode="wait">
        {response && <PaymentCard data={response} />}
      </AnimatePresence>
    </motion.div>
  );
}
