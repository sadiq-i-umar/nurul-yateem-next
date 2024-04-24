export { default } from 'next-auth/middleware';

export const config = {
  matcher: '/234/:path*'
  // matcher: '/dashboard/:path*'
};
