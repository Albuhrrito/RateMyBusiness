import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    candidateId: string;
    displayName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    candidateId?: string;
    displayName?: string;
  }
}
