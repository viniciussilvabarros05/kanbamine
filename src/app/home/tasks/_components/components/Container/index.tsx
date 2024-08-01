import React from "react";
import ContainerProps from "./container.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Button } from "../Button";
import { Separator } from "@/components/ui/separator";

const Container = ({
  id,
  children,
  title = "default",
  description,
  onAddItem,
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  const variantsColorsContainer: any = {
    "Para Fazer": "red_300",
    Andamento: "orange_300",
    Concluidas: "green_300",
    default: "zinc-400",
  };
  const backgroundColor = `bg-${variantsColorsContainer[title]}`
  const textColor = `text-${variantsColorsContainer[title]}`
  const borderColor = `gradient-${variantsColorsContainer[title]}`
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full p-4 bg-[#FDFDFD] rounded-xl flex flex-col gap-y-4 border-2",
        isDragging && "opacity-50", borderColor
      )}
    >
      <div className="flex gap-2 items-center">
        <div className={`size-2 rounded-full ${backgroundColor}`}>

        </div>
        <h2 className={`${textColor} font-medium`}>
          {title}
        </h2>

      </div>
      <Separator className={`${backgroundColor}`}/>
      {children}
    </div>
  );
};

export default Container;
