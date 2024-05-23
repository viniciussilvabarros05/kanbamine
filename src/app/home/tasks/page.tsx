"use client";

import { cardsData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from "@/providers/DndContext";
import Header from "../_components/header";
import { Card } from "@/components/ui/card";
import OrangeLabel from "@/components/orangeLabel";
import RedLabel from "@/components/redLabel";
import GreenLabel from "@/components/greenLabel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {Dialog, DialogTrigger, DialogContent, DialogHeader} from "@/components/ui/dialog"
import ModelCreateTasks from "./_components/modelCreateTasks";
import { Separator } from "@/components/ui/separator";
import DragDrop from "./_components/dragDrop";
import { db } from "@/_firebase/config";
import { TaskProps } from "@/entities/task";
import { useRequest } from "@/providers/requestContext";
interface Cards {
  id: number;
  title: string;
  components: {
    id: number;
    name: string;
  }[];
}

export type DNDType = {
  id: string;
  title: string;
  items: TaskProps[];
};

const DndExample = () => {
  const [containers, setContainers] = useState<DNDType[]>([]);
  const {requests} = useRequest()
 
  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot((querySnaphot) => {
      let tasks: TaskProps[] = [];
      const exemploContainer = [
        {
          id: `container-1`,
          title: "toDo",
          items: [] as TaskProps[],
        },
        { id: `container-2`, title: "progress", items: [] },
        { id: `container-3`, title: "finished", items: [] },
      ];

      querySnaphot.forEach((doc) => {
        tasks.push({
          ...doc.data(),
        } as TaskProps);
      });
      let toDo = tasks.filter((task) => task.progress == 1);
      let progress = tasks.filter((task) => task.progress == 2);
      let finished = tasks.filter((task) => task.progress == 3);

      exemploContainer[0].items = toDo;
      exemploContainer[1].items = progress;
      exemploContainer[2].items = finished;
      setContainers(exemploContainer);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full">
      <Header title="Tarefas" />
      <Card className="flex  p-4 justify-start w-full min-h-[75vh] flex-col">
        <Dialog >
          <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-accent w-[120px] h-[30px] rounded-sm"
          >
            + Criar Tarefa
          </Button>
          </DialogTrigger>
          <ModelCreateTasks/>

        </Dialog>
       
        <div className="w-full flex justify-around gap-4 h-[80px] py-[24px] bg-white sticky top-[70px] z-[3]">
          <RedLabel description="Para Fazer" />
          <OrangeLabel description="Andamento" />
          <GreenLabel description="Concluído" />
        </div>
       <DragDrop data={containers}/>
      </Card>
    </div>
  );
};

export default DndExample;
