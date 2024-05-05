"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
import { Download, FolderDown, Plus } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { RequestPropsWithId } from "../page";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { db, storage } from "@/_firebase/config";
import { ImagesProps } from "@/entities/request";
import { useEffect, useState } from "react";

interface Props {
  request: RequestPropsWithId;
}

const ModelDialogContent = ({ request }: Props) => {
  const [images, setImages] = useState<ImagesProps[]>([]);

  useEffect(() => {
    let imagesUrl:ImagesProps[]= []
    let promises: any[] = []
    if(request?.images[0]?.imageUrl?.includes("https")){
      setImages(request.images)
      return
    }
    if(request.images.length == 0 ){
      setImages([])
      return
    }
    request.images.forEach((image) => {
      promises.push(storage
        .ref()
        .child(image.imageUrl)
        .getDownloadURL()
        .then((url) => {
          return {...image,imageUrl: url}
        }))
    });
    Promise.all(promises).then(value=> setImages(value))
  }, [request]);

  useEffect(()=>{
    if(images.length > 0 ){
      db.collection("requests").doc(request.id).update({
        images
      })
    }
  },[images])

  let dateFormated = format(new Date(request.date), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  return (
    <DialogContent className="bg-white text-black w-[900px]">
      <DialogHeader className="text-gray-600">
        <div className="flex gap-4 items-center">
          <DialogTitle className="text-gray-600 text-2xl flex gap-4">
            # Pedido - {request.name}
          </DialogTitle>
        </div>
        <div className=" flex justify-between">
          <DialogDescription className="text-primary font-bold">
            Informações do Evento
          </DialogDescription>
          <Popover>
            <PopoverTrigger className="w-[110px]">
              <RedLabel description="Para fazer" className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px]">
              <Card className="w-full p-4 shadow-lg rounded-sm">
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-green_300  bg-green_100"></label>
                  <p className="text-[0.8rem] text-green_300">Concluído</p>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                  <p className="text-[0.8rem] text-orange_300">Andamento</p>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                  <p className="text-[0.8rem] text-red_300 ">Para Fazer</p>
                </div>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </DialogHeader>
      <Separator />
      <div className="flex flex-row w-full gap-[4rem]">
        <div className="flex flex-col flex-[1] w-full">
          <label className="text-primary text-[0.8rem]">Nome do Evento</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.name}
          />

          <label className="text-primary text-[0.8rem]">Data do Evento</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={dateFormated}
          />

          <label className="text-primary text-[0.8rem]">Horário</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={""}
          />

          <label className="text-primary text-[0.8rem]">Objetivo</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.objective}
          />

          <label className="text-primary text-[0.8rem]">Tema</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.theme}
          />

          <label className="text-primary text-[0.8rem]">
            Descrição do Evento
          </label>
          <textarea
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.description}
          ></textarea>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <Carousel className="w-[100%] h-[100%] mb-4">
            <label className="text-primary text-[0.8rem]">
              Fotos para a Arte
            </label>
            <CarouselContent>
              {images?.map((image, index) => (
                <CarouselItem key={index} className="basis-[80%]">
                  <div className="p-1">
                    <Card className="mt-4">
                      <CardContent className="flex aspect-square flex-col items-center justify-center p-6 relative">
                        <img src={image.imageUrl} alt="previsualização" />
                        <input
                          placeholder="Descrição da foto"
                          value={image.description}
                          type="text"
                          readOnly
                          className="border-primary outline-none  border-b border-0  mt-auto py-1 px-2 w-[100%]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
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
