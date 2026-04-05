import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 🔥 pega link com MAIS CLIQUES
    const link = await prisma.link.findFirst({
      orderBy: {
        clicks: "desc",
      },
    });

    if (!link) {
      return Response.json({ message: "Sem links" });
    }

    const mensagem = `🔥 ${link.title}

👉 https://SEU-DOMINIO/${link.shortCode}

⚡ Já teve ${link.clicks} cliques`;

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
