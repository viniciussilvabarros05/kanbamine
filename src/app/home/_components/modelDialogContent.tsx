"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import RedLabel from "./redLabel";
import { Download, FolderDown } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

const ModelDialogContent = () => {
  return (
    <DialogContent className="bg-white text-black w-[900px]">
      <DialogHeader className="text-gray-600">
        <div className="flex gap-4 items-center">
          <DialogTitle className="text-gray-600 text-2xl flex gap-4">
            # Pedido 01 - John Doe
          </DialogTitle>

          <Popover>
            <PopoverTrigger className="w-[110px]">
              <RedLabel description="Urgente" className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px]">
              <Card className="w-full p-4 shadow-lg rounded-sm">
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-grey_300  bg-grey_100"></label>
                  <p className="text-[0.8rem] text-gray-600">Não Urgente</p>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                  <p className="text-[0.8rem] text-orange_300">Pouco Urgente</p>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                  <p className="text-[0.8rem] text-red_300 ">Urgente</p>
                </div>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
        <DialogDescription className="text-primary font-bold">
          Informações do Evento
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div className="flex flex-row w-full gap-[4rem]">
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
          <textarea className="border border-primary rounded-sm px-2 py-1 mb-2"></textarea>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <Carousel className="w-[80%]">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-[80%]">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                        <Download className="text-primary absolute top-4 right-4" />
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Button className="mt-4">
            <FolderDown className="text-white mr-1" />
            Baixar Tudo
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ModelDialogContent;
