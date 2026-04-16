"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

  const planoAtual = session?.user?.email === "admin@saaslinks.com"? "PRO" : "FREE";

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
      setLinks(Array.isArray(data)? data : []);
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
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Carregando...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Você precisa fazer login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Entre na sua conta para acessar o painel e gerenciar seus links.
          </p>
          <div className="mt-6">
            <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Ir para login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {message? (
        <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</div>
      ) : null}

      <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard Posta Links Auto</h1>
            <p className="text-sm text-gray-600">Painel principal de campanhas, canais e automações</p>
          </div>
          <button className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
            Atualizar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-gray-100 px-3 py-1">Geral</span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">Telegram</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Layout Post</span>
          <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">WhatsApp - Grupos/Canais</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Instagram</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Shopee</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Amazon</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Mercado Livre</span>
        </div>
      </div>

      <section className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Total de links</div>
          <div className="mt-2 text-3xl font-bold">{links.length}</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Cliques totais</div>
          <div className="mt-2 text-3xl font-bold">{totalCliques}</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Links disponíveis</div>
          <div className="mt-2 text-3xl font-bold">
            {planoAtual === "PRO"? "∞" : Math.max(0, 5 - links.length)}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Ganhos estimados</div>
          <div className="mt-2 text-3xl font-bold">R$ {ganhosEstimados}</div>
        </div>
      </section>

      <section className="mb-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Adicionar produto ou link</h2>
              <p className="text-sm text-gray-600">
                Continue a estrutura visual do painel sem trocar sua API atual.
              </p>
            </div>

            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={importarProdutosShopee}
              disabled={importando}
            >
              {importando? "Importando..." : "Importar Shopee"}
            </button>
          </div>

          <form onSubmit={criarLink} className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                Título
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Fone Bluetooth com desconto"
                className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                URL de destino
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                Categoria
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-3" defaultValue="Shopee">
                <option>Shopee</option>
                <option>Amazon</option>
                <option>Mercado Livre</option>
                <option>Telegram</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                Tipo de postagem
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-3" defaultValue="Oferta">
                <option>Oferta</option>
                <option>Story</option>
                <option>Grupo</option>
                <option>Canal</option>
              </select>
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" disabled={loading}>
                {loading? "Criando..." : "Salvar link"}
              </button>

              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="text-base font-bold">Top links</h2>
          <p className="mb-4 text-sm text-gray-600">
            Os links com melhor desempenho até agora.
          </p>

          {topLinks.length === 0? (
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              Nenhum dado ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {topLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-600">
                      #{index + 1}
                    </div>
                    <div className="line-clamp-2 text-sm font-semibold">
                      {link.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      /{link.shortCode}
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {link.clicks} cliques
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mb-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Configuração de afiliados</h2>
              <p className="text-sm text-gray-600">
                Blocos prontos para você continuar as próximas telas do clone.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {affiliateCards.map((card) => (
              <div key={card.nome} className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{card.nome}</h3>
                    <p className="mt-1 text-sm text-gray-600">{card.descricao}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      card.status === "Conectado"? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Digite sua chave / ID" />
                  <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Link de afiliado" />
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Salvar</button>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Divulgar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h2 className="text-base font-bold">Meus links</h2>
          </div>

          {links.length === 0? (
            <div className="p-4 text-sm text-gray-600">
              Nenhum link criado ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Título</th>
                    <th className="px-4 py-3">Short link</th>
                    <th className="px-4 py-3">Cliques</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const linkCompleto =
                      typeof window!== "undefined"
                       ? `${window.location.origin}/${link.shortCode}`
                        : `/${link.shortCode}`;

                    return (
                      <tr key={link.id} className="border-b border-gray-100">
                        <td className="px-4 py-3">
                          <div className="font-semibold">{link.title}</div>
                          <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                            {link.url}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={linkCompleto}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {link.shortCode}
                          </a>
                        </td>
                        <td className="px-4 py-3">{link.clicks}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                              onClick={() => copiarLink(link.shortCode)}
                            >
                              Copiar
                            </button>

                            <button
                              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                              onClick={() => enviarTelegram(link)}
                              disabled={enviandoId === link.id}
                            >
                              {enviandoId === link.id? "Enviando..." : "Telegram"}
                            </button>

                            <button
                              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
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
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="font-bold text-green-900">Conta conectada</div>
            <div className="mt-1 text-sm text-green-800">
              Usuária: <strong>{session.user?.email}</strong>
            </div>
            <div className="mt-1 text-sm text-green-800">
              Plano atual: <strong>{planoAtual}</strong>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-base font-bold">Telegram</h2>
            <p className="mt-1 text-sm text-gray-600">
              Esse bloco já conversa com sua rota atual de envio.
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold">Bot pronto para automação</div>
              <div className="mt-1 text-xs text-gray-600">
                Use o botão “Telegram” nos links para disparar ofertas.
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-base font-bold">Próximo bloco</h2>
            <p className="mt-1 text-sm text-gray-600">
              A próxima continuidade ideal é criar a tela interna de “Canais/Grupos”
              com abas tipo Telegram, WhatsApp, Shopee, Amazon e Mercado Livre.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}