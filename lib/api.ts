// lib/api.ts

const API_BASE_URL = 'https://ronok.adaptable.app';
const API_TIMEOUT = 10000; // 10 seconds

interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

// Enhanced error handling and request validation
export async function enhancePrompt(prompt: string): Promise<string> {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt format');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(
      `${API_BASE_URL}/enhance?prompt=${encodeURIComponent(prompt.trim())}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
        },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    
    if (!data) {
      throw new Error('Empty response from server');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
}

// Maintain compatibility
export const fetchPaymentMessage = enhancePrompt;