"use client"

import { Dialog,DialogTrigger, } from "@/components/ui/dialog";
import ModelCreateTasks from "../tasks/_components/modelCreateTasks";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex fixed top-0 w-full left-[0] bg-white p-4 text-[#272727] border-b border-zinc-100 z-40">
      <h1 className="ml-[200px] text-2xl font-bold">{title}</h1>
      <div className="flex w-80 ml-6 rounded-full border border-primary overflow-hidden px-4 items-center justify-between">
        <input type="text" placeholder="Procurar tarefas" className="border-none outline-none "/>
        <Search className="size-5 text-zinc-500"/>
      </div>
      <Dialog >
          <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-accent w-[120px] ml-auto h-[30px] rounded-sm"
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
