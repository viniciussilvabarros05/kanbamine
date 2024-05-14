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
import { RequestProps, RequestPropsWithId } from "@/entities/request";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LoaderCircle } from "lucide-react";



const DashboardPage = () => {
  const [requests, setRequests] = useState<RequestPropsWithId[]>(
    [] as RequestPropsWithId[]
  );
  const [requestsFilter, setRequestsFilter] = useState<RequestPropsWithId[]>(
    [] as RequestPropsWithId[]
  );
  const [status, setStatus] = useState(0);
  const [currentRequestModel, setCurrentRequestModel] =
    useState<RequestPropsWithId|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeButtons = {
    red: "bg-red_100 ",
    orange: "bg-orange_100 ",
    green: "bg-green_100 ",
  };

  function handleFilterStatus(value: number) {
    setStatus(value);
  }

  function filterRequestPerStatus() {
    setRequestsFilter(
      requests.filter((item) => item.status === status)
    );
  }

  function LabelStatus(status: 0 | 1 | 2) {
    let labels = {
      "0": <RedLabel description="Para fazer"/>,
      "1": <OrangeLabel description="Andamento" />,
      "2": <GreenLabel description="Concluído" />,
    };

    return labels[status];
  }

  useEffect(() => {
    filterRequestPerStatus();
  }, [requests, status]);

  useEffect(() => {
    const unsubscribe = db.collection("requests").onSnapshot((querySnaphot) => {
      let requests: RequestPropsWithId[] = [];
      querySnaphot.forEach((doc) => {
        requests.push({
          ...doc.data(),
          id: String(doc.id),
        } as RequestPropsWithId);
      });
      setRequests(requests);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header title="Pedidos" />
      <Card className="m-auto flex w-full h-[75vh] p-4 flex-col">
        <div className="w-full flex gap-2">
          <button
            onClick={() => handleFilterStatus(0)}
            className={`${
              status == 0 && activeButtons.red
            } " p-2 text-sm font-medium border-red_300 text-red_300 border rounded-sm transition-all duration-300 "`}
          >
            Para Fazer
          </button>
          <button
            onClick={() => handleFilterStatus(1)}
            className={`${
              status == 1 && activeButtons.orange
            } " p-2 text-sm font-medium border-orange_300 text-orange_300 border rounded-sm transition-all duration-300 "`}
          >
            Andamento
          </button>
          <button
            onClick={() => handleFilterStatus(2)}
            className={`${
              status == 2 && activeButtons.green
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
                  <TableHead className="text-center w-[100px]">
                    Status
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
