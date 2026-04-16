"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Bot,
  ExternalLink,
  LayoutDashboard,
  Link2,
  Megaphone,
  MessageCircle,
  Save,
  Send,
  ShoppingBag,
  Star,
  Tag,
  User,
  WalletCards,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/config-afiliados", label: "Config Afiliados", icon: WalletCards, active: true },
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
          <p className="text-[13px] font-bold text-slate-700">PostaLinksAuto</p>
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

function InicianteBanner() {
  return (
    <div className="mb-5 rounded-xl border border-amber-400 bg-amber-100 px-5 py-4">
      <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="text-[13px] text-amber-900">
          <strong>⚠ Atenção:</strong> Você está utilizando o plano{" "}
          <strong>INICIANTE (7 dias grátis)</strong>, que possui limitações.
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

function CardSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        {icon}
        <h3 className="text-[14px] font-bold text-slate-700">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function ConfigAfiliadosPage() {
  const [shopeeId, setShopeeId] = useState("");
  const [shopeeSubId, setShopeeSubId] = useState("");
  const [amazonTag, setAmazonTag] = useState("");
  const [mercadoLivreTag, setMercadoLivreTag] = useState("");
  const [aliexpressToken, setAliexpressToken] = useState("");
  const [sheinCode, setSheinCode] = useState("");
  const [awinId, setAwinId] = useState("");
  const [manualPrefix, setManualPrefix] = useState("");
  const [message, setMessage] = useState("");

  function handleSave() {
    setMessage("Configurações salvas localmente nesta tela. Próximo passo: conectar no banco.");
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar />
          <InicianteBanner />

          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-slate-800">Configurações de Afiliados</h1>
              <p className="mt-1 text-[13px] text-slate-500">
                Cadastre seus identificadores e parâmetros por plataforma.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Salvar configurações
            </button>
          </div>

          {message ? (
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              {message}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <CardSection
              title="Shopee"
              icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                    Affiliate ID
                  </label>
                  <input
                    value={shopeeId}
                    onChange={(e) => setShopeeId(e.target.value)}
                    placeholder="Ex: 123456789"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                    Sub ID
                  </label>
                  <input
                    value={shopeeSubId}
                    onChange={(e) => setShopeeSubId(e.target.value)}
                    placeholder="Ex: canal_telegram_01"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </CardSection>

            <CardSection
              title="Amazon"
              icon={<Link2 className="h-4 w-4 text-sky-600" />}
            >
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                  Associate Tag
                </label>
                <input
                  value={amazonTag}
                  onChange={(e) => setAmazonTag(e.target.value)}
                  placeholder="Ex: seutag-20"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </CardSection>

            <CardSection
              title="Mercado Livre"
              icon={<Tag className="h-4 w-4 text-yellow-500" />}
            >
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                  Tracking / Partner Tag
                </label>
                <input
                  value={mercadoLivreTag}
                  onChange={(e) => setMercadoLivreTag(e.target.value)}
                  placeholder="Ex: ml_parceiro_01"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </CardSection>

            <CardSection
              title="AliExpress"
              icon={<Link2 className="h-4 w-4 text-rose-500" />}
            >
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                  Token / App Param
                </label>
                <input
                  value={aliexpressToken}
                  onChange={(e) => setAliexpressToken(e.target.value)}
                  placeholder="Ex: alix_token_xpto"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </CardSection>

            <CardSection
              title="Shein"
              icon={<Tag className="h-4 w-4 text-fuchsia-500" />}
            >
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                  Código / Tracking
                </label>
                <input
                  value={sheinCode}
                  onChange={(e) => setSheinCode(e.target.value)}
                  placeholder="Ex: shein-campanha-01"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </CardSection>

            <CardSection
              title="Awin"
              icon={<WalletCards className="h-4 w-4 text-violet-600" />}
            >
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                  Awin ID / Publisher ID
                </label>
                <input
                  value={awinId}
                  onChange={(e) => setAwinId(e.target.value)}
                  placeholder="Ex: 998877"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </CardSection>

            <div className="xl:col-span-2">
              <CardSection
                title="Produto Manual"
                icon={<Tag className="h-4 w-4 text-emerald-600" />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      Prefixo de campanha
                    </label>
                    <input
                      value={manualPrefix}
                      onChange={(e) => setManualPrefix(e.target.value)}
                      placeholder="Ex: oferta_manual"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[13px] text-slate-600">
                    Use essa área para definir padrões quando você cadastrar produtos manualmente,
                    sem importar de marketplaces.
                  </div>
                </div>
              </CardSection>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
