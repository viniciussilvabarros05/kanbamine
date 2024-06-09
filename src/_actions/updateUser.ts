import { db } from "@/_firebase/config";

interface Props {
  id: string;
  name:string;
}
export async function updateUser({ id,name }: Props) {
  try {
    const docRef = await db.collection("users").where("id", "==", id).get();

    docRef.docs.forEach(async doc=>{
      await db.collection("users").doc(doc.id).set({name})
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
