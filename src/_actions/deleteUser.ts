"use client"
import { User } from "@/entities/user";
import { db } from "@/_firebase/config";

export async function deleteUser(user: User) {
  try {
    const docRef = await db.collection("users").where("id", "==", user.id).get();

    docRef.docs.forEach(async doc=>{
      await db.collection("users").doc(doc.id).delete()
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
