"use client";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import ModelDialogContent from "./_components/modelDialogContent";
import { useEffect, useState } from "react";
import GreenLabel from "@/components/greenLabel";
import Header from "./_components/header";
import OrangeLabel from "../../components/orangeLabel";
import RedLabel from "../../components/redLabel";
import { db } from "@/_firebase/config";
import { RequestProps, RequestPropsWithId, status } from "@/entities/request";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LoaderCircle } from "lucide-react";
import { useRequest } from "@/providers/requestContext";
import { progress } from "@/entities/task";



const DashboardPage = () => {
  const {requests, setRequests, isLoading, setIsLoading} = useRequest()
  const [requestsFilter, setRequestsFilter] = useState<RequestProps[]>(
    [] as RequestProps[]
  );
  const [progress, setProgress] = useState(1);
  const [currentRequestModel, setCurrentRequestModel] = useState<RequestProps|null>(null);
  const activeButtons = {
    red: "bg-red_100 ",
    orange: "bg-orange_100 ",
    green: "bg-green_100 ",
  };

  function handleFilterStatus(value: number) {
    setProgress(value);
  }

  function filterRequestPerStatus() {
    setRequestsFilter(
      requests.filter((item) => item.progress == progress)
    );
  }

  function LabelStatus(status: status) {
    let labels = {
      "0": (
        <RedLabel description="Analisando" className="cursor-pointer w-[120px] bg-grey_100 border-grey_300 text-grey_300" />
      ),
      "1": <RedLabel description="Urgente"/>,
      "2": <OrangeLabel description="Pouco urgente" />,
      "3": <GreenLabel description="Não urgente" />,
    };

    return labels[status];
  }

  useEffect(() => {
    filterRequestPerStatus();
  }, [requests, progress]);

  return (
    <>
      <Header title="Pedidos" />
      <Card className="m-auto flex w-full h-[75vh] p-4 flex-col">
        <div className="w-full flex gap-2">
          <button
            onClick={() => handleFilterStatus(1)}
            className={`${
              progress == 1 && activeButtons.red
            } " p-2 text-sm font-medium border-red_300 text-red_300 border rounded-sm transition-all duration-300 "`}
          >
            Para Fazer
          </button>
          <button
            onClick={() => handleFilterStatus(2)}
            className={`${
              progress == 2 && activeButtons.orange
            } " p-2 text-sm font-medium border-orange_300 text-orange_300 border rounded-sm transition-all duration-300 "`}
          >
            Andamento
          </button>
          <button
            onClick={() => handleFilterStatus(3)}
            className={`${
              progress == 3 && activeButtons.green
            } " p-2 text-sm font-medium border-green_300 border text-green_300 rounded-sm transition-all duration-300 "`}
          >
            Concluído
          </button>
        </div>
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle
              size={50}
              className="animate-spin text-primary m-auto"
            />
          </div>
        )}
        {!isLoading && (
          <Dialog>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nº</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-left">Data do Evento</TableHead>
                  <TableHead className="text-center w-[150px]">
                    Prioridade
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requestsFilter?.map((request, index) => {
                  return (
                    <DialogTrigger
                      asChild
                      key={request.id}
                      onClick={() => setCurrentRequestModel(request)}
                    >
                      <TableRow className={`animate-fadeIn`}>
                        <TableCell className="font-medium">{index +1 }</TableCell>
                        <TableCell className="text-left">
                          {request.name}
                        </TableCell>
                        <TableCell className="text-left">
                          {request.theme}
                        </TableCell>
                        <TableCell className="text-left">
                          {request.phone}
                        </TableCell>
                        <TableCell className="text-left">
                          {format(
                            new Date(request.date),
                            "dd 'de' MMMM 'de' yyyy",
                            { locale: ptBR }
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {LabelStatus(request.status)}
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                  );
                })}
              </TableBody>
            </Table>
            {currentRequestModel && (
              <ModelDialogContent request={currentRequestModel} />
            )}
          </Dialog>
        )}
      </Card>
    </>
  );
};

export default DashboardPage;
