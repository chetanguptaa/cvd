import prisma from "@cvd/db";

export default async function decodeToken(token: string): Promise<string> {
  const user = await prisma.user.findFirst({
    where: {
      id: token,
    },
  });
  if (!user) return "";
  return user.id;
}
