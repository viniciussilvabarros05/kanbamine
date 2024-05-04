"use client";

import { ImagesProps, RequestProps } from "@/entities/request";
import { auth, db, storage } from "@/_firebase/config";

export async function SendRequest(request: RequestProps) {
  let doc = String(new Date().getTime())
  const uploadImages = async () => {
    let storageRef = storage.ref();
    let uploadPromises = [];
    request.date = request.date
    for (let image of request.images) {
      let ref = `images/${doc}.png`;
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
