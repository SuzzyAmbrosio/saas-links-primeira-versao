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

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    return Response.json({
      botToken: user.telegramBotToken ?? "",
      chatId: user.telegramChatId ?? "",
      defaultMessage: user.telegramDefaultMessage ?? "",
      signature: user.telegramSignature ?? "",
      parseMode: user.telegramParseMode ?? "HTML",
      disablePreview: Boolean(user.telegramDisablePreview),
      pinAfterSend: Boolean(user.telegramPinAfterSend),
    });
  } catch {
    return Response.json(
      { error: "Erro ao buscar configurações do Telegram." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        telegramBotToken: String(body?.botToken ?? ""),
        telegramChatId: String(body?.chatId ?? ""),
        telegramDefaultMessage: String(body?.defaultMessage ?? ""),
        telegramSignature: String(body?.signature ?? ""),
        telegramParseMode: String(body?.parseMode ?? "HTML"),
        telegramDisablePreview: Boolean(body?.disablePreview),
        telegramPinAfterSend: Boolean(body?.pinAfterSend),
      },
    });

    return Response.json({
      ok: true,
      config: {
        botToken: updated.telegramBotToken,
        chatId: updated.telegramChatId,
        defaultMessage: updated.telegramDefaultMessage,
        signature: updated.telegramSignature,
        parseMode: updated.telegramParseMode,
        disablePreview: updated.telegramDisablePreview,
        pinAfterSend: updated.telegramPinAfterSend,
      },
    });
  } catch {
    return Response.json(
      { error: "Erro ao salvar configurações do Telegram." },
      { status: 500 }
    );
  }
}
