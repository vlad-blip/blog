import { prisma } from '../../../../../prisma'
import { postSchema } from '@/lib/schemas/posts';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    const { postId } = await params;

    const post = await prisma.post.findFirst({
        where: {
            id: postId
        }
    })

    return Response.json(post)
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    const { postId } = await params;

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

    const post = await prisma.post.update({
        where: {
            id: postId
        }, data
    })

    return Response.json(post)
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    const { postId } = await params;

    const post = await prisma.post.delete({
        where: {
            id: postId
        }
    })

    return Response.json(post)
}