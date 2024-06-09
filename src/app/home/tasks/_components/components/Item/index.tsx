import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React, { Dispatch } from "react";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TaskProps } from "@/entities/task";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User } from "lucide-react";
type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  setOpenModel: Dispatch<boolean>;
  task: TaskProps | undefined;
};

const Items = ({ id, title, setOpenModel, task }: ItemsType) => {
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
      <div className="flex flex-col px-4 py-3" {...listeners}>
        <div className="flex justify-between pointer-events-none">
          <p className="font-semibold capitalize text-gray-700">{title}</p>
          <div className="flex pl-[4px]">
                  {task?.attributed?.length == 0 ? (
                    <Avatar className="h-6 w-6 cursor-pointer  ml-[-10px]">
                      <AvatarFallback className="text-white bg-primary text-[0.6rem]">
                        <User className="p-1" />
                      </AvatarFallback>
                      :
                    </Avatar>
                  ) : (
                    task?.attributed?.map((user, index) => {
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
        </div>
        <p className="text-gray-400 text-[0.7rem] capitalize">
          {" "}
          {task && 
            format(new Date(task.date), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })
          }
        </p>
      </div>
    </div>
  );
};

export default Items;
