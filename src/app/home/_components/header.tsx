import { User2Icon } from "lucide-react";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex fixed top-0 w-full left-[0] bg-white p-4 text-[#272727]">
      <h1 className="ml-[200px] text-2xl font-bold">{title}</h1>
      <div className="ml-auto mr-4 flex gap-2">
        <User2Icon
          size={30}
          className="text-secondary border-2 rounded-full border-primary"
        />
        <div className="flex flex-col">
          <p className="text-[#474747] text-sm">Midia Área 5</p>
          <p className="text-[#474747] opacity-50 text-[0.8rem]">Admin</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
