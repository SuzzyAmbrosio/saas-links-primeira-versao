"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Send,
  MessageCircle,
  Users,
  RefreshCcw,
  UserCircle2,
  CreditCard,
  Share2,
  Video,
  BadgeHelp,
  LifeBuoy,
} from "lucide-react";

const menu = [
  {
    title: null,
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Configurações:",
    items: [
      { href: "/config-afiliados", label: "Config Afiliados", icon: Settings },
      { href: "/config-telegram", label: "Config Telegram", icon: Send },
      { href: "/config-whatsapp", label: "Config WhatsApp", icon: MessageCircle },
      { href: "/canais-grupos", label: "Canais/Grupos", icon: Users },
      { href: "/migracao-produtos", label: "Migração de Produtos", icon: RefreshCcw },
      { href: "/meus-dados", label: "Meus Dados", icon: UserCircle2 },
      { href: "/assinatura", label: "Assinatura", icon: CreditCard },
      { href: "/afiliados", label: "Afiliados", icon: Share2 },
      { href: "/videos", label: "Vídeos", icon: Video },
      { href: "/faq", label: "FAQ", icon: BadgeHelp },
      { href: "/ajuda", label: "Ajuda", icon: LifeBuoy },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="mb-4 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 font-black text-white">
          S
        </div>
        <div className="text-[13px] font-bold text-slate-700">PostaLinksAuto</div>
      </div>

      {menu.map((section, index) => (
        <div key={index}>
          {section.title ? (
            <div className="menu-section-title">{section.title}</div>
          ) : null}

          <div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`side-link ${active ? "active" : ""}`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-lg border border-blue-300 bg-white p-3">
        <div className="mb-1 inline-block rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-slate-800">
          R$ 50,00/mês
        </div>
        <div className="text-[12px] leading-4 text-slate-600">
          Programa
          <br />
          Influenciadores
        </div>
      </div>
    </aside>
  );
}
