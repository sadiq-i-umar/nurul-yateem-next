import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions } from "next-auth";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrl } from "../../../../../utils/constant";
import { request } from "../../../../../utils/request";

const credentialsProviderOptions: any = {
  name: "Login",
  credentials: {
    email: {
      label: "Email Address",
      type: "email",
      placeholder: "john2gmail.com",
    },
    password: { label: "Password", type: "password", placeholder: "Password" },
  },
  authorize: async (credentials: any) => {
    if (credentials?.email === "" || credentials?.password === "") {
      return null;
    }

    const { email, password } = credentials || { email: "example@gmail.com" };
    try {
      const json = await request("POST", `${baseUrl}/login`, {
        data: { email, password },
      });

      if (!("error" in json)) {
        // return user
        const user: User = {
          id: email,
          email,
          token: {
            accessToken: json.access_token,
            refreshToken: json.refreshToken,
          },
          account: json.user.account_type,
          firstName: json.user.first_name,
          lastName: json.user.last_name,
        };
        return user;
      }
    } catch (err) {
      return null;
    }
    return null;
  },
};

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider(credentialsProviderOptions)],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.email;
        token.access = user.token.accessToken;
        token.account = user.account;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.name as string,
        token: {
          accessToken: token.access as string,
          refreshToken: token.refreshToken as string,
        },
        account: token.account as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
      };
      session.token = token.access;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
