"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import  ModelDialogContent  from "./_components/modelDialogContent";
import { Download, FolderDown } from "lucide-react";
import { useState } from "react";
import GreenLabel from "./_components/greenLabel";
import Header from "./_components/header";
import OrangeLabel from "./_components/orangeLabel";
import RedLabel from "./_components/redLabel";
const DashboardPage = () => {
  const [activeButton, setActiveButton] = useState("");
  const activeButtons = {
    red: "bg-red_100 ",
    orange: "bg-orange_100 ",
    grey: "bg-grey_100 ",
  };

  function HandleFilterButton(value: string) {
    setActiveButton(value);
  }

  return (
    <>
      <Header title="Pedidos" />
      <Card className="m-auto flex w-full h-[75vh] p-4 flex-col">
        <div className="w-full flex gap-2">
          <button
            onClick={() => HandleFilterButton("1")}
            className={`${
              activeButton == "1" && activeButtons.red
            } " p-2 text-sm font-medium border-red_300 text-red_300 border rounded-sm transition-all duration-300 "`}
          >
            Urgentes
          </button>
          <button
            onClick={() => HandleFilterButton("2")}
            className={`${
              activeButton == "2" && activeButtons.orange
            } " p-2 text-sm font-medium border-orange_300 text-orange_300 border rounded-sm transition-all duration-300 "`}
          >
            Pouco urgentes
          </button>
          <button
            onClick={() => HandleFilterButton("3")}
            className={`${
              activeButton == "3" && activeButtons.grey
            } " p-2 text-sm font-medium border-grey_300 border text-grey_300 rounded-sm transition-all duration-300 "`}
          >
            Não urgentes
          </button>
        </div>
        <Dialog>
          <Table className="mt-4">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nº</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-left">Data</TableHead>
                <TableHead className="text-center w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <DialogTrigger asChild>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell className="text-left">John Doe</TableCell>
                  <TableCell className="text-left">(98)9 99999999</TableCell>
                  <TableCell className="text-left">
                    14 de Janeiro de 2024
                  </TableCell>
                  <TableCell className="text-center">
                    <RedLabel description="Para fazer" />
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogTrigger asChild>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell className="text-left">John Doe</TableCell>
                  <TableCell className="text-left">(98)9 99999999</TableCell>
                  <TableCell className="text-left">
                    14 de Janeiro de 2024
                  </TableCell>
                  <TableCell className="text-center  ">
                    <OrangeLabel description="Andamento" />
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell className="text-left">John Doe</TableCell>
                <TableCell className="text-left">(98)9 99999999</TableCell>
                <TableCell className="text-left">
                  14 de Janeiro de 2024
                </TableCell>
                <TableCell className="text-center">
                  <GreenLabel description="Concluido" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ModelDialogContent />
        </Dialog>
      </Card>
    </>
  );
};

export default DashboardPage;
