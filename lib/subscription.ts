import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export interface Subscription {
  plan: string;
  status: 'active' | 'canceled' | 'expired';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    
    const data = userDoc.data();
    return data.subscription || null;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export async function updateSubscription(
  userId: string,
  subscription: Partial<Subscription>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      subscription: subscription,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'subscription.cancelAtPeriodEnd': true,
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

export async function reactivateSubscription(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'subscription.cancelAtPeriodEnd': false,
    });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    throw error;
  }
}