import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { addDoc, collection, doc, endAt, getDoc, getDocs, setDoc } from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

const UserAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const registerUser = async (userName, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      const userDoc = doc(db, "users", user.uid);
      const userOnSnapshot = await getDoc(userDoc);

      if (!userOnSnapshot.exists()) {
        const isAdmin = false;
        const isIntructor = false;
        await setDoc(userDoc, {
          userName,
          email,
          isAdmin,
          isIntructor,
          userId: user.uid,
        });
      }

      console.log("Account created successfully");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  }

  const googleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = doc(db, "users", user.uid);
      const userOnSnapshot = await getDoc(userDoc);

      if (!userOnSnapshot.exists()) {
        const isAdmin = false;
        const isIntructor = false;
        await setDoc(userDoc, {
          email: user.email,
          userName: user.displayName,
          userImage: user.photoURL,
          userPhoneNumber: user.phoneNumber,
          isAdmin,
          isIntructor,
          userId: user.uid,
        });
      }
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const facebookSignIn = async () => {
    try {
      const fbProvider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, fbProvider);
      const user = result.user;
      const userDoc = doc(db, "users", user.uid);
      const userOnSnapshot = await getDoc(userDoc);

      if (!userOnSnapshot.exists()) {
        const isAdmin = false;
        const isIntructor = false;
        await setDoc(userDoc, {
          email: user.email,
          userName: user.displayName,
          userImage: user.photoURL,
          userPhoneNumber: user.phoneNumber,
          isAdmin,
          isIntructor,
          userId: user.uid,
        });
      }
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const getUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userRef);

      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
      }
    }
  };

  const context = {
    user,
    isLoading,
    registerUser,
    loginUser,
    resetPassword,
    googleSignIn,
    facebookSignIn,
    signOutUser,
    getUserData,
  };
  return (
    <UserAuthContext.Provider value={context}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
