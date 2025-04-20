## Stack

ORM: `Prisma`

Language: `Typescript`

Database: `MongoDB`

Styles: `Tailwind`

Framework: `Next.js app router`

## Getting Started

Fill required values in .env file. Use .env.example as a reference. The project is configured for MongoDB database, so you need to add a link to your MongoDB instance.

Add your email address to `admin.json`. Only users with emails from `admin.json` can access admin pages

Run `npm install` to install all of the dependenices. You might need to add `--force` flag, because some `markdown` library is not compatible with React 19.

Run `npx prisma generate` to generate a prisma client.

After you do all of the steps above, you can start the application with `npm run dev`

## Pages

### Protected pages

1. `/admin/edit-post/[postId]`
2. `/admin/new-post`

### Public pages

1. `/posts`
2. `/posts/[postId]`

## Route handlers

1. DELETE `/api/posts/[postId]`
2. GET `/api/posts/[postId]`
3. GET `/api/posts`
4. PUT `/api/posts/[postId]`
5. POST `/api/posts`
