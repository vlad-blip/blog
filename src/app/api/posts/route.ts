import { prisma } from "../../../../prisma";
import { postSchema } from "@/lib/schemas/posts";
import { Prisma } from "@prisma/client";
import { prismaError } from "@/lib/prisma/error";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();

    return Response.json(posts);
  } catch (e) {
    console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return prismaError(e);
    }

    throw e;
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const { success, error, data } = postSchema.safeParse(res);

    if (!success) {
      return Response.json(
        {
          error: "Validation failed",
          issues: error.errors,
        },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data,
    });

    return Response.json(post);
  } catch (e) {
    console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return prismaError(e);
    }

    throw e;
  }
}
