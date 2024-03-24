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

import { app, firebaseConfig } from "../../firebase";
export type UserContextType = {
  user: {
    name: string;
    email: string;
    major: string;
    year: string;
    userID: string;
    avatar: string;
    academic: boolean;
    career: boolean;
    financial: boolean;
    studentLife: boolean;
    bio: string;
    openTo: string;
    lookingFor: string;
    askMeAbout: string;
  };
  setUser: (user: {
    name: string;
    email: string;
    major: string;
    year: string;
    userID: string;
    avatar: string;
    academic: boolean;
    career: boolean;
    financial: boolean;
    studentLife: boolean;
    bio : string;
    openTo: string;
    lookingFor: string;
    askMeAbout: string;
  }) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = getAuth();

  const db = getFirestore();

  const [user, setUser] = useState({
    name: "",
    email: "",
    major: "",
    year: "",
    userID: "",
    avatar: "",
    academic: false,
    career: false,
    financial: false,
    studentLife: false,
    bio: "",
    openTo: "",
    lookingFor: "",
    askMeAbout: "",
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
          major: string;
          year: string;
          userID: string;
          academic: boolean;
          career: boolean;
          avatar: string;
          financial: boolean;
          studentLife: boolean;
          bio: string;
          openTo: string;
          lookingFor: string;
          askMeAbout: string;
        };

        setUser(userData);
      } else {
        //console.error("User is not signed in");
        setUser({
          name: "",
          email: "",
          major: "",
          year: "",
          userID: "",
          avatar: "",
          academic: false,
          career: false,
          financial: false,
          studentLife: false,
          bio: "",
          openTo: "",
          lookingFor: "",
          askMeAbout: "",
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

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContext, UserProvider, useUser };
