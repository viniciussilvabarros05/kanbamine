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
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full p-4 bg-[#FDFDFD] rounded-xl flex flex-col gap-y-4",
        isDragging && "opacity-50",
        `border-${variantsColorsContainer[title]} border-2`
      )}
    >
      <div className="flex gap-2 items-center">
        <div className={`size-2 rounded-full bg-${variantsColorsContainer[title]}`}>

        </div>
        <h2 className={`text-${variantsColorsContainer[title]} font-medium`}>
          {title}
        </h2>

      </div>
      <Separator className={`bg-${variantsColorsContainer[title]}`}/>
      {children}
    </div>
  );
};

export default Container;
