import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        console.log(contentType?.startsWith("image/"))
        return contentType?.startsWith("image/");

      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
