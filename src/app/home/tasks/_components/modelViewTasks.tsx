"use client";
import OrangeLabel from "@/components/orangeLabel";
import GreenLabel from "@/components/greenLabel";
import RedLabel from "@/components/redLabel";
import { ToastAction } from "@/components/ui/toast";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, Dispatch } from "react";
import { RequestProps, status } from "@/entities/request";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UpdateTask } from "@/_actions/updateTask";
import { DatePicker } from "@/components/DatePicker";
import { ListUsers } from "./listUsers";
import { User as UserProps } from "@/entities/user";
import { User } from "lucide-react";
import { db } from "@/_firebase/config";
import { TaskProps } from "@/entities/task";
import { deleteTasks } from "@/_actions/deleteTasks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/providers/userContext";
interface Props {
  setOpenModel: Dispatch<boolean>;
  task: TaskProps;
}

const ModelViewTasks = ({ setOpenModel, task }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [statusRequest, setStatusRequest] = useState<status>(task.status);
  const [description, setDescription] = useState(task.description);
  const [selectedRequest, setSelectedRequest] = useState<RequestProps | null>(
    null
  );
  const [usersAttributeds, setUserAttributeds] = useState<UserProps[]>(
    task.attributed
  );
  const [loadingStatusChange, setLoadingStatusChange] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>(
    new Date(task.deadline)
  );
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProps[]>([] as UserProps[]);
  const{usersMembers} = useUser()
  async function handleUpdateTask() {
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
      let Task = {
        attributed: usersAttributeds,
        date: task.date,
        deadline: deadline.toISOString(),
        description,
        status: statusRequest,
        progress: task.progress,
        title,
        userId: task.userId,
        id: task.id,
      };
      await UpdateTask(Task);
      setOpenModel(false);
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

  function handleCloseModal(e: any) {
    if (e.target.className.includes("fixed")) {
      setOpenModel(false);
    } else {
      return;
    }
  }
  function handleDeleteTask() {
    deleteTasks(task).then(() => {
      toast({
        title: "Task deletada com sucesso!",
        action: (
          <ToastAction altText="clique em fechar para sumir o aviso">
            fechar
          </ToastAction>
        ),
      });
      setOpenModel(false);
    });
  }

  useEffect(() => {
    setUsers(usersMembers);
  }, [usersMembers]);

  return (
    <div
      className="animate-in fade-in-0 fixed z-[99] top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black bg-opacity-70 "
      onClick={(e: any) => handleCloseModal(e)}
    >
      <Card className="flex flex-col justify-between w-[35%] h-[90%] p-4 zoom-in-95 fade-in-0  animate-in">
        <div className="flex flex-col justify-between w-full h-full">
          <input
            placeholder="Título da Tarefa"
            value={title}
            className="outline-none text-2xl font-bold mb-4"
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <p className="text-primary text-[0.8rem] font-regular mb-2">
            Informações da tarefa
          </p>
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
                <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-auto z-[9999]">
                  <ListUsers users={users} action={addUsersForTask} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <label className="text-[0.7rem] text-black">Prioridade</label>
              <Popover>
                <PopoverTrigger
                  className="outline-none flex gap-2 items-center justify-center"
                  disabled={!!selectedRequest?.id}
                >
                  {loadingStatusChange && (
                    <LoaderCircle
                      size={20}
                      className="animate-spin text-primary"
                    />
                  )}
                  {LabelStatus(statusRequest)}
                </PopoverTrigger>
                <PopoverContent className="border-none bg-transparent shadow-none items-center flex  justify-center p-0 w-[150px] z-[9999]">
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

          <textarea
            className="w-full max-h-[220px] min-h-[220px] text-sm border-grey_100 border rounded-sm p-4 outline-none  mt-4"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          ></textarea>

          <div className="w-full flex gap-4 mt-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex flex-1" variant="destructive">
                  Excluir
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] z-[99999] ">
                <DialogHeader>
                  <DialogTitle className="text-gray-700">
                    Deseja realmente excluir?
                  </DialogTitle>
                  <DialogDescription>
                    A exclusão é permanente, não podendo ser recuperado os dados
                    posteriormente
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDeleteTask}>
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button className="flex flex-1" onClick={handleUpdateTask}>
              Salvar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ModelViewTasks;
