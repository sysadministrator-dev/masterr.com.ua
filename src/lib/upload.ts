import { put } from "@vercel/blob";

export async function saveUploadedFile(file: File): Promise<string> {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  const blob = await put(filename, file, { access: "public" });

  return blob.url;
}

export function isUploadableFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}
