

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
import { useState } from "react";
import { status } from "@/entities/request";
import { Card } from "@/components/ui/card";

interface Props {
 task: any
}
const ModelCreateTasks = ({task}: Props) => {
    const [statusRequest, setStatusRequest] = useState<status>(0);
    const [loadingStatusChange, setLoadingStatusChange] = useState(false);
    const { toast } = useToast();

    function handleChangeStatus(status: status) {
        let descriptionStatus = {
          0: "Para fazer",
          1: "Andamento",
          2: "Concluído",
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
            <RedLabel
              description="Para fazer"
              className="cursor-pointer w-[120px]"
            />
          ),
          "1": (
            <OrangeLabel
              description="Andamento"
              className="cursor-pointer w-[120px]"
            />
          ),
          "2": (
            <GreenLabel
              description="Concluído"
              className="cursor-pointer w-[120px]"
            />
          ),
        };
    
        return labels[status];
      }

  return (
    <div className=" flex justify-between">
      <DialogDescription className="text-primary font-bold">
        Informações do Evento
      </DialogDescription>
      <Popover>
        <PopoverTrigger className="outline-none flex gap-2 items-center justify-center">
          {loadingStatusChange && (
            <LoaderCircle size={20} className="animate-spin text-primary" />
          )}
          {LabelStatus(statusRequest)}
        </PopoverTrigger>
        <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px]">
          <Card className="w-full shadow-lg rounded-sm cursor-pointer">
            <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
              <label className="w-3 h-3 rounded-full border border-green_300  bg-green_100"></label>
              <p
                className="text-[0.8rem] text-green_300"
                onClick={() => handleChangeStatus(2)}
              >
                Concluído
              </p>
            </div>
            <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
              <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
              <p
                className="text-[0.8rem] text-orange_300"
                onClick={() => handleChangeStatus(1)}
              >
                Andamento
              </p>
            </div>
            <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
              <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
              <p
                className="text-[0.8rem] text-red_300 "
                onClick={() => handleChangeStatus(0)}
              >
                {" "}
                Para Fazer
              </p>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ModelCreateTasks;
