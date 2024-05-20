import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React, { Dispatch } from "react";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TaskProps } from "@/entities/task";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  setOpenModel: Dispatch<boolean>
  task: TaskProps;
};

const Items = ({ id, title,setOpenModel, task }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      onClick={() => setOpenModel(true)}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "bg-background border-[#ABD6F8] border mx-1 my-0 text-sm cursor-pointer w-full",
        isDragging && "opacity-50"
      )}
    >
    
          <div className="flex flex-col px-4 py-3"  {...listeners}>
            <div className="flex justify-between pointer-events-none">
              <p className="font-semibold capitalize text-gray-700">{title}</p>
              <Avatar className="z-[1]">
                <AvatarFallback className="text-white bg-primary z-[1]">L</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-gray-400 text-[0.7rem] capitalize" >14/04/2024</p>
          </div>
  
    
    </div>
  );
};

export default Items;
