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
          title: "Para Fazer",
          items: [] as TaskProps[],
        },
        { id: `container-2`, title: "Andamento", items: [] },
        { id: `container-3`, title: "Concluidas", items: [] },
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
      <DragDrop data={containers}/>
    </div>
  );
};

export default DndExample;
