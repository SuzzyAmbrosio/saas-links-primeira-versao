"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  Bot,
  Boxes,
  CircleAlert,
  Clock3,
  ExternalLink,
  Home,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Pencil,
  PlusCircle,
  Send,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Trash2,
  User,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

type GroupItem = {
  id: string;
  name: string;
  internalCode: string;
  postAuto: boolean;
  products: number;
  intervalLabel: string;
  randomMode: boolean;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/config-afiliados", label: "Config Afiliados", icon: WalletCards },
    { href: "/config-telegram", label: "Config Telegram", icon: Send },
    { href: "/config-whatsapp", label: "Config WhatsApp", icon: MessageCircle },
    { href: "/canais-grupos", label: "Canais/Grupos", icon: Megaphone, active: true },
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
          Configurações
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
          S
        </div>
      </div>
    </div>
  );
}

function StarterBanner() {
  return (
    <div className="mb-5 rounded-xl border border-amber-400 bg-amber-100 px-5 py-4">
      <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="text-[13px] text-amber-900">
          <strong>⚠ Atenção:</strong> Você está utilizando o plano{" "}
          <strong>STARTER (7 dias grátis)</strong>, que possui limitações, como marca
          d&apos;água nos posts e suporte a afiliados reduzido.
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

function GroupCard({
  item,
  onDelete,
}: {
  item: GroupItem;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full max-w-[320px] rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
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
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-sky-500" />
            <span>Post Auto:</span>
          </div>
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
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-cyan-500" />
            <span>Produtos:</span>
          </div>
          <span className="font-semibold text-slate-700">{item.products}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-amber-500" />
            <span>Intervalo:</span>
          </div>
          <span className="font-semibold text-slate-700">{item.intervalLabel}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-violet-500" />
            <span>Aleatório:</span>
          </div>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              item.randomMode ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            )}
          >
            {item.randomMode ? "SIM" : "NÃO"}
          </span>
        </div>
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
  const [groups, setGroups] = useState<GroupItem[]>([
    {
      id: "1",
      name: "Viciados na Shoppee",
      internalCode: "32980",
      postAuto: true,
      products: 200,
      intervalLabel: "N/A",
      randomMode: false,
    },
  ]);

  const limitReached = useMemo(() => groups.length >= 1, [groups.length]);

  function handleAddGroup() {
    if (limitReached) {
      alert("Limite atingido: 1/1 no plano atual.");
      return;
    }

    const nextId = String(Date.now());

    setGroups((prev) => [
      ...prev,
      {
        id: nextId,
        name: `Novo Grupo ${prev.length + 1}`,
        internalCode: String(Math.floor(10000 + Math.random() * 90000)),
        postAuto: false,
        products: 0,
        intervalLabel: "N/A",
        randomMode: false,
      },
    ]);
  }

  function handleDeleteGroup(id: string) {
    const ok = window.confirm("Deseja excluir este grupo?");
    if (!ok) return;
    setGroups((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar />
          <StarterBanner />

          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
                <Users className="h-4 w-4" />
                Gerenciar Grupos de Configuração
              </div>
              <p className="mt-1 text-[12px] text-slate-500">
                Configure seus grupos e organize suas publicações
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleAddGroup}
                className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4" />
                Adicionar Grupo
              </button>
              <span className="text-[11px] text-red-500">
                Limite atingido: {groups.length}/1
              </span>
            </div>
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-5">
            {groups.map((item) => (
              <GroupCard key={item.id} item={item} onDelete={handleDeleteGroup} />
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
