"use client";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ModelDialogContent from "../home/_components/modelDialogContent";

const Login = () => {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <Card className="w-[50%] m-auto flex flex-col items-center p-4">
        <Image
          src="/logo.svg"
          width={137}
          height={21}
          alt="midiaboard"
          className="w-[50%] mb-4"
        />
        <Separator className="bg-gray-300 mb-4"/>
        <div className="flex flex-row w-full">
          <div className="flex flex-col flex-[1] w-full">
            <label className="text-primary text-[0.8rem]">Nome do Evento</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2"></input>

            <label className="text-primary text-[0.8rem]">Data do Evento</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2"></input>

            <label className="text-primary text-[0.8rem]">Horário</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2"></input>

            <label className="text-primary text-[0.8rem]">Objetivo</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2"></input>

            <label className="text-primary text-[0.8rem]">Tema</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2"></input>

            <label className="text-primary text-[0.8rem]">
              Descrição do Evento
            </label>
            <textarea className="border border-primary rounded-sm px-2 py-1 mb-2 max-h-[120px]"></textarea>
          </div>
          <div className="flex flex-row flex-[1] gap-[4rem]"></div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
