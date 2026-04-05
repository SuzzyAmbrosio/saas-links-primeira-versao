import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function makeInternalCode() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const groups = await prisma.group.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(groups);
  } catch {
    return Response.json({ error: "Erro ao listar grupos." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();

    if (!name) {
      return Response.json({ error: "Nome do grupo é obrigatório." }, { status: 400 });
    }

    const userGroupsCount = await prisma.group.count({
      where: { userId: user.id },
    });

    const isPro = user.plan === "PRO";

    if (!isPro && userGroupsCount >= 1) {
      return Response.json(
        { error: "Seu plano atual permite apenas 1 grupo." },
        { status: 403 }
      );
    }

    let internalCode = makeInternalCode();

    for (let i = 0; i < 5; i++) {
      const exists = await prisma.group.findUnique({
        where: { internalCode },
      });

      if (!exists) break;
      internalCode = makeInternalCode();
    }

    const created = await prisma.group.create({
      data: {
        name,
        internalCode,
        userId: user.id,
        postAuto: false,
        products: 0,
        intervalMinutes: 30,
        randomMode: false,
        whatsappMessage: "",
        postTitle: "",
        postPriceLabel: "",
        postCta: "",
      },
    });

    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Erro ao criar grupo." }, { status: 500 });
  }
}
