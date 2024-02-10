import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../firebase";

type AuthContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  if (getApps() == null) {
    const app = initializeApp(firebaseConfig);
  }
  const auth = getAuth();

  const [isLoggedIn, setLoggedIn] = useState(false); // Initialize the state with false

  useEffect(() => {
    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setLoggedIn(true);
        console.log("User is Signed In");
      } else {
        // User is signed out
        setLoggedIn(false); // Make sure to set it to false when the user signs out
        console.log("User is signed out");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Ensure this effect runs only once when the component mounts

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
