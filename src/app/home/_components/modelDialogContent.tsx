"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, FolderDown, LoaderCircle } from "lucide-react";
import OrangeLabel from "@/components/orangeLabel";
import GreenLabel from "@/components/greenLabel";
import RedLabel from "@/components/redLabel";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { db, storage } from "@/_firebase/config";
import { ImagesProps, RequestPropsWithId, status } from "@/entities/request";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { downloadFilesAsZip, FileDownload } from "@/utils/fileDownload";
import ModelCreateTasks from "../tasks/_components/modelCreateTasks";
import { ChangeStatus } from "@/_actions/changeStatus";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Popover,PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Props {
  request: RequestPropsWithId;
}



const ModelDialogContent = ({ request }: Props) => {
  const [images, setImages] = useState<ImagesProps[]>([]);
  const [loadingStatusChange, setLoadingStatusChange] = useState(false)
  const [statusRequest, setStatusRequest] = useState(request.status)
  const {toast} = useToast()
  function handleChangeStatus(status: status) {
    let descriptionStatus = {
      0: "Analisando",
      1: "Urgente",
      2: "Pouco urgente",
      3: "Não urgente",
    };
    setLoadingStatusChange(true);
    ChangeStatus({ id: request.id, status })
      .then(() => {
        setLoadingStatusChange(false);
        setStatusRequest(status);
        toast({
          title: "Mudança de status",
          description: "Status Mudado para: " + descriptionStatus[status],
          action: (
            <ToastAction altText="clique em fechar para sumir o aviso">
              fechar
            </ToastAction>
          ),
        });
      })
      .catch((error) => {
        setLoadingStatusChange(false);
        toast({
          variant: "destructive",
          title: "Erro na mudança de status",
          description: "Não foi possível mudar o status da tarefa",
          action: (
            <ToastAction altText="clique em fechar para sumir o aviso">
              fechar
            </ToastAction>
          ),
        });
      });
  }

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
        <RedLabel description="Analisando" className="cursor-pointer w-[120px] bg-grey_100 border-grey_300 text-grey_300" />
      ),
      "1": (
        <RedLabel
          description="Urgente"
          className="w-[120px] cursor-pointer"
        />
      ),
      "2": (
        <OrangeLabel
          description="Pouco Urgente"
          className="w-[120px] cursor-pointer"
        />
      ),
      "3": (
        <GreenLabel
          description="Não urgente"
          className="w-[120px] cursor-pointer"
        />
      ),
    };

    return labels[status];
  }
  useEffect(() => {
    setImages([]);
    setStatusRequest(request.status)
  }, [request]);

  useEffect(() => {
    updateImageUrl()
  }, [request]);



  let dateFormated = format(new Date(request.date), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  return (
    <DialogContent className="bg-white text-black w-[900px] z-[9999]">
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
          <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.7rem] text-black">Prioridade</label>
            <Popover>
              <PopoverTrigger className="outline-none flex gap-2 items-center justify-center">
                {loadingStatusChange && (
                  <LoaderCircle size={20} className="animate-spin text-primary" />
                )}
                {LabelStatus(statusRequest)}
              </PopoverTrigger>
              <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px] z-[9999]">
                <Card className="w-full shadow-lg rounded-sm cursor-pointer">
                  <div
                    className="flex gap-2 items-center hover:bg-gray-100 p-2"
                    onClick={() => handleChangeStatus(3)}
                  >
                    <label className="w-3 h-3 rounded-full border border-green_300  bg-green_100"></label>
                    <p className="text-[0.8rem] text-green_300">Não urgente</p>
                  </div>
                  <div
                    className="flex gap-2 items-center hover:bg-gray-100 p-2"
                    onClick={() => handleChangeStatus(2)}
                  >
                    <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                    <p className="text-[0.8rem] text-orange_300">Pouco Urgente</p>
                  </div>
                  <div
                    className="flex gap-2 items-center hover:bg-gray-100 p-2"
                    onClick={() => handleChangeStatus(1)}
                  >
                    <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                    <p className="text-[0.8rem] text-red_300 "> Urgente</p>
                  </div>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
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
          <input className="border border-primary rounded-sm px-2 py-1 mb-2" readOnly
            value={request.time}
          />

          <label className="text-primary text-[0.8rem]">Local</label>
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
                        <Image
                          src={image.imageUrl}
                          alt="previsualização"
                          className="w-[200px] h-[200px]"
                          width={200} 
                          height={200}
                          style={{objectFit: "contain"}}
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
