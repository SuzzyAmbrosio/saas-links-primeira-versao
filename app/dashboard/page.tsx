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

  const totalCliques = useMemo(
    () => links.reduce((acc, item) => acc + item.clicks, 0),
    [links]
  );

  const ganhosEstimados = useMemo(
    () => (totalCliques * 0.05).toFixed(2),
    [totalCliques]
  );

  const topLinks = useMemo(() => {
    return [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  }, [links]);

  async function carregarLinks() {
    try {
      const res = await fetch("/api/links/list", { cache: "no-store" });
      const data = await res.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Erro ao carregar links.");
    }
  }

  useEffect(() => {
    if (session) carregarLinks();
  }, [session]);

  async function criarLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch("/api/shopee/import", { method: "POST" });
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
      const mensagem = `🔥 ${link.title} com desconto HOJE!

💥 Oferta imperdível
🚚 Entrega rápida
⭐ Produto bem avaliado

👉 Compre agora:
${window.location.origin}/${link.shortCode}`;

      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <main className="min-h-screen bg-[#0a0f1f] p-10 text-white">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#0a0f1f] p-10 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-2xl font-bold">Você precisa fazer login</h1>
          <p className="mt-3 text-white/60">
            Entre na sua conta para acessar o painel e gerenciar seus links.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
          >
            Ir para login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1f] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="min-h-screen border-r border-white/10 bg-[#0f172a] p-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              SaaS Links
            </div>
            <h2 className="mt-2 text-2xl font-bold">Painel Pro</h2>
            <p className="mt-2 text-sm text-white/60">
              Encurtador, automação e distribuição.
            </p>
          </div>

          <nav className="mt-8 space-y-2 text-sm text-white/80">
            <a
              className="block rounded-2xl bg-white/10 px-4 py-3 font-medium"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="block rounded-2xl px-4 py-3 hover:bg-white/5"
              href="/upgrade"
            >
              Upgrade
            </a>
            <a
              className="block rounded-2xl px-4 py-3 hover:bg-white/5"
              href="/admin"
            >
              Admin
            </a>
            <a
              className="block rounded-2xl px-4 py-3 hover:bg-white/5"
              href="/"
            >
              Início
            </a>
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Usuária
            </div>
            <div className="mt-2 break-all text-sm font-medium">
              {session.user?.email}
            </div>
            <div className="mt-4 rounded-2xl bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300">
              Plano atual: {planoAtual}
            </div>
          </div>
        </aside>

        <section className="p-6 md:p-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Dashboard
              </div>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Central de Links e Automação
              </h1>
              <p className="mt-2 max-w-2xl text-white/60">
                Crie links, acompanhe performance, envie para o Telegram e
                monitore resultados em um só lugar.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-300">
              <div>Plano atual: {planoAtual}</div>
              <a
                href="/upgrade"
                className="mt-3 inline-block rounded-2xl bg-fuchsia-500 px-4 py-2 font-semibold text-white"
              >
                Upgrade para PRO
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
              <div className="text-sm text-white/50">Total de links</div>
              <div className="mt-3 text-3xl font-bold">{links.length}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
              <div className="text-sm text-white/50">Cliques totais</div>
              <div className="mt-3 text-3xl font-bold">{totalCliques}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
              <div className="text-sm text-white/50">Links disponíveis</div>
              <div className="mt-3 text-3xl font-bold">
                {planoAtual === "PRO" ? "∞" : Math.max(0, 5 - links.length)}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
              <div className="text-sm text-white/50">Ganhos estimados</div>
              <div className="mt-3 text-3xl font-bold text-emerald-400">
                R$ {ganhosEstimados}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={importarProdutosShopee}
              disabled={importando}
              className="rounded-2xl bg-fuchsia-500 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {importando ? "Importando..." : "Importar produtos da Shopee"}
            </button>
          </div>

          {message ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              {message}
            </div>
          ) : null}

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h2 className="text-xl font-semibold">Criar novo link</h2>

              <form onSubmit={criarLink} className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Título
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Oferta Air Fryer"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    URL de destino
                  </label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Criando..." : "Criar link"}
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h2 className="text-xl font-semibold">Top links</h2>

              <div className="mt-5 space-y-3">
                {topLinks.length === 0 ? (
                  <p className="text-white/50">Nenhum dado ainda.</p>
                ) : (
                  topLinks.map((link, index) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-medium">
                          {index + 1}. {link.title}
                        </div>
                        <div className="text-xs text-white/40">
                          /{link.shortCode}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-cyan-300">
                        {link.clicks} cliques
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold">Meus links</h2>

            <div className="mt-5 space-y-4">
              {links.length === 0 ? (
                <p className="text-white/50">Nenhum link criado ainda.</p>
              ) : (
                links.map((link) => {
                  const linkCompleto =
                    typeof window !== "undefined"
                      ? `${window.location.origin}/${link.shortCode}`
                      : `/${link.shortCode}`;

                  return (
                    <div
                      key={link.id}
                      className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"
                    >
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{link.title}</div>

                          <div className="mt-1 break-all text-sm text-white/50">
                            Destino: {link.url}
                          </div>

                          <a
                            href={`/${link.shortCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 block break-all text-sm text-cyan-300 underline"
                          >
                            {linkCompleto}
                          </a>

                          <div className="mt-2 text-sm text-white/50">
                            Cliques: {link.clicks}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => copiarLink(link.shortCode)}
                            className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                          >
                            Copiar
                          </button>

                          <button
                            onClick={() => enviarTelegram(link)}
                            disabled={enviandoId === link.id}
                            className="rounded-2xl border border-emerald-500/40 px-3 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-60"
                          >
                            {enviandoId === link.id
                              ? "Enviando..."
                              : "Telegram"}
                          </button>

                          <button
                            onClick={() => excluirLink(link.id)}
                            className="rounded-2xl border border-red-500/40 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
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
