"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authContext";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { SignIn } = useAuth();

  async function HandleCreateUserWithEmailAndPassword() {
    setIsLoading(true);
    await SignIn(email, password);
    setIsLoading(false);
  }

  return (
    <main className="flex h-[100vh] items-start justify-center relative">
      <div className="w-auto h-auto flex flex-col items-center justify-center mt-32">
       <Image
          src="/logo.svg"
          width={70}
          height={21}
          alt="midiaboard"
          className="w-[70%]"
        />
        <h2 className="text-zinc-400">
        Sua forma prática de organizar tarefas através de cards <span className="text-primary font-bold">kanban</span>! 

        </h2>
        <div className="flex flex-col items-center w-full mt-8 text-primary">
          <input
            type="text"
            placeholder="Email"
            defaultValue=""
            onChange={(e) => setEmail(e.target.value)}
            className="p-6 w-[90%] border-primary bg-white border-[1px] text-lg rounded-[10px] h-[40px] outline-none mb-4 placeholder:text-primary"
          ></input>
          <input
            placeholder="Senha"
            defaultValue={""}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="p-6 w-[90%]  border-primary bg-white border-[1px] text-lg rounded-[10px] h-[40px] outline-none placeholder:text-primary"
          ></input>
           <Link href="/" className="text-primary text-xs mt-4">Já possui conta? Clique aqui</Link>
        </div>
        <Button className="w-[90%] mt-10" onClick={HandleCreateUserWithEmailAndPassword}>
          {!isLoading ? (
            "CRIAR CONTA"
          ) : (
            <LoaderCircle size={20} className="animate-spin text-white" />
          )}
        </Button>
      </div>
    </main>
  );
}
