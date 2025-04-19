"use client";

import { type Post as TDBPost } from "@prisma/client";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import PostForm from "../../components/post-form";

import { useEffect, useState, useCallback } from "react";

import { Post } from "@/lib/schemas/posts";

export default function EditPost() {
  const { postId } = useParams();

  const [post, setPost] = useState<TDBPost | null>(null);
  const [loading, setLoading] = useState(false);

  async function editPost(post: Post) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Failed to edit post");
    }

    return response.json();
  }

  const getPost = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();

      setPost(data);
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.name !== "AbortError") {
        toast(`Error loading posts: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      <PostForm post={post} requestHandler={editPost} />
    </div>
  );
}
