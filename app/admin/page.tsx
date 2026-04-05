"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type AdminStats = {
  totalUsers: number;
  totalLinks: number;
  totalClicks: number;
  proUsers: number;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [message, setMessage] = useState("");

  async function carregarStats() {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao carregar estatísticas.");
        return;
      }

      setStats(data);
    } catch {
      setMessage("Erro ao carregar estatísticas.");
    }
  }

  useEffect(() => {
    if (session?.user?.email === "admin@saaslinks.com") {
      carregarStats();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#0a0f1f] p-10 text-white">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </main>
    );
  }

  if (session?.user?.email !== "admin@saaslinks.com") {
    return (
      <main className="min-h-screen bg-[#0a0f1f] p-10 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Acesso restrito</h1>
          <p className="mt-3 text-white/60">
            Essa área é exclusiva da administradora.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1f] p-6 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">
            Admin
          </div>
          <h1 className="mt-2 text-4xl font-bold">Painel administrativo</h1>

          {message ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              {message}
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="text-sm text-white/50">Usuários</div>
              <div className="mt-2 text-3xl font-bold">
                {stats?.totalUsers ?? "-"}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="text-sm text-white/50">Links</div>
              <div className="mt-2 text-3xl font-bold">
                {stats?.totalLinks ?? "-"}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="text-sm text-white/50">Cliques</div>
              <div className="mt-2 text-3xl font-bold">
                {stats?.totalClicks ?? "-"}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="text-sm text-white/50">Usuários PRO</div>
              <div className="mt-2 text-3xl font-bold text-emerald-400">
                {stats?.proUsers ?? "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
