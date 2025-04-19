"use client";

import PostForm from "../components/post-form";
import { Post } from "@/lib/schemas/posts";

async function createPost(post: Post) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || "Failed to create post");
  }

  return response.json();
}

export default function NewPost() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <PostForm requestHandler={createPost} />
    </div>
  );
}
