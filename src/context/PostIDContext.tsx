import React, { createContext, useState, useContext, ReactNode } from "react";

type PostIDContextType = {
  curPostID: string;
  setCurPostID: (value: string) => void;
};
// Create the context
export const PostIdContext = createContext<PostIDContextType>({
  curPostID: "",
  setCurPostID: () => {},
});

// Create the provider component
export const PostIdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [curPostID, setCurPostID] = useState("");

  return (
    <PostIdContext.Provider value={{ curPostID, setCurPostID }}>
      {children}
    </PostIdContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const usePostIdContext = () => {
  const context = useContext(PostIdContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
