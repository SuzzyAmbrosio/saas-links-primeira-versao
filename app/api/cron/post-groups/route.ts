import { prisma } from "@/lib/prisma";

function buildTelegramMessage(params: {
  title: string;
  shortUrl: string;
  customTitle?: string;
  priceLabel?: string;
  cta?: string;
  defaultMessage?: string;
  signature?: string;
}) {
  const {
    title,
    shortUrl,
    customTitle,
    priceLabel,
    cta,
    defaultMessage,
    signature,
  } = params;

  const finalTitle = customTitle?.trim() || title;
  const finalPrice = priceLabel?.trim();
  const finalCta = cta?.trim() || "🛒 Aproveite agora:";
  const intro =
    defaultMessage?.trim() ||
    "🔥 Oferta imperdível do dia!\n\n✅ Produto selecionado\n🚚 Envio rápido\n⭐ Aproveite enquanto durar";

  return [
    intro,
    `📦 ${finalTitle}`,
    finalPrice ? `💰 ${finalPrice}` : "",
    `${finalCta}\n${shortUrl}`,
    signature?.trim() || "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function diffMinutes(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / 1000 / 60);
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return Response.json({ error: "Não autorizado." }, { status: 401 });
    }

    const now = new Date();

    const groups = await prisma.group.findMany({
      where: {
        postAuto: true,
        isActive: true,
      },
      include: {
        user: {
          include: {
            settings: true,
          },
        },
        links: {
          orderBy: {
            createdAt: "desc",
          },
          take: 50,
        },
      },
    });

    const results: Array<{
      groupId: string;
      groupName: string;
      status: string;
      detail?: string;
    }> = [];

    for (const group of groups) {
      try {
        if (group.lastPostedAt) {
          const minutes = diffMinutes(group.lastPostedAt, now);
          if (minutes < group.intervalMinutes) {
            results.push({
              groupId: group.id,
              groupName: group.name,
              status: "skipped",
              detail: `Intervalo ainda não atingido (${minutes}/${group.intervalMinutes} min).`,
            });
            continue;
          }
        }

        let botToken =
          group.telegramToken?.trim() ||
          group.user.settings?.telegramBotToken?.trim() ||
          "";

        let chatId =
          group.telegramChatId?.trim() ||
          group.user.settings?.telegramChatId?.trim() ||
          "";

        const parseMode =
          group.user.settings?.telegramParseMode?.trim() || "HTML";
        const disablePreview = Boolean(
          group.user.settings?.telegramDisablePreview
        );

        if (!botToken || !chatId) {
          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail: "Telegram não configurado.",
          });
          continue;
        }

        let links = group.links;

        if (!links.length) {
          links = await prisma.link.findMany({
            where: {
              userId: group.userId,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 50,
          });
        }

        if (!links.length) {
          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail: "Nenhum link disponível.",
          });
          continue;
        }

        let selectedLink = links[0];

        if (group.randomMode) {
          const randomIndex = Math.floor(Math.random() * links.length);
          selectedLink = links[randomIndex];
        }

        const baseUrl =
          process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "";

        const shortUrl = baseUrl
          ? `${baseUrl}/${selectedLink.shortCode}`
          : selectedLink.url;

        const message = buildTelegramMessage({
          title: selectedLink.title,
          shortUrl,
          customTitle: group.postTitle,
          priceLabel: group.postPriceLabel,
          cta: group.postCta,
          defaultMessage: group.user.settings?.telegramDefaultMessage,
          signature: group.user.settings?.telegramSignature,
        });

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
          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail: telegramData?.description || "Erro Telegram.",
          });
          continue;
        }

        await prisma.group.update({
          where: { id: group.id },
          data: {
            lastPostedAt: now,
          },
        });

        results.push({
          groupId: group.id,
          groupName: group.name,
          status: "posted",
          detail: `Link enviado: ${selectedLink.title}`,
        });
      } catch {
        results.push({
          groupId: group.id,
          groupName: group.name,
          status: "error",
          detail: "Falha ao processar grupo.",
        });
      }
    }

    return Response.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch {
    return Response.json(
      { error: "Erro interno no cron." },
      { status: 500 }
    );
  }
}
