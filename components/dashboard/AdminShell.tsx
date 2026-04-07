"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

type NavItem = {
  label: string;
  href: string;
  activeMatch?: string;
  highlight?: string;
};

const items: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", activeMatch: "/dashboard" },
  { label: "Config Afiliados", href: "/dashboard#afiliados", activeMatch: "#afiliados" },
  { label: "Config Telegram", href: "/dashboard#telegram", activeMatch: "#telegram" },
  { label: "Config WhatsApp", href: "/dashboard#whatsapp", activeMatch: "#whatsapp" },
  { label: "Canais/Grupos", href: "/dashboard#canais", activeMatch: "#canais" },
  { label: "Migração de Produtos", href: "/dashboard#migracao", activeMatch: "#migracao" },
  { label: "Meus Dados", href: "/dashboard#dados", activeMatch: "#dados" },
  { label: "Assinatura", href: "/upgrade", activeMatch: "/upgrade" },
  { label: "Afiliados", href: "/dashboard#afiliados-lista", activeMatch: "#afiliados-lista" },
  { label: "Vídeos", href: "/dashboard#videos", activeMatch: "#videos" },
  { label: "Programa Influenciadores", href: "/dashboard#influenciadores", activeMatch: "#influenciadores", highlight: "R$ 500/MÊS" },
  { label: "FAQ", href: "/dashboard#faq", activeMatch: "#faq" },
  { label: "Ajuda", href: "/dashboard#ajuda", activeMatch: "#ajuda" },
];

function DotIcon() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: 999,
        display: "inline-block",
        background: "#d7deeb",
        border: "1px solid #c8d1df",
      }}
    />
  );
}

export default function AdminShell({
  children,
  title = "Dashboard",
  subtitle = "Painel administrativo",
}: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="flex min-h-screen">
        <aside className="sidebar-scroll hidden w-[230px] shrink-0 border-r border-[var(--line)] bg-white lg:block">
          <div className="px-4 py-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eef2ff] text-lg font-black text-[var(--primary)]">
                S
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text)]">DivulgaLinks</div>
              </div>
            </div>
          </div>

          <div className="px-3 pb-6">
            <div className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Configurações
            </div>

            <nav className="space-y-1">
              {items.map((item) => {
                const active =
                  pathname === item.href || pathname === item.activeMatch || item.href === pathname;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      active
                        ? "bg-[#eef1ff] text-[var(--primary)]"
                        : "text-[#6d7b8f] hover:bg-[#f6f8fc] hover:text-[var(--text)]"
                    }`}
                  >
                    <DotIcon />
                    <span className="flex-1">{item.label}</span>
                    {item.highlight ? (
                      <span className="rounded-full bg-[#ffcd45] px-2 py-[2px] text-[10px] font-bold text-[#875d00]">
                        {item.highlight}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="container-app px-4 py-4 md:px-6">
            <header className="mb-4 flex items-center gap-4 rounded-xl border border-[var(--line)] bg-white px-4 py-3">
              <input
                placeholder="Pesquisar..."
                className="h-11 flex-1 px-4"
                readOnly
              />
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[#f8fafc]">
                  ✉
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white">
                    3
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5f7383] text-sm font-bold text-white">
                  S
                </div>
              </div>
            </header>

            <div className="mb-4 alert-warning px-4 py-4 text-center text-sm">
              <div className="font-semibold">
                ⚠ Atenção: Você está utilizando o plano <strong>STARTER (7 dias grátis)</strong>, que possui limitações.
              </div>
              <div className="mt-1 text-xs">
                Para desbloquear todos os recursos, considere fazer um upgrade para um plano premium.
              </div>
              <div className="mt-3">
                <Link href="/upgrade" className="btn btn-primary">
                  Upgrade Agora 🚀
                </Link>
              </div>
            </div>

            <section className="mb-4 flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-lg font-bold text-[var(--text)]">{title}</h1>
                <p className="text-sm text-[var(--muted)]">{subtitle}</p>
              </div>

              <button className="btn btn-secondary">Atualizar</button>
            </section>

            {children}

            <footer className="mt-6 rounded-xl border border-[var(--line)] bg-[#f2f5fa] px-4 py-3 text-sm text-[var(--muted)]">
              © 2026
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
