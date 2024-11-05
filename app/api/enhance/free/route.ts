import { NextResponse } from 'next/server';

const DEMO_DELAY = 800; // Simulate API processing time

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, DEMO_DELAY));

    // Basic enhancement logic for free tier
    const enhanced = prompt
      .trim()
      .replace(/\b\w/g, (l: string) => l.toUpperCase()) // Capitalize first letter of each word
      + "\n\nPlease provide:\n- Detailed descriptions\n- Specific requirements\n- Expected outcomes";

    return NextResponse.json({ result: enhanced });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to enhance prompt' },
      { status: 500 }
    );
  }
}
