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

export async function GET(_req: Request, context: RouteContext) {
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

    return Response.json(group);
  } catch {
    return Response.json({ error: "Erro ao buscar grupo." }, { status: 500 });
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await prisma.group.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existing) {
      return Response.json({ error: "Grupo não encontrado." }, { status: 404 });
    }

    const body = await req.json();

    const updated = await prisma.group.update({
      where: { id: existing.id },
      data: {
        name: String(body?.name ?? existing.name).trim() || existing.name,
        postAuto: Boolean(body?.postAuto),
        intervalMinutes: Number(body?.intervalMinutes ?? existing.intervalMinutes),
        randomMode: Boolean(body?.randomMode),

        telegramToken: body?.telegramToken ?? "",
        telegramChatId: body?.telegramChatId ?? "",

        whatsappMessage: body?.whatsappMessage ?? "",

        shopeeAffiliateId: body?.shopeeAffiliateId ?? "",
        shopeeSubId: body?.shopeeSubId ?? "",

        postTitle: body?.postTitle ?? "",
        postPriceLabel: body?.postPriceLabel ?? "",
        postCta: body?.postCta ?? "",
      },
    });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Erro ao atualizar grupo." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await prisma.group.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existing) {
      return Response.json({ error: "Grupo não encontrado." }, { status: 404 });
    }

    await prisma.group.delete({
      where: { id: existing.id },
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Erro ao excluir grupo." }, { status: 500 });
  }
}
