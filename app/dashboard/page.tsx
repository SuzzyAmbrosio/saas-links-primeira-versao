"use client";

import { useEffect, useState } from "react";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
};

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function carregarLinks() {
    try {
      const res = await fetch("/api/links/list");
      const data = await res.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Erro ao carregar links.");
    }
  }

  useEffect(() => {
    carregarLinks();
  }, []);

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="min-h-screen border-r border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">SaaS Links</h2>
          <nav className="mt-8 space-y-2 text-slate-300">
            <a className="block rounded-lg bg-slate-800 px-4 py-3" href="/dashboard">
              Dashboard
            </a>
            <a className="block rounded-lg px-4 py-3 hover:bg-slate-800" href="/">
              Início
            </a>
          </nav>
        </aside>

        <section className="p-6 md:p-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Crie links encurtados e acompanhe os cliques.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Total de links</div>
              <div className="mt-2 text-3xl font-bold">{links.length}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Cliques totais</div>
              <div className="mt-2 text-3xl font-bold">
                {links.reduce((acc, item) => acc + item.clicks, 0)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Plano</div>
              <div className="mt-2 text-3xl font-bold">FREE</div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Criar novo link</h2>

            <form onSubmit={criarLink} className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Título</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Oferta Air Fryer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">URL de destino</label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"
              >
                {loading ? "Criando..." : "Criar link"}
              </button>
            </form>

            {message ? (
              <p className="mt-4 text-sm text-slate-300">{message}</p>
            ) : null}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Meus links</h2>

            <div className="mt-4 space-y-4">
              {links.length === 0 ? (
                <p className="text-slate-400">Nenhum link criado ainda.</p>
              ) : (
                links.map((link) => (
                  <div
                    key={link.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="font-semibold">{link.title}</div>
                    <div className="mt-1 break-all text-sm text-slate-400">
                      {link.url}
                    </div>
                    <div className="mt-2 text-sm text-emerald-400">
                      <a
                        href={`/${link.shortCode}`}
                        target="_blank"
                        className="text-emerald-400 underline"
                      >
                        {typeof window !== "undefined" && window.location.origin}/{link.shortCode}
                      </a>
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      Cliques: {link.clicks}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
