import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: { code: string };
};

export default async function RedirectPage({ params }: Props) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Link não encontrado</h1>
      </main>
    );
  }

  await prisma.link.update({
    where: { id: link.id },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  redirect(link.url);
}
