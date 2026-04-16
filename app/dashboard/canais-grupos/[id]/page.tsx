"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { 
  Globe, Send, Layout, Bot, Monitor, Instagram, Calendar, MessageSquare, Save, Wand2, MessageCircle,
  ShoppingBag, Package, Heart, Shirt, Tag, FileText, Users, Video, Check, Search, Link as LinkIcon,
  RefreshCw, AlertTriangle, FolderOpen, Link2, CheckCircle2, Unlink, AlertCircle, Mail,
  Copy, Upload, X, TrendingUp, Image as ImageIcon, ToggleLeft, ToggleRight, ShoppingCart, Puzzle,
  Sparkles, Info, ChevronDown, Plus, ExternalLink, Trash2, Pencil, CheckCircle2 as CheckCircle, Clock
} from "lucide-react"
import { Eye } from "lucide-react"

const grupoData = {
  id: "32908",
  nome: "Viciados na Shoppee",
  foto: "https://via.placeholder.com/80",
  whatsappConectado: false,
  instagram: {
    username: "viciados.na.shoppee",
    nome: "Viciados na Shopee",
    seguidores: 110,
    seguindo: 92,
    posts: 29,
    conectado: true
  }
}

const tabsRow1 = [
  { id: "geral", label: "Geral", icon: Globe },
  { id: "layout", label: "Layout Post", icon: Layout },
  { id: "telegram", label: "Telegram", icon: Send },
  { id: "whatsapp", label: "WhatsApp - Grupos/Canais", icon: MessageSquare },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "instasched", label: "InstaSched", icon: Calendar },
  { id: "instabot", label: "InstaBotHelp", icon: MessageSquare },
  
]

const tabsRow2 = [
  
  { id: "aliexpress", label: "AliExpress", icon: ShoppingBag },
  { id: "amazon", label: "Amazon", icon: Package },
  { id: "mercadolivre", label: "Mercado Livre", icon: Heart },
  { id: "shein", label: "Shein", icon: Shirt },
  { id: "shopee", label: "Shopee", icon: ShoppingBag },
  { id: "colaboradores", label: "Colaboradores", icon: Users },
]

export default function EditarCanalPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("geral")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-4 mt-4 rounded-lg bg-[#FFF8E1] px-5 py-3 text-center">
        <button className="inline-flex items-center rounded-md bg-[#FFC107] px-4 py-2 text- font-bold text-slate-900 hover:bg-amber-400">
          Upgrade Agora 🚀
        </button>
      </div>

      <div className="mx-4 mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <img 
          src={grupoData.foto} 
          alt={grupoData.nome}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          <span className="text- font-semibold text-gray-900">Editar: {grupoData.nome}</span>
          <button className="flex items-center gap-1 rounded bg-[#1976D2] px-2.5 py-1 text- font-semibold text-white hover:bg-blue-700">
            <RefreshCw size={12} />
            Atualizar
          </button>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 px-4 py-3">
          {tabsRow1.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text- font-medium transition ${
                  activeTab === tab.id
       ? "bg-[#1976D2] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 px-4 py-2">
          {tabsRow2.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text- font-medium transition ${
                  activeTab === tab.id
       ? "bg-[#1976D2] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-4 mt-4 space-y-4 pb-8">
        {activeTab === "geral" && <GeralTab />}
        {activeTab === "whatsapp" && <WhatsAppTab />}
        {activeTab === "instagram" && <InstagramTab />}
        {activeTab === "shopee" && <ShopeeTab />}
        {activeTab === "telegram" && <TelegramTab />}
        {activeTab === "layout" && <LayoutTab />}
        {activeTab === "instasched" && <InstaSchedTab />}
        {activeTab === "instabot" && <InstaBotHelpTab />}
        {activeTab === "aliexpress" && <AliExpressTab />}
        {activeTab === "amazon" && <AmazonTab />}
        {activeTab === "mercadolivre" && <MercadoLivreTab />}
        {activeTab === "shein" && <SheinTab />}
        {activeTab === "colaboradores" && <ColaboradoresTab />}
      </div>
    </div>
  )
}

function GeralTab() {
  const [corTitulo, setCorTitulo] = useState("#000000")
  const [corPreco, setCorPreco] = useState("#FFFFFF")
  const [ativarFeedTelegram, setAtivarFeedTelegram] = useState(false)

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-9">
            <label className="mb-3 block text-xs font-semibold uppercase text-gray-600">
              LINK DO PRODUTO:
            </label>
            <div className="rounded bg-[#FFFDE7] px-3 py-2">
              <p className="text-xs font-bold text-[#F57C00]">
                ATENÇÃO! produtos adicionados via link, NÃO são atualizados automaticamente.
              </p>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-3 block text-xs font-semibold uppercase text-gray-600">
              LINK
            </label>
            <input type="text" className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>

          <div className="mb-10">
            <label className="grid grid-cols-[16px_1fr] gap-2 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" className="mt- h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
              <span className="leading-snug">Manter esse link no post.</span>
            </label>
          </div>

          <div className="mb-10">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              CABEÇALHO DINÂMICO:
            </label>
            <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              <option>Selecione um cabeçalho ou digite um novo</option>
            </select>
          </div>

          <div className="mb-10">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              OU DIGITE UM NOVO CABEÇALHO:
            </label>
            <input type="text" className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              LINK SHOPEE VÍDEO
            </label>
            <input type="text" className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>

          <div className="mb-3">
            <label className="grid grid-cols-[16px_1fr] gap-2 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
              <span className="leading-snug">Link do vídeo do produto na Shopee, se preenchido, o sistema trocará o link original do produto pelo link do vídeo.</span>
            </label>
          </div>

          <div className="mb-10 rounded bg-[#FFF3E0] px-3 py-2">
            <p className="flex items-start gap-1.5 text-xs font-semibold text-[#E65100]">
              <AlertTriangle size={18} className="mt-0 shrink-0" />
              Atenção! Link da Shopee vídeo só funciona no celular.
            </p>
          </div>

          {['PREÇO ORIGINAL:', 'PREÇO ATUAL:', 'SUFIXO DO PREÇO:', 'PREÇO PARCELADO:'].map((label, i) => (
            <div key={i} className="mb-10">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                {label}
              </label>
              <input 
                type="text" 
                defaultValue={i === 0 || i === 1? '' : i === 2? '' : ''} 
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
              />
            </div>
          ))}

          <div className="mb-8">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              DESCRIÇÃO:
            </label>
            <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" rows={3} />
            <p className="mt-1 text-xs text-gray-500">Essa descrição se aplica somente a esse produto cadastrado.</p>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-xs font-semibold uppercase text-gray-600">
              AGENDAMENTO
            </label>
            <p className="text-sm font-bold text-gray-900">NÃO EXPIRA</p>
            <p className="text-xs text-gray-500">Não deleta o produto automaticamente</p>
          </div>

          <div>
            <label className="mb-3 block text-xs font-semibold uppercase text-gray-600">
              AGENDAMENTO
            </label>
            <input 
              type="datetime-local" 
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            />
            <p className="mt-3 text-xs text-gray-500">Selecione a Data e Hora</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3.5">
              <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-600">
                CONFIGURAÇÃO:
              </label>
              <div className="space-y-2">
                <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
                  <span>Post automático</span>
                </label>
                <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
                  <span>Post em Loop</span>
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">Repete os produtos ao final da lista.</p>
            </div>

            {[
              { label: 'POST INTERVALO (MINUTOS)', value: '' },
              { label: 'HORA INÍCIO', value: '' },
              { label: 'HORA FIM', value: '' },
              { label: 'IDIOMA', value: '', sub: 'Título de produtos do AliExpress' },
              { label: 'MOEDA', value: '', sub: 'Valor de produtos do AliExpress' },
              { label: 'PAÍS', value: '', sub: 'país para envio (send to)' },
            ].map((item, i) => (
              <div key={i} className="mb-3.5">
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  {item.label}
                </label>
                <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option>{item.value}</option>
                </select>
                {item.sub && <p className="mt-1 text-xs text-gray-500">{item.sub}</p>}
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-600">
                LOJAS ATIVAS
              </label>
              <div className="space-y-2">
                {[
                  { name: "AliExpress", checked: false },
                  { name: "Amazon", checked: false },
                  { name: "Magazine Luiza", checked: false },
                  { name: "Shopee", checked: false },
                  { name: "Shein", checked: false },
                  { name: "Natura", checked: false },
                  { name: "Awin", checked: false },
                  { name: "Mercado Livre", checked: false },
                ].map((loja) => (
                  <label key={loja.name} className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked={loja.checked} 
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
                    />
                    <span>{loja.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full rounded bg-[#1976D2] py-2 text-sm font-bold text-white hover:bg-blue-700">
              Salvar
            </button>
          </div>

          {/* CARD CUPONS */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="rounded-t-lg bg-[#29B6F6] px-4 py-2.5">
              <h4 className="text-sm font-semibold text-white">Cupons</h4>
            </div>
            <div className="space-y-3.5 p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  TIPO DE CUPOM
                </label>
                <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option>Selecione o tipo de cupom</option>
                  <option>Porcentagem</option>
                  <option>Valor Fixo</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  VALOR DO DESCONTO
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: 10 ou 50" 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  VALOR MÍNIMO DA COMPRA PARA APLICAR O CUPOM
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: 50 ou 100" 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  VALOR MÁXIMO DO CUPOM
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: 100 ou 200" 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  CÓDIGO DO CUPOM
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: CUPOM15" 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button className="rounded bg-[#1976D2] px-5 py-2 text-sm font-bold text-white hover:bg-blue-700">
                  Salvar
                </button>
                <button className="rounded bg-[#388E3C] px-5 py-2 text-sm font-bold text-white hover:bg-green-700">
                  Salvar e Postar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEMPLATES ABAIXO DOS 2 CARDS PRINCIPAIS */}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-gray-900">Template Stories (16:9):</h4>
          </div>
          <div className="p-4">
            <div className="mb-3 rounded bg-[#E0F7FA] px-3 py-2 text-center text-xs font-semibold text-[#00ACC1]">
              CLIQUE AQUI para editar esse template no CANVA.
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                ESCOLHA UM ARQUIVO
              </label>
              <div className="flex gap-2">
                <button className="rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50">
                  Escolher arquivo
                </button>
                <span className="py-1.5 text-xs text-gray-500">Nenhum arquivo escolhido</span>
              </div>
            </div>

            <div className="mb-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                COR DO TÍTULO
              </label>
              <label className="relative inline-block h-7 w-7 cursor-pointer overflow-hidden rounded border border-gray-300">
                <div 
                  className="h-full w-full" 
                  style={{ backgroundColor: corTitulo }}
                />
                <input 
                  type="color" 
                  value={corTitulo} 
                  onChange={(e) => setCorTitulo(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                COR DO PREÇO
              </label>
              <label className="relative inline-block h-7 w-7 cursor-pointer overflow-hidden rounded border border-gray-300">
                <div 
                  className="h-full w-full" 
                  style={{ backgroundColor: corPreco }}
                />
                <input 
                  type="color" 
                  value={corPreco} 
                  onChange={(e) => setCorPreco(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>

            <button className="mb-3 rounded bg-[#1976D2] px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
              Salvar
            </button>

            <div className="rounded border border-gray-200 p-2">
              <img src="https://via.placeholder.com/300x500/0088cc/ffffff?text=Template+Story" alt="Template Stories" className="w-full rounded" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-gray-900">Template Feed (1:1):</h4>
          </div>
          <div className="p-4">
            <div className="mb-5 rounded bg-[#E0F7FA] px-3 py-2 text-center text-xs font-semibold text-[#00ACC1]">
              CLIQUE AQUI para editar esse template no CANVA.
            </div>

            <div className="mb-8">
              <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={ativarFeedTelegram}
                  onChange={(e) => setAtivarFeedTelegram(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
                />
                <span>Ativar Template no Feed do Telegram</span>
              </label>
            </div>

            <div className="mb-8">
              <label className="mb-8 block text-xs font-semibold uppercase text-gray-600">
                ESCOLHA UM ARQUIVO
              </label>
              <div className="flex gap-2">
                <button className="rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50">
                  Escolher arquivo
                </button>
                <span className="py-1.5 text-xs text-gray-500">Nenhum arquivo escolhido</span>
              </div>
            </div>

            <button className="mb-8 rounded bg-[#1976D2] px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
              Salvar
            </button>

            <div className="rounded border border-gray-200 p-2">
              <img src="https://via.placeholder.com/300x300/0088cc/ffffff?text=Template+Feed" alt="Template Feed" className="w-full rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function InstagramTab() {
  const [postAuto, setPostAuto] = useState(false)
  const [desativarComentario, setDesativarComentario] = useState(false)
  const [agendamentoAtivo, setAgendamentoAtivo] = useState(false)
  const [diasSemana, setDiasSemana] = useState({
    dom: false, seg: false, ter: false, qua: false, qui: false, sex: false, sab: false
  })
  const [horarios, setHorarios] = useState<{[key: number]: boolean}>({
    0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false,
    8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false,
    16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false
  })
  
  const toggleDia = (dia: string) => {
    setDiasSemana(prev => ({...prev, [dia]:!prev[dia as keyof typeof prev] }))
  }
  
  const toggleHora = (hora: number) => {
    setHorarios(prev => ({...prev, [hora]:!prev[hora] }))
  }

  return (
    <>
      <div className="rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-5 py-4 text-white">
        <div className="flex items-center gap-2">
          <Instagram size={20} />
          <div>
            <h3 className="text-base font-bold">Instagram</h3>
            <p className="mt-1 text-xs text-white/90">
              Configurações da conta @{grupoData.instagram.username}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <Link2 size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-900">Conta Vinculada</h4>
            </div>
            
            <div className="p-4">
              <div className="mb-4 rounded-lg bg-[#FFF3F8] p-3">
                <div className="flex items-center gap-3">
                  <img src={grupoData.foto} alt={grupoData.instagram.nome} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{grupoData.instagram.username}</p>
                    <p className="text-xs text-gray-600">{grupoData.instagram.nome}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">{grupoData.instagram.posts}</p>
                  <p className="text-xs text-gray-500">Mídias</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{grupoData.instagram.seguidores}</p>
                  <p className="text-xs text-gray-500">Seguidores</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{grupoData.instagram.seguindo}</p>
                  <p className="text-xs text-gray-500">Seguindo</p>
                </div>
              </div>

              {/* BOTÃO COM BORDA COMPLETA E ÍCONE */}
              <button className="flex w-full items-center justify-center gap-2 rounded border border-[#E53935] py-2 text-sm font-semibold text-[#E53935] hover:bg-red-50">
                <Unlink size={14} />
                Desconectar Instagram
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <ImageIcon size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-900">Template IG Story (16:9)</h4>
            </div>
            
            <div className="p-4">
              <div className="mb-3 rounded bg-[#E0F7FA] p-2 text-center text-xs font-semibold text-[#00ACC1]">
                Clique aqui para editar o template no Canva.
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                  ESCOLHA UM ARQUIVO
                </label>
                <div className="flex gap-2">
                  <button className="rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50">
                    Escolher arquivo
                  </button>
                  <span className="py-1.5 text-xs text-gray-500">Nenhum arquivo escolhido</span>
                </div>
              </div>

              <div className="mb-3 flex items-end gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    COR DO TÍTULO
                  </label>
                  <div className="h-8 w-8 rounded border border-gray-300 bg-black"></div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    COR DO PREÇO
                  </label>
                  <div className="h-8 w-8 rounded border border-gray-300 bg-white"></div>
                </div>
                <button className="ml-auto rounded bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] px-6 py-2 text-sm font-bold text-white">
                  Salvar
                </button>
              </div>

              <div className="rounded border border-gray-200 p-2">
                <img src="https://via.placeholder.com/300x500/0088cc/ffffff?text=Template+Story" alt="Template" className="w-full rounded" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <MessageSquare size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-900">Resposta Automática do Story</h4>
            </div>
            
            <div className="p-4">
              <div className="mb-4 rounded bg-[#FFF9C4] px-3 py-2">
                <p className="flex items-start gap-1.5 text-xs text-[#F57F17]">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  Não há compatibilidade com figurinhas (links, enquetes, localização).
                </p>
                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-[#F57F17]">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  O template deve conter a chamada: "Comente QUERO para receber o link!"
                </p>
              </div>

              <div className="mb-4 flex items-center gap-6">
                <button
                  onClick={() => setPostAuto(!postAuto)}
                  className="flex items-center gap-2"
                >
                  <div className={`relative h-6 w-11 rounded-full transition ${postAuto? 'bg-[#1976D2]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${postAuto? 'left-5.5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Post automático</span>
                </button>

                <button
                  onClick={() => setDesativarComentario(!desativarComentario)}
                  className="flex items-center gap-2"
                >
                  <div className={`relative h-6 w-11 rounded-full transition ${desativarComentario? 'bg-[#1976D2]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${desativarComentario? 'left-5.5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">DESATIVAR RESPOSTA NO COMENTÁRIO</span>
                </button>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-600">
                  TEXTO DA RESPOSTA AUTOMÁTICA AO STORY
                </label>
                <textarea
                  defaultValue="Olá, que bom que você gostou desse produto, segue o link abaixo:"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
                <p className="mt-1 text-xs text-gray-500">Limite de 500 caracteres, use \n para quebra de linha</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-600">
                  TEXTO DO BOTÃO DE LINK
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="VER NA LOJA"
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button className="rounded bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] px-6 py-2 text-sm font-bold text-white">
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <TrendingUp size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-900">Crescimento de Seguidores</h4>
            </div>
            <div className="p-8 text-center">
              <TrendingUp size={32} className="mx-auto mb-2 text-gray-300" />
              <p className="text-xs text-gray-500">Dados insuficientes para o gráfico. Tente novamente em alguns dias.</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <Calendar size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-900">Agendamento Recorrente do Story</h4>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-gray-600">
                  <Calendar size={12} />
                  DIAS DA SEMANA
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'dom', label: 'Domingo' },
                    { key: 'seg', label: 'Segunda' },
                    { key: 'ter', label: 'Terça' },
                    { key: 'qua', label: 'Quarta' },
                    { key: 'qui', label: 'Quinta' },
                    { key: 'sex', label: 'Sexta' },
                    { key: 'sab', label: 'Sábado' },
                  ].map((dia) => (
                    <button
                      key={dia.key}
                      onClick={() => toggleDia(dia.key)}
                      className={`flex w-full items-center justify-start gap-1.5 rounded px-2 py-1.5 text-xs font-medium ${
                        diasSemana[dia.key as keyof typeof diasSemana]
                         ? "bg-[#29B6F6] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Eye size={14} />
                      {dia.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-gray-600">
                  <Calendar size={12} />
                  HORÁRIOS (HORA CHEIA)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hora) => (
                    <button
                      key={hora}
                      onClick={() => toggleHora(hora)}
                      className={`flex w-full items-center justify-start gap-1 rounded px-2 py-1.5 text-xs font-medium ${
                        horarios[hora]
                         ? "bg-[#29B6F6] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Eye size={12} />
                      {hora}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOGGLE ATIVO? ACIMA DO SALVAR AGENDAMENTO */}
              <div className="mb-3 flex items-center gap-2">
                <button
                  onClick={() => setAgendamentoAtivo(!agendamentoAtivo)}
                  className="flex items-center gap-2"
                >
                  <div className={`relative h-6 w-11 rounded-full transition ${agendamentoAtivo? 'bg-[#29B6F6]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${agendamentoAtivo? 'left-5.5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Ativo?</span>
                </button>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] py-2.5 text-sm font-bold text-white">
                <Send size={14} />
                Salvar Agendamento
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-4 py-3">
              <h4 className="text-xs font-bold uppercase text-gray-600">DICAS</h4>
            </div>
            <div className="space-y-2 p-4">
              {[
                'Contas do Instagram podem publicar até 25 posts automáticos por 24 horas.',
                'O template do Story deve ter proporção 9:16 (1080×1920px).',
                'Use o agendamento recorrente para manter seus stories ativos automaticamente.',
                'Se o Instagram desconectar, reconecte usando 4G ao invés do Wi-Fi.',
              ].map((dica, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#4CAF50]" />
                  <p className="text-xs leading-relaxed text-gray-600">{dica}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}


function ShopeeTab() {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [produtosExibir, setProdutosExibir] = useState('12')
  const [pesquisar, setPesquisar] = useState('')
  const [ordenarPor, setOrdenarPor] = useState('Data Atualização - Mais Novos')
  const [acaoMassa, setAcaoMassa] = useState('')
  const [todosMarcados, setTodosMarcados] = useState(false)
  const [categoria, setCategoria] = useState('')
  const [palavrasChave, setPalavrasChave] = useState('')
  const [linkShopeeVideo, setLinkShopeeVideo] = useState('')
  const [cabecalho, setCabecalho] = useState('')
  const [rodape, setRodape] = useState('')
  
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {/* CARD 1: Add produtos Shopee */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-gray-900">Add produtos Shopee</h4>
          </div>
          <div className="space-y-3.5 p-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                CATEGORIA
              </label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione uma categoria</option>
                <option value="moda">Moda</option>
                <option value="casa">Casa e Decoração</option>
                <option value="eletronicos">Eletrônicos</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                PALAVRAS CHAVE
              </label>
              <input
                type="text"
                value={palavrasChave}
                onChange={(e) => setPalavrasChave(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
              
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                LINK SHOPEE VIDEO
              </label>
              <input 
                type="text"
                value={linkShopeeVideo}
                onChange={(e) => setLinkShopeeVideo(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                Link do vídeo do produto na Shopee, se preenchido, o sistema trocará o link original do produto pelo link do vídeo.
              </p>

              <div className="mt-2 rounded bg-[#FFF3E0] px-3 py-2">
                <p className="flex items-start gap-1.5 text-xs text-[#E65100]">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                  Atenção! Link da Shopee vídeo só funciona no celular.
                </p>
                <p className="mt-1 text-xs text-[#E65100]">
                  Ex: https://shp.ee/ejollie57smtt=0.0.9
                </p>
              </div>
            </div>

            <button className="w-full rounded bg-[#1976D2] py-2 text-sm font-bold text-white hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </div>

        {/* CARD 2: Texto padrão Shopee */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-gray-900">Texto padrão Shopee</h4>
          </div>
          <div className="space-y-3.5 p-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                CABEÇALHO DO SHOPEE
              </label>
              <textarea
                value={cabecalho}
                onChange={(e) => setCabecalho(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                rows={3}
              />
              <p className="mt-1 text-xs text-gray-500">
                Esse texto será exibido acima do título de um produto do Shopee. Substitui o cabeçalho geral
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                RODAPÉ DO SHOPEE
              </label>
              <textarea
                value={rodape}
                onChange={(e) => setRodape(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                rows={3}
              />
              <p className="mt-1 text-xs text-gray-500">
                Esse texto será exibido no final do post de um produto do Shopee. Substitui o rodapé geral
              </p>
            </div>

            <button className="w-full rounded bg-[#1976D2] py-2 text-sm font-bold text-white hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </div>

        {/* CARD 3: Importar Produtos em Massa */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-gray-900">Importar Produtos em Massa</h4>
          </div>
          <div className="space-y-3 p-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                ARQUIVO DE PRODUTOS.CSV
              </label>
              <div className="flex gap-2">
                <label className="cursor-pointer rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50">
                  Escolher arquivo
                  <input 
                    type="file" 
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  />
                </label>
                <span className="py-1.5 text-xs text-gray-500">
                  {arquivo? arquivo.name : 'Nenhum arquivo escolhido'}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-gray-600">
              O arquivo CSV deve ter as seguintes colunas na ordem: Item Id, Item Name, Price, Sales, Shop Name, Commission Rate, Commission, Product Link, Offer Link.
            </p>

            <button className="rounded bg-[#1976D2] px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
              Importar
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            placeholder="Pesquisar"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded bg-[#2196F3] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2]">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Filtros Produtos */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-4">
          <label className="text-xs font-semibold text-gray-700">Produtos</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Exibir:</span>
            <select
              value={produtosExibir}
              onChange={(e) => setProdutosExibir(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>12</option>
              <option>24</option>
              <option>48</option>
              <option>96</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Ordenar por:</span>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Data Atualização - Mais Novos</option>
              <option>Data Atualização - Mais Antigos</option>
              <option>Preço - Menor</option>
              <option>Preço - Maior</option>
              <option>Comissão - Maior</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={(e) => setTodosMarcados(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Todos
          </label>
          <select
            value={acaoMassa}
            onChange={(e) => setAcaoMassa(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma ação</option>
            <option value="deletar">Deletar Selecionados</option>
            <option value="exportar">Exportar Selecionados</option>
          </select>
          <button 
            disabled={!acaoMassa}
            className="rounded bg-[#2196F3] px-4 py-1 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
          >
            Executar
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function TelegramTab() {
  const [botToken, setBotToken] = useState("8595185623:AAEXCoz1jrbnoN5MwN3WZxXheaGGDyLKQQ")
  const [botUsername, setBotUsername] = useState("ViciadosNaShoppeeBot")

  return (
    <>
      {/* Banner Azul Telegram */}
      <div className="mb-4 rounded-lg bg-gradient-to-r from-[#1C92D2] to-[#00C6FB] px-5 py-4">
        <div className="flex items-center gap-2 text-white">
          <Bot size={20} />
          <div>
            <h3 className="text-sm font-bold">Configuração do Telegram</h3>
            <p className="text-xs opacity-90">Configure seu bot e vincule seu grupo ou canal para Viciados na Shoppee</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* Coluna Esquerda */}
        <div className="space-y-4">
          {/* Card Vincular Grupo ou Canal */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-4 py-3">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Link2 size={16} />
                Vincular Grupo ou Canal
              </h4>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between rounded-lg border-2 border-[#22C55E] bg-[#F0FDF4] px-4 py-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://via.placeholder.com/40x40/0088cc/ffffff?text=V" 
                    alt="Viciados na Shoppee" 
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Viciados na Shoppee</span>
                      <span className="flex items-center gap-1 rounded bg-[#22C55E] px-2 py-0.5 text-xs font-semibold text-white">
                        <Check size={12} />
                        Conectado
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Grupo/canal vinculado com sucesso</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 rounded border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                  <Unlink size={14} />
                  Desvincular
                </button>
              </div>
            </div>
          </div>

          {/* Card Configuração do Bot */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-4 py-3">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Bot size={16} />
                Configuração do Bot
              </h4>
            </div>
            <div className="space-y-3.5 p-4">
              <div>
                <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-gray-600">
                  <span>Ou</span> BOT API KEY (TOKEN)
                </label>
                <input 
                  type="text" 
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
                <p className="mt-1 text-xs text-gray-500">Token fornecido pelo @BotFather ao criar seu bot.</p>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-gray-600">
                  <Bot size={12} />
                  BOT USERNAME
                </label>
                <div className="flex items-center rounded border border-gray-300 bg-white focus-within:border-blue-500">
                  <span className="pl-3 text-sm text-gray-500">@</span>
                  <input 
                    type="text" 
                    value={botUsername}
                    onChange={(e) => setBotUsername(e.target.value)}
                    className="w-full rounded px-2 py-2 text-sm focus:outline-none" 
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Nome de usuário do bot (sem @). Deve terminar com _bot ou Bot.
                </p>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded bg-[#00A3E0] py-2.5 text-sm font-bold text-white hover:bg-[#0090C7]">
                <Save size={16} />
                Salvar Configurações do Bot
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Tutorial */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              <AlertCircle size={16} />
              Como Criar seu Bot no Telegram
            </h4>
          </div>
          <div className="p-4">
            <div className="mb-4 text-center">
              <img
                src="/logo-botfather.png" 
                alt="BotFather" 
                className="mx-auto h-24 w-auto" 
                />
              <p className="mt-2 text-xs text-gray-600">
                Use o <span className="font-semibold text-[#0088CC]">@BotFather</span> para criar e gerenciar bots no Telegram
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088CC] text-xs font-bold text-white">1</div>
                <div className="text-xs text-gray-700">
                  Abra o Telegram e pesquise por <span className="font-semibold text-[#0088CC]">@BotFather</span> ou clique no link.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088CC] text-xs font-bold text-white">2</div>
                <div className="text-xs text-gray-700">
                  Envie o comando:
                  <code className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/newbot</code>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088CC] text-xs font-bold text-white">3</div>
                <div className="text-xs text-gray-700">
                  O BotFather vai pedir um <span className="font-semibold">nome de exibição</span> para o bot. Escolha o nome que preferir.
                  <p className="mt-0.5 text-gray-500">Ex: Promoções Incríveis</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088CC] text-xs font-bold text-white">4</div>
                <div className="text-xs text-gray-700">
                  Em seguida, escolha um <span className="font-semibold">username</span> único. Ele precisa terminar com <span className="font-semibold">bot</span>.
                  <p className="mt-0.5 text-gray-500">Ex: minhas_promos_bot</p>
                  <p className="text-gray-500">Esse é o valor do campo <span className="font-semibold">"Bot Username"</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088CC] text-xs font-bold text-white">5</div>
                <div className="text-xs text-gray-700">
                  O BotFather responderá com uma mensagem contendo o <span className="font-semibold">token da API</span>. Ele se parece com:
                  <code className="mt-1 block rounded bg-gray-100 px-2 py-1 font-mono text-[#0088CC]">123456789:ABCdefGHI...</code>
                  <p className="mt-1 text-gray-500">Copie e cole no campo <span className="font-semibold">"Bot API Key"</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-xs font-bold text-white">6</div>
                <div className="text-xs font-semibold text-gray-900">
                  Pronto! Preencha os campos ao lado e clique em "Salvar".
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <h5 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-600">
                <span>⚙️</span> CONFIGURAÇÕES EXTRAS (OPCIONAL)
              </h5>
              <div className="space-y-2 text-xs text-gray-700">
                <p><span className="font-semibold">Foto do bot:</span> envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/setuserpic</code> ao @BotFather</p>
                <p><span className="font-semibold">Descrição:</span> envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/setdescription</code></p>
                <p><span className="font-semibold">Sobre:</span> envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/setabouttext</code></p>
                <p><span className="font-semibold">Permissões de grupo:</span> envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/setjoingroups</code> e ative</p>
                <p><span className="font-semibold">Modo inline:</span> envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/setinline</code> para habilitar</p>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <h5 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-600">
                <span>💡</span> DICAS
              </h5>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#22C55E]" />O token do bot é <span className="font-semibold">secreto</span>. Nunca compartilhe publicamente.</li>
                <li className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#22C55E]" />Você pode ter um bot próprio para cada grupo/canal diferente.</li>
                <li className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#22C55E]" />Se perder o token, envie <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/token</code> ao @BotFather para gerar um novo.</li>
                <li className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#22C55E]" />Adicione o bot como <span className="font-semibold">administrador</span> do grupo/canal para que ele possa postar.</li>
                <li className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#22C55E]" />Use <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#0088CC]">/mybots</code> no @BotFather para gerenciar todos os seus bots.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function LayoutTab() {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-[2fr_1fr]">
      {/* Coluna Esquerda - Configuração */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-600">
            Configuração:
          </label>
          <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
            />
            <span>WHATSAPP: ENVIAR IMAGEM COMO PREVIEW (link card)</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            CABEÇALHO GERAL
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">Esse texto será exibido acima do título do produto</p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DO TÍTULO
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: 🔥🔥 <b>{'{title}'}</b> 🔥🔥
          </p>
        </div>

        <div className="mb-4 space-y-2">
          <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
            />
            <span>TÍTULO EM MAIÚSCULO</span>
          </label>
          <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
            />
            <span>OCULTAR TEXTO DE VENDAS</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DE VENDAS
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: 🛒🛒 <i>{'{vendas}'}</i> pedidos <i>{'{/i}'}</i> 🛒🛒
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DA DESCRIÇÃO
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: {'<pre>'} {'{description}'} {'</pre>'}
          </p>
        </div>

        <div className="mb-4">
          <label className="grid grid-cols-[16px_1fr] gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" 
            />
            <span>OCULTAR VALOR ORIGINAL</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DO PREÇO ORIGINAL
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: <span className="text-red-500">❌❌</span> <s>{'{price_original}'}</s> <span className="text-red-500">❌❌</span>
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DO PARCELAMENTO
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: 💳💳 {'{parcelamento}'} 💳💳
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DO PREÇO ATUAL
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: 💰💰 <b>{'{price}'}</b> 💰💰
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            TEXTO DO LINK DE AFILIADO
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemplo: 🔗🔗 {'{link}'} 🔗🔗
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            RODAPÉ GERAL
          </label>
          <textarea 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
            rows={2} 
          />
          <p className="mt-1 text-xs text-gray-500">Esse texto será exibido ao final de todos os posts.</p>
        </div>

        <button className="rounded bg-[#1976D2] px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
          Salvar
        </button>
      </div>

      {/* Coluna Direita - Dicas de formatação */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase text-gray-600">
          Dicas de formatação:
        </h4>
        <div className="space-y-1.5 rounded border-gray-200 bg-gray-50 p-3 font-mono text-xs">
          <div>
            <span className="font-semibold text-gray-900">negrito</span>
            <div className="text-gray-600">{'<b>negrito</b>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">itálico</span>
            <div className="text-gray-600">{'<i>itálico</i>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">sublinhado</span>
            <div className="text-gray-600">{'<u>sublinhado</u>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">riscado</span>
            <div className="text-gray-600">{'<s>riscado</s>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">spoiler</span>
            <div className="text-gray-600">{'<span class="tg-spoiler">spoiler</span>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">codigo de largura fixa inline</span>
            <div className="text-gray-600">{'<code>codigo de largura fixa inline</code>'}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">bloco de código de largura fixa pré-formatado</span>
            <div className="text-gray-600">{'<pre>bloco de código de largura fixa pré-formatado</pre>'}</div>
          </div>
        </div>
      </div>
      
      <div className="col-span-full mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </div>
  )
}


function InstaSchedTab() {
  const [posts, setPosts] = useState<any[]>([]) // <- Começa vazio
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 12
  const totalPaginas = Math.ceil(posts.length / itensPorPagina)

  const postsPaginados = posts.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  const deletarPost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  return (
    <>
      {/* Banner Gradient Laranja/Roxo */}
      <div className="rounded-lg bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#833AB4] px-5 py-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <div>
              <h3 className="text-sm font-bold">Agendamentos Instagram</h3>
              <p className="text-xs opacity-90">@viciados.na.shoppee - Até 25 posts automáticos por 24 horas</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded bg-white px-4 py-1.5 text-xs font-bold text-[#FF6B35] hover:bg-gray-100">
            <Plus size={14} />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Se não tiver posts, mostra estado vazio */}
      {posts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white py-16 text-center">
          <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
          <h4 className="mb-1 text-sm font-semibold text-gray-900">
            Nenhum agendamento encontrado
          </h4>
          <p className="mb-4 text-xs text-gray-500">
            Você ainda não criou nenhum agendamento. Clique em "Novo Agendamento" para começar.
          </p>
          <button className="inline-flex items-center gap-1.5 rounded bg-[#1976D2] px-5 py-2 text-sm font-bold text-white hover:bg-blue-700">
            <Plus size={16} />
            Criar Primeiro Agendamento
          </button>
        </div>
      ) : (
        <>
          {/* Grid de Posts */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {postsPaginados.map((post) => (
              <div key={post.id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="relative">
                  <img 
                    src={post.img} 
                    alt={post.titulo}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-bold text-white ${
                    post.status === 'Publicado' ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'
                  }`}>
                    {post.status}
                  </div>
                </div>
                
                <div className="p-2.5">
                  <p className="mb-1 line-clamp-2 text-xs font-semibold text-gray-900">
                    {post.titulo}
                  </p>
                  <p className="mb-2 text-sm font-bold text-[#1976D2]">
                    R$ {post.preco}
                  </p>
                  
                  <div className="mb-2 flex items-center gap-1 text-xs text-gray-600">
                    {post.status === 'Publicado' ? (
                      <CheckCircle2 size={12} className="text-[#22C55E]" />
                    ) : (
                      <Clock size={12} className="text-[#F59E0B]" />
                    )}
                    <span className="text-xs">{post.status}</span>
                  </div>
                  
                  <p className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {post.data}
                  </p>

                  <div className="flex gap-1.5">
                    <button className={`flex flex-1 items-center justify-center gap-1 rounded border py-1.5 text-xs font-semibold ${
                      post.status === 'Publicado' 
                        ? 'border-[#1976D2] text-[#1976D2] hover:bg-blue-50' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      {post.status === 'Publicado' ? (
                        <>
                          <ExternalLink size={12} />
                          Ver
                        </>
                      ) : (
                        <>
                          <Pencil size={12} />
                          Editar
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => deletarPost(post.id)}
                      className="rounded border border-red-300 px-2 py-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="mt-4 flex items-center justify-center gap-1">
              <button 
                onClick={() => setPagina(Math.max(1, pagina - 1))}
                disabled={pagina === 1}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                « Previous
              </button>
              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPagina(i + 1)}
                  className={`rounded px-3 py-1 text-xs font-semibold ${
                    pagina === i + 1
                      ? 'bg-[#1976D2] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
                disabled={pagina === totalPaginas}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next »
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function WhatsAppTab() {
  const [freeTrialAtivo, setFreeTrialAtivo] = useState(false)

  return (
    <div className="space-y-4">
      {/* Card Sessões WhatsApp */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
            <Link2 size={16} className="text-gray-600" />
            Sessões WhatsApp
          </h4>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#00BCD4] px-2 py-0.5 text-xs font-bold text-white">
              FREE TRIAL
            </span>
            <button
              onClick={() => setFreeTrialAtivo(!freeTrialAtivo)}
              className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#4CAF50] transition"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${freeTrialAtivo ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Card Sessão WhatsApp */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Sessão WhatsApp
          </h4>
        </div>
        
        <div className="p-4">
          <p className="mb-3 text-sm text-gray-600">
            Nenhuma sessão WhatsApp vinculada a este grupo/canal.
          </p>
          
          <button className="flex items-center gap-2 rounded bg-[#4CAF50] px-4 py-2 text-sm font-bold text-white hover:bg-[#45A049]">
            <RefreshCw size={16} />
            Conectar novo número
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </div>
  )
}

function InstaBotHelpTab() {
  const [activeSubTab, setActiveSubTab] = useState<'reels' | 'remix'>('reels')
  const [modalAberto, setModalAberto] = useState(false)
  const [postSelecionado, setPostSelecionado] = useState<any>(null)
  
  // Modal states
  const [palavraChave, setPalavraChave] = useState('')
  const [fraseResposta, setFraseResposta] = useState('')
  const [textoDirect, setTextoDirect] = useState('Olá! Aqui está o link que vc me pediu lá nos comentários:')
  const [textoDestaque, setTextoDestaque] = useState('👉 CLIQUE AQUI 👈')
  const [linkAfiliado, setLinkAfiliado] = useState('')
  const [links, setLinks] = useState<{ nome: string, url: string }[]>([])
  const [dropdownAberto, setDropdownAberto] = useState(false)

  const sugestoesTexto = [
    '👉 CLIQUE AQUI 👈',
    'VER NA SHOPEE',
    'clique aqui',
    'remix',
    '👉 VER NA SHOPEE',
    'DISPENSER AUTOMATICO'
  ]

  const [posts] = useState([
    { id: 18150575449373607, titulo: 'PROMOÇÕES IMPERDÍVEIS', likes: 4, comentarios: 0, img: 'https://via.placeholder.com/300x400/FF6B35/ffffff?text=Promo+1', url: 'https://instagram.com/p/1' },
    { id: 18150575449373608, titulo: 'OFERTAS E PROMOÇÕES TODOS OS DIAS', likes: 3, comentarios: 0, img: 'https://via.placeholder.com/300x400/00BCD4/ffffff?text=Promo+2', url: 'https://instagram.com/p/2' },
    { id: 18150575449373609, titulo: 'DIA DO CONSUMIDOR', likes: 1, comentarios: 0, img: 'https://via.placeholder.com/300x400/833AB4/ffffff?text=Promo+3', url: 'https://instagram.com/p/3' },
    { id: 18150575449373610, titulo: 'ORGANIZADOR DE OVOS', likes: 1, comentarios: 0, img: 'https://via.placeholder.com/300x400/4CAF50/ffffff?text=Promo+4', url: 'https://instagram.com/p/4' },
    { id: 18150575449373611, titulo: 'MINI JOGO DE PANELAS 17 PEÇAS', likes: 4, comentarios: 0, img: 'https://via.placeholder.com/300x400/795548/ffffff?text=Promo+5', url: 'https://instagram.com/p/5' },
    { id: 18150575449373612, titulo: 'POTES HERMÉTICOS', likes: 3, comentarios: 0, img: 'https://via.placeholder.com/300x400/607D8B/ffffff?text=Promo+6', url: 'https://instagram.com/p/6' },
    { id: 18150575449373613, titulo: 'MINI LIQUIDIFICADOR PORTÁTIL', likes: 5, comentarios: 0, img: 'https://via.placeholder.com/300x400/00BCD4/ffffff?text=Promo+7', url: 'https://instagram.com/p/7' },
    { id: 18150575449373614, titulo: 'BORRIFADOR AZEITE', likes: 2, comentarios: 0, img: 'https://via.placeholder.com/300x400/FFC107/ffffff?text=Promo+8', url: 'https://instagram.com/p/8' },
    { id: 18150575449373615, titulo: 'FATIADOR DE LEGUMES 16 EM 1', likes: 6, comentarios: 0, img: 'https://via.placeholder.com/300x400/00BCD4/ffffff?text=Promo+9', url: 'https://instagram.com/p/9' },
    { id: 18150575449373616, titulo: 'PROJETOR 4K HD', likes: 8, comentarios: 0, img: 'https://via.placeholder.com/300x400/212121/ffffff?text=Promo+10', url: 'https://instagram.com/p/10' },
    { id: 18150575449373617, titulo: 'Fechadura Eletrônica Digital 5 em 1', likes: 3, comentarios: 0, img: 'https://via.placeholder.com/300x400/F44336/ffffff?text=Promo+11', url: 'https://instagram.com/p/11' },
    { id: 18150575449373618, titulo: 'Tablet Pc Mi10', likes: 7, comentarios: 0, img: 'https://via.placeholder.com/300x400/9C27B0/ffffff?text=Promo+12', url: 'https://instagram.com/p/12' },
  ])

  const abrirModal = (post: any) => {
    setPostSelecionado(post)
    setModalAberto(true)
    // Reset form
    setPalavraChave('')
    setFraseResposta('')
    setTextoDirect('Olá! Aqui está o link que vc me pediu lá nos comentários:')
    setTextoDestaque('👉 CLIQUE AQUI 👈')
    setLinkAfiliado('')
    setLinks([])
  }

  const adicionarLink = () => {
    if (links.length < 5) {
      setLinks([...links, { nome: '', url: '' }])
    }
  }

  const atualizarLink = (index: number, campo: 'nome' | 'url', valor: string) => {
    const novosLinks = [...links]
    novosLinks[index][campo] = valor
    setLinks(novosLinks)
  }

  const removerLink = (index: number) => {
    setLinks(links.filter((_, i) => i!== index))
  }

  return (
    <>
      {/* Sub-tabs Reels / Remix */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveSubTab('reels')}
          className={`flex-1 border-b-2 px-4 py-3 text-sm font-semibold transition ${
            activeSubTab === 'reels'
             ? 'border-[#1976D2] text-[#1976D2]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Instagram size={16} className="mr-1.5 inline" />
          Reels
        </button>
        <button
          onClick={() => setActiveSubTab('remix')}
          className={`flex-1 border-b-2 px-4 py-3 text-sm font-semibold transition ${
            activeSubTab === 'remix'
             ? 'border-[#1976D2] text-[#1976D2]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Video size={16} className="mr-1.5 inline" />
          Remix
        </button>
      </div>

      {/* Grid de Posts */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <img 
              src={post.img} 
              alt={post.titulo}
              className="h-64 w-full object-cover"
            />
            
            <div className="p-2.5">
              <div className="mb-2 flex items-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Heart size={14} className="fill-gray-400 text-gray-400" />
                  {post.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {post.comentarios} comentários
                </span>
              </div>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 flex w-full items-center justify-center gap-1.5 rounded bg-[#E53935] py-1.5 text-xs font-bold text-white hover:bg-[#D32F2F]"
              >
                <Instagram size={14} />
                Ver no Instagram
              </a>

              <button
                onClick={() => abrirModal(post)}
                className="flex w-full items-center justify-center gap-1.5 rounded bg-[#4CAF50] py-1.5 text-xs font-bold text-white hover:bg-[#45A049]"
              >
                <Plus size={14} />
                Nova Automação
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Nova Automação */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h- w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Nova Automação</h3>
                <p className="text-xs text-gray-500">
                  Configurando nova automação para o Reel/Post ID: {postSelecionado?.id}
                </p>
              </div>
              <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <button className="mb-4 flex w-full items-center justify-center gap-2 rounded bg-[#546E7A] py-2.5 text-sm font-semibold text-white hover:bg-[#455A64]">
                <Wand2 size={16} />
                Preencher Automaticamente
              </button>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    PALAVRA CHAVE GATILHO (EX: EU QUERO)
                  </label>
                  <input
                    type="text"
                    value={palavraChave}
                    onChange={(e) => setPalavraChave(e.target.value)}
                    placeholder="quero"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    FRASE DE RESPOSTA AO COMENTÁRIO
                  </label>
                  <input
                    type="text"
                    value={fraseResposta}
                    onChange={(e) => setFraseResposta(e.target.value)}
                    placeholder="auto"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Escreva: auto, para o sistema enviar frases automática para você; ou Envie várias frases separadas por ; (ponto e virgula) Ex: Minha respota 1; Minha resposta 2
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    TEXTO ENVIADO NO DIRECT: (OK! AQUI ESTÁ SEU LINK:)
                  </label>
                  <textarea
                    value={textoDirect}
                    onChange={(e) => setTextoDirect(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">Limite de 500 caracteres.</p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    TEXTO DE DESTAQUE: (EX: VER NA SHOPEE)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={textoDestaque}
                      onChange={(e) => setTextoDestaque(e.target.value)}
                      onFocus={() => setDropdownAberto(true)}
                      onBlur={() => setTimeout(() => setDropdownAberto(false), 200)}
                      className="w-full rounded border border-[#6366F1] px-3 py-2 text-sm focus:border-[#6366F1] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                    />
                    {dropdownAberto && (
                      <div className="absolute z-10 mt-1 w-full rounded border border-gray-200 bg-white shadow-lg">
                        {sugestoesTexto.map((sugestao, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setTextoDestaque(sugestao)
                              setDropdownAberto(false)
                            }}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            {sugestao}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                    LINK DE AFILIADO (EX: HTTPS://SHOPEE.COM)
                  </label>
                  <input
                    type="url"
                    value={linkAfiliado}
                    onChange={(e) => setLinkAfiliado(e.target.value)}
                    placeholder="https://youtu.be/5u4ac8mxlhc"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter a valid URL: https://www.google.com</p>
                </div>

                {/* Links adicionais */}
                {links.map((link, index) => (
                  <div key={index} className="rounded border border-gray-200 bg-gray-50 p-3">
                    <div className="mb-2">
                      <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                        NOME DO PRODUTO
                      </label>
                      <input
                        type="text"
                        value={link.nome}
                        onChange={(e) => atualizarLink(index, 'nome', e.target.value)}
                        placeholder="PRODUTO"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                        LINK DO PRODUTO
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => atualizarLink(index, 'url', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removerLink(index)}
                      className="flex w-full items-center justify-center gap-1.5 rounded bg-[#E53935] py-2 text-xs font-bold text-white hover:bg-[#D32F2F]"
                    >
                      <Trash2 size={14} />
                      Deletar link
                    </button>
                  </div>
                ))}

                <button
                  onClick={adicionarLink}
                  className="flex w-full items-center justify-center gap-1.5 rounded bg-[#4CAF50] py-2.5 text-sm font-bold text-white hover:bg-[#45A049]"
                >
                  <Plus size={16} />
                  Adicionar link
                </button>

                <button
                  onClick={() => setModalAberto(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded bg-[#6366F1] py-2.5 text-sm font-bold text-white hover:bg-[#4F46E5]"
                >
                  <Save size={16} />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}


function AliExpressTab() {
  const [planoIniciantes] = useState(true)
  const [afiliadoConfigurado] = useState(false)
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)
  const [categoria, setCategoria] = useState('')
  const [produtosExibir, setProdutosExibir] = useState('12')
  const [ordenarPor, setOrdenarPor] = useState('Data Atualização - Mais Novos')
  const [acaoMassa, setAcaoMassa] = useState('')
  const [todosMarcados, setTodosMarcados] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivoSelecionado(e.target.files[0])
    }
  }

  return (
    <>
      {/* Banner ATENÇÃO Afiliado */}
      {!afiliadoConfigurado && (
        <div className="mt-4 rounded border border-[#F48FB1] bg-[#FCE4EC] px-4 py-3">
          <p className="text-sm font-bold text-[#C2185B]">ATENÇÃO!</p>
          <p className="text-xs text-[#AD1457]">
            Você deve configurar suas informações de afiliado AliExpress para usar o recurso de categorias/palavra-chave!{' '}
            <button className="font-bold underline">CLIQUE AQUI</button>
          </p>
        </div>
      )}

      {/* Card Importar Produtos em Massa */}
      <div className="mt-4 rounded border border-gray-300 bg-white p-4">
        <h4 className="mb-1 text-sm font-semibold text-gray-900">Importar Produtos em Massa</h4>
        <p className="mb-3 text-xs text-gray-500">ARQUIVO DE PRODUTOS.XLS</p>

        <div className="mb-3 flex items-center gap-2">
          <label className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-xs hover:bg-gray-50">
            Escolher arquivo
            <input 
              type="file" 
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <span className="text-xs text-gray-500">
            {arquivoSelecionado? arquivoSelecionado.name : 'Nenhum arquivo escolhido'}
          </span>
        </div>

        <div className="mb-3 text-xs text-gray-600">
          <p>O arquivo CSV deve ter as seguintes colunas na ordem:</p>
          <p className="mt-1 text-gray-500">
            ProductId, Image Url, Video Url, Product Desc, Origin Price, Discount Price, Discount Currency, Direct linking, commission rate (%), Estimated direct linking commission, Indirect linking commission rate (%), Estimated indirect linking commission, Sales180Day, Positive Feedback, Promotion Url, Code Name, Code Start Time, Code End Time, Code Value, Code Quantity, Code Minimum Spend.
          </p>
        </div>

        <button 
          disabled={!arquivoSelecionado}
          className="rounded bg-[#2196F3] px-5 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
        >
          Importar
        </button>
      </div>

      {/* Categorias / Palavras-chave */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">Categorias / Palavras-chave</label>
          <button className="rounded bg-[#E53935] px-3 py-1 text-xs font-bold text-white hover:bg-[#D32F2F]">
            Exibir Tudo
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Pesquisar"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded bg-[#2196F3] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2]">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Filtros Produtos */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-4">
          <label className="text-xs font-semibold text-gray-700">Produtos</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Exibir:</span>
            <select
              value={produtosExibir}
              onChange={(e) => setProdutosExibir(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>12</option>
              <option>24</option>
              <option>48</option>
              <option>96</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Ordenar por:</span>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Data Atualização - Mais Novos</option>
              <option>Data Atualização - Mais Antigos</option>
              <option>Preço - Menor</option>
              <option>Preço - Maior</option>
              <option>Comissão - Maior</option>
            </select>
          </div>
        </div>

        {/* Ações em Massa */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={(e) => setTodosMarcados(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Todos
          </label>
          <select
            value={acaoMassa}
            onChange={(e) => setAcaoMassa(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma ação</option>
            <option value="deletar">Deletar Selecionados</option>
            <option value="exportar">Exportar Selecionados</option>
          </select>
          <button 
            disabled={!acaoMassa}
            className="rounded bg-[#2196F3] px-4 py-1 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
          >
            Executar
          </button>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function AmazonTab() {
  const [planoIniciantes] = useState(true)
  const [afiliadoConfigurado] = useState(false)
  const [categoria, setCategoria] = useState('')
  const [produtosExibir, setProdutosExibir] = useState('12')
  const [ordenarPor, setOrdenarPor] = useState('Data Atualização - Mais Novos')
  const [acaoMassa, setAcaoMassa] = useState('')
  const [todosMarcados, setTodosMarcados] = useState(false)

  return (
    <>
      {/* Banner ATENÇÃO Afiliado Amazon */}
      {!afiliadoConfigurado && (
        <div className="mt-4 rounded border border-[#F48FB1] bg-[#FCE4EC] px-4 py-3">
          <p className="text-sm font-bold text-[#C2185B]">ATENÇÃO!</p>
          <p className="text-xs text-[#AD1457]">
            Você deve configurar suas informações de afiliado AMAZON para usar esse recurso!{' '}
            <button className="font-bold underline">CLIQUE AQUI</button>
          </p>
        </div>
      )}

      {/* Categorias / Palavras-chave */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">Categorias / Palavras-chave</label>
          <button className="rounded bg-[#E53935] px-3 py-1 text-xs font-bold text-white hover:bg-[#D32F2F]">
            Excluir Tudo
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Pesquisar"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded bg-[#2196F3] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2]">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Filtros Produtos */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-4">
          <label className="text-xs font-semibold text-gray-700">Produtos</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Exibir:</span>
            <select
              value={produtosExibir}
              onChange={(e) => setProdutosExibir(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>12</option>
              <option>24</option>
              <option>48</option>
              <option>96</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Ordenar por:</span>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Data Atualização - Mais Novos</option>
              <option>Data Atualização - Mais Antigos</option>
              <option>Preço - Menor</option>
              <option>Preço - Maior</option>
              <option>Comissão - Maior</option>
            </select>
          </div>
        </div>

        {/* Ações em Massa */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={(e) => setTodosMarcados(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Todos
          </label>
          <select
            value={acaoMassa}
            onChange={(e) => setAcaoMassa(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma ação</option>
            <option value="deletar">Deletar Selecionados</option>
            <option value="exportar">Exportar Selecionados</option>
          </select>
          <button 
            disabled={!acaoMassa}
            className="rounded bg-[#2196F3] px-4 py-1 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
          >
            Executar
          </button>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function MercadoLivreTab() {
  const [planoIniciantes] = useState(true)
  const [bannerExtensao, setBannerExtensao] = useState(true)
  
  // Adicionar Produto por Link
  const [link, setLink] = useState('')
  const [colecaoDestino, setColecaoDestino] = useState('')
  const [idGrupo, setIdGrupo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [agendamento, setAgendamento] = useState('')
  
  // Cupons
  const [tipoCupom, setTipoCupom] = useState('')
  const [valorDesconto, setValorDesconto] = useState('')
  const [valorMinimo, setValorMinimo] = useState('')
  const [valorMaximo, setValorMaximo] = useState('')
  const [codigoCupom, setCodigoCupom] = useState('')
  const [inserirLinkPost, setInserirLinkPost] = useState(false)
  
  // Buscar por Categoria
  const [categoriaPrincipal, setCategoriaPrincipal] = useState('')
  const [subcategoria, setSubcategoria] = useState('')
  const [buscarMaisVendidos, setBuscarMaisVendidos] = useState(false)
  
  // Texto Padrão
  const [descricaoMercadoLivre, setDescricaoMercadoLivre] = useState('')
  const [respostaMercadoLivre, setRespostaMercadoLivre] = useState('')
  
  // Filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [produtosExibir, setProdutosExibir] = useState('12')
  const [ordenarPor, setOrdenarPor] = useState('Data Atualização - Mais Novos')
  const [acaoMassa, setAcaoMassa] = useState('')
  const [todosMarcados, setTodosMarcados] = useState(false)

  return (
    <>
      {/* Grid 3 Colunas */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        
        {/* COLUNA 1: Adicionar Produto por Link + Cupons */}
        <div className="space-y-4">
          <div className="rounded border border-gray-300 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Adicionar Produto por Link
            </h4>
            <p className="mb-3 text-xs text-gray-600">
              Cole qualquer link do produto ML normal, link de afiliado ou link da ML. O sistema irá extrair o produto e gerar o link de afiliado automaticamente.
            </p>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">LINK</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">COLEÇÃO DE DESTINO</label>
                <select
                  value={colecaoDestino}
                  onChange={(e) => setColecaoDestino(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione um coleção ou digite um novo</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">ID DO GRUPO (NA URL DO CANAL/GRUPO)</label>
                <input
                  type="text"
                  value={idGrupo}
                  onChange={(e) => setIdGrupo(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">DESCRIÇÃO</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Essa descrição se aplica somente a esse produto adicionado.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">AGENDAMENTO</label>
                <div className="relative">
                  <input
                    type="text"
                    value={agendamento}
                    onChange={(e) => setAgendamento(e.target.value)}
                    placeholder="dd/mm/aaaa --:--"
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <Calendar size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <p className="mt-1 text-xs text-gray-500">Selecione a Data e Hora</p>
              </div>
            </div>
          </div>

          {/* Card Cupons */}
          <div className="rounded border border-[#4FC3F7] bg-white">
            <div className="bg-[#4FC3F7] px-4 py-2">
              <h4 className="text-sm font-semibold text-white">Cupons</h4>
            </div>
            <div className="space-y-3 p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">TIPO DE CUPOM</label>
                <select
                  value={tipoCupom}
                  onChange={(e) => setTipoCupom(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione o tipo de cupom </option>
                  <option value="percentual">Percentual</option>
                  <option value="valor">Valor Fixo</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">VALOR DO DESCONTO</label>
                <input
                  type="text"
                  value={valorDesconto}
                  onChange={(e) => setValorDesconto(e.target.value)}
                  placeholder="Ex: 10 ou 50"
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">VALOR MÍNIMO DA COMPRA PARA APLICAR O CUPOM</label>
                <input
                  type="text"
                  value={valorMinimo}
                  onChange={(e) => setValorMinimo(e.target.value)}
                  placeholder="Ex: 50 ou 100"
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">VALOR MÁXIMO DO CUPOM</label>
                <input
                  type="text"
                  value={valorMaximo}
                  onChange={(e) => setValorMaximo(e.target.value)}
                  placeholder="Ex: 100 ou 200"
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Digite apenas números inteiros.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">CÓDIGO DO CUPOM</label>
                <input
                  type="text"
                  value={codigoCupom}
                  onChange={(e) => setCodigoCupom(e.target.value)}
                  placeholder="Ex: CUPOM10"
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button className="w-full rounded bg-[#2196F3] py-2 text-sm font-bold text-white hover:bg-[#1976D2]">
                Salvar
              </button>

              <label className="grid grid-cols-[16px_1fr] gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox" 
                  checked={inserirLinkPost}
                  onChange={(e) => setInserirLinkPost(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300"
                />
                Inserir esse link no post
              </label>

              <div className="text-xs text-gray-600">
                <p className="font-semibold">Exemplos válidos:</p>
                <p className="break-all text-[#2196F3]">https://www.mercadolivre.com.br/oferta/D_NQ_NP_893711-MLB770...87-478</p>
                <p className="break-all text-[#2196F3]">https://mercadolivre.com.br/social/vendas/ofertas?seller_id=2247363</p>
                <p className="break-all text-[#2196F3]">https://mercadolivre.com.br/social/vendas/ofertas?seller_id=2247363</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA 2: Buscar por Categoria */}
        <div className="rounded border border-gray-300 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Buscar por Categoria Ofertas do Dia
          </h4>
          <p className="mb-3 text-xs text-gray-600">
            Selecione uma categoria e subcategoria opcional para buscar produtos.
          </p>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">CATEGORIA PRINCIPAL</label>
              <select
                value={categoriaPrincipal}
                onChange={(e) => setCategoriaPrincipal(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione uma categoria</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="casa">Casa e Móveis</option>
                <option value="moda">Moda</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">SUBCATEGORIA (OPCIONAL)</label>
              <select
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                disabled={!categoriaPrincipal}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              >
                <option value="">Primeiro selecione uma categoria principal</option>
              </select>
            </div>

            <label className="grid grid-cols-[16px_1fr] gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={buscarMaisVendidos}
                onChange={(e) => setBuscarMaisVendidos(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300"
              />
              Buscar Mais Vendidos
            </label>

            <button className="w-full rounded bg-[#2196F3] py-2 text-sm font-bold text-white hover:bg-[#1976D2]">
              Buscar Produtos
            </button>

            <div className="rounded bg-[#FFF9C4] p-3 text-xs text-[#F57F17]">
              <p className="mb-2 font-bold">⚠ Categorias com Busca Automática desativada por excesso de produtos banidos automaticamente. Para adicionar produtos destas categorias, use o método de adicionar por link</p>
              <p className="font-semibold">Acesse os alertas diretamente:</p>
              <p>• Carros, Motos e Outros</p>
              <p>• Imóveis</p>
              <p>• Ingressos</p>
              <p className="mt-1">+ Mais Categorias</p>
            </div>
          </div>
        </div>

        {/* COLUNA 3: Texto Padrão */}
        <div className="rounded border border-gray-300 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">Texto Padrão</h4>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                CONFIGURAÇÃO DO MERCADO LIVRE
              </label>
              <textarea
                value={descricaoMercadoLivre}
                onChange={(e) => setDescricaoMercadoLivre(e.target.value)}
                rows={8}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Este texto será exibido como descrição em um produto do Mercado Livre. Salve abaixo o código geral.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                RESPOSTA DO MERCADO LIVRE
              </label>
              <textarea
                value={respostaMercadoLivre}
                onChange={(e) => setRespostaMercadoLivre(e.target.value)}
                rows={8}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Este texto será exibido na DM do post de um produto do Mercado Livre. Salve abaixo o código geral.
              </p>
            </div>

            <button className="w-full rounded bg-[#2196F3] py-2 text-sm font-bold text-white hover:bg-[#1976D2]">
              Salvar
            </button>
          </div>
        </div>
      </div>

      {/* Categorias / Palavras-chave */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">Categorias / Palavras-chave</label>
          <button className="rounded bg-[#E53935] px-3 py-1 text-xs font-bold text-white hover:bg-[#D32F2F]">
            Excluir Tudo
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            placeholder="Pesquisar"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded bg-[#2196F3] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2]">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Filtros Produtos */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-4">
          <label className="text-xs font-semibold text-gray-700">Produtos</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Exibir:</span>
            <select
              value={produtosExibir}
              onChange={(e) => setProdutosExibir(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>12</option>
              <option>24</option>
              <option>48</option>
              <option>96</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Ordenar por:</span>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Data Atualização - Mais Novos</option>
              <option>Data Atualização - Mais Antigos</option>
              <option>Preço - Menor</option>
              <option>Preço - Maior</option>
              <option>Comissão - Maior</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={(e) => setTodosMarcados(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Todos
          </label>
          <select
            value={acaoMassa}
            onChange={(e) => setAcaoMassa(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma ação</option>
            <option value="deletar">Deletar Selecionados</option>
            <option value="exportar">Exportar Selecionados</option>
          </select>
          <button 
            disabled={!acaoMassa}
            className="rounded bg-[#2196F3] px-4 py-1 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
          >
            Executar
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}


function SheinTab() {
  const [planoIniciantes] = useState(true)
  const [linkAfiliado, setLinkAfiliado] = useState('')
  const [cabecalho, setCabecalho] = useState('')
  const [rodape, setRodape] = useState('')
  const [pesquisar, setPesquisar] = useState('')
  const [produtosExibir, setProdutosExibir] = useState('12')
  const [ordenarPor, setOrdenarPor] = useState('Data Atualização - Mais Novos')
  const [acaoMassa, setAcaoMassa] = useState('')
  const [todosMarcados, setTodosMarcados] = useState(false)

  return (
    <>
      {/* Grid 3 Colunas */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        
        {/* COLUNA 1: Adicionar Produto por Link de Afiliado */}
        <div className="rounded border border-gray-300 bg-white p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <LinkIcon size={16} className="text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-900">
              Adicionar Produto por Link de Afiliado
            </h4>
          </div>

          <div className="mb-4 rounded bg-[#FFF9C4] px-3 py-2">
            <p className="mb-1 text-xs font-bold text-[#F57F17]">
              ⚠ IMPORTANTE:
            </p>
            <p className="text-xs text-[#F57F17]">
              O link que você colar aqui será usado <span className="font-semibold">diretamente no post</span>. O sistema <span className="font-semibold">NÃO converte</span> links da Shein — use seu link de afiliado já gerado no Aplicativo da Shein.
            </p>
          </div>

          <div className="mb-3">
            <div className="mb-2 flex items-center gap-1.5">
              <LinkIcon size={14} className="text-gray-600" />
              <label className="text-xs font-semibold uppercase text-gray-600">
                LINK DE AFILIADO SHEIN
              </label>
            </div>
            <textarea
              value={linkAfiliado}
              onChange={(e) => setLinkAfiliado(e.target.value)}
              placeholder="Cole seu link de afiliado gerado no App da Shein aqui"
              rows={3}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button className="w-full rounded bg-[#2196F3] py-2 text-sm font-bold text-white hover:bg-[#1976D2]">
            Salvar
          </button>

          <div className="mt-4 text-xs text-gray-600">
            <div className="mb-2 flex items-center gap-1.5">
              <Info size={14} className="text-[#2196F3]" />
              <p className="font-semibold">Formato aceito:</p>
            </div>
            <p className="text-[#2196F3]">• Link de afiliado gerado no App da Shein</p>
            <p className="break-all text-[#2196F3]">https://onelink.shein.com/2b/xJ4jByuwlm</p>
          </div>
        </div>

        {/* COLUNA 2: Texto Padrão */}
        <div className="rounded border border-gray-300 bg-white p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <Info size={16} className="text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-900">
              Texto Padrão
            </h4>
          </div>
          <p className="mb-3 text-xs text-gray-600">
            Defina o texto padrão para produtos da Shein.
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                CABEÇALHO DA SHEIN
              </label>
              <textarea
                value={cabecalho}
                onChange={(e) => setCabecalho(e.target.value)}
                rows={6}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Esse texto será exibido acima do título de um produto da Shein. Substitui o cabeçalho geral.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
                RODAPÉ DA SHEIN
              </label>
              <textarea
                value={rodape}
                onChange={(e) => setRodape(e.target.value)}
                rows={6}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Esse texto será exibido no final do post de um produto da Shein. Substitui o rodapé geral.
              </p>
            </div>

            <button className="w-full rounded bg-[#2196F3] py-2 text-sm font-bold text-white hover:bg-[#1976D2]">
              Salvar
            </button>
          </div>
        </div>

        {/* COLUNA 3: Sobre a Integração Shein */}
        <div className="rounded border border-gray-300 bg-white p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <Info size={16} className="text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-900">
              Sobre a Integração Shein
            </h4>
          </div>

          <p className="mb-3 text-xs text-gray-700">Para usar esta integração:</p>
          
          <div className="mb-4 space-y-1.5 text-xs text-gray-700">
            <p>Cadastre-se no programa de afiliados da Shein</p>
            <p>Gere o link de afiliado no <span className="font-semibold">Aplicativo da Shein</span></p>
            <p>Cole o link aqui para extrair os dados automaticamente</p>
          </div>

          <div className="mb-3 rounded bg-[#FFF9C4] px-3 py-2">
            <p className="text-xs text-[#F57F17]">
              <span className="font-bold">🔗 Link no Post:</span> O link que você colar será usado diretamente no post. Não há conversão de links para a Shein.
            </p>
          </div>

          <div className="rounded bg-[#E1F5FE] px-3 py-2">
            <p className="text-xs text-[#0288D1]">
              <span className="font-bold">💡 Dica:</span> O sistema extrai automaticamente os dados do produto (título, preço, imagem) a partir do link.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            placeholder="Pesquisar"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded bg-[#2196F3] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1976D2]">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Filtros Produtos */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-4">
          <label className="text-xs font-semibold text-gray-700">Produtos</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Exibir:</span>
            <select
              value={produtosExibir}
              onChange={(e) => setProdutosExibir(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>12</option>
              <option>24</option>
              <option>48</option>
              <option>96</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Ordenar por:</span>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Data Atualização - Mais Novos</option>
              <option>Data Atualização - Mais Antigos</option>
              <option>Preço - Menor</option>
              <option>Preço - Maior</option>
              <option>Comissão - Maior</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={(e) => setTodosMarcados(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Todos
          </label>
          <select
            value={acaoMassa}
            onChange={(e) => setAcaoMassa(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma ação</option>
            <option value="deletar">Deletar Selecionados</option>
            <option value="exportar">Exportar Selecionados</option>
          </select>
          <button 
            disabled={!acaoMassa}
            className="rounded bg-[#2196F3] px-4 py-1 text-xs font-bold text-white hover:bg-[#1976D2] disabled:opacity-50"
          >
            Executar
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}

function ColaboradoresTab() {
  const [planoIniciantes] = useState(true)
  const [emailColaborador, setEmailColaborador] = useState('')
  const [expiracao, setExpiracao] = useState('')
  
  
  const enviarConvite = () => {
    if (!emailColaborador) {
      alert('Preencha o e-mail do colaborador')
      return
    }
    console.log('Enviando convite para:', emailColaborador, 'Expira em:', expiracao)
    // Aqui chama API de convite
  }

  return (
    <>
    {/* Formulário Convidar Colaborador */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-900">Convidar Colaborador</h4>
        
        <div className="mb-4 rounded border border-[#4FC3F7] bg-[#E1F5FE] px-4 py-3">
          <p className="text-xs text-[#0288D1]">
            Antes de convidar o usuário ele deve fazer login e criar uma conta no sistema.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              E-MAIL DO COLABORADOR
            </label>
            <input
              type="email"
              value={emailColaborador}
              onChange={(e) => setEmailColaborador(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              O colaborador deve ser cadastrado no sistema
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              EXPIRAÇÃO
            </label>
            <div className="relative">
              <input
                type="text"
                value={expiracao}
                onChange={(e) => setExpiracao(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <Calendar size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button 
            onClick={enviarConvite}
            className="rounded bg-[#2196F3] px-6 py-2 text-sm font-bold text-white hover:bg-[#1976D2]"
          >
            Enviar convite
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026
      </div>
    </>
  )
}