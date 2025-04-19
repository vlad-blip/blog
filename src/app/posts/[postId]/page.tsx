import { type Post } from "@prisma/client";
import { prisma } from "../../../../prisma";

import ReactMarkdown from "react-markdown";

const APP_HOST = process.env.NEXT_PUBLIC_APP_HOST;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const response = await fetch(`${APP_HOST}/api/posts/${postId}`, {
    next: { revalidate: 60 },
  });

  const post = await response.json();

  return (
    <div className="bg-neutral-100 p-10 rounded-md">
      <h1 className="font-bold text-2xl mb-5">{post?.title}</h1>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
