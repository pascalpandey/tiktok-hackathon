"use client";

import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";

export default function UploadImage() {
  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          // Do something with the response
          console.log("Files: ", res);
          
          await fetch("/api/images", {
            method: "POST", 
            body: JSON.stringify(res[0].fileUrl),
          });

          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}   
      />
    </>
  );
}
