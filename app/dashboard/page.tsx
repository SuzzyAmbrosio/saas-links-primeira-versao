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

  const topLinks = useMemo(() => {
    return [...links]
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
  }, [links]);

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
    const mensagem = `🔥 ${link.title} com desconto HOJE!

💥 Oferta imperdível  
🚚 Entrega rápida  
⭐ Produto bem avaliado  

👉 Compre agora:
${window.location.origin}/${link.shortCode}`;

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

    setMessage("Enviado com copy de alta conversão 🚀");
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
          <h2 className="text-xl font-bold">SaaS Links</h2>

          <nav className="mt-8 space-y-2">
            <a className="block" href="/dashboard">Dashboard</a>
            <a className="block" href="/upgrade">Upgrade</a>
          </nav>
        </aside>

        <section className="p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* STATS */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>Total: {links.length}</div>
            <div>Cliques: {totalCliques}</div>
            <div>Disponível: {planoAtual === "PRO" ? "∞" : 5 - links.length}</div>
            <div>R$ {ganhosEstimados}</div>
          </div>

          {/* IMPORTAR */}
          <button onClick={importarProdutosShopee}>
            Importar Shopee
          </button>

          {/* FORM */}
          <form onSubmit={criarLink}>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input value={url} onChange={e => setUrl(e.target.value)} />
            <button>Criar</button>
          </form>

          {/* RANKING */}
          <div className="mt-6">
            <h2>🔥 Top links</h2>
            {topLinks.map((l, i) => (
              <div key={l.id}>
                {i + 1}. {l.title} - {l.clicks}
              </div>
            ))}
          </div>

          {/* LINKS */}
          {links.map(link => (
            <div key={link.id}>
              {link.title}
              <button onClick={() => copiarLink(link.shortCode)}>Copiar</button>
              <button onClick={() => enviarTelegram(link)}>Telegram</button>
              <button onClick={() => excluirLink(link.id)}>Excluir</button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
