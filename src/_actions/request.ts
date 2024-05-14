"use client";

import { RequestPropsWithId } from "@/entities/request";
import { db, storage } from "@/_firebase/config";

export async function SendRequest(request: RequestPropsWithId) {
  let doc = String(request.id)
  const uploadImages = async () => {
    let storageRef = storage.ref();
    let uploadPromises = [];
    request.date = request.date
    for (let image of request.images) {
      let time = String(new Date().getTime())
      let ref = `images/${time}.png`;
      if (image.blob) {
        const file = new Blob([image?.blob], { type: image?.blob?.type });
        uploadPromises.push(storageRef.child(ref).put(file));
        image.imageUrl = ref;
        image.blob = null;
      }
    }
    request.status = 0
    await Promise.all(uploadPromises);
  };

  try {
    await uploadImages();
    await db.collection("requests").doc(doc).set(request);
  } catch (error) {
    console.log(error);
  } finally {
  }
}
