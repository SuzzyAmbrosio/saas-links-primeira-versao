"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock3,
  ExternalLink,
  LayoutDashboard,
  Loader2,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Star,
  Tag,
  User,
  WalletCards,
  XCircle,
} from "lucide-react";

type MetricSummary = {
  totalLogs: number;
  successCount: number;
  errorCount: number;
  skippedCount: number;
  activeGroups: number;
  totalGroups: number;
  lastActivity: string | null;
};

type PostLog = {
  id: string;
  status: string;
  detail: string;
  groupName?: string | null;
  linkTitle?: string | null;
  telegramChatId?: string | null;
  postedAt: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(value?: string | null) {
  if (!value) return "Sem atividade";

  try {
    return new Date(value).toLocaleString("pt-BR");
  } catch {
    return "Sem atividade";
  }
}

function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/config-afiliados", label: "Config Afiliados", icon: WalletCards },
    { href: "/config-telegram", label: "Config Telegram", icon: MessageCircle },
    { href: "/config-whatsapp", label: "Config WhatsApp", icon: MessageCircle },
    { href: "/canais-grupos", label: "Canais/Grupos", icon: Megaphone },
    { href: "/logs", label: "Logs", icon: Activity },
    { href: "/metricas", label: "Métricas", icon: Activity, active: true },
    { href: "#", label: "Migração de Produtos", icon: ShoppingBag },
    { href: "#", label: "Meus Dados", icon: User },
    { href: "#", label: "Assinatura", icon: Star },
    { href: "#", label: "Afiliados", icon: Tag },
  ];

  return (
    <aside className="hidden min-h-screen w-[230px] shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          S
        </div>
        <div>
          <p className="text-[13px] font-bold text-slate-700">PostaLinksAuto</p>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Navegação
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

        <div className="mt-4 space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-slate-500 hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" />
            Ajuda
          </Link>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="h-11 flex-1 rounded-lg border border-slate-200 bg-slate-50" />
      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-[12px] font-bold text-white">
          S
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  tone = "blue",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "blue" | "green" | "red" | "amber";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <div className={cn("rounded-lg p-2", tones[tone])}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
    </div>
  );
}

export default function MetricasPage() {
  const [summary, setSummary] = useState<MetricSummary | null>(null);
  const [recentLogs, setRecentLogs] = useState<PostLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMetrics() {
    try {
      setLoading(true);
      const res = await fetch("/api/metrics", { cache: "no-store" });
      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary);
        setRecentLogs(Array.isArray(data.recentLogs) ? data.recentLogs : []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar />

          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
            <h1 className="text-[24px] font-bold text-slate-800">
              Métricas de automação
            </h1>
            <p className="mt-1 text-[13px] text-slate-500">
              Acompanhe desempenho, erros e atividade recente do sistema.
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              <div className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando métricas...
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total de logs"
                  value={summary?.totalLogs ?? 0}
                  icon={<Activity className="h-4 w-4" />}
                  tone="blue"
                />
                <StatCard
                  title="Sucessos"
                  value={summary?.successCount ?? 0}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  tone="green"
                />
                <StatCard
                  title="Erros"
                  value={summary?.errorCount ?? 0}
                  icon={<XCircle className="h-4 w-4" />}
                  tone="red"
                />
                <StatCard
                  title="Pulados"
                  value={summary?.skippedCount ?? 0}
                  icon={<AlertCircle className="h-4 w-4" />}
                  tone="amber"
                />
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                    Grupos ativos
                  </p>
                  <div className="mt-2 text-2xl font-bold text-slate-800">
                    {summary?.activeGroups ?? 0} / {summary?.totalGroups ?? 0}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 md:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-slate-700">
                    <Clock3 className="h-4 w-4" />
                    <span className="font-semibold">Última atividade</span>
                  </div>
                  <div className="text-[14px] text-slate-600">
                    {formatDateTime(summary?.lastActivity)}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h2 className="mb-4 text-[16px] font-bold text-slate-800">
                  Últimos eventos
                </h2>

                <div className="space-y-3">
                  {recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-[11px] font-bold",
                            log.status === "success" &&
                              "bg-emerald-100 text-emerald-700",
                            log.status === "error" && "bg-red-100 text-red-700",
                            log.status === "skipped" &&
                              "bg-amber-100 text-amber-700"
                          )}
                        >
                          {log.status.toUpperCase()}
                        </span>

                        <span className="text-[12px] text-slate-500">
                          {formatDateTime(log.postedAt)}
                        </span>
                      </div>

                      <div className="grid gap-2 text-[13px] text-slate-700 md:grid-cols-2">
                        <div>
                          <strong>Grupo:</strong> {log.groupName || "-"}
                        </div>
                        <div>
                          <strong>Link:</strong> {log.linkTitle || "-"}
                        </div>
                        <div className="md:col-span-2">
                          <strong>Detalhe:</strong> {log.detail || "-"}
                        </div>
                      </div>
                    </div>
                  ))}

                  {!recentLogs.length && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                      Nenhum evento encontrado.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
