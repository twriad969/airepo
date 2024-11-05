import { auth, db } from './firebase';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';

export async function enhancePromptPro(prompt: string): Promise<string> {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('Authentication required for Pro model');
  }

  // Check user's remaining requests
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  if (!userData) {
    // Initialize new user
    await setDoc(userRef, {
      email: user.email,
      requestsRemaining: 10,
      isPro: false
    });
  } else if (userData.requestsRemaining <= 0 && !userData.isPro) {
    throw new Error('Trial requests exhausted. Please upgrade to Pro.');
  }

  // Make the API call
  const response = await fetch(
    `https://m3u8.ronok.workers.dev/?message=${encodeURIComponent(prompt)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to enhance prompt with Pro model');
  }

  // Decrement remaining requests if not a pro user
  if (!userData?.isPro) {
    await setDoc(userRef, {
      requestsRemaining: increment(-1)
    }, { merge: true });
  }

  const data = await response.text();
  return data;
}