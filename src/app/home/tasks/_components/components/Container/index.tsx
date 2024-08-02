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

    const variantsColorsBg: Record<string, string> = {
      "container-1": "bg-red_300",
      "container-2": "bg-orange_300",
      "container-3": "bg-green_300",
      default: "-zinc-400"
    };
    const variantsColorsText: Record<string, string> = {
      "container-1": "text-red_300",
      "container-2": "text-orange_300",
      "container-3": "text-green_300",
      default: "text-zinc-400"
    };
    const variantsColorsBorder: Record<string, string> = {
      "container-1": "gradient-red_300",
      "container-2": "gradient-orange_300",
      "container-3": "gradient-green_300",
      default: "-zinc-400"
    };

    const backgroundColor = id? variantsColorsBg[id]: variantsColorsBg.default;
    const textColor = id? variantsColorsText[id]: variantsColorsText.default;
    const borderColor = id? variantsColorsBorder[id]: variantsColorsBorder.default;

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
