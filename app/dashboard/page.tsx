"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [importando, setImportando] = useState(false);
  const [enviandoId, setEnviandoId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const planoAtual =
    session?.user?.email === "admin@saaslinks.com" ? "PRO" : "FREE";

  const totalCliques = useMemo(() => {
    return links.reduce((acc, item) => acc + item.clicks, 0);
  }, [links]);

  const ganhosEstimados = useMemo(() => {
    return (totalCliques * 0.05).toFixed(2);
  }, [totalCliques]);

  async function carregarLinks() {
    try {
      const res = await fetch("/api/links/list", {
        cache: "no-store",
      });

      const data = await res.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Erro ao carregar links.");
    }
  }

  useEffect(() => {
    if (session) {
      carregarLinks();
    }
  }, [session]);

  async function criarLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao criar link.");
        return;
      }

      setMessage("Link criado com sucesso.");
      setTitle("");
      setUrl("");
      await carregarLinks();
    } catch {
      setMessage("Erro ao criar link.");
    } finally {
      setLoading(false);
    }
  }

  async function excluirLink(id: string) {
    const confirmou = window.confirm("Deseja excluir este link?");
    if (!confirmou) return;

    setMessage("");

    try {
      const res = await fetch("/api/links/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao excluir link.");
        return;
      }

      setMessage("Link excluído com sucesso.");
      await carregarLinks();
    } catch {
      setMessage("Erro ao excluir link.");
    }
  }

  async function importarProdutosShopee() {
    setImportando(true);
    setMessage("");

    try {
      const res = await fetch("/api/shopee/import", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao importar produtos.");
        return;
      }

      setMessage(data.message || "Produtos importados com sucesso.");
      await carregarLinks();
    } catch {
      setMessage("Erro ao importar produtos.");
    } finally {
      setImportando(false);
    }
  }

  async function enviarTelegram(link: LinkItem) {
    setEnviandoId(link.id);
    setMessage("");

    try {
      const mensagem = `🔥 ${link.title}

👉 ${window.location.origin}/${link.shortCode}`;

      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: mensagem }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao enviar para o Telegram.");
        return;
      }

      setMessage("Enviado para o Telegram com sucesso 🚀");
    } catch {
      setMessage("Erro ao enviar para o Telegram.");
    } finally {
      setEnviandoId(null);
    }
  }

  function copiarLink(shortCode: string) {
    const linkCompleto = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(linkCompleto);
    setMessage("Link copiado com sucesso.");
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-2xl font-bold">Você precisa fazer login</h1>
          <p className="mt-3 text-slate-400">
            Entre na sua conta para acessar o dashboard e gerenciar seus links.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950"
          >
            Ir para login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="min-h-screen border-r border-slate-800 bg-slate-900 p-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h2 className="text-xl font-bold">SaaS Links</h2>
            <p className="mt-2 text-sm text-slate-400">
              Seu encurtador profissional
            </p>
          </div>

          <nav className="mt-8 space-y-2 text-slate-300">
            <a
              className="block rounded-lg bg-slate-800 px-4 py-3 font-medium"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              href="/"
            >
              Início
            </a>
            <a
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              href="/upgrade"
            >
              Upgrade
            </a>
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-sm text-slate-400">Usuária logada</div>
            <div className="mt-2 break-all text-sm font-medium text-white">
              {session.user?.email}
            </div>
          </div>
        </aside>

        <section className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                🚀 Painel de Controle
              </h1>
              <p className="mt-2 text-slate-400">
                Crie links encurtados, acompanhe cliques, importe produtos e
                envie para o Telegram.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              <div>Plano atual: {planoAtual}</div>
              <a
                href="/upgrade"
                className="mt-3 inline-block rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white"
              >
                🚀 Upgrade para PRO
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <div className="text-sm text-slate-400">Total de links</div>
              <div className="mt-2 text-3xl font-bold">{links.length}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <div className="text-sm text-slate-400">Cliques totais</div>
              <div className="mt-2 text-3xl font-bold">{totalCliques}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <div className="text-sm text-slate-400">Links disponíveis</div>
              <div className="mt-2 text-3xl font-bold">
                {planoAtual === "PRO" ? "∞" : Math.max(0, 5 - links.length)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <div className="text-sm text-slate-400">Ganhos estimados</div>
              <div className="mt-2 text-3xl font-bold text-green-400">
                R$ {ganhosEstimados}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={importarProdutosShopee}
              disabled={importando}
              className="rounded-xl bg-purple-500 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {importando ? "Importando..." : "🤖 Importar produtos da Shopee"}
            </button>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold">Criar novo link</h2>

            <form onSubmit={criarLink} className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Título
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Oferta Air Fryer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  URL de destino
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Criando..." : "Criar link"}
              </button>
            </form>

            {message ? (
              <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
                {message}
              </p>
            ) : null}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold">Meus links</h2>

            <div className="mt-4 space-y-4">
              {links.length === 0 ? (
                <p className="text-slate-400">Nenhum link criado ainda.</p>
              ) : (
                links.map((link) => {
                  const linkCompleto =
                    typeof window !== "undefined"
                      ? `${window.location.origin}/${link.shortCode}`
                      : `/${link.shortCode}`;

                  return (
                    <div
                      key={link.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{link.title}</div>

                          <div className="mt-1 break-all text-sm text-slate-400">
                            Destino: {link.url}
                          </div>

                          <a
                            href={`/${link.shortCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 block break-all text-sm text-emerald-400 underline"
                          >
                            {linkCompleto}
                          </a>

                          <div className="mt-2 text-sm text-slate-400">
                            Cliques: {link.clicks}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => copiarLink(link.shortCode)}
                            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                          >
                            Copiar link
                          </button>

                          <button
                            onClick={() => enviarTelegram(link)}
                            disabled={enviandoId === link.id}
                            className="rounded-lg border border-green-700 px-3 py-2 text-sm text-green-300 hover:bg-green-950 disabled:opacity-60"
                          >
                            {enviandoId === link.id
                              ? "Enviando..."
                              : "Enviar Telegram"}
                          </button>

                          <button
                            onClick={() => excluirLink(link.id)}
                            className="rounded-lg border border-red-700 px-3 py-2 text-sm text-red-300 hover:bg-red-950"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
