import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedResources = [
  {
    methods: ["DELETE", "PUT", "POST"],
    pathname: "/api/posts",
  },
];

export default auth((req) => {
  const protectedResource = protectedResources.find(
    (resource) =>
      resource.methods.includes(req.method) &&
      req.nextUrl.pathname.startsWith(resource.pathname)
  );

  if (!protectedResource) {
    return NextResponse.next();
  }

  if (!req.auth) {
    return NextResponse.json(
      {},
      {
        status: 401,
      }
    );
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/posts", "/api/posts/:path*"],
};
