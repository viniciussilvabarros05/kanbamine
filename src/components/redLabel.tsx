import { cn } from "@/lib/utils";
import { Props } from "./greenLabel";

const RedLabel = ({description, className, onClick}: Props) => {
    return (
      <label
      onClick ={onClick}
        className={
          cn("flex justify-center w-full items-center text-[0.8rem] font-medium border-red_300 border text-red_300 bg-red_100 rounded-sm transition-all duration-300 ", className)
        }
      >
        {description}
      </label>
    );
  };
  
  export default RedLabel;
  