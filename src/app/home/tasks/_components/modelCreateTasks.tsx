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
import {
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, useRef } from "react";
import { status } from "@/entities/request";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateTask } from "@/_actions/createTasks";
import { DatePicker } from "@/components/DatePicker";
import { ListUsers } from "./listUsers";
import { User as UserProps } from "@/entities/user";
import { User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/providers/authContext";
import { useUser } from "@/providers/userContext";

const ModelCreateTasks = () => {
  const closeRef = useRef<any>(null as any);
  const [title, setTitle] = useState("");
  const [statusRequest, setStatusRequest] = useState<status>(0);
  const [description, setDescription] = useState("");
  const [usersAttributeds, setUserAttributeds] = useState<UserProps[]>(
    [] as UserProps[]
  );
  const [loadingStatusChange, setLoadingStatusChange] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProps[]>([] as UserProps[]);
  const {user} = useAuth()
  const {usersMembers} = useUser()
  
  async function handleCreateTask() {
  
    if (title == "") {
      toast({
        variant: "destructive",
        title: "Necessário o título da tarefa",
        description: "Clique em Titulo da tarefa para adicionar um título",
        action: (
          <ToastAction altText="clique em fechar para sumir o aviso">
            fechar
          </ToastAction>
        ),
      });
      return;
    }
    if (!deadline) {
      toast({
        variant: "destructive",
        title: "Necessário a data final",
        description: "Selecione a data",
        action: (
          <ToastAction altText="clique em fechar para sumir o aviso">
            fechar
          </ToastAction>
        ),
      });
      return;
    }

    if (title == "") {
      toast({
        variant: "destructive",
        title: "Necessário o título da tarefa",
        description: "Clique em Titulo da tarefa para adicionar um título",
        action: (
          <ToastAction altText="clique em fechar para sumir o aviso">
            fechar
          </ToastAction>
        ),
      });
      return;
    }
    if (usersAttributeds.length == 0) {
      toast({
        variant: "destructive",
        title: "Necessário atribuir a tarefa a  alguem",
        description: "Clique em 'atribuir a'",
        action: (
          <ToastAction altText="clique em fechar para sumir o aviso">
            fechar
          </ToastAction>
        ),
      });
      return;
    }
    if (deadline) {
      const id = `item-${uuidv4()}`;
      let task = {
        attributed: usersAttributeds,
        date: new Date().toISOString(),
        deadline: deadline.toISOString(),
        description,
        status: statusRequest,
        userId: user?.uid!,
        progress: 1,
        title,
        id,
      };
      await CreateTask(task);
      closeRef.current.click();
    }
  }


  function LabelStatus(status: status) {
    let labels = {
      "0": (
        <RedLabel
          description="Analisando"
          className="cursor-pointer w-[120px] bg-grey_100 border-grey_300 text-grey_300"
        />
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
      return setUserAttributeds((old) =>
        old.filter((oldUser) => oldUser.id != newUser.id)
      );
    }
    setUserAttributeds([...usersAttributeds, newUser]);
  }


  useEffect(() => {
    setUsers(usersMembers)
  }, [usersMembers]);

  return (
    <DialogContent className="w-[35%] h-[90%] text-gray-800">
      <DialogClose ref={closeRef} className="hidden" />
      <div className="flex flex-col justify-between w-full h-full space-y-2">
        <input
          placeholder="Título da Tarefa"
          className="outline-none text-2xl font-bold "
          onChange={(e: any) => setTitle(e.target.value)}
        />
        <div className="flex flex-col space-y-2">
          <DialogDescription className="text-primary text-[0.8rem] font-regular ">
            Informações da tarefa
          </DialogDescription>
          <div className="flex w-full justify-between">
            <div className="flex flex-col  gap-[0.5rem]">
              <label className="text-[0.7rem] text-black">Data final</label>
              <DatePicker date={deadline} setDate={setDeadline} />
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
                      usersAttributeds?.map((user, index) => {
                        return (
                          <Avatar
                            key={user.id}
                            className="h-6 w-6 cursor-pointer  ml-[-10px] shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)]"
                          >
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
                <PopoverTrigger
                  className="outline-none flex gap-2 items-center justify-center"
                
                >
                  {loadingStatusChange && (
                    <LoaderCircle
                      size={20}
                      className="animate-spin text-primary"
                    />
                  )}
                  {LabelStatus(statusRequest)}
                </PopoverTrigger>
                <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px]">
                  <Card className="w-full shadow-lg rounded-sm cursor-pointer">
                    <div
                      className="flex gap-2 items-center hover:bg-gray-100 p-2"
                      onClick={() => setStatusRequest(3)}
                    >
                      <label className="w-3 h-3 rounded-full border border-green_300  bg-green_100"></label>
                      <p className="text-[0.8rem] text-green_300">
                        Não urgente
                      </p>
                    </div>
                    <div
                      className="flex gap-2 items-center hover:bg-gray-100 p-2"
                      onClick={() => setStatusRequest(2)}
                    >
                      <label className="w-3 h-3 rounded-full border border-orange_300  bg-orange_100"></label>
                      <p className="text-[0.8rem] text-orange_300">
                        Pouco Urgente
                      </p>
                    </div>
                    <div
                      className="flex gap-2 items-center hover:bg-gray-100 p-2"
                      onClick={() => setStatusRequest(1)}
                    >
                      <label className="w-3 h-3 rounded-full border border-red_300 bg-red_100"></label>
                      <p className="text-[0.8rem] text-red_300 "> Urgente</p>
                    </div>
                  </Card>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <textarea
          className="w-full max-h-[220px] min-h-[220px] text-sm border-grey_100 border rounded-sm p-4 outline-none"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        ></textarea>

        <div className="w-full flex gap-4 mt-auto">
          <DialogClose asChild>
            <Button className="flex flex-1" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="flex flex-1" onClick={handleCreateTask}>
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ModelCreateTasks;
