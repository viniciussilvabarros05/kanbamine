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

const DialogDeleteMembers = () => {
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
          <DialogTitle className="text-gray-800">
            Remova um membro
          </DialogTitle>
          <DialogDescription>
            Aqui você pode remover membros da equipe
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left text-gray-800">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3 bg-transparent  text-gray-800"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="destructive">Remover</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteMembers;
