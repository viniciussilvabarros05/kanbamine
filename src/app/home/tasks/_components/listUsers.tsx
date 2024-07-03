import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { User as UserProps } from "@/entities/user";
import {  useMemo } from "react";

interface Props {
  users: UserProps[];
  action?: (user: UserProps) => void;
}
export function ListUsers({ users, action }: Props) {

  const listUsers = useMemo(()=> {
    return users
  }, [users]);

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Procurar membro" />
      <CommandList>
        <CommandEmpty>Nenhum membro encontrado</CommandEmpty>
        <CommandGroup heading="Membros">
          {listUsers?.map((user) => {
            return (
              <CommandItem key={user.id} className="p-0 px-1 h-[28px]">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarFallback className=" bg-primary text-[0.6rem] text-white border-white border">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span
                  className="w-full h-full m-auto flex items-center justify-start"
                  onClick={() => action && action(user)}
                >
                  {user.name}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
