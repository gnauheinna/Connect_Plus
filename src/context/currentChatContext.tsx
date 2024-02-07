import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import { useContext } from "react";

type CurrentChatContextType = {
  currentChatID: string;
  setCurrentChatID: (value: string) => void;
  currentChatName: string;
  setCurrentChatName: (value: string) => void;
  currentChatUserID: string;
  setCurrentChatUserID: (value: string) => void;
  currentChatAvatar: string;
  setCurrentChatAvatar: (value: string) => void;
};

export const CurrentChatContext = createContext<CurrentChatContextType>({
  currentChatID: "",
  setCurrentChatID: () => {},
  currentChatName: "",
  setCurrentChatName: () => {},
  currentChatUserID: "",
  setCurrentChatUserID: () => {},
  currentChatAvatar: "",
  setCurrentChatAvatar: () => {},
});

export const CurrentChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  if (getApps().length === 0) {
    console.log("currentchatcontext no firebase");
  }

  const [currentChatID, setCurrentChatID] = useState(""); // Initialize the state with empty
  const [currentChatName, setCurrentChatName] = useState("");
  const [currentChatUserID, setCurrentChatUserID] = useState("");
  const [currentChatAvatar, setCurrentChatAvatar] = useState("");
  return (
    <CurrentChatContext.Provider
      value={{
        currentChatID,
        setCurrentChatID,
        currentChatName,
        setCurrentChatName,
        currentChatUserID,
        setCurrentChatUserID,
        currentChatAvatar,
        setCurrentChatAvatar,
      }}
    >
      {children}
    </CurrentChatContext.Provider>
  );
};

export const useCurrentChat = (): CurrentChatContextType => {
  const context = useContext(CurrentChatContext);
  if (context === undefined) {
    throw new Error("useCurrentChat must be used within a CurrentChatProvider");
  }
  return context;
};
