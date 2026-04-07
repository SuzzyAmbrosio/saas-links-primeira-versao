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

function pickLink<T extends { clicks: number }>(
  links: T[],
  selectionMode?: string,
  randomMode?: boolean
) {
  if (!links.length) return null;

  if (randomMode || selectionMode === "random") {
    return links[Math.floor(Math.random() * links.length)];
  }

  if (selectionMode === "most_clicked") {
    return [...links].sort((a, b) => b.clicks - a.clicks)[0];
  }

  return links[0];
}

export async function GET() {
  try {
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
      status: "posted" | "skipped" | "error";
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

            await prisma.postLog.create({
              data: {
                userId: group.userId,
                status: "skipped",
                detail: `Intervalo ainda não atingido (${minutes}/${group.intervalMinutes} min).`,
                groupId: group.id,
                groupName: group.name,
              },
            });

            continue;
          }
        }

        const settings = group.user.settings;

        const botToken =
          group.telegramToken?.trim() ||
          settings?.telegramBotToken?.trim() ||
          "";

        const chatId =
          group.telegramChatId?.trim() ||
          settings?.telegramChatId?.trim() ||
          "";

        const parseMode = settings?.telegramParseMode?.trim() || "HTML";
        const disablePreview = Boolean(settings?.telegramDisablePreview);

        if (!botToken || !chatId) {
          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail: "Telegram não configurado.",
          });

          await prisma.postLog.create({
            data: {
              userId: group.userId,
              status: "error",
              detail: "Telegram não configurado.",
              groupId: group.id,
              groupName: group.name,
            },
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

          await prisma.postLog.create({
            data: {
              userId: group.userId,
              status: "error",
              detail: "Nenhum link disponível.",
              groupId: group.id,
              groupName: group.name,
            },
          });

          continue;
        }

        const selectedLink = pickLink(links, group.selectionMode, group.randomMode);

        if (!selectedLink) {
          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail: "Nenhum link selecionado.",
          });

          continue;
        }

        const baseUrl =
          process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
          process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
          "";

        const shortUrl = baseUrl
          ? `${baseUrl}/${selectedLink.shortCode}`
          : selectedLink.url;

        const message = buildTelegramMessage({
          title: selectedLink.title,
          shortUrl,
          customTitle: group.postTitle,
          priceLabel: group.postPriceLabel,
          cta: group.postCta,
          defaultMessage: settings?.telegramDefaultMessage,
          signature: settings?.telegramSignature,
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
          const detail = telegramData?.description || "Erro Telegram.";

          results.push({
            groupId: group.id,
            groupName: group.name,
            status: "error",
            detail,
          });

          await prisma.postLog.create({
            data: {
              userId: group.userId,
              status: "error",
              detail,
              groupId: group.id,
              groupName: group.name,
              linkId: selectedLink.id,
              linkTitle: selectedLink.title,
              telegramChatId: chatId,
            },
          });

          continue;
        }

        await prisma.group.update({
          where: { id: group.id },
          data: {
            lastPostedAt: now,
          },
        });

        await prisma.postLog.create({
          data: {
            userId: group.userId,
            status: "success",
            detail: `Link enviado: ${selectedLink.title}`,
            groupId: group.id,
            groupName: group.name,
            linkId: selectedLink.id,
            linkTitle: selectedLink.title,
            telegramChatId: chatId,
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

        await prisma.postLog.create({
          data: {
            userId: group.userId,
            status: "error",
            detail: "Falha ao processar grupo.",
            groupId: group.id,
            groupName: group.name,
          },
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
