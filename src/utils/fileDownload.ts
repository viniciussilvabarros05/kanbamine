import { ImagesProps } from "@/entities/request";

import JSZip from "jszip";

export function FileDownload(url: string, fileName: string) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao baixar a imagem");
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.error("Erro ao baixar a imagem:", error);
    });
}

export function downloadFilesAsZip(images: ImagesProps[]) {
  const zip = new JSZip();
  const files: any = [];
  const promises: any = [];
  images.forEach((image, index) => {
    promises.push(
      fetch(image.imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao baixar a imagem");
          }
          return response.blob();
        })
        .then((blob) => {
          return {
            name: `${image.description || "image" + (index + 1)}.png`,
            blob,
          };
        })
        .catch((error) => {
          console.error("Erro ao baixar a imagem:", error);
        })
    );
  });
  Promise.all(promises).then((files) => {
    files.forEach((file: any) => {
      zip.file(file.name, file.blob);
    });

    zip
      .generateAsync({ type: "blob" })
      .then((blob: any) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "arquivos.zip";
        link.click();
        window.URL.revokeObjectURL(link.href);
      })
      .catch((error: any) => {
        console.error("Erro ao gerar o arquivo ZIP:", error);
      });
  });
}
