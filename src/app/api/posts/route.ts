import { prisma } from '../../../../prisma'
import { postSchema } from '@/lib/schemas/posts';

export async function GET() {
    const posts = await prisma.post.findMany();

    return Response.json(posts)
}

export async function POST(request: Request) {
    const res = await request.json();

    const { success, error, data } = postSchema.safeParse(res)

    if (!success) {
        return Response.json(
            {
                error: "Validation failed",
                issues: error.errors,
            },
            { status: 400 },
        )
    }

    const post = await prisma.post.create({
        data
    })

    return Response.json(post)
}