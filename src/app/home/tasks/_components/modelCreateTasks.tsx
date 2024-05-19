"use client";

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
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { RequestProps, status } from "@/entities/request";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateTask } from "@/_actions/createTasks";
import { DatePicker } from "@/components/DatePicker";
import { ListUsers } from "./listUsers";
import { User as UserProps } from "@/entities/user";
import { User } from "lucide-react";
import { db } from "@/_firebase/config";
import { useRequest } from "@/providers/requestContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ModelCreateTasks = () => {
  const [statusRequest, setStatusRequest] = useState<status>(1);
  const [selectedRequest, setSelectedRequest] = useState<RequestProps>({}as RequestProps);
  const [usersAttributeds, setUserAttributeds] = useState<UserProps[]>(
    [] as UserProps[]
  );
  const [loadingStatusChange, setLoadingStatusChange] = useState(false);
  const [deadLine, setDeadLine] = useState<Date | undefined>();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProps[]>([] as UserProps[]);
  const {requests} = useRequest()
  async function handleCreateTask() {
    await CreateTask();
  }

  function handleChangeStatus(status: status) {
    let descriptionStatus = {
      0: "Analisando",
      1: "Para fazer",
      2: "Andamento",
      3: "Concluído",
    };
    setLoadingStatusChange(true);
    ChangeStatus({ id: "", status })
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

  function LabelStatus(status:status) {
    let labels = {
      "0": (
        <RedLabel description="Analisando" className="cursor-pointer w-[120px] bg-grey_100 border-grey_300 text-grey_300" />
      ),
      "1": (
        <RedLabel description="Urgente" className="cursor-pointer w-[120px]" />
      ),
      "2": (
        <OrangeLabel
          description="Pouco Urgente"
          className="cursor-pointer w-[120px]"
        />
      ),
      "3": (
        <GreenLabel
          description="Não urgente"
          className="cursor-pointer w-[120px]"
        />
      ),
    };

    return labels[status];
  }
  function addUsersForTask(newUser: UserProps) {
    const exists = usersAttributeds.some((user) => user.id == newUser.id);
    if (exists) {
     return setUserAttributeds(old=> old.filter((oldUser)=> oldUser.id != newUser.id))
    }
    setUserAttributeds([...usersAttributeds, newUser]);
  }

  useEffect(() => {
    const listUsers: UserProps[] = [];
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          listUsers.push(doc.data() as UserProps);
        });
      });
    setUsers(listUsers);
  }, []);

  useEffect(() => {
    console.log(usersAttributeds);
  }, [usersAttributeds]);


  return (
    <div className="flex flex-col justify-between w-full h-full">
      <input
        placeholder="Título da Tarefa"
        className="outline-none text-2xl font-bold mb-4"
      />
      <DialogDescription className="text-primary text-[0.8rem] font-regular mb-2">
        Informações da tarefa
      </DialogDescription>
      <div className="flex w-full justify-between">
        <div className="flex flex-col  gap-[0.5rem]">
          <label className="text-[0.7rem] text-black">Data final</label>
          <DatePicker date={deadLine} setDate={setDeadLine} />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[0.7rem] text-black">Atribuir a</label>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex pl-[4px]">
                {usersAttributeds?.length == 0 ? (
                  <Avatar className="h-6 w-6 cursor-pointer  ml-[-10px]">
                    <AvatarFallback className="text-white bg-primary text-[0.6rem]">
                      <User className="p-1" />
                    </AvatarFallback>
                    :
                  </Avatar>
                ) : (
                  usersAttributeds?.map((user,index) => {
                    return (
                      <Avatar className="h-6 w-6 cursor-pointer  ml-[-10px] shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)]">
                        <AvatarFallback
                          className={`text-white bg-primary text-[0.6rem] z-index[${index}]`}
                          key={user.id}
                        >
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-auto">
              <ListUsers users={users} action={addUsersForTask} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[0.7rem] text-black">Prioridade</label>
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
                    onClick={() => setStatusRequest(3)}
                  >
                    Não urgente
                  </p>
                </div>
                <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
                  <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                  <p
                    className="text-[0.8rem] text-orange_300"
                    onClick={() => setStatusRequest(2)}
                  >
                    Pouco Urgente
                  </p>
                </div>
                <div className="flex gap-2 items-center hover:bg-gray-100 p-2">
                  <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                  <p
                    className="text-[0.8rem] text-red_300 "
                    onClick={() => setStatusRequest(1)}
                  >
                    {" "}
                    Urgente
                  </p>
                </div>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Dialog>
          <DialogTrigger className="w-auto flex items-start mt-8 mb-4">
              <Button className="w-auto h-[25px] text-[0.7rem]">
                {selectedRequest?.theme || "Escolher Pedido"} 
              </Button>
          </DialogTrigger>
          <DialogContent className="h-[90%] w-[50%] text-gray-800 overflow-y-auto">
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-left">Data do Evento</TableHead>
                  <TableHead className="text-center w-[100px]">
                    Prioridade
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requests?.map((request, index) => {
                  return (

                      <TableRow className={`animate-fadeIn ${request.id == selectedRequest.id && "bg-background"}`} onClick={()=> setSelectedRequest(request)}>

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
                            "dd'/'MM'/'yyyy",
                            { locale: ptBR }
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {LabelStatus(request.status)}
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DialogContent>
            {/* {currentRequestModel && (
              <ModelDialogContent request={currentRequestModel} />
            )} */}
          </Dialog>
      <textarea className="w-full max-h-[220px] min-h-[220px] text-sm border-grey_100 border rounded-sm p-4 outline-none"></textarea>

      <div className="w-full flex gap-4 mt-auto">
        <Button className="flex flex-1" variant="destructive">
          Cancelar
        </Button>
        <Button className="flex flex-1" onClick={handleCreateTask}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default ModelCreateTasks;
