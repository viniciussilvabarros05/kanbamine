"use client"

import { Dialog,DialogTrigger, } from "@/components/ui/dialog";
import ModelCreateTasks from "../tasks/_components/modelCreateTasks";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex fixed top-0 w-full left-[0] bg-white p-4 text-[#272727] border-b border-zinc-100 z-40">
      <h1 className="ml-[200px] text-2xl font-bold">{title}</h1>
      <Dialog >
          <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-accent w-[120px] ml-auto mr-[10px] h-[30px] rounded-sm"
          >
            + Criar Tarefa
          </Button>
          </DialogTrigger>
          <ModelCreateTasks/>
      </Dialog>
    </header>
  );
};

export default Header;
