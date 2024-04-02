import toast from "react-hot-toast";

const getDefaultFilename = (url: string) => {
  const slashPos = url.lastIndexOf("/");
  const filename = url.substring(slashPos);

  return filename;
};

export function fileDownloader(href: string, filename?: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    fetch(href)
      .then((resp: Response) => {
        if (resp.status !== 200) {
          return Promise.reject("something went wrong");
        }
        return resp.blob();
      })
      .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.classList.add("hidden");
        anchor.href = url;

        anchor.download = filename || getDefaultFilename(url);
        anchor.click();

        window.URL.revokeObjectURL(url);
        resolve(blob);
      })
      .catch((error: Error) => {
        toast.error("Erro ao baixar documento");
        reject(error);
      });
  });
}
