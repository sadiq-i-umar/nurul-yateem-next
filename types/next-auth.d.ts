// types/next-auth.d.ts

import NextAuth from "next-auth/next";
import { UserWithToken } from ".";

declare module "next-auth" {
  interface User extends UserWithToken {
    profile: UserProfile; // Make sure UserProfile includes the properties you need
  }

  interface Session {
    user: User;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }
}
