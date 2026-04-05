import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 🔥 pega 1 link aleatório
    const links = await prisma.link.findMany({
      take: 1,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (links.length === 0) {
      return Response.json({ message: "Sem links" });
    }

    const link = links[0];

    const mensagem = `🔥 ${link.title}

👉 https://SEU-DOMINIO/${link.shortCode}`;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensagem,
      }),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erro cron" }, { status: 500 });
  }
}
