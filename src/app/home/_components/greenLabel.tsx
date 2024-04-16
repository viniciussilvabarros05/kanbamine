
export interface Props {
    description: string
}

const GreenLabel = ({description}: Props) => {
  return (
    <label
      className={
        "flex justify-center w-[100px] text-[0.8rem] font-medium border-green_300 border text-green_300 bg-green_100 rounded-sm transition-all duration-300 "
      }
    >
      {description}
    </label>
  );
};

export default GreenLabel;
