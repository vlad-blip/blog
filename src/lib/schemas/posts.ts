import { z } from "zod"

export const postSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters").max(50000, "Content is too long"),
})

export type Post = z.infer<typeof postSchema>