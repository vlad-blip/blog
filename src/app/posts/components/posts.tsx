import { type Post as TPost } from "@prisma/client";

import Post from "./post";

export default function Posts({
  posts,
  onDelete,
}: {
  posts: TPost[];
  onDelete: (postId: string) => void;
}) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 bg-neutral-200 p-6 rounded-md">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
