"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, FolderDown } from "lucide-react";
import OrangeLabel from "@/components/orangeLabel";
import GreenLabel from "@/components/greenLabel";
import RedLabel from "@/components/redLabel";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { db, storage } from "@/_firebase/config";
import { ImagesProps, RequestPropsWithId, status } from "@/entities/request";
import { useEffect, useState } from "react";

import { downloadFilesAsZip, FileDownload } from "@/utils/fileDownload";
interface Props {
  request: RequestPropsWithId;
}

const ModelDialogContent = ({ request }: Props) => {
  const [images, setImages] = useState<ImagesProps[]>([]);

  function updateImageUrl(){
    let promises: any[] = [];
    if (request?.images[0]?.imageUrl?.includes("https")) {
      setImages(request.images);
      return;
    }
    if (request.images.length == 0) {
      setImages([]);
      return;
    }
    request.images.forEach((image) => {
      promises.push(
        storage
          .ref()
          .child(image.imageUrl)
          .getDownloadURL()
          .then((url) => {
            return { ...image, imageUrl: url };
          })
      );
    });
    Promise.all(promises).then((imagesUrl) => {
      console.log(imagesUrl);
      db.collection("requests")
        .doc(request.id)
        .update({images: imagesUrl})
        .then(() => {
          setImages(imagesUrl);
        });
    });
  }
  function LabelStatus(status: status) {
    let labels = {
      "0": (
        <RedLabel
          description="Para fazer"
          className="w-[120px]"
        />
      ),
      "1": (
        <OrangeLabel
          description="Andamento"
          className="w-[120px]"
        />
      ),
      "2": (
        <GreenLabel
          description="Concluído"
          className="w-[120px]"
        />
      ),
    };

    return labels[status];
  }
  useEffect(() => {
    setImages([]);
  }, [request]);

  useEffect(() => {
    updateImageUrl()
  }, [request]);



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
          {LabelStatus(request.status)}
        </div>
      </DialogHeader>
      <Separator />
      <div className="flex flex-row w-full gap-[4rem]">
        <div className="flex flex-col flex-[1] w-full">
          <label className="text-primary text-[0.8rem]">Nome do Evento</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.event}
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
            value={request.time}
          />

          <label className="text-primary text-[0.8rem]">Objetivo</label>
          <input
            className="border border-primary rounded-sm px-2 py-1 mb-2"
            readOnly
            value={request.local}
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
                        <img
                          src={image.imageUrl}
                          alt="previsualização"
                          className="w-[200px]"
                        />
                        <Download
                          size={24}
                          className="text-primary absolute top-4 right-4 cursor-pointer"
                          onClick={() =>
                            FileDownload(
                              image.imageUrl,
                              `${
                                image.description || "image" + (index + 1)
                              }.png`
                            )
                          }
                        />
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

          <Button className="mt-4" onClick={()=> downloadFilesAsZip(images)}>
            <FolderDown className="text-white mr-1" />
            Baixar Tudo
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ModelDialogContent;
