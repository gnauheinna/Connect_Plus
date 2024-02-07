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
} from "firebase/firestore";

// Represents the shape of the context value
export type Post = {
  userID: string;
  title: string;
  content: string;
  postID: string;
  tag: string;
  major: string;
  timestamp: Timestamp;
  userName: string;
  avatar: string;
  likesCount: number;
};

interface PostContextValue {
  posts: Post[];
  setPosts: (value: Post[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const PostContext = createContext<PostContextValue | undefined>(undefined);
const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const db = getFirestore();
  if (getApps().length === 0) {
    console.log("post no firebase");
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollection);
        const postData: Post[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            // validatePostData is a function you'd need to implement
            postData.push(data as Post);
          }
        });
        postData.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );
        setPosts(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, setLoading, loading }}>
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

export { usePostContext, PostContext, PostProvider };
