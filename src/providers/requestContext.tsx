"use client";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {  db } from "@/_firebase/config";
import { RequestProps } from "@/entities/request";

export const RequestContext = createContext({} as AuthContextProps);

interface RequestContextProvider {
  children: ReactNode;
}

interface AuthContextProps {
  requests: RequestProps[];
  setRequests: Dispatch<RequestProps[]>
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>
 }

export function RequestContextProvider({ children }: RequestContextProvider) {
const router = useRouter()
const [requests, setRequests] = useState<RequestProps[]>([]as RequestProps[])
const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = db.collection("requests").onSnapshot((querySnaphot) => {
      let requests: RequestProps[] = [];
      querySnaphot.forEach((doc) => {
        requests.push({
          ...doc.data(),
          id: String(doc.id),
        } as RequestProps);
      });
      setRequests(requests);
      setIsLoading(false)
    });
    return () => unsubscribe();
  }, []);

  return (
    <RequestContext.Provider value={{ requests, setRequests, isLoading, setIsLoading}}>
      {children}
    </RequestContext.Provider>
  );
}


export const useRequest = ()=>{
    return useContext(RequestContext)
}