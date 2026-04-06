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

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await req.json();
    const message = String(body?.message ?? "").trim();
    const groupId = body?.groupId ? String(body.groupId) : null;

    if (!message) {
      return Response.json({ error: "Mensagem não informada." }, { status: 400 });
    }

    let botToken = String(user.telegramBotToken ?? "");
    let chatId = String(user.telegramChatId ?? "");
    let parseMode = String(user.telegramParseMode ?? "HTML");
    let disablePreview = Boolean(user.telegramDisablePreview);

    if (groupId) {
      const group = await prisma.group.findFirst({
        where: {
          id: groupId,
          userId: user.id,
        },
      });

      if (!group) {
        return Response.json({ error: "Grupo não encontrado." }, { status: 404 });
      }

      if (group.telegramToken?.trim()) {
        botToken = group.telegramToken.trim();
      }

      if (group.telegramChatId?.trim()) {
        chatId = group.telegramChatId.trim();
      }
    }

    if (!botToken || !chatId) {
      return Response.json(
        {
          error:
            "Configure o Bot Token e o Chat ID no Telegram antes de enviar.",
        },
        { status: 400 }
      );
    }

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: parseMode === "Plain" ? undefined : parseMode,
          disable_web_page_preview: disablePreview,
        }),
      }
    );

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData?.ok) {
      return Response.json(
        {
          error:
            telegramData?.description || "Erro ao enviar mensagem para o Telegram.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      ok: true,
      telegramMessageId: telegramData?.result?.message_id ?? null,
    });
  } catch {
    return Response.json(
      { error: "Erro interno ao enviar para o Telegram." },
      { status: 500 }
    );
  }
}
