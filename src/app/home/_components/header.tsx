"use client"

import { User2Icon, ChevronDown} from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

import DialogAddMembers from "./dialogAddMembers";
import DialogDeleteMembers from "./dialogDeleteMembers";
interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex fixed top-0 w-full left-[0] bg-white p-4 text-[#272727] z-40">
      <h1 className="ml-[200px] text-2xl font-bold">{title}</h1>

      <Popover>
        <PopoverTrigger asChild>
          <div className="ml-auto mr-4 flex gap-2 cursor-pointer items-center">
            <User2Icon
              size={35}
              className="text-secondary border-2 rounded-full border-primary"
            />
            <div className="flex flex-col">
              <p className="text-[#474747] text-sm">Midia Área 5</p>
              <p className="text-[#474747] opacity-50 text-[0.8rem]">Admin</p>
            </div>
            <ChevronDown
              size={15}
              className="text-gray-800"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="border-grey_100 w-[180px] p-0 border-none overflow-hidden">
            <DialogAddMembers/>
            <DialogDeleteMembers/>
        </PopoverContent>
      </Popover>
     
    </header>
  );
};

export default Header;
