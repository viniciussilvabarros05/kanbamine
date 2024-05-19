import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import { DialogClose } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

import { User as UserProps } from "@/entities/user";

interface Props {
  users: UserProps[];
  action?: (user:UserProps)=>void;
}
export function ListUsers({users, action}:Props) {
  


  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Procurar membro" />
      <CommandList>
        <CommandEmpty>Nenhum membro encontrado</CommandEmpty>
        <CommandGroup heading="Membros">
          {users?.map((user) => {
            return (
              <CommandItem key={user.id}>
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarFallback className=" bg-primary text-[0.6rem] text-white border-white border">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="w-full h-full" onClick={()=> action && action(user)}>{user.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
