import { db } from "@/_firebase/config";

export async function addUser() {
    try {
      const docRef = await db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }