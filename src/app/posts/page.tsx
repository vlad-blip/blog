"use client";

import { type Post as TPost } from "@prisma/client";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Posts from "./components/posts";

export default function PostsPage() {
  const [posts, setPosts] = useState<TPost[] | []>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async (signal: AbortSignal) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/posts`, {
        next: { revalidate: 60 },
        signal,
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.name !== "AbortError") {
        toast(`Error loading posts: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  async function deletePostHandler(postId: string) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      setPosts((prevPosts) => [
        ...prevPosts.filter((post) => post.id !== postId),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error removing post: ${error.message}`);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    getPosts(controller.signal);

    return () => controller.abort();
  }, [getPosts]);

  if (loading) return <div>Loading...</div>;
  if (!posts.length) return <div>No posts</div>;

  return (
    <div>
      <Posts posts={posts} onDelete={deletePostHandler} />
    </div>
  );
}
