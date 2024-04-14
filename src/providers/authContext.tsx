"use client";
import { auth } from "@/_firebase/config";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { createContext, Dispatch, ReactNode, useContext, useState } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";
export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null | undefined;
  setUser: Dispatch<User | null | undefined>;
  Authenticate: (email: string, password: string) => Promise<void>;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>();
    const router = useRouter()
  async function Authenticate(email: string, password: string) {
    

    try {
      const userCredentials = await signInWithEmailAndPassword (
        auth,
        email,
        password
      );
      Cookie.set('uid', userCredentials.user.uid)
      setUser(userCredentials.user);
      router.push("/home")
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, Authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = ()=>{
    return useContext(AuthContext)
}