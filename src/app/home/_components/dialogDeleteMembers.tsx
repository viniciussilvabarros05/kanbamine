import { UserMinus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/entities/user";
import { ListUsers } from "../tasks/_components/listUsers";
import { useState, useEffect } from "react";
import { deleteUser } from "@/_actions/deleteUser";
import { db } from "@/_firebase/config";

const DialogDeleteMembers = () => {
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const listUsers: User[] = [];
      snapshot.forEach((doc) => {
        listUsers.push(doc.data() as User);
      });
      setUsers(listUsers);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer h-full w-full py-2 px-4 hover:bg-grey_100 transition-all">
          <UserMinus className="text-destructive" />
          <p className="text-[0.8rem] text-destructive">Remova membros</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Remova um membro</DialogTitle>
          <DialogDescription>
            Aqui você pode remover membros da equipe
          </DialogDescription>
        </DialogHeader>
        <ListUsers users={users} action={deleteUser} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteMembers;
