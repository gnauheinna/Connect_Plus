import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
// always import app and firebaseConfig so we can use firebase
import { app, firebaseConfig } from "../../firebase";

// STEP 1: define types for the context
export type UserContextType = {
  user: {
    name: string;
    email: string;
    handle: string;
    major: string;
    year: string;
    userID: string;
    avatar: string;
    academic: boolean;
    career: boolean;
    financial: boolean;
    studentLife: boolean;
    calendly: string;
  };
  setUser: (user: {
    name: string;
    email: string;
    handle: string;
    major: string;
    year: string;
    userID: string;
    avatar: string;
    academic: boolean;
    career: boolean;
    financial: boolean;
    studentLife: boolean;
    calendly: string;
  }) => void;
};

// STEP 2: define the user context as follows
const UserContext = createContext<UserContextType | undefined>(undefined);

// STEP 3: define userProvider (class)
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = getAuth();

  const db = getFirestore();

  const [user, setUser] = useState({
    name: "",
    email: "",
    handle: "",
    major: "",
    year: "",
    userID: "",
    avatar: "",
    calendly: "",
    academic: false,
    career: false,
    financial: false,
    studentLife: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (Currentuser) => {
      if (Currentuser) {
        const userID = Currentuser.uid;
        const usersCollection = collection(db, "users");
        const userInfo = await getDoc(doc(db, "users", userID));
        const userData = userInfo.data() as {
          name: string;
          email: string;
          handle: string;
          major: string;
          year: string;
          userID: string;
          academic: boolean;
          career: boolean;
          avatar: string;
          financial: boolean;
          studentLife: boolean;
          calendly: string;
        };

        setUser(userData);
      } else {
        //console.error("User is not signed in");
        setUser({
          name: "",
          email: "",
          handle: "",
          major: "",
          year: "",
          userID: "",
          avatar: "",
          calendly: "",
          academic: false,
          career: false,
          financial: false,
          studentLife: false,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth.currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// helper function to easily access user
const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContext, UserProvider, useUser };
