import React from "react";
import ContainerProps from "./container.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

const Container = ({
  id,
  children,
  title,
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
 
  function changeColor(){
    
    const variantsColorsContainer: Record<string, string> = {
      "container-1": "-red_300",
      "container-2": "-orange_300",
      "container-3": "-green_300",
      default: "-zinc-400"
    };

    const variantColor = id? variantsColorsContainer[id]: variantsColorsContainer.default;
    const backgroundColor = `bg${variantColor}`;
    const textColor = `text${variantColor}`;
    const borderColor = `gradient${variantColor}`;

    return( {textColor, borderColor, backgroundColor})
  }

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
        isDragging && "opacity-50", changeColor().borderColor
      )}
    >
      <div className="flex gap-2 items-center">
        <div className={clsx("size-2 rounded-full", changeColor().backgroundColor)}/>
        <h2 className={clsx(changeColor().textColor,"font-medium")}>
          {title}
        </h2>

      </div>
      <Separator className={clsx(changeColor().backgroundColor)}/>
      {children}
    </div>
  );
};

export default Container;
