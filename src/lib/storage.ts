// lib/storage.ts
//
// Free image storage for the company logo, via Cloudinary's free tier
// (25GB storage + 25GB bandwidth/month, no card required):
//   1. Sign up at https://cloudinary.com
//   2. Grab Cloud name / API key / API secret from the dashboard
//   3. npm i cloudinary
//   4. Set env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
//
// Note: this is only used for the logo. Knowledge documents are never
// stored here — they're forwarded straight to your FastAPI ingestion
// service (see app/api/knowledge/upload/route.ts), nothing is persisted
// on the Next.js side for those.

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