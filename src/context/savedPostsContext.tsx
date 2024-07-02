// LikeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getApps } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useUser } from "./UserContext";

// Represents the shape of the context value
export type SavedPost = {
  postID: string;
};

interface SavedPostsContextValue {
  savedPostArr: SavedPost[];
  setSavedPostArr: React.Dispatch<React.SetStateAction<SavedPost[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavedPostsContext = createContext<SavedPostsContextValue | undefined>({
  savedPostArr: [],
  setSavedPostArr: () => {},
  loading: true,
  setLoading: () => {},
});

const SavedPostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const db = getFirestore();
  const auth = getAuth();

  // Check if Firebase app is not initialized
  if (getApps().length === 0) {
    console.log("savedPosts no firebase");
  }

  const [savedPostArr, setSavedPostArr] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false when data fetching is complete
  }, [auth.currentUser]);

  const contextValue: SavedPostsContextValue = {
    savedPostArr,
    setSavedPostArr,
    loading,
    setLoading,
  };

  return (
    <SavedPostsContext.Provider value={contextValue}>
      {children}
    </SavedPostsContext.Provider>
  );
};

const useSavedPostsContext = (): SavedPostsContextValue => {
  const context = useContext(SavedPostsContext);
  if (!context) {
    throw new Error(
      "useSavedPostsContext must be used within a SavedPostsProvider"
    );
  }
  return context;
};

const fetchSavedPosts = async (userID?: string) => {
  const db = getFirestore();
  let uid;
  if (userID) {
    uid = userID;
    console.log("test2", uid);
  } else {
    const { user } = useUser();
    uid = user.userID;
    console.log("test3", uid);
  }
  const { setSavedPostArr } = useSavedPostsContext();
  let savedPosts = await getDoc(doc(db, "userSavedANS", uid));
  console.log("test4", savedPosts);
  setSavedPostArr(
    savedPosts.data()["saved"].map((pid: string) => {
      let post: SavedPost = {
        postID: pid,
      };
      return post;
    })
  );
  console.log("test5");
};

export {
  useSavedPostsContext,
  fetchSavedPosts,
  SavedPostsContext,
  SavedPostsProvider,
};
