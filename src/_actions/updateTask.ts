"use client"

import { TaskProps } from "@/entities/task";
import { db } from "@/_firebase/config";

export async function UpdateTask(task:TaskProps) {
  try {
    const docRef = await db.collection("tasks").doc(task.id).update(task);

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
