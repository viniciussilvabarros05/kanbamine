"use client";

import { cardsData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from "@/providers/DndContext";
import Header from "../_components/header";
import { Card } from "@/components/ui/card";
import OrangeLabel from "../_components/orangeLabel";
import RedLabel from "../_components/redLabel";
import GreenLabel from "../_components/greenLabel";
import { Button } from "@/components/ui/button";
interface Cards {
  id: number;
  title: string;
  components: {
    id: number;
    name: string;
  }[];
}
const DndExample = () => {
  const [data, setData] = useState<Cards[] | []>([]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };
  useEffect(() => {
    setData(cardsData);
  }, []);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Header title="Tarefas" />
      <Card className="flex gap-4 p-4 justify-start w-full min-h-[65vh] flex-col">
        <Button variant="outline" className="bg-white text-accent w-[120px] h-[30px] rounded-sm">
           + Criar Tarefa
        </Button>
        <div className="w-full flex justify-around gap-4 h-[32px]">
          <RedLabel description="Para Fazer" />
          <OrangeLabel description="Andamento" />
          <GreenLabel description="Concluído" />
        </div>
        <div className="flex gap-4 justify-between w-full h-full flex-row">
          {data.map((val, index) => {
            return (
              <Droppable key={index} droppableId={`droppable${index}`}>
                {(provided) => (
                  <div
                    className={
                      index === 1
                        ? " border border-t-0 border-b-0 border-gray-200 px-4" +
                          " lg:w-1/3 w-full min-h-[65vh] bg-white"
                        : " lg:w-1/3 w-full min-h-[65vh] bg-white"
                    }
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {val.components?.map((component, index) => (
                      <Draggable
                        key={component.id}
                        draggableId={component.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-background border-[#ABD6F8] border mx-1 px-4 py-3 my-3 text-sm"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <p className="font-semibold capitalize text-gray-700">
                              {component.name}

                            </p>
                            <p className="text-gray-400 text-[0.7rem] capitalize">
                              14/04/2024

                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </Card>
    </DndContext>
  );
};

export default DndExample;
