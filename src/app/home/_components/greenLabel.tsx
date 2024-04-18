import { cn } from "@/lib/utils";

export interface Props {
    description: string
    className?:string;
}

const GreenLabel = ({description, className}: Props) => {
  return (
    <label
      className={
        cn("flex justify-center items-center  w-full text-[0.8rem] font-medium border-green_300 border text-green_300 bg-green_100 rounded-sm transition-all duration-300 ", className)
      }
    >
      {description}
    </label>
  );
};

export default GreenLabel;
