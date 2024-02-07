// LikeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useUser } from "./UserContext";

// Represents the shape of the context value
export type Like = {
  postID: string;
  user: string;
  userID: string;
};

interface LikeContextValue {
  likeArr: Like[];
  setLikeArr: React.Dispatch<React.SetStateAction<Like[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikeContext = createContext<LikeContextValue | undefined>({
  likeArr: [],
  setLikeArr: () => {},
  loading: true,
  setLoading: () => {},
});

const LikeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const db = getFirestore();

  // Check if Firebase app is not initialized
  if (getApps().length === 0) {
    console.log("likecontext no firebase");
  }

  const [likeArr, setLikeArr] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your logic to fetch and update likeArr from Firestore
    // ...

    setLoading(false); // Set loading to false when data fetching is complete
  }, []); // Empty dependency array means this effect runs only once on component mount

  const contextValue: LikeContextValue = {
    likeArr,
    setLikeArr,
    loading,
    setLoading,
  };

  return (
    <LikeContext.Provider value={contextValue}>{children}</LikeContext.Provider>
  );
};

const useLikeContext = (): LikeContextValue => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLikeContext must be used within a LikeProvider");
  }
  return context;
};

export { useLikeContext, LikeContext, LikeProvider };
