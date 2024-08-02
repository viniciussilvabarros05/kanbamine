"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User as UserProps } from "@/entities/user";
import { useAuth } from "./authContext";
import { db } from "@/_firebase/config";
export const UserContext = createContext({} as UserContextProps);

interface UserContextProviderProps {
  children: ReactNode;
}

type User = {
  name: string;
  userId: string;
};
interface UserContextProps {
  usersMembers: UserProps[];
}
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [usersMembers, setUsersMembers] = useState<UserProps[]>(
    [] as UserProps[]
  );
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const { uid } = user!;
      const unsubscribe = db
        .collection("users")
        .where("userId", "==", uid)
        .onSnapshot((snapshot) => {
          const listUsers: UserProps[] = [];
          snapshot.forEach((doc) => {
            listUsers.push(doc.data() as UserProps);
          });
          setUsersMembers(listUsers);
        });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ usersMembers }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
