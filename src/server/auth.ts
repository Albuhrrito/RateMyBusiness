import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { findCandidateByEmail, findOrCreateCandidate } from "./candidates";

const googleId = process.env.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    ...(googleId && googleSecret
      ? [
          Google({
            clientId: googleId,
            clientSecret: googleSecret,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string" ? credentials.email.toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password) return null;
        const candidate = await findCandidateByEmail(email);
        if (!candidate?.passwordHash) return null;
        const ok = await compare(password, candidate.passwordHash);
        if (!ok) return null;
        return {
          id: candidate.id,
          email: candidate.email,
          name: candidate.displayName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const candidate = await findOrCreateCandidate(user.email, user.name);
        token.candidateId = candidate.id;
        token.displayName = candidate.displayName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.candidateId) {
        session.candidateId = token.candidateId;
        session.displayName = token.displayName ?? session.user?.name ?? "";
      }
      return session;
    },
  },
});
