import { RequestPropsWithId, status } from "@/entities/request";
import { db } from "@/_firebase/config";

interface Props{
    id: string;
    status: status;
}

export async function ChangeStatus({id, status}: Props){
  
    await db.collection("requests").doc(id).update({
        status: Number(status)
    })
   
}