"use client";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-[100vh] items-center justify-center">
      <Card className="flex flex-col w-[325px] h-[400px] items-center p-4 border-none shadow-lg rounded-[4px]">
        <Image
          src="/logo.svg"
          width={100}
          height={21}
          alt="midiaboard"
          className="w-[90%] mb-[3rem] mt-[2rem]"
        />
        <div className="flex flex-col items-start w-full">
          <label className="text-primary font-medium text-sm">Email</label>
          <input
            type="text"
            placeholder="Email"
            defaultValue=""
            className="text-sm p-4 w-full border-primary bg-white border-[1px]  rounded-[4px] h-[40px] outline-none mb-4"
          ></input>
          <label className="text-primary font-medium text-sm">Senha</label>
          <input
            placeholder="Senha"
            defaultValue={""}
            type="password"
            className="text-sm p-4 w-full border-primary bg-white border-[1px]  rounded-[4px] h-[40px] outline-none"
          ></input>
          <Link href="/received-password" className="text-sm text-primary ml-auto py-4">Recuperar senha</Link>
        </div>
          <Button className="w-full mt-auto">
            ENTRAR
          </Button>
      </Card>
    </main>
  );
}
