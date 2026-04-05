import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Não autorizado." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json(
        { error: "ID do link é obrigatório." },
        { status: 400 }
      );
    }

    const link = await prisma.link.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!link) {
      return Response.json(
        { error: "Link não encontrado." },
        { status: 404 }
      );
    }

    await prisma.link.delete({
      where: { id: link.id },
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Erro ao excluir link." },
      { status: 500 }
    );
  }
}
