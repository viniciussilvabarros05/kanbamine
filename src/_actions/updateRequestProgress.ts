"use client"

import { db } from "@/_firebase/config";
export async function UpdateRequestProgress(id:string, progress:string) {
  try {
    const docRef = await db.collection("requests").doc(id).update({
        progress
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
