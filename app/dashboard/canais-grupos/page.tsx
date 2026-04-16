"use client"

import { useState } from "react"
import { Plus, Send, MessageCircle, Trash2, ExternalLink, Users, Hash, CheckCircle2, Settings, Info, HelpCircle, AlertCircle, X, Edit } from "lucide-react"
import Link from "next/link"

type Channel = {
  id: string
  name: string
  type: "telegram" | "whatsapp"
  platformId: string
  members: number
  status: "ativo" | "inativo"
  foto?: string
  produtos?: number
  intervalo?: string
  aleatorio?: boolean
}

const mockChannels: Channel[] = [
  {
    id: "32908",
    name: "Viciados na Shoppee",
    type: "telegram",
    platformId: "@postalinksauto_ofertas",
    members: 12453,
    status: "ativo",
    foto: "https://via.placeholder.com/80",
    produtos: 200,
    intervalo: "N/A",
    aleatorio: false
  },
  {
    id: "2",
    name: "Achadinhos Tech",
    type: "telegram",
    platformId: "@achadinhos_tech",
    members: 5682,
    status: "ativo"
  },
  {
    id: "3",
    name: "Grupo WhatsApp - Promoções",
    type: "whatsapp",
    platformId: "1203630421@g.us",
    members: 256,
    status: "ativo"
  },
  {
    id: "4",
    name: "Canal Moda Feminina",
    type: "telegram",
    platformId: "@moda_postalinksauto",
    members: 8921,
    status: "inativo"
  },
]

export default function CanaisGruposPage() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [activeTab, setActiveTab] = useState<"todos" | "telegram" | "whatsapp">("todos")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newChannelType, setNewChannelType] = useState<"telegram" | "whatsapp">("telegram")
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelId, setNewChannelId] = useState("")
  const [limiteAtingido] = useState(true)

  const filteredChannels = channels.filter(c => {
    if (activeTab === "todos") return true
    return c.type === activeTab
  })

  function adicionarCanal() {
    if (!newChannelName ||!newChannelId) return
    
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: newChannelName,
      type: newChannelType,
      platformId: newChannelId,
      members: 0,
      status: "ativo",
      foto: "https://via.placeholder.com/80"
    }
    
    setChannels([...channels, newChannel])
    setShowAddModal(false)
    setNewChannelName("")
    setNewChannelId("")
  }

  function removerCanal(id: string) {
    if (confirm("Deseja remover este canal/grupo?")) {
      setChannels(channels.filter(c => c.id!== id))
    }
  }

  function toggleStatus(id: string) {
    setChannels(channels.map(c => 
      c.id === id? {...c, status: c.status === "ativo"? "inativo" : "ativo" } : c
    ))
  }

  const totalTelegram = channels.filter(c => c.type === "telegram").length
  const totalWhatsApp = channels.filter(c => c.type === "whatsapp").length
  const totalAtivos = channels.filter(c => c.status === "ativo").length

  return (
    <div className="space-y-5">
      {/* Banner INICIANTES - IGUAL AO PRINT */}
      <div className="rounded-lg border border-[#FFE082] bg-[#FFF8E1] px-5 py-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text- leading-relaxed text-amber-900">
            <span className="mr-1">⚠️</span>
            <strong>Atenção:</strong> Você está utilizando o plano <strong>INICIANTES (7 dias grátis)</strong>, que possui limitações, como marca d'água nos posts e suporte a afiliados reduzido. Para desbloquear todos os recursos, considere fazer um upgrade para um plano premium!
          </p>
          <button className="inline-flex items-center rounded-md bg-[#FFC107] px-4 py-2 text- font-bold text-slate-900 hover:bg-amber-400">
            Upgrade Agora 🚀
          </button>
        </div>
      </div>

      {/* Header Gerenciar Grupos - IGUAL AO PRINT */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-gray-600" />
            <h2 className="text- font-semibold text-gray-900">Gerenciar Grupos de Configuração</h2>
          </div>
          <div className="mt-1 flex items-center gap-1 text- text-gray-600">
            <Info size={14} />
            <span>Configure seus grupos e organize suas publicações</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button 
            onClick={() => setShowAddModal(true)}
            disabled={limiteAtingido}
            className="flex items-center gap-2 rounded-md bg-[#1976D2] px-4 py-2 text- font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Plus size={18} />
            Adicionar Grupo
          </button>
          {limiteAtingido && (
            <p className="flex items-center gap-1 text- text-red-600">
              <AlertCircle size={12} />
              Limite atingido: 1/1
            </p>
          )}
        </div>
      </div>

      {/* Cards de Resumo - MANTIVE OS SEUS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Canais Telegram</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalTelegram}</p>
            </div>
            <Send className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Grupos WhatsApp</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalWhatsApp}</p>
            </div>
            <MessageCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos Agora</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalAtivos}</p>
            </div>
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs - MANTIVE OS SEUS */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("todos")}
            className={`border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "todos"
              ? "border-[#1976D2] text-[#1976D2]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Todos ({channels.length})
          </button>
          <button
            onClick={() => setActiveTab("telegram")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "telegram"
              ? "border-[#1976D2] text-[#1976D2]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Send size={16} />
            Telegram ({totalTelegram})
          </button>
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "whatsapp"
              ? "border-[#1976D2] text-[#1976D2]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageCircle size={16} />
            WhatsApp ({totalWhatsApp})
          </button>
        </div>
      </div>

      {/* Lista de Canais - ADAPTADO PRO LAYOUT DO PRINT */}
      <div className="space-y-3">
        {filteredChannels.length === 0? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-600">
              Nenhum canal ou grupo adicionado ainda
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 rounded-lg bg-[#1976D2] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Adicionar Primeiro Canal
            </button>
          </div>
        ) : (
          filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="rounded-lg border border-gray-300 bg-white p-5"
            >
              <div className="flex items-start gap-4">
                {/* Foto do canal */}
                <img 
                  src={channel.foto || "https://via.placeholder.com/80"} 
                  alt={channel.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  {/* Nome + ID */}
                  <div className="flex items-center gap-2">
                    <h3 className="text- font-semibold text-gray-900">{channel.name}</h3>
                    <span className="rounded bg-gray-200 px-2 py-0.5 text- font-medium text-gray-700">
                      ID: {channel.id}
                    </span>
                  </div>
                  
                  {/* Grid 2x2 com infos */}
                  <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-center gap-2 text-">
                      <span className="text-gray-600">Post Auto:</span>
                      <span className="rounded bg-[#E8F5E9] px-2 py-0.5 text- font-semibold text-[#2E7D32]">
                        ATIVO
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-">
                      <span className="text-gray-600">Produtos:</span>
                      <span className="font-semibold text-gray-900">{channel.produtos || 200}</span>
                    </div>
                    <div className="flex items-center gap-2 text-">
                      <span className="text-gray-600">Intervalo:</span>
                      <span className="font-semibold text-gray-900">{channel.intervalo || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-">
                      <span className="text-gray-600">Aleatório:</span>
                      {channel.aleatorio? (
                        <CheckCircle2 size={16} className="text-green-600" />
                      ) : (
                        <X size={16} className="text-red-600" />
                      )}
                    </div>
                  </div>

                  {/* Botões Editar/Excluir */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/dashboard/canais-grupos/${channel.id}`}
                      className="flex items-center gap-1.5 rounded-md bg-[#1976D2] px-4 py-2 text- font-medium text-white hover:bg-blue-700"
                    >
                      <Edit size={15} />
                      Editar
                    </Link>
                    <button 
                      onClick={() => removerCanal(channel.id)}
                      className="flex items-center gap-1.5 rounded-md border border-red-500 px-4 py-2 text- font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Banner Ajuda - IGUAL AO PRINT */}
      <div className="rounded-lg border border-[#B3E5FC] bg-[#E1F5FE] p-4">
        <p className="flex items-center gap-2 text- text-[#0277BD]">
          <HelpCircle size={16} />
          <strong>Precisa de ajuda?</strong> Assista nosso tutorial em vídeo 
          <a href="#" className="ml-1 font-semibold text-[#1976D2] hover:underline">
            clicando aqui <ExternalLink size={12} className="inline" />
          </a>
        </p>
      </div>

      {/* Modal Adicionar - MANTIVE O SEU */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Adicionar Canal/Grupo</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  PLATAFORMA
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewChannelType("telegram")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition ${
                      newChannelType === "telegram"
                       ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Send size={18} />
                    Telegram
                  </button>
                  <button
                    onClick={() => setNewChannelType("whatsapp")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition ${
                      newChannelType === "whatsapp"
                       ? "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  NOME DO CANAL/GRUPO
                </label>
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder="Ex: Ofertas Posta Links Auto"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  {newChannelType === "telegram"? "USERNAME DO CANAL" : "ID DO GRUPO"}
                </label>
                <input
                  type="text"
                  value={newChannelId}
                  onChange={(e) => setNewChannelId(e.target.value)}
                  placeholder={newChannelType === "telegram"? "@meucanal" : "1203630421@g.us"}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {newChannelType === "telegram" 
                   ? "Adicione seu bot como admin do canal primeiro"
                    : "Pegue o ID do grupo nas configurações do WhatsApp"
                  }
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={adicionarCanal}
                  disabled={!newChannelName ||!newChannelId}
                  className="flex-1 rounded-lg bg-[#1976D2] py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}