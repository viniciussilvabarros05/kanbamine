"use client";

import { ImagesProps, RequestProps } from "@/entities/request";
import { auth, db, storage } from "@/_firebase/config";

export async function SendRequest(request: RequestProps) {
  const uploadImages = async () => {
    let storageRef = storage.ref();
    let uploadPromises = [];

    for (let image of request.images) {
      let ref = `images/${new Date().getTime()}.png`;
      if (image.blob) {
        const file = new Blob([image?.blob], { type: image?.blob?.type });
        uploadPromises.push(storageRef.child(ref).put(file));
        image.imageUrl = ref;
        image.blob = null;
      }
    }
    await Promise.all(uploadPromises);
  };

  try {
    await uploadImages();
    await db.collection("requests").add(request);
  } catch (error) {
    console.log(error);
  } finally {
  }
}
