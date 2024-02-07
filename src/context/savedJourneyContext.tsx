// postContext.js
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
export type Journey = {
  journeyID: string;
  journeyTitle: string;
  authorName: string;
  Intro: string;
};

interface SavedJourneyContextValue {
  savedJourneys: Journey[];
  setSavedJourneys: (value: Journey[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const SavedJourneyContext = createContext<SavedJourneyContextValue | undefined>(
  undefined
);
const SavedJourneyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const db = getFirestore();
  if (getApps().length === 0) {
    console.log("saveJourneycontext no firebase");
  }
  const [savedJourneys, setSavedJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <SavedJourneyContext.Provider
      value={{ savedJourneys, setSavedJourneys, setLoading, loading }}
    >
      {children}
    </SavedJourneyContext.Provider>
  );
};

const useSavedJourneyContext = () => {
  const context = useContext(SavedJourneyContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

export { useSavedJourneyContext, SavedJourneyContext, SavedJourneyProvider };
