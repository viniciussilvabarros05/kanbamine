"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Separator } from "@/components/ui/separator";
import { Plus, CircleX, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { InputDate } from "@/components/inputDate";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SendRequest } from "@/_actions/request";
import { Button } from "@/components/ui/button";
import { auth } from "@/_firebase/config";
import { InputNumber } from "@/components/inputNumber";

const FormRequest = () => {
  const [images, setImages] = useState<
    { description: string; imageUrl: string; blob: File }[]
  >([]);
  const [isLoading, setIsloading] = useState(false);
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Informe seu nome",
    }),
    phone: z.string().min(11, { message: "Número de celular incorreto" }),
    date: z.string().min(10, { message: "Obrigatório informar a data" }),
    time: z.string().min(5, { message: "Informe o horário" }),
    objective: z.string().min(1, { message: "Informe o objetivo do evento" }),
    theme: z.string().min(1, { message: "Informe o tema do evento" }),
    description: z.string().min(1, { message: "Descreva brevemente o evento" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Teste",
      phone: "98989898989898",
      date: "12-06-2024",
      time: "Teste",
      objective: "Teste",
      theme: "Teste",
      description: "Teste",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true);
    try {
      const dataString = values.date;
      const [dia, mes, ano] = dataString.split("-");
      const date = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
      ).toISOString();
      await SendRequest({ ...values, images, date, status: 0 });
      setImages([]);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    auth
      .signInAnonymously()
      .then((credentials) => {
        console.log(credentials);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }, []);

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <Card className="w-[60%] m-auto flex flex-col items-center p-4 max-[600px]:w-full max-[600px]:h-full relative overflow-hidden">
        <Image
          src="/logo.svg"
          width={137}
          height={21}
          alt="midiaboard"
          className="w-[40%] mb-4"
        />
        <Separator className="bg-gray-300 mb-4" />
        <div className="flex flex-row w-full gap-4 max-[600px]:flex-col-reverse">
          <div className="flex flex-col w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="gap-8 flex flex-row max-[600px]:flex-col-reverse"
              >
                <div className="w-[100%]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Seu nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Telefone para contato
                        </FormLabel>
                        <FormControl>
                          <InputNumber
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Data do evento
                        </FormLabel>
                        <FormControl>
                          <InputDate
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-1 mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Horário
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="objective"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Objetivo
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Tema
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.8rem] text-primary">
                          Descrição do evento
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 outline-none border border-primary rounded-sm px-2 py-[0.5rem] mb-2 w-full bg-white"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.8rem]" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4 w-full">
                    Enviar
                  </Button>
                </div>

               

                <Carousel className="w-[100%]  mb-4">
                  <div className="text-primary text-[0.8rem] w-full flex justify-between mb-4">
                    Fotos para a Arte
                    <Button className="px-2 py-1" type="button">
                      <label htmlFor="input-image" className="cursor-pointer flex gap-2">
                        <Plus className="text-white" size={20} />
                        Adicionar Foto
                      </label>
                      <input
                        id="input-image"
                        placeholder="Descrição da foto"
                        type="file"
                        accept="image/png, image/jpg"
                        className="hidden"
                        onClick={(e: any) => (e.target.value = null)}
                        onChange={(e: any) =>
                          e.target.files.length > 0 &&
                          setImages([
                            ...images,
                            {
                              imageUrl: URL?.createObjectURL(e?.target?.files[0]),
                              blob: e?.target?.files[0],
                              description: "",
                            },
                          ])
                        }
                      />
                    </Button>
                  </div>
                  <CarouselContent>
                    {images?.map((image, index) => (
                      <CarouselItem key={index} className="basis-[80%]">
                        <div className="p-1">
                          <Card className="mt-4">
                            <CardContent className="flex aspect-square flex-col items-center justify-center p-6 relative">
                              <CircleX
                                className="text-red_300 absolute top-4 right-4"
                                onClick={() =>
                                  setImages((old) =>
                                    old?.filter((item, i) => index != i)
                                  )
                                }
                              />
                              <img src={image.imageUrl} alt="previsualização" className="w-[200px] h-[200px] object-contain" />
                              <input
                                placeholder="Descrição da foto"
                                value={image.description}
                                type="text"
                                onChange={(e) =>
                                  setImages((old) =>
                                    old?.map((item, i) =>
                                      index == i
                                        ? {
                                            ...item,
                                            description: e.target.value,
                                          }
                                        : item
                                    )
                                  )
                                }
                                className="border-primary outline-none  border-b border-0  mt-auto py-1 px-2 w-[100%]"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </form>
            </Form>
          </div>
        </div>
        {isLoading && (
          <div className="h-full w-full absolute bg-black opacity-[0.3] top-0 flex items-center justify-center">
            <LoaderCircle size={50} className="animate-spin text-white" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default FormRequest;
