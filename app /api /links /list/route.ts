import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@saaslinks.com" }
    });

    if (!user) {
      return Response.json([]);
    }

    const links = await prisma.link.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });

    return Response.json(links);
  } catch {
    return Response.json(
      { error: "Erro ao listar links." },
      { status: 500 }
    );
  }
}
