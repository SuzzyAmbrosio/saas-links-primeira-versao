import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await req.json();
    const { title, url } = body;

    if (!title || !url) {
      return Response.json(
        { error: "Título e URL são obrigatórios." },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          password: "123456",
          plan: "FREE",
        },
      });
    }

    const totalLinks = await prisma.link.count({
      where: { userId: user.id },
    });

    if (user.plan === "FREE" && totalLinks >= 5) {
      return Response.json(
        { error: "Plano FREE atingiu limite." },
        { status: 403 }
      );
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        shortCode: nanoid(6),
        userId: user.id,
      },
    });

    return Response.json(link);
  } catch {
    return Response.json(
      { error: "Erro ao criar link." },
      { status: 500 }
    );
  }
}
