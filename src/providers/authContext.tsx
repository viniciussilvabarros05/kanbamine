"use client";
import { UserInfo } from "firebase/auth";
import { createContext, Dispatch, ReactNode, useContext, useState } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";
import { LoginAuthenticate } from "@/_actions/login";
import { auth } from "@/_firebase/config";
export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserInfo|null | undefined;
  setUser: Dispatch<UserInfo|null|undefined>;
  Authenticate: (email: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserInfo| null|undefined>();
    const router = useRouter()
  async function Authenticate(email: string, password: string) {
    

    try {
      const userCredentials = await LoginAuthenticate(
        email,
        password
      );
      if(userCredentials){
        Cookie.set('uid', userCredentials.uid)
        setUser(userCredentials);
        router.push("/home")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  async function SignOut() {
    

    try {
      await auth.signOut()
      Cookie.remove('uid')
      setUser(null);
      router.push("/")
            
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, Authenticate, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = ()=>{
    return useContext(AuthContext)
}