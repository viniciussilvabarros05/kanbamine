import { Props } from "./greenLabel";

const OrangeLabel = ({description}: Props) => {
    return (
      <label
        className={
          "flex justify-center w-[100px] text-[0.8rem] font-medium border-orange_300 border text-orange_300 bg-orange_100 rounded-sm transition-all duration-300 "
        }
      >
        {description}
      </label>
    );
  };
  
  export default OrangeLabel;
  