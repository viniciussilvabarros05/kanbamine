"use client"

import { db } from "@/_firebase/config";
import {v4 as uuidv4} from 'uuid'
export async function CreateTask() {
  try {
    const id = `item-${uuidv4()}`
    const docRef = await db.collection("tasks").doc(id).set({
      attributed: "Lovelace",
      date: "16 de maio de 2024 às 00:00:00 UTC-3",
      deadline: " 21 de maio de 2024 às 00:00:00 UTC-3",
      description: "Descrição teste",
      requestId: "1715728664036",
      status: "0",
      progress: "1",
      title: "Teste de Titulo 2",
      id,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
