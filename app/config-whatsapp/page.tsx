"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  Bot,
  CheckCircle2,
  ExternalLink,
  LayoutDashboard,
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
    { href: "/config-afiliados", label: "Config Afiliados", icon: WalletCards },
    { href: "/config-telegram", label: "Config Telegram", icon: Send },
    { href: "/config-whatsapp", label: "Config WhatsApp", icon: MessageCircle, active: true },
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

export default function ConfigWhatsappPage() {
  const [groupName, setGroupName] = useState("Promoções do Dia");
  const [inviteLink, setInviteLink] = useState("");
  const [defaultMessage, setDefaultMessage] = useState(
    "🔥 Olha essa oferta que acabou de sair!\n\n✅ Produto selecionado\n💸 Preço promocional\n🚚 Aproveite antes que acabe\n\n🛒 Link abaixo:"
  );
  const [footerCta, setFooterCta] = useState(
    "Entre no nosso grupo para receber promoções todos os dias."
  );
  const [includeInviteLink, setIncludeInviteLink] = useState(true);
  const [shortenText, setShortenText] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "tested">("idle");

  function handleSave() {
    setStatus("saved");
  }

  function handleTest() {
    setStatus("tested");
  }

  const previewText = useMemo(() => {
    const base = shortenText
      ? `${defaultMessage.split("\n")[0]}\n\n🛒 Link abaixo:`
      : defaultMessage;

    const parts = [
      base,
      "https://seudominio.com/oferta-exemplo",
      footerCta,
      includeInviteLink && inviteLink ? `Convite do grupo:\n${inviteLink}` : "",
    ].filter(Boolean);

    return parts.join("\n\n");
  }, [defaultMessage, footerCta, inviteLink, includeInviteLink, shortenText]);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar />
          <StarterBanner />

          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-slate-800">Configurações do WhatsApp</h1>
              <p className="mt-1 text-[13px] text-slate-500">
                Configure grupos, canais e o formato padrão das mensagens.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleTest}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                Testar mensagem
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Salvar configurações
              </button>
            </div>
          </div>

          {status === "saved" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Configurações salvas localmente. Próximo passo: conectar ao banco.
            </div>
          )}

          {status === "tested" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
              <AlertCircle className="h-4 w-4" />
              Teste simulado executado. Próximo passo: integrar com envio real.
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <CardSection title="Grupo / Canal">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      Nome do grupo ou canal
                    </label>
                    <input
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Ex: Promoções da Suzzy"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      Link de convite
                    </label>
                    <input
                      value={inviteLink}
                      onChange={(e) => setInviteLink(e.target.value)}
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </CardSection>

              <CardSection title="Mensagem padrão">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                    Texto principal
                  </label>
                  <textarea
                    value={defaultMessage}
                    onChange={(e) => setDefaultMessage(e.target.value)}
                    className="min-h-[170px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </CardSection>

              <CardSection title="CTA final / assinatura">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                    Rodapé da mensagem
                  </label>
                  <textarea
                    value={footerCta}
                    onChange={(e) => setFooterCta(e.target.value)}
                    className="min-h-[110px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </CardSection>

              <CardSection title="Opções da mensagem">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-[13px] font-medium text-slate-700">
                    <span>Incluir link do grupo</span>
                    <input
                      type="checkbox"
                      checked={includeInviteLink}
                      onChange={() => setIncludeInviteLink(!includeInviteLink)}
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-[13px] font-medium text-slate-700">
                    <span>Mensagem curta</span>
                    <input
                      type="checkbox"
                      checked={shortenText}
                      onChange={() => setShortenText(!shortenText)}
                    />
                  </label>
                </div>
              </CardSection>
            </div>

            <div className="space-y-5">
              <CardSection title="Preview da mensagem">
                <div className="rounded-xl border border-slate-200 bg-[#e8f5e9] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {groupName || "Grupo WhatsApp"}
                      </p>
                      <p className="text-[12px] text-slate-500">Prévia do WhatsApp</p>
                    </div>
                  </div>

                  <div className="max-w-[420px] rounded-2xl rounded-tl-md bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                    <div className="whitespace-pre-line">{previewText}</div>
                  </div>
                </div>
              </CardSection>

              <CardSection title="Resumo da configuração">
                <div className="space-y-3 text-[13px] text-slate-600">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <strong className="text-slate-700">Grupo:</strong>{" "}
                    {groupName || "Não informado"}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <strong className="text-slate-700">Convite:</strong>{" "}
                    {inviteLink ? "Configurado" : "Não informado"}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <strong className="text-slate-700">Link do grupo:</strong>{" "}
                    {includeInviteLink ? "Incluído" : "Oculto"}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <strong className="text-slate-700">Modo curto:</strong>{" "}
                    {shortenText ? "Sim" : "Não"}
                  </div>
                </div>
              </CardSection>

              <CardSection title="Dicas rápidas">
                <div className="space-y-3 text-[13px] text-slate-600">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    Use mensagens curtas com benefício claro e CTA forte.
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    Evite textos muito longos para manter a taxa de clique alta.
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    Deixe o link do grupo sempre atualizado para facilitar entrada.
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
