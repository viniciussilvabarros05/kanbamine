import { db } from "@/_firebase/config";

export async function addUser() {
    try {
      const docRef = await db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }