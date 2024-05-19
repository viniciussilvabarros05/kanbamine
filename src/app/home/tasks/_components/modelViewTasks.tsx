

import { ChangeStatus } from "@/_actions/changeStatus";
import OrangeLabel from "@/components/orangeLabel";
import GreenLabel from "@/components/greenLabel";
import RedLabel from "@/components/redLabel";
import { ToastAction } from "@/components/ui/toast";
import {
    PopoverTrigger,
    PopoverContent,
    Popover,
} from "@/components/ui/popover";
import {
    DialogDescription,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, useState } from "react";
import { status } from "@/entities/request";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Props {
 setOpenModel: Dispatch<boolean>;
}
const ModelViewTasks = ({setOpenModel}:Props) => {
    const [statusRequest, setStatusRequest] = useState<status>(1);
    const [loadingStatusChange, setLoadingStatusChange] = useState(false);
    const { toast } = useToast();

    function handleChangeStatus(status: status) {
        let descriptionStatus = {
          0: "Analisando",
          1: "Para fazer",
          2: "Andamento",
          3: "Concluído",
        };
        setLoadingStatusChange(true);
        ChangeStatus({ id:"", status })
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
    
      function LabelStatus(status: status) {
        let labels = {
          "0": (
            <RedLabel description="Analisando" className="cursor-pointer w-[120px] bg-grey_100 border-grey_300 text-grey_300" />
          ),
          "1": (
            <RedLabel
              description="Para fazer"
              className="cursor-pointer w-[120px]"
            />
          ),
          "2": (
            <OrangeLabel
              description="Andamento"
              className="cursor-pointer w-[120px]"
            />
          ),
          "3": (
            <GreenLabel
              description="Concluído"
              className="cursor-pointer w-[120px]"
            />
          ),
        };
    
        return labels[status];
      }

      function handleCloseModal(e:any){
        if(e.target.className.includes("fixed")){
          setOpenModel(false)
        }else{
          return
        }
      }
  return (

    <div className="animate-in fade-in-0 fixed z-[9999] top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black bg-opacity-70 " onClick={(e:any)=>handleCloseModal(e)}>
      <Card className="flex flex-col justify-between w-[35%] h-[90%] p-4 zoom-in-95 fade-in-0  animate-in">
      
          <p className="text-primary text-[0.8rem] font-regular mb-2">
            Informações da tarefa
          </p>
          <div className="flex w-full justify-between">
        
            <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.7rem] text-black">Data Final</label>
            <p className="text-[0.7rem] text-gray-600">
              15/04/2024
            </p>
            </div>
            <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.7rem] text-black">Atribuido a</label>
            <Avatar className="h-5 w-5">
                <AvatarFallback className="text-white bg-primary text-[0.6rem]">L</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.7rem] text-black">Prioridade</label>
              <Popover>
                <PopoverTrigger  className="outline-none flex gap-2 items-center justify-center">
                  {loadingStatusChange && (
                    <LoaderCircle size={20} className="animate-spin text-primary" />
                  )}
                  {LabelStatus(statusRequest)}
                </PopoverTrigger>
                <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px] h-auto z-[99999]">
                  <Card className="w-full shadow-lg rounded-sm cursor-pointer">
                    <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
                      <label className="w-3 h-3 rounded-full border border-green_300  bg-green_100"></label>
                      <p
                        className="text-[0.8rem] text-green_300"
                        onClick={() => handleChangeStatus(3)}
                      >
                        Concluído
                      </p>
                    </div>
                    <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
                      <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                      <p
                        className="text-[0.8rem] text-orange_300"
                        onClick={() => handleChangeStatus(2)}
                      >
                        Andamento
                      </p>
                    </div>
                    <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
                      <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                      <p
                        className="text-[0.8rem] text-red_300"
                        onClick={() => handleChangeStatus(1)}
                      >
                        {" "}
                        Para Fazer
                      </p>
                    </div>
                  </Card>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button className="w-[110px] h-[25px] text-[0.7rem] mt-8 mb-4">Escolher Pedido</Button>
          <textarea className="w-full max-h-[220px] min-h-[220px] border-grey_100 border rounded-sm">

          </textarea>

          <div className="w-full flex gap-4 mt-auto">
            <Button className="flex flex-1" variant="destructive" onClick={()=>setOpenModel(false)}>Cancelar</Button>
            <Button className="flex flex-1">Salvar</Button>
          </div>
      </Card>
    </div>

  );
};

export default ModelViewTasks;
