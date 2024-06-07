import { db } from "@/_firebase/config";
import { v4 as uuidV4 } from "uuid";

interface Props {
  name: string;
}
export async function addUser({ name }: Props) {
  let id = uuidV4();
  try {
    const docRef = await db.collection("users").add({
      id,
      name,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
