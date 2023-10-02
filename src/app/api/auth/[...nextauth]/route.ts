import NextAuth from "next-auth/next";
import { type Provider } from "next-auth/providers/index";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, req) {
    if (credentials.username !== "nack") return null;
    return { id: "12002131", name: "nack" };
  },
});

const pages = {
  signIn: "/auth/login",
};

const providers: Provider[] = [credentialProvider];

const handler = NextAuth({
  providers,
  pages,
});

export { handler as GET, handler as POST };
