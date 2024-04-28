"use client";
import { UserInfo } from "firebase/auth";
import { createContext, Dispatch, ReactNode, useContext, useState } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";
import { auth } from "@/_firebase/config";
export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserInfo|undefined ;
  setUser: Dispatch<UserInfo>;
  Authenticate: (email: string, password: string) => Promise<void>;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserInfo>();
    const router = useRouter()
  async function Authenticate(email: string, password: string) {
    

    try {
      const userCredentials = await auth.signInWithEmailAndPassword (
        email,
        password
      );
      if(userCredentials.user){
        Cookie.set('uid', userCredentials.user.uid)
        setUser(userCredentials.user);
        router.push("/home")
      }
      
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