export { default } from "next-auth/middleware";

export const config = {
  matcher: "/dashboard/:path*",
  // matcher: "/123", Uncomment and remove the first one to gain access without authentication
};
