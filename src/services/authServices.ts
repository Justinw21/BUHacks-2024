// src/services/authService.ts

import { db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = async (email: string, password: string, name:string ): Promise<User | null> => {
  try {
    console.log(name, password, email)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    const userData = {
      name: name, 
      email: user.email,
    };
    const userHistoryRef = doc(db, 'users', user.uid, 'history', 'emptyHistory'); 
    await setDoc(userHistoryRef, { });

    const userFriendsRef = doc(db, 'users', user.uid, 'friends', 'emptyfriends');
    await setDoc(userFriendsRef, { });

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, userData, { merge: true });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

export const signIn = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
