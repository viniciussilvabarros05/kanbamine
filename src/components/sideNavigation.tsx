"use client";
import Image from "next/image";
import { Calendar, ChevronRight, ClipboardListIcon, LogOutIcon, User2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/authContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DialogAddMembers from "@/app/home/_components/dialogAddMembers";
import DialogDeleteMembers from "@/app/home/_components/dialogDeleteMembers";

const SideNavigation = () => {
  const pathname = usePathname();
  const {SignOut, user} = useAuth()
  let activeLink = (href: string) =>
    pathname === href
      ? "text-primary bg-background"
      : "bg-foreground text-border";
  return (
    <div className="z-50 bg-foreground h-full shadow-md w-[200px] fixed top-0 left-0 pl-[1rem] py-3 flex flex-col gap-4">
      <Image
        src="/logo.svg"
        width={137}
        height={21}
        alt="midiaboard"
        className="w-[90%] mb-[2rem]"
      />
      <Link href="/home/tasks">
        <Button
          className={`${activeLink(
            "/home/tasks"
          )} hover:text-primary hover:bg-background w-[90%] flex items-center justify-start`}
        >
          <ClipboardListIcon className="pr-[0.5rem]" size={28} />
          <p>Tarefas</p>
        </Button>
      </Link>

      <Link href="/home/calendar">
        <Button
          className={`${activeLink(
            "/home/calendar"
          )} hover:text-primary hover:bg-background w-[90%] flex items-center justify-start`}
        >
          <Calendar  className="pr-[0.5rem]" size={28} />
          <p>Calendário</p>
        </Button>
      </Link>
     
      <Button
        onClick={SignOut}
        className={`bg-foreground text-border hover:text-primary hover:bg-background w-[90%] flex items-center justify-start`}
      >
        <LogOutIcon className="pr-[0.5rem]" size={28} />
        <p>Logout</p>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <div className="mt-auto flex gap-2 cursor-pointer items-center w-32 relative">
            <User2Icon
              size={35}
              className="text-secondary border-2 rounded-full border-primary shrink-0"
            />
            <div className="flex flex-col w-full">
              <p className="text-[#474747] text-sm truncate">{user?.email}</p>
              <p className="text-[#474747] opacity-50 text-[0.8rem]">Admin</p>
            </div>
            <ChevronRight
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
     
    </div>
  );
};

export default SideNavigation;
