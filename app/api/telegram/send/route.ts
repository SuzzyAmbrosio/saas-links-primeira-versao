export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erro ao enviar" }, { status: 500 });
  }
}
