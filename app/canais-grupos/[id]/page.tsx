"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Save,
  Settings,
  Send,
  MessageCircle,
  ShoppingBag,
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

export default function EditGroupPage() {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Geral");

  // estados simulados
  const [groupName, setGroupName] = useState("Viciados na Shoppee");
  const [postAuto, setPostAuto] = useState(true);
  const [interval, setInterval] = useState("30");
  const [randomMode, setRandomMode] = useState(false);
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");

  function handleSave() {
    alert("Configurações salvas (mock)");
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto flex max-w-[1600px]">

        {/* SIDEBAR */}
        <aside className="hidden w-[230px] border-r bg-white lg:block">
          <div className="p-5 font-bold">DivulgaLinks</div>
          <nav className="px-3 space-y-2 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/canais-grupos" className="text-blue-600 font-bold">
              Canais/Grupos
            </Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">

          {/* TOPBAR */}
          <div className="mb-5 flex justify-between bg-white p-3 rounded-xl border">
            <div />
            <Bell />
          </div>

          {/* HEADER */}
          <div className="mb-5 flex justify-between items-center bg-white p-4 rounded-xl border">
            <div>
              <h1 className="text-xl font-bold">Editar: {groupName}</h1>
              <p className="text-sm text-gray-500">ID: {id}</p>
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
            >
              <Save size={16} />
              Atualizar
            </button>
          </div>

          {/* TABS */}
          <div className="mb-5 bg-white p-3 rounded-xl border flex flex-wrap gap-2">
            {tabsList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-sm rounded-md font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTEÚDO DAS ABAS */}

          {/* GERAL */}
          {activeTab === "Geral" && (
            <div className="bg-white p-5 rounded-xl border space-y-4">
              <h2 className="font-bold">Configurações Gerais</h2>

              <div>
                <label className="text-sm font-semibold">Nome do Grupo</label>
                <input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <span>Post Automático</span>
                <input
                  type="checkbox"
                  checked={postAuto}
                  onChange={() => setPostAuto(!postAuto)}
                />
              </div>

              <div>
                <label>Intervalo de Postagem (min)</label>
                <input
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <span>Modo Aleatório</span>
                <input
                  type="checkbox"
                  checked={randomMode}
                  onChange={() => setRandomMode(!randomMode)}
                />
              </div>
            </div>
          )}

          {/* TELEGRAM */}
          {activeTab === "Telegram" && (
            <div className="bg-white p-5 rounded-xl border space-y-4">
              <h2 className="font-bold flex items-center gap-2">
                <Send size={16} /> Config Telegram
              </h2>

              <input
                placeholder="Token do Bot"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Chat ID"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* LAYOUT POST */}
          {activeTab === "Layout Post" && (
            <div className="bg-white p-5 rounded-xl border">
              <h2 className="font-bold mb-3">Layout do Post</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded p-3">
                  <p className="text-sm font-bold mb-2">Preview Story</p>
                  <div className="h-[300px] bg-gradient-to-b from-blue-400 to-blue-900 rounded-lg" />
                </div>

                <div>
                  <label>Título</label>
                  <input className="w-full border p-2 rounded mb-2" />

                  <label>Preço</label>
                  <input className="w-full border p-2 rounded mb-2" />

                  <label>CTA</label>
                  <input className="w-full border p-2 rounded" />
                </div>
              </div>
            </div>
          )}

          {/* WHATSAPP */}
          {activeTab === "WhatsApp - GRUPOS/CANAIS" && (
            <div className="bg-white p-5 rounded-xl border space-y-4">
              <h2 className="font-bold flex gap-2 items-center">
                <MessageCircle size={16} /> WhatsApp
              </h2>

              <textarea
                placeholder="Mensagem padrão"
                className="w-full border p-3 rounded"
              />
            </div>
          )}

          {/* SHOPEE */}
          {activeTab === "Shopee" && (
            <div className="bg-white p-5 rounded-xl border space-y-4">
              <h2 className="font-bold flex items-center gap-2">
                <ShoppingBag size={16} /> Config Shopee
              </h2>

              <input
                placeholder="Affiliate ID"
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="SubID"
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* OUTRAS ABAS */}
          {![
            "Geral",
            "Telegram",
            "Layout Post",
            "WhatsApp - GRUPOS/CANAIS",
            "Shopee",
          ].includes(activeTab) && (
            <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
              Em desenvolvimento: {activeTab}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
