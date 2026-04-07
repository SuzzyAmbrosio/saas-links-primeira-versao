"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Save,
  Send,
  ShoppingBag,
  Trash2,
} from "lucide-react";

const tabsList = [
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

type GroupData = {
  id: string;
  name: string;
  internalCode: string;
  postAuto: boolean;
  intervalMinutes: number;
  randomMode: boolean;
  selectionMode?: string;
  telegramToken: string;
  telegramChatId: string;
  whatsappMessage: string;
  shopeeAffiliateId: string;
  shopeeSubId: string;
  postTitle: string;
  postPriceLabel: string;
  postCta: string;
};

function Topbar() {
  return (
    <div className="mb-5 flex justify-between rounded-xl border bg-white p-3">
      <div />
      <Bell className="text-slate-500" />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-[230px] border-r bg-white lg:block">
      <div className="p-5 text-sm font-bold">DivulgaLinks</div>

      <nav className="space-y-2 px-3 text-sm">
        <Link
          href="/dashboard"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Dashboard
        </Link>
        <Link
          href="/canais-grupos"
          className="block rounded bg-blue-50 px-3 py-2 font-bold text-blue-600"
        >
          Canais/Grupos
        </Link>
        <Link
          href="/config-afiliados"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Config Afiliados
        </Link>
        <Link
          href="/config-telegram"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Config Telegram
        </Link>
        <Link
          href="/config-whatsapp"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Config WhatsApp
        </Link>
        <Link
          href="/logs"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Logs
        </Link>
        <Link
          href="/metricas"
          className="block rounded px-3 py-2 text-slate-600 hover:bg-slate-50"
        >
          Métricas
        </Link>
      </nav>
    </aside>
  );
}

export default function EditGroupPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Geral");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [groupName, setGroupName] = useState("");
  const [internalCode, setInternalCode] = useState("");
  const [postAuto, setPostAuto] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState("30");
  const [randomMode, setRandomMode] = useState(false);
  const [selectionMode, setSelectionMode] = useState("recent");

  const [telegramToken, setTelegramToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postPriceLabel, setPostPriceLabel] = useState("");
  const [postCta, setPostCta] = useState("");

  const [whatsappMessage, setWhatsappMessage] = useState("");

  const [shopeeAffiliateId, setShopeeAffiliateId] = useState("");
  const [shopeeSubId, setShopeeSubId] = useState("");

  async function loadGroup() {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch(`/api/groups/${id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Erro ao carregar grupo.");
        setStatus("error");
        return;
      }

      const group = data as GroupData;

      setGroupName(group.name ?? "");
      setInternalCode(group.internalCode ?? "");
      setPostAuto(Boolean(group.postAuto));
      setIntervalMinutes(String(group.intervalMinutes ?? 30));
      setRandomMode(Boolean(group.randomMode));
      setSelectionMode(group.selectionMode ?? "recent");

      setTelegramToken(group.telegramToken ?? "");
      setTelegramChatId(group.telegramChatId ?? "");

      setWhatsappMessage(group.whatsappMessage ?? "");

      setShopeeAffiliateId(group.shopeeAffiliateId ?? "");
      setShopeeSubId(group.shopeeSubId ?? "");

      setPostTitle(group.postTitle ?? "");
      setPostPriceLabel(group.postPriceLabel ?? "");
      setPostCta(group.postCta ?? "");
    } catch {
      setErrorMessage("Erro ao carregar grupo.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadGroup();
  }, [id]);

  async function handleSave() {
    try {
      setSaving(true);
      setStatus("idle");
      setErrorMessage("");

      const res = await fetch(`/api/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          postAuto,
          intervalMinutes: Number(intervalMinutes || 30),
          randomMode,
          selectionMode,

          telegramToken,
          telegramChatId,

          whatsappMessage,

          shopeeAffiliateId,
          shopeeSubId,

          postTitle,
          postPriceLabel,
          postCta,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Erro ao salvar grupo.");
        setStatus("error");
        return;
      }

      setStatus("saved");
      await loadGroup();
    } catch {
      setErrorMessage("Erro ao salvar grupo.");
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const ok = window.confirm("Deseja excluir este grupo?");
    if (!ok) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/groups/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Erro ao excluir grupo.");
        setStatus("error");
        return;
      }

      router.push("/canais-grupos");
    } catch {
      setErrorMessage("Erro ao excluir grupo.");
      setStatus("error");
    } finally {
      setDeleting(false);
    }
  }

  const previewTitle = useMemo(
    () => postTitle || groupName || "Oferta imperdível",
    [postTitle, groupName]
  );
  const previewPrice = useMemo(
    () => postPriceLabel || "R$ 99,90",
    [postPriceLabel]
  );
  const previewCta = useMemo(
    () => postCta || "COMPRE AGORA",
    [postCta]
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="flex-1 p-6">
          <Topbar />

          <div className="mb-5 flex items-center justify-between rounded-xl border bg-white p-4">
            <div>
              <h1 className="text-xl font-bold">
                Editar: {groupName || "Carregando grupo..."}
              </h1>
              <p className="text-sm text-gray-500">
                ID interno: {internalCode || "-"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting || loading}
                className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-600 disabled:opacity-60"
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Excluir
              </button>

              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Atualizar
              </button>
            </div>
          </div>

          {status === "saved" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Grupo atualizado com sucesso.
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4" />
              {errorMessage || "Ocorreu um erro."}
            </div>
          )}

          <div className="mb-5 flex flex-wrap gap-2 rounded-xl border bg-white p-3">
            {tabsList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1 text-sm font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
              <div className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando grupo...
              </div>
            </div>
          ) : (
            <>
              {activeTab === "Geral" && (
                <div className="rounded-xl border bg-white p-5">
                  <h2 className="mb-4 font-bold">Configurações Gerais</h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Nome do Grupo
                      </label>
                      <input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Código interno
                      </label>
                      <input
                        value={internalCode}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 p-2.5 text-slate-500"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium">Post Automático</span>
                      <input
                        type="checkbox"
                        checked={postAuto}
                        onChange={() => setPostAuto(!postAuto)}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Intervalo de Postagem (min)
                      </label>
                      <input
                        value={intervalMinutes}
                        onChange={(e) => setIntervalMinutes(e.target.value)}
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Regra de seleção do produto
                      </label>
                      <select
                        value={selectionMode}
                        onChange={(e) => setSelectionMode(e.target.value)}
                        className="w-full rounded-lg border p-2.5"
                      >
                        <option value="recent">Mais recente</option>
                        <option value="most_clicked">Mais clicado</option>
                        <option value="random">Aleatório</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium">Modo Aleatório</span>
                      <input
                        type="checkbox"
                        checked={randomMode}
                        onChange={() => setRandomMode(!randomMode)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Telegram" && (
                <div className="rounded-xl border bg-white p-5">
                  <h2 className="mb-4 flex items-center gap-2 font-bold">
                    <Send className="h-4 w-4" />
                    Config Telegram
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Token do Bot
                      </label>
                      <input
                        value={telegramToken}
                        onChange={(e) => setTelegramToken(e.target.value)}
                        placeholder="123456:AA..."
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Chat ID
                      </label>
                      <input
                        value={telegramChatId}
                        onChange={(e) => setTelegramChatId(e.target.value)}
                        placeholder="-100123456789"
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Layout Post" && (
                <div className="rounded-xl border bg-white p-5">
                  <h2 className="mb-4 font-bold">Layout do Post</h2>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <p className="mb-3 text-sm font-bold">Preview Story</p>

                      <div className="story-box mx-auto max-w-[260px]">
                        <div className="story-thumb">
                          <div className="story-circle" />
                          <div className="story-cta">{previewCta}</div>
                          <div className="story-price">{previewPrice}</div>
                        </div>
                        <div className="p-3 text-center text-sm font-bold text-slate-700">
                          {previewTitle}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Título
                        </label>
                        <input
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                          className="w-full rounded-lg border p-2.5"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Preço
                        </label>
                        <input
                          value={postPriceLabel}
                          onChange={(e) => setPostPriceLabel(e.target.value)}
                          placeholder="R$ 79,90"
                          className="w-full rounded-lg border p-2.5"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          CTA
                        </label>
                        <input
                          value={postCta}
                          onChange={(e) => setPostCta(e.target.value)}
                          placeholder="COMPRE AGORA"
                          className="w-full rounded-lg border p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "WhatsApp - GRUPOS/CANAIS" && (
                <div className="rounded-xl border bg-white p-5">
                  <h2 className="mb-4 flex items-center gap-2 font-bold">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </h2>

                  <label className="mb-2 block text-sm font-semibold">
                    Mensagem padrão
                  </label>
                  <textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    className="min-h-[180px] w-full rounded-lg border p-3"
                    placeholder="Digite a mensagem padrão do WhatsApp..."
                  />
                </div>
              )}

              {activeTab === "Shopee" && (
                <div className="rounded-xl border bg-white p-5">
                  <h2 className="mb-4 flex items-center gap-2 font-bold">
                    <ShoppingBag className="h-4 w-4" />
                    Config Shopee
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Affiliate ID
                      </label>
                      <input
                        value={shopeeAffiliateId}
                        onChange={(e) => setShopeeAffiliateId(e.target.value)}
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        SubID
                      </label>
                      <input
                        value={shopeeSubId}
                        onChange={(e) => setShopeeSubId(e.target.value)}
                        className="w-full rounded-lg border p-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {![
                "Geral",
                "Telegram",
                "Layout Post",
                "WhatsApp - GRUPOS/CANAIS",
                "Shopee",
              ].includes(activeTab) && (
                <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
                  Em desenvolvimento: {activeTab}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
