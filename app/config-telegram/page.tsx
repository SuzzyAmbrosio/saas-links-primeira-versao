"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  Bot,
  CheckCircle2,
  ExternalLink,
  LayoutDashboard,
  Loader2,
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
    { href: "/config-telegram", label: "Config Telegram", icon: Send, active: true },
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

export default function ConfigTelegramPage() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [defaultMessage, setDefaultMessage] = useState(
    "🔥 Oferta imperdível do dia!\n\n✅ Produto selecionado\n🚚 Envio rápido\n⭐ Aproveite enquanto durar\n\n🛒 Confira agora no link abaixo:"
  );
  const [signature, setSignature] = useState(
    "Entre no canal para receber mais ofertas todos os dias."
  );
  const [parseMode, setParseMode] = useState("HTML");
  const [disablePreview, setDisablePreview] = useState(false);
  const [pinAfterSend, setPinAfterSend] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "tested" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadConfig() {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/user-config/telegram", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Erro ao carregar configurações.");
        return;
      }

      setBotToken(data?.botToken ?? "");
      setChatId(data?.chatId ?? "");
      setDefaultMessage(
        data?.defaultMessage ||
          "🔥 Oferta imperdível do dia!\n\n✅ Produto selecionado\n🚚 Envio rápido\n⭐ Aproveite enquanto durar\n\n🛒 Confira agora no link abaixo:"
      );
      setSignature(
        data?.signature || "Entre no canal para receber mais ofertas todos os dias."
      );
      setParseMode(data?.parseMode ?? "HTML");
      setDisablePreview(Boolean(data?.disablePreview));
      setPinAfterSend(Boolean(data?.pinAfterSend));
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao carregar configurações.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  async function handleSave() {
    try {
      setSaving(true);
      setStatus("idle");
      setErrorMessage("");

      const res = await fetch("/api/user-config/telegram", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botToken,
          chatId,
          defaultMessage,
          signature,
          parseMode,
          disablePreview,
          pinAfterSend,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Erro ao salvar configurações.");
        return;
      }

      setStatus("saved");
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao salvar configurações.");
    } finally {
      setSaving(false);
    }
  }

  function handleTest() {
    setStatus("tested");
  }

  const previewText = useMemo(() => {
    return [defaultMessage, "https://seudominio.com/oferta-exemplo", signature]
      .filter(Boolean)
      .join("\n\n");
  }, [defaultMessage, signature]);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Topbar />
          <StarterBanner />

          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-slate-800">Configurações do Telegram</h1>
              <p className="mt-1 text-[13px] text-slate-500">
                Configure o bot, o destino e o formato padrão das mensagens.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleTest}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
                Testar envio
              </button>

              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Salvando..." : "Salvar configurações"}
              </button>
            </div>
          </div>

          {status === "saved" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Configurações salvas com sucesso.
            </div>
          )}

          {status === "tested" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
              <AlertCircle className="h-4 w-4" />
              Teste simulado executado. Próximo passo: integrar com a API real do Telegram.
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4" />
              {errorMessage || "Erro ao processar a configuração."}
            </div>
          )}

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              <div className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando configurações...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <CardSection title="Conexão do bot">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                        Bot Token
                      </label>
                      <input
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        placeholder="Ex: 123456789:AA..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                        Chat ID / Canal ID
                      </label>
                      <input
                        value={chatId}
                        onChange={(e) => setChatId(e.target.value)}
                        placeholder="Ex: -1001234567890"
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

                <CardSection title="Rodapé / assinatura">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                      CTA final
                    </label>
                    <textarea
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="min-h-[110px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </CardSection>

                <CardSection title="Opções do envio">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-slate-600">
                        Parse mode
                      </label>
                      <select
                        value={parseMode}
                        onChange={(e) => setParseMode(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                      >
                        <option value="HTML">HTML</option>
                        <option value="Markdown">Markdown</option>
                        <option value="MarkdownV2">MarkdownV2</option>
                        <option value="Plain">Sem formatação</option>
                      </select>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[13px] text-slate-600">
                      Escolha o formato que será usado quando a API real do Telegram for conectada.
                    </div>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-[13px] font-medium text-slate-700">
                      <span>Desativar preview do link</span>
                      <input
                        type="checkbox"
                        checked={disablePreview}
                        onChange={() => setDisablePreview(!disablePreview)}
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-[13px] font-medium text-slate-700">
                      <span>Fixar mensagem após envio</span>
                      <input
                        type="checkbox"
                        checked={pinAfterSend}
                        onChange={() => setPinAfterSend(!pinAfterSend)}
                      />
                    </label>
                  </div>
                </CardSection>
              </div>

              <div className="space-y-5">
                <CardSection title="Preview da mensagem">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white">
                        <Send className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Bot de Ofertas</p>
                        <p className="text-[12px] text-slate-500">Prévia do Telegram</p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                      <div className="whitespace-pre-line">{previewText}</div>
                    </div>
                  </div>
                </CardSection>

                <CardSection title="Resumo da configuração">
                  <div className="space-y-3 text-[13px] text-slate-600">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <strong className="text-slate-700">Bot token:</strong>{" "}
                      {botToken ? "Preenchido" : "Não informado"}
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <strong className="text-slate-700">Chat ID:</strong>{" "}
                      {chatId || "Não informado"}
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <strong className="text-slate-700">Parse mode:</strong> {parseMode}
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <strong className="text-slate-700">Preview do link:</strong>{" "}
                      {disablePreview ? "Desativado" : "Ativado"}
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <strong className="text-slate-700">Fixar após envio:</strong>{" "}
                      {pinAfterSend ? "Sim" : "Não"}
                    </div>
                  </div>
                </CardSection>

                <CardSection title="Dicas rápidas">
                  <div className="space-y-3 text-[13px] text-slate-600">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      O Chat ID de canais costuma começar com <strong>-100</strong>.
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      Use mensagens curtas, objetivas e com CTA forte para aumentar cliques.
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      Essa tela já salva por usuário no banco.
                    </div>
                  </div>
                </CardSection>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
