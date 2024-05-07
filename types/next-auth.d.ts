import NextAuth from "next-auth/next"; // eslint-disable-line unused-imports/no-unused-imports

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    account: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    firstName: string;
    lastName: string;
    accountType: string;
  }

  interface Session {
    user: Partial<User>;
    token: token;
  }
}
