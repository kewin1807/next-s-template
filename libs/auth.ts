import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/configs/axios.config";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { data } = await axiosInstance.post("/login", {
            email: credentials.email,
            password: credentials.password
          })
          return {
            ...data.user,
            accessToken: data?.access_token
          }
        }
        catch (err) {
          console.log("error: ", err)
        }
      },
    }),
  ],

  callbacks: {
    // check jwt expired
    async jwt({ token, user, trigger, session }) {
      // fetch user if failed => update new JWT => refresh token
      return token
    },

    async session({ session, token }) {
      if (token.error) {
        throw new Error("Refresh token has expired");
      }
      (session as any).accessToken = token.accessToken;
      return session
    }
  }
}