import { baseUrl } from "@/constants";
import { Profile, rolesMap, UserWithToken } from "@/types"; // Adjust the import based on your file structure
import { request } from "@/utils/request";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Provider options
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
  authorize: async (credentials: { email: string; password: string }) => {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    const { email, password } = credentials;
    try {
      const json = await request("POST", `${baseUrl}/v1/auth/login/email`, {
        data: { email, password },
      });

      if (!("error" in json)) {
        // Create the user object with profile data
        const user: UserWithToken = {
          id: json.profile.sub, // Unique user ID
          email: json.profile.email,
          account: json.accountType, // Adjust based on your API response
          token: {
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
          },
          profile: {
            phoneNumber: json.profile.phoneNumber,
            sub: json.profile.sub,
            email: json.profile.email,
            firstName: json.profile.firstName,
            middleName: json.profile.middleName,
            lastName: json.profile.lastName,
            roles: json.profile.roles,
          },
        };
        return user;
      }
    } catch (err) {
      return null;
    }
    return null;
  },
};

// Auth options
export const authOptions: AuthOptions = {
  providers: [CredentialsProvider(credentialsProviderOptions)],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Attach user details to the JWT token
        token.id = user.id;
        token.email = user.email;
        token.account = user.account; // Include account type
        token.access = user.token.accessToken;
        token.refresh = user.token.refreshToken;
        token.profile = user.profile; // Attach profile information
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure to include all necessary properties
      session.user = {
        id: token.id as string,
        email: token.email as string,
        account: token.account as string, // Add account type
        token: {
          accessToken: token.access as string, // Add token information
          refreshToken: token.refresh as string,
        },
        profile: token.profile as Profile, // Attach the full profile
      };
      return session;
    },
    async signIn({ user }) {
      // Optional: Check roles or other conditions
      if (user && user.profile.roles) {
        const route = rolesMap[user.profile.roles];
        if (route) {
          return true;
        }
      }
      return false;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
};

// Server session function
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
