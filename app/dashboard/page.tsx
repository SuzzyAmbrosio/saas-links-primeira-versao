"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  Bell,
  Bot,
  CircleDollarSign,
  Copy,
  ExternalLink,
  Home,
  LayoutDashboard,
  Link2,
  Loader2,
  Megaphone,
  MessageCircle,
  Send,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Trash2,
  User,
  WalletCards,
  Zap,
} from "lucide-react";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
    { href: "/config-afiliados", label: "Config Afiliados", icon: WalletCards },
    { href: "/config-telegram", label: "Config Telegram", icon: Send },
    { href: "/config-whatsapp", label: "Config WhatsApp", icon: MessageCircle },
    { href: "/canais-grupos", label: "Canais/Grupos", icon: Megaphone },
    { href: "#", label: "Migração de Produtos", icon: ShoppingBag },
    { href: "#", label: "Meus Dados", icon: User },
    { href: "#", label: "Assinatura", icon: Star },
    { href: "#", label: "Afiliados", icon: Tag },
    { href: "#", label: "Vídeos", icon: Bot },
  ];

  return (
    <aside className="hidden min-h-screen w-[230px] shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          S
        </div>
        <div>
          <p className="text-[13px] font-bold text-slate-700">DivulgaLinks</p>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Menu
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition",
                  item.active
                    ? "border-l-4 border-blue-600 bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-xl border border-blue-200 bg-white p-3 shadow-sm">
          <div className="mb-1 inline-flex rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            R$ 50/mês
          </div>
          <p className="text-[12px] font-semibold text-slate-700">Programa Influenciadores</p>
        </div>
      </div>
    </aside>
  );
}

function Topbar(email?: string | null) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="h-11 flex-1 rounded-lg border border-slate-200 bg-slate-50" />
      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            2
          </span>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-[12px] font-bold text-white">
          {email?.[0]?.toUpperCase() || "S"}
        </div>
      </div>
    </div>
  );
}

function StarterBanner({ planoAtual }: { planoAtual: string }) {
  return (
    <div className="mb-5 rounded-xl border border-amber-400 bg-amber-100 px-5 py-4">
      <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="text-[13px] text-amber-900">
          <strong>⚠ Atenção:</strong> Você está utilizando o plano{" "}
          <strong>{planoAtual === "PRO" ? "PRO" : "STARTER (7 dias grátis)"}</strong>, que possui
          limitações, como marca d&apos;água nos posts e suporte a afiliados reduzido.
        </p>
        <Link
          href="/upgrade"
          className="inline-flex shrink-0 items-center rounded-lg bg-amber-400 px-4 py-2 text-[13px] font-bold text-slate-900 transition hover:bg-amber-300"
        >
          Upgrade Agora 🚀
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  help,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  help?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {help ? <div className="mt-1 text-[12px] text-slate-500">{help}</div> : null}
    </div>
  );
}

function MiniTabs() {
  const tabs = [
    "Geral",
    "Telegram",
    "Layout Post",
    "Recursos de IA",
    "Site",
    "Instagram",
    "InstaSched",
    "InstaBotHelp",
    "WhatsApp - GRUPOS/CANAIS",
    "AliExpress",
    "Amazon",
    "Magalu",
    "Mercado Livre",
    "Shein",
    "Shopee",
    "Awin",
    "Produto Manual",
  ];

  return (
    <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "rounded-md px-3 py-1.5 text-[12px] font-semibold transition",
              index === 0 ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function PanelCard({
  title,
  children,
  extra,
}: {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-[14px] font-bold text-slate-700">{title}</h3>
        {extra}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

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
    () => links.reduce((acc, item) => acc + Number(item.clicks || 0), 0),
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
      const mensagem = `🔥 ${link.title} com desconto HOJE!\n\n✅ Oferta imperdível\n🚚 Entrega rápida\n⭐ Produto bem avaliado\n\n🛒 Compre agora: ${window.location.origin}/${link.shortCode}`;

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-600 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          Carregando painel...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Home className="h-7 w-7" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Você precisa fazer login</h1>
          <p className="mb-6 text-sm text-slate-500">
            Entre na sua conta para acessar o painel e gerenciar seus links.
          </p>
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Ir para login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar email={session.user?.email} />

          <StarterBanner planoAtual={planoAtual} />

          <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-blue-700 text-sm font-bold text-white">
                VS
              </div>
              <div>
                <p className="text-[18px] font-bold text-slate-800">Viciados na Shoppee</p>
                <p className="text-[12px] text-slate-500">
                  Usuária: {session.user?.email} • Plano atual: {planoAtual}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/upgrade"
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-blue-700"
              >
                Atualizar
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-slate-100 px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-200"
              >
                Ver site
              </Link>
            </div>
          </div>

          <MiniTabs />

          {message ? (
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              {message}
            </div>
          ) : null}

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total de links"
              value={links.length}
              icon={Link2}
              help="Links ativos no painel"
            />
            <StatCard
              title="Cliques totais"
              value={totalCliques}
              icon={BarChart3}
              help="Soma de todos os acessos"
            />
            <StatCard
              title="Links disponíveis"
              value={planoAtual === "PRO" ? "∞" : Math.max(0, 5 - links.length)}
              icon={Zap}
              help={planoAtual === "PRO" ? "Plano ilimitado" : "Limite do plano gratuito"}
            />
            <StatCard
              title="Ganhos estimados"
              value={`R$ ${ganhosEstimados}`}
              icon={CircleDollarSign}
              help="Estimativa simples por clique"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <PanelCard title="Adicionar produto / criar link">
                <form onSubmit={criarLink} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      Título
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Oferta Air Fryer"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      URL de destino
                    </label>
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70"
                    >
                      {loading ? "Criando..." : "Criar link"}
                    </button>

                    <button
                      type="button"
                      onClick={importarProdutosShopee}
                      disabled={importando}
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70"
                    >
                      {importando ? "Importando..." : "Importar produtos da Shopee"}
                    </button>
                  </div>
                </form>
              </PanelCard>

              <PanelCard title="Meus links">
                {links.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Nenhum link criado ainda.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => {
                      const linkCompleto =
                        typeof window !== "undefined"
                          ? `${window.location.origin}/${link.shortCode}`
                          : `/${link.shortCode}`;

                      return (
                        <div
                          key={link.id}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0">
                              <h4 className="truncate text-[15px] font-bold text-slate-800">
                                {link.title}
                              </h4>
                              <p className="mt-1 line-clamp-1 text-[12px] text-slate-500">
                                Destino: {link.url}
                              </p>
                              <Link
                                href={linkCompleto}
                                target="_blank"
                                className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:underline"
                              >
                                {linkCompleto}
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </div>

                            <div className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                              Cliques: {link.clicks}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => copiarLink(link.shortCode)}
                              className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-300"
                            >
                              <Copy className="h-4 w-4" />
                              Copiar
                            </button>

                            <button
                              onClick={() => enviarTelegram(link)}
                              disabled={enviandoId === link.id}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-[12px] font-bold text-white hover:bg-blue-700 disabled:opacity-70"
                            >
                              {enviandoId === link.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                              {enviandoId === link.id ? "Enviando..." : "Telegram"}
                            </button>

                            <button
                              onClick={() => excluirLink(link.id)}
                              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-[12px] font-bold text-white hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                              Excluir
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </PanelCard>
            </div>

            <div className="space-y-5">
              <PanelCard title="Top links">
                {topLinks.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Nenhum dado ainda.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topLinks.map((link, index) => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                              {index + 1}
                            </div>
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {link.title}
                            </p>
                          </div>
                          <p className="mt-1 text-[12px] text-slate-500">/{link.shortCode}</p>
                        </div>
                        <div className="text-sm font-bold text-slate-700">{link.clicks} cliques</div>
                      </div>
                    ))}
                  </div>
                )}
              </PanelCard>

              <PanelCard title="Resumo rápido">
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Envio para Telegram</p>
                    <p className="mt-1 text-[13px]">
                      Use o botão <strong>Telegram</strong> em cada link para publicar a oferta.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Importação Shopee</p>
                    <p className="mt-1 text-[13px]">
                      O botão de importação reaproveita sua rota atual de produtos.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Configurações futuras</p>
                    <p className="mt-1 text-[13px]">
                      Depois ligamos esse layout nas páginas de afiliados, Telegram, WhatsApp e grupos.
                    </p>
                  </div>
                </div>
              </PanelCard>

              <PanelCard title="Atalhos">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/config-afiliados"
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Config Afiliados
                  </Link>
                  <Link
                    href="/config-telegram"
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Config Telegram
                  </Link>
                  <Link
                    href="/config-whatsapp"
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Config WhatsApp
                  </Link>
                  <Link
                    href="/canais-grupos"
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Canais/Grupos
                  </Link>
                </div>
              </PanelCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
