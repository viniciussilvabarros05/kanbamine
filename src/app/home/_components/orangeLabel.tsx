import { cn } from "@/lib/utils";
import { Props } from "./greenLabel";

const OrangeLabel = ({description, className}: Props) => {
    return (
      <label
        className={
          cn("flex justify-center items-center  w-full text-[0.8rem] font-medium border-orange_300 border text-orange_300 bg-orange_100 rounded-sm transition-all duration-300 ", className)
        }
      >
        {description}
      </label>
    );
  };
  
  export default OrangeLabel;
  