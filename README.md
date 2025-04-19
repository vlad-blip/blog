This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Fill required values in .env file. Use .env.example as a reference. The project is configured for MongoDB database, so you need to add a link to your MongoDB instance.

Add your email address to `admin.json`. Only users with emails from `admin.json` can access admin pages

Run `npm install` to install all of the dependenices. You might need to add `--force` flag, because some `markdown` library is not compatible with React 19.

Run `npx prisma generate` to generate a prisma client.

After you do all of the steps above, you can start the application with `npm run dev`
