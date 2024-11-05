export interface PaymentResponse {
  message: string;
  status: number;
  timestamp: string;
}

export interface PaymentFormData {
  message: string;
}

export interface EnhancementHistory {
  userId: string;
  prompt: string;
  enhanced: string;
  model: 'free' | 'pro';
  timestamp: string;
  metadata?: {
    processingTime?: number;
    modelVersion?: string;
    promptTokens?: number;
    completionTokens?: number;
  };
}

export interface UserProfile {
  username: string;
  email: string;
  createdAt: string;
  requestsRemaining: number;
  isPro: boolean;
  enhancementHistory: EnhancementHistory[];
  lastEnhancement?: string;
  preferences?: {
    defaultModel: 'free' | 'pro';
    notifications: boolean;
    theme?: 'light' | 'dark' | 'system';
  };
}

export interface ModelComparison {
  name: string;
  features: string[];
  sample: string;
  pricing?: {
    amount: number;
    currency: string;
    period: string;
  };
}