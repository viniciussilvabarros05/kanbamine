"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, CircleX } from "lucide-react";
import Image from "next/image";
import ModelDialogContent from "../home/_components/modelDialogContent";

const Login = () => {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <Card className="w-[60%]  m-auto flex flex-col items-center p-4 max-[600px]:w-full max-[600px]:h-full">
        <Image
          src="/logo.svg"
          width={137}
          height={21}
          alt="midiaboard"
          className="w-[50%] mb-4"
        />
        <Separator className="bg-gray-300 mb-4" />
        <div className="flex flex-row w-full gap-4 max-[600px]:flex-col">
          <Carousel className="max-[600px]:w-[100%] w-[50%] mb-4">
            <label className="text-primary text-[0.8rem]">
              Fotos para a Arte
            </label>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-[80%]">
                  <div className="p-1">
                    <Card className="mt-4">
                      <CardContent className="flex aspect-square flex-col items-center justify-center p-6 relative">
                        <CircleX className="text-red_300 absolute top-4 right-4" />
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>

                        <input
                          placeholder="Descrição da foto"
                          type="text"
                          className="border-primary outline-none  border-b border-0  mt-auto py-1 px-2 w-[100%]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem className="basis-[80%]">
                <div className="p-1">
                  <Card className="mt-4">
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6 relative">
                      <label htmlFor="input-image">
                        <Plus className="text-grey_300" size={60} />
                      </label>
                      <input
                        id="input-image"
                        placeholder="Descrição da foto"
                        type="text"
                        className="hidden"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <div className="flex flex-col w-full">
            <label className="text-primary text-[0.8rem]">Nome do Evento</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2 w-full"></input>

            <label className="text-primary text-[0.8rem]">Data do Evento</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2 w-full"></input>

            <label className="text-primary text-[0.8rem]">Horário</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2 w-full"></input>

            <label className="text-primary text-[0.8rem]">Objetivo</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2 w-full"></input>

            <label className="text-primary text-[0.8rem]">Tema</label>
            <input className="border border-primary rounded-sm px-2 py-1 mb-2 w-full"></input>

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
