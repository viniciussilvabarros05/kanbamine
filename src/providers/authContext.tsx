"use client";
import { UserInfo } from "firebase/auth";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";
import { LoginAuthenticate } from "@/_actions/login";
import { auth } from "@/_firebase/config";
export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

type User = {
  email:string;
  uid:string
}
interface AuthContextProps {
  user: User |null | undefined;
  setUser: Dispatch<User|null|undefined>;
  Authenticate: (email: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User| null|undefined>();
  const router = useRouter()
  async function Authenticate(email: string, password: string) {
    

    try {
      const userCredentials = await LoginAuthenticate(
        email,
        password
      );

      if(userCredentials){
        const {uid, email} = userCredentials
        Cookie.set('uid', userCredentials.uid)
        Cookie.set('email', userCredentials.email!)
        setUser({email: email!, uid});
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
  useEffect(()=>{
    const email = Cookie.get('email')
    const uid = Cookie.get('uid')
    if(uid != null && email != null){
      setUser({uid,email})
    }
  },[])

  return (
    <AuthContext.Provider value={{ user, setUser, Authenticate, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = ()=>{
  return useContext(AuthContext)
}