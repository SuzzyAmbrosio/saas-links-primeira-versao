"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CircleAlert,
  Clock3,
  ExternalLink,
  Megaphone,
  Pencil,
  PlusCircle,
  Power,
  Trash2,
} from "lucide-react";

type GroupItem = {
  id: string;
  name: string;
  internalCode: string;
  postAuto: boolean;
  products: number;
  intervalMinutes: number;
  randomMode: boolean;
  lastPostedAt?: string | null;
  isActive: boolean;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(value?: string | null) {
  if (!value) return "Nunca postado";

  try {
    return new Date(value).toLocaleString("pt-BR");
  } catch {
    return "Nunca postado";
  }
}

function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/config-afiliados", label: "Config Afiliados" },
    { href: "/config-telegram", label: "Config Telegram" },
    { href: "/config-whatsapp", label: "Config WhatsApp" },
    { href: "/canais-grupos", label: "Canais/Grupos", active: true },
  ];

  return (
    <aside className="hidden w-[230px] border-r bg-white lg:block">
      <div className="p-5 font-bold text-slate-700">DivulgaLinks</div>

      <div className="px-4 pb-8">
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Configurações
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-[13px] font-medium",
                item.active
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-xl border border-blue-200 bg-white p-3 shadow-sm">
          <div className="mb-1 inline-flex rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            R$ 50/mês
          </div>
          <p className="text-[12px] font-semibold text-slate-700">Programa Influenciadores</p>
        </div>

        <div className="mt-4 space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-slate-500 hover:bg-slate-50"
          >
            <CircleAlert className="h-4 w-4" />
            FAQ
          </Link>
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
    <div className="mb-5 flex justify-between rounded-xl border bg-white p-3">
      <div />
      <Bell className="text-slate-500" />
    </div>
  );
}

function StarterBanner() {
  return (
    <div className="mb-5 rounded-xl border border-amber-400 bg-amber-100 px-5 py-4">
      <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="text-[13px] text-amber-900">
          <strong>⚠ Atenção:</strong> Você está utilizando o plano{" "}
          <strong>STARTER (7 dias grátis)</strong>, que possui limitações.
        </p>
        <Link
          href="/upgrade"
          className="inline-flex shrink-0 items-center rounded-lg bg-amber-400 px-4 py-2 text-[13px] font-bold text-slate-900 hover:bg-amber-300"
        >
          Upgrade Agora 🚀
        </Link>
      </div>
    </div>
  );
}

function GroupCard({
  item,
  onDelete,
  onChanged,
}: {
  item: GroupItem;
  onDelete: (id: string) => void;
  onChanged: () => void;
}) {
  const [posting, setPosting] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handlePostNow() {
    try {
      setPosting(true);

      const res = await fetch(`/api/groups/${item.id}/post-now`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Erro ao postar no Telegram.");
        return;
      }

      alert("Post enviado com sucesso no Telegram.");
      onChanged();
    } catch {
      alert("Erro ao postar no Telegram.");
    } finally {
      setPosting(false);
    }
  }

  async function handleToggleActive() {
    try {
      setToggling(true);

      const res = await fetch(`/api/groups/${item.id}/toggle-active`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Erro ao alterar status.");
        return;
      }

      onChanged();
    } catch {
      alert("Erro ao alterar status.");
    } finally {
      setToggling(false);
    }
  }

  return (
    <div className="w-full max-w-[340px] rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-blue-700 text-sm font-bold text-white">
          VS
        </div>

        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-slate-800">{item.name}</p>
          <div className="mt-1 inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">
            ID: {item.internalCode}
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2 border-t border-slate-200 pt-4 text-[12px] text-slate-600">
        <div className="flex items-center justify-between gap-3">
          <span>Post Auto:</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              item.postAuto ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
            )}
          >
            {item.postAuto ? "ATIVO" : "DESATIVADO"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span>Status:</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            )}
          >
            {item.isActive ? "LIGADO" : "PAUSADO"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span>Produtos:</span>
          <span className="font-semibold text-slate-700">{item.products}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span>Intervalo:</span>
          <span className="font-semibold text-slate-700">{item.intervalMinutes} min</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span>Aleatório:</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              item.randomMode ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            )}
          >
            {item.randomMode ? "SIM" : "NÃO"}
          </span>
        </div>

        <div className="rounded-lg bg-slate-50 p-2">
          <div className="mb-1 flex items-center gap-1 font-semibold text-slate-700">
            <Clock3 className="h-3.5 w-3.5" />
            Última postagem
          </div>
          <div className="text-[11px] text-slate-600">{formatDateTime(item.lastPostedAt)}</div>
        </div>
      </div>

      <div className="mb-2 flex gap-2">
        <button
          onClick={handlePostNow}
          disabled={posting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-[12px] font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {posting ? "Postando..." : "Postar agora"}
        </button>

        <button
          onClick={handleToggleActive}
          disabled={toggling}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <Power className="h-4 w-4" />
          {toggling ? "Alterando..." : item.isActive ? "Pausar" : "Ativar"}
        </button>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/canais-grupos/${item.id}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-[12px] font-bold text-white hover:bg-blue-700"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Link>

        <button
          onClick={() => onDelete(item.id)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-3 py-2 text-[12px] font-bold text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default function CanaisGruposPage() {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGroups() {
    try {
      const res = await fetch("/api/groups", { cache: "no-store" });
      const data = await res.json();
      setGroups(Array.isArray(data) ? data : []);
    } catch {
      setGroups([]);
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  const limitReached = useMemo(() => groups.length >= 1, [groups.length]);

  async function handleAddGroup() {
    if (limitReached) {
      alert("Limite atingido: 1/1 no plano atual.");
      return;
    }

    try {
      setLoading(true);

      await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Novo Grupo",
        }),
      });

      await loadGroups();
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteGroup(id: string) {
    const ok = window.confirm("Deseja excluir este grupo?");
    if (!ok) return;

    await fetch("/api/groups", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    await loadGroups();
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="flex-1 p-6">
          <Topbar />
          <StarterBanner />

          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
                <Megaphone className="h-4 w-4" />
                Gerenciar Grupos de Configuração
              </div>
              <p className="mt-1 text-[12px] text-slate-500">
                Configure grupos, automação e postagem manual
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleAddGroup}
                className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4" />
                {loading ? "Criando..." : "Adicionar Grupo"}
              </button>
              <span className="text-[11px] text-red-500">
                Limite atingido: {groups.length}/1
              </span>
            </div>
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-5">
            {groups.map((item) => (
              <GroupCard
                key={item.id}
                item={item}
                onDelete={handleDeleteGroup}
                onChanged={loadGroups}
              />
            ))}
          </div>

          <div className="rounded-lg border border-sky-200 bg-sky-100 px-4 py-3 text-[13px] text-sky-800">
            <span className="font-semibold">Precisa de ajuda?</span> Assista nosso tutorial em vídeo{" "}
            <Link href="#" className="font-bold underline">
              clicando aqui
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
