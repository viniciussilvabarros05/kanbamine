"use client"

import { TaskProps } from "@/entities/task";
import { db } from "@/_firebase/config";

export async function CreateTask(task: TaskProps) {
  try {

    const docRef = await db.collection("tasks").doc(task.id).set(task);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
