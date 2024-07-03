"use client"
import { TaskProps } from "@/entities/task";
import { db } from "@/_firebase/config";

export async function deleteTasks(task: TaskProps) {
  try {
    await db.collection("tasks").doc(task.id).delete()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
