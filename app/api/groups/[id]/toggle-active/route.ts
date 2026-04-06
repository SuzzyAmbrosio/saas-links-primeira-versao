import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export async function POST(_req: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const { id } = await context.params;

    const group = await prisma.group.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!group) {
      return Response.json({ error: "Grupo não encontrado." }, { status: 404 });
    }

    const updated = await prisma.group.update({
      where: { id: group.id },
      data: {
        isActive: !group.isActive,
      },
    });

    return Response.json({
      ok: true,
      isActive: updated.isActive,
    });
  } catch {
    return Response.json(
      { error: "Erro ao alterar status do grupo." },
      { status: 500 }
    );
  }
}
