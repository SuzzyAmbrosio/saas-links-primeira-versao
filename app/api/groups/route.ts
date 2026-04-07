import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

function generateInternalCode() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const groups = await prisma.group.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        links: true,
      },
    });

    return Response.json(
      groups.map((group) => ({
        id: group.id,
        name: group.name,
        internalCode: group.internalCode,
        postAuto: group.postAuto,
        products: group.links.length,
        intervalMinutes: group.intervalMinutes,
        randomMode: group.randomMode,
        selectionMode: group.selectionMode,
        lastPostedAt: group.lastPostedAt,
        isActive: group.isActive,
      }))
    );
  } catch {
    return Response.json({ error: "Erro ao buscar grupos." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await req.json();
    const name = String(body?.name ?? "Novo Grupo").trim() || "Novo Grupo";

    let internalCode = generateInternalCode();

    for (let i = 0; i < 5; i++) {
      const exists = await prisma.group.findFirst({
        where: { internalCode },
      });

      if (!exists) break;
      internalCode = generateInternalCode();
    }

    const group = await prisma.group.create({
      data: {
        name,
        internalCode,
        userId: user.id,
        postAuto: false,
        intervalMinutes: 30,
        randomMode: false,
        selectionMode: "recent",
        whatsappMessage: "",
        telegramToken: "",
        telegramChatId: "",
        shopeeAffiliateId: "",
        shopeeSubId: "",
        postTitle: "",
        postPriceLabel: "",
        postCta: "",
        isActive: true,
      },
    });

    return Response.json(group);
  } catch {
    return Response.json({ error: "Erro ao criar grupo." }, { status: 500 });
  }
}
