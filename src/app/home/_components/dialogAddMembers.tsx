import { UserPlus } from "lucide-react";

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
import { addUser } from "@/_actions/addUser";
import {  useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/authContext";
const DialogAddMembers = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  function handleAddUser() {
    if (user) {
      const { uid } = user;
      addUser({ name, userId:uid }).then(() => {
        toast({
          title: "Usuário adicionado com sucesso",
          description: "Novo membro na equipe!",
          action: (
            <ToastAction altText="clique em fechar para sumir o aviso">
              fechar
            </ToastAction>
          ),
        });
        setName("");
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer h-full w-full py-2 px-4 hover:bg-grey_100 transition-all">
          <UserPlus className="text-primary" />
          <p className="text-[0.8rem] text-primary">Adicionar membros</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            Adicione um membro
          </DialogTitle>
          <DialogDescription>
            Aqui você pode adicionar novos membros a equipe
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="name" className="text-left text-gray-800">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3 bg-transparent  text-gray-800"
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddUser}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddMembers;
