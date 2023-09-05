import "@uploadthing/react/styles.css";
import { PrismaClient } from "@prisma/client";
import UploadImage from "../components/uploadImage";
import Image from "next/image";

export default async function Home() {
  const prisma = new PrismaClient();
  const images = await prisma.image.findMany({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}
