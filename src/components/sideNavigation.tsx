"use client";
import Image from "next/image";
import { Calendar, ClipboardListIcon, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavigation = () => {
  const pathname = usePathname();
  let activeLink = (href: string) =>
    pathname === href
      ? "text-primary bg-background"
      : "bg-foreground text-border";
  return (
    <div className="z-50 bg-foreground h-full shadow-md w-[200px] fixed top-0 left-0 pl-[1rem] py-[1.4rem] flex flex-col gap-4">
      <Image
        src="/logo.svg"
        width={137}
        height={21}
        alt="midiaboard"
        className="w-[90%] mb-[3rem]"
      />

      <Link href="/home">
        <Button
          className={`${activeLink(
            "/home"
          )} hover:text-primary hover:bg-background w-[90%] flex items-center justify-start`}
        >
          <LayoutDashboard className="pr-[0.5rem]" size={28} />
          <p>Pedidos</p>
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
      <Button
        className={`bg-foreground text-border hover:text-primary hover:bg-background w-[90%] flex items-center justify-start`}
      >
        <LayoutDashboard className="pr-[0.5rem]" size={28} />
        <p>Logout</p>
      </Button>
    </div>
  );
};

export default SideNavigation;
