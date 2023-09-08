import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {  
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
  videoUploader: f({ video: { maxFileSize: "16MB" } })
    .onUploadComplete(async ({ metadata, file }) => {  
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
}
