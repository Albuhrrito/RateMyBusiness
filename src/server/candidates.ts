import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "./db";

export class DuplicateEmailError extends Error {
  constructor() {
    super("An account with that email already exists. Sign in instead.");
    this.name = "DuplicateEmailError";
  }
}

export async function findCandidateByEmail(email: string) {
  return prisma.candidate.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function findOrCreateCandidate(email: string, displayName?: string | null) {
  const normalized = email.toLowerCase();
  const existing = await prisma.candidate.findUnique({ where: { email: normalized } });
  if (existing) return existing;
  return prisma.candidate.create({
    data: {
      email: normalized,
      displayName: displayName?.trim() || normalized.split("@")[0],
    },
  });
}

export async function createCandidateWithPassword(input: {
  email: string;
  displayName: string;
  password: string;
}) {
  const email = input.email.toLowerCase();
  const passwordHash = await hash(input.password, 10);
  try {
    return await prisma.candidate.create({
      data: { email, displayName: input.displayName, passwordHash },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DuplicateEmailError();
    }
    throw error;
  }
}
