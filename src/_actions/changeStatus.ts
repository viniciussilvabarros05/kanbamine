import { RequestPropsWithId, status } from "@/entities/request";
import { db } from "@/_firebase/config";

interface Props{
    request: RequestPropsWithId;
    status: status;
}

export async function ChangeStatus({request, status}: Props){
  
    await db.collection("requests").doc(request.id).update({
        status: Number(status)
    })
   
}