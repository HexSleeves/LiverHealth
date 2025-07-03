import React, { createContext, useContext, useEffect, useState } from "react";
import { useCreateOrUpdateUser, useUser } from "~/hooks/useConvex";
import type { Id, Doc } from "~/convex/_generated/dataModel";

interface UserContextType {
  userId?: Id<"users">;
  user?: Doc<"users"> | null;
  isLoading: boolean;
  error?: string;
  signIn: (userData: { clerkId: string; email: string }) => Promise<void>;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<Id<"users"> | undefined>(undefined);
  const [clerkId, setClerkId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const createOrUpdateUser = useCreateOrUpdateUser();
  const user = useUser(clerkId || "");

  const signIn = async (userData: { clerkId: string; email: string }) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setClerkId(userData.clerkId);

      const newUserId = await createOrUpdateUser({
        clerkId: userData.clerkId,
        email: userData.email,
        name: "Demo User",
      });
      setUserId(newUserId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign in";
      console.error("Error signing in:", error);
      setError(errorMessage);
      throw error; // Re-throw to allow component-level error handling
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUserId(undefined);
    setClerkId(undefined);
    setError(undefined);
  };

  // Update userId when user data is loaded
  useEffect(() => {
    if (user?._id) {
      setUserId(user._id);
    }
  }, [user]);

  const value: UserContextType = {
    userId,
    user,
    isLoading,
    error,
    signIn,
    signOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
