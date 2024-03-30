"use client"

import { db } from "@/_firebase/config";
import { collection, addDoc } from "firebase/firestore";
const DashboardPage = () => {
  async function addUser() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <button onClick={addUser}>Adicionar usuario</button>
    </div>
  );
};

export default DashboardPage;
