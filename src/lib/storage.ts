
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPublicFile(key: string, buffer: Buffer, contentType: string) {
  const dataUri = `data:${contentType};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    public_id: key,
    overwrite: true,
    resource_type: "image",
  });

  return result.secure_url;
}

export async function deletePublicFile(key: string) {
  await cloudinary.uploader.destroy(key, { resource_type: "image" });
}