"use client";

import { useEffect, useState } from "react";
import Header from "../_components/header";
import DragDrop from "./_components/dragDrop";
import { db } from "@/_firebase/config";
import { TaskProps } from "@/entities/task";
import { useAuth } from "@/providers/authContext";


export type DNDType = {
  id: string;
  title: string;
  items: TaskProps[];
};

const DndExample = () => {
  const [containers, setContainers] = useState<DNDType[]>([]);
  const {user} = useAuth()
  useEffect(() => {
    const unsubscribe = db.collection("tasks").where('userId', '==', user?.uid).onSnapshot((querySnaphot) => {
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
