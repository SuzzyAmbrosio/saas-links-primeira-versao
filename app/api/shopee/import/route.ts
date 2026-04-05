import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return Response.json({ error: "Usuário não encontrado" });
  }

  // 🔥 SIMULA produtos (depois vamos puxar real da Shopee)
  const produtos = [
    {
      title: "Fone Bluetooth",
      url: "https://shopee.com.br/produto1",
    },
    {
      title: "Air Fryer",
      url: "https://shopee.com.br/produto2",
    },
  ];

  const linksCriados = [];

  for (const produto of produtos) {
    const link = await prisma.link.create({
      data: {
        title: produto.title,
        url: produto.url,
        shortCode: nanoid(6),
        userId: user.id,
      },
    });

    linksCriados.push(link);
  }

  return Response.json({
    message: "Produtos importados com sucesso 🚀",
    links: linksCriados,
  });
}
