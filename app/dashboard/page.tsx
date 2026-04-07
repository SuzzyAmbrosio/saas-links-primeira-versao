"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import AdminShell from "@/components/dashboard/AdminShell";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
};

type AffiliateCard = {
  nome: string;
  descricao: string;
  status: string;
};

const affiliateCards: AffiliateCard[] = [
  { nome: "Afiliado Shopee", descricao: "Link e integração para produtos da Shopee.", status: "Conectado" },
  { nome: "Afiliado Amazon", descricao: "Importação e organização de ofertas da Amazon.", status: "Pendente" },
  { nome: "Afiliado Mercado Livre", descricao: "Cadastre links e campanhas do Mercado Livre.", status: "Pendente" },
  { nome: "Afiliado Magalu", descricao: "Área pronta para próxima etapa da integração.", status: "Pendente" },
  { nome: "Afiliado AliExpress", descricao: "Busca, filtros e importação em massa.", status: "Pendente" },
  { nome: "Afiliado AWIN", descricao: "Estrutura visual preparada para continuar.", status: "Pendente" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [importando, setImportando] = useState(false);
  const [enviandoId, setEnviandoId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const planoAtual = session?.user?.email === "admin@saaslinks.com" ? "PRO" : "FREE";

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
      const mensagem = `🔥 ${link.title}\n\nOferta imperdível hoje.\n👉 ${window.location.origin}/${link.shortCode}`;

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

      setMessage("Enviado para o Telegram com sucesso.");
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-lg font-semibold">
        Carregando...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
        <div className="card w-full max-w-lg p-8 text-center">
          <h1 className="text-2xl font-bold">Você precisa fazer login</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Entre na sua conta para acessar o painel e gerenciar seus links.
          </p>
          <div className="mt-6">
            <Link href="/login" className="btn btn-primary">
              Ir para login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminShell
      title="Editar: Viciados na Shoppee"
      subtitle="Painel principal de campanhas, canais e automações"
    >
      <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-[var(--line)] bg-white p-4 text-sm">
        <span className="badge badge-blue">Geral</span>
        <span className="badge badge-green">Telegram</span>
        <span className="badge badge-blue">Layout Post</span>
        <span className="badge badge-yellow">Recursos de IA</span>
        <span className="badge badge-blue">Site</span>
        <span className="badge badge-red">WhatsApp - Grupos/Canais</span>
        <span className="badge badge-blue">Instagram</span>
        <span className="badge badge-blue">Shopee</span>
        <span className="badge badge-blue">Amazon</span>
        <span className="badge badge-blue">Mercado Livre</span>
        <span className="badge badge-blue">Produto Manual</span>
      </div>

      {message ? (
        <div className="mb-4 alert-info px-4 py-3 text-sm">{message}</div>
      ) : null}

      <section className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Total de links</div>
          <div className="mt-2 text-3xl font-bold">{links.length}</div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Cliques totais</div>
          <div className="mt-2 text-3xl font-bold">{totalCliques}</div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Links disponíveis</div>
          <div className="mt-2 text-3xl font-bold">
            {planoAtual === "PRO" ? "∞" : Math.max(0, 5 - links.length)}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Ganhos estimados</div>
          <div className="mt-2 text-3xl font-bold">R$ {ganhosEstimados}</div>
        </div>
      </section>

      <section className="mb-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <div className="card p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Adicionar produto ou link</h2>
              <p className="text-sm text-[var(--muted)]">
                Continue a estrutura visual do painel sem trocar sua API atual.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={importarProdutosShopee}
              disabled={importando}
            >
              {importando ? "Importando..." : "Importar Shopee"}
            </button>
          </div>

          <form onSubmit={criarLink} className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Título
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Fone Bluetooth com desconto"
                className="px-3 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                URL de destino
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="px-3 py-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Categoria
              </label>
              <select className="px-3 py-3" defaultValue="Shopee">
                <option>Shopee</option>
                <option>Amazon</option>
                <option>Mercado Livre</option>
                <option>Telegram</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Tipo de postagem
              </label>
              <select className="px-3 py-3" defaultValue="Oferta">
                <option>Oferta</option>
                <option>Story</option>
                <option>Grupo</option>
                <option>Canal</option>
              </select>
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Criando..." : "Salvar link"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setTitle("");
                  setUrl("");
                }}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

        <div className="card p-4">
          <h2 className="text-base font-bold">Top links</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">
            Os links com melhor desempenho até agora.
          </p>

          {topLinks.length === 0 ? (
            <div className="card-soft p-4 text-sm text-[var(--muted)]">
              Nenhum dado ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {topLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--line)] p-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--muted)]">
                      #{index + 1}
                    </div>
                    <div className="line-clamp-2 text-sm font-semibold">
                      {link.title}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      /{link.shortCode}
                    </div>
                  </div>
                  <div className="badge badge-blue">{link.clicks} cliques</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mb-4">
        <div className="card p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Configuração de afiliados</h2>
              <p className="text-sm text-[var(--muted)]">
                Blocos prontos para você continuar as próximas telas do clone.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {affiliateCards.map((card) => (
              <div key={card.nome} className="rounded-xl border border-[var(--line)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{card.nome}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{card.descricao}</p>
                  </div>
                  <span
                    className={`badge ${
                      card.status === "Conectado" ? "badge-green" : "badge-yellow"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <input className="px-3 py-2" placeholder="Digite sua chave / ID" />
                  <input className="px-3 py-2" placeholder="Link de afiliado" />
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="btn btn-primary">Salvar</button>
                  <button className="btn btn-secondary">Divulgar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-[var(--line)] px-4 py-3">
            <h2 className="text-base font-bold">Meus links</h2>
          </div>

          {links.length === 0 ? (
            <div className="p-4 text-sm text-[var(--muted)]">
              Nenhum link criado ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-clean">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Short link</th>
                    <th>Cliques</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const linkCompleto =
                      typeof window !== "undefined"
                        ? `${window.location.origin}/${link.shortCode}`
                        : `/${link.shortCode}`;

                    return (
                      <tr key={link.id}>
                        <td>
                          <div className="font-semibold">{link.title}</div>
                          <div className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                            {link.url}
                          </div>
                        </td>
                        <td>
                          <a
                            href={linkCompleto}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--primary)]"
                          >
                            {link.shortCode}
                          </a>
                        </td>
                        <td>{link.clicks}</td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="btn btn-secondary"
                              onClick={() => copiarLink(link.shortCode)}
                            >
                              Copiar
                            </button>

                            <button
                              className="btn btn-primary"
                              onClick={() => enviarTelegram(link)}
                              disabled={enviandoId === link.id}
                            >
                              {enviandoId === link.id ? "Enviando..." : "Telegram"}
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={() => excluirLink(link.id)}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="alert-success p-4">
            <div className="font-bold">Conta conectada</div>
            <div className="mt-1 text-sm">
              Usuária: <strong>{session.user?.email}</strong>
            </div>
            <div className="mt-1 text-sm">
              Plano atual: <strong>{planoAtual}</strong>
            </div>
          </div>

          <div className="card p-4">
            <h2 className="text-base font-bold">Telegram</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Esse bloco já conversa com sua rota atual de envio.
            </p>

            <div className="mt-4 rounded-xl border border-[var(--line)] p-4">
              <div className="text-sm font-semibold">Bot pronto para automação</div>
              <div className="mt-1 text-xs text-[var(--muted)]">
                Use o botão “Telegram” nos links para disparar ofertas.
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h2 className="text-base font-bold">Próximo bloco</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              A próxima continuidade ideal é criar a tela interna de “Canais/Grupos”
              com abas tipo Telegram, WhatsApp, Shopee, Amazon e Mercado Livre.
            </p>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
