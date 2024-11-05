"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserData {
  isPro: boolean;
  requestsRemaining: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    let unsubDoc: (() => void) | undefined;

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      unsubDoc = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data() as UserData);
        }
      });
    } else {
      setUserData(null);
    }

    return () => {
      if (unsubDoc) unsubDoc();
    };
  }, [user]);

  return { user, userData, loading };
}