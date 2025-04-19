"use client";

import { type Post } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IPostProps {
  post: Post;
  onDelete: (postId: string) => void;
}

const MAX_EXCERPT_LENGTH = 20;

export default function Post({ post, onDelete }: IPostProps) {
  const router = useRouter();
  const session = useSession();

  const excerpt = post.content.substring(0, MAX_EXCERPT_LENGTH);

  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex justify-between items-start gap-4 bg-white rounded-md p-4 cursor-pointer hover:bg-neutral-100 h-full">
        <div>
          <h3 className="font-bold mb-2">{post.title}</h3>

          <ReactMarkdown>
            {excerpt.length >= MAX_EXCERPT_LENGTH ? `${excerpt}...` : excerpt}
          </ReactMarkdown>
        </div>
        {session.status === "authenticated" && (
          <div className="flex gap-2 items-center">
            <button className="hover:bg-white p-1 rounded-md cursor-pointer">
              <Trash2
                onClick={(event) => {
                  event.preventDefault();
                  onDelete(post.id);
                }}
              />
            </button>
            <button
              className="hover:bg-white p-1 rounded-md cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                router.push(`/admin/edit-post/${post.id}`);
              }}
            >
              <Edit />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
