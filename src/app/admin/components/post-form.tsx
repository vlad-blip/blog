"use client";

import type React from "react";

import { ChangeEvent, useState } from "react";
import { Post, postSchema } from "@/lib/schemas/posts";
import { type Post as TDBPost } from "@prisma/client";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

interface IPostFormProps {
  requestHandler: (payload: Post) => Promise<null | TDBPost>;
  post?: TDBPost | null;
}

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

export default function PostForm({ post, requestHandler }: IPostFormProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [formError, setFormError] = useState<{
    title?: string;
    content?: string;
  }>({
    title: "",
    content: "",
  });

  const handleEditorChange = ({ text }: { text: string }) => {
    validateContent(text);
    setContent(text);
  };

  function validateContent(content: string) {
    const contentSchema = postSchema.pick({ content: true });

    const { error } = contentSchema.safeParse({ content });

    setFormError((prev) => ({
      ...prev,
      content: error?.errors?.at(0)?.message,
    }));
  }

  function changeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);

    const titleSchema = postSchema.pick({ title: true });

    const { error } = titleSchema.safeParse({ title: e.target.value });

    setFormError((prev) => ({ ...prev, title: error?.errors?.at(0)?.message }));
  }

  function clearFormHandler() {
    setTitle("");
    setContent("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await requestHandler({ title, content });

      setFormError({
        title: "",
        content: "",
      });

      toast("Post added successfully");
    } catch (error) {
      console.error(error);

      toast(`${error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={changeTitleHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
          required
        />
        {formError.title && <p className="text-red-500">{formError.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <MarkdownEditor
            value={content}
            onChange={handleEditorChange}
            style={{ height: "400px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            className="markdown-editor"
          />
        </div>
        {formError.content && (
          <p className="text-red-500">{formError.content}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          disabled={
            Boolean(formError.content) ||
            Boolean(formError.title) ||
            !title ||
            !content
          }
          type="submit"
          className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          Submit Post
        </button>
        <button
          disabled={!content && !title}
          onClick={clearFormHandler}
          className="cursor-pointer px-6 py-2 border-1 border-black text-black rounded-md disabled:cursor-not-allowed disabled:bg-neutral-200"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
