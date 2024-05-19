"use client"

import { db } from "@/_firebase/config";
export async function UpdateTask(id:string, progress:string, index?:number) {
  try {
    const docRef = await db.collection("tasks").doc(id).update({
        progress
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
