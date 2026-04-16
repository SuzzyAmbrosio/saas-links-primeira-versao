"use client"

import { useState } from "react"
import { Star, TrendingUp, Gift, Users, Zap, Check, Crown, Instagram, Youtube, Send } from "lucide-react"

export default function ProgramaInfluenciadoresPage() {
  const [inscrito, setInscrito] = useState(false)
  const [enviando, setEnviando] = useState(false)
  
  // Form
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [seguidores, setSeguidores] = useState("")
  const [nicho, setNicho] = useState("")
  const [mensagem, setMensagem] = useState("")

  async function enviarInscricao(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    
    // await fetch("/api/influenciadores/inscrever", { method: "POST", body: JSON.stringify({... }) })
    
    setTimeout(() => {
      setInscrito(true)
      setEnviando(false)
    }, 1500)
  }

  if (inscrito) {
    return (
      <div className="flex min-h- items-center justify-center">
        <div className="w-full max-w-lg rounded-lg border border-green-200 bg-green-50 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Inscrição Enviada!</h1>
          <p className="mt-2 text-sm text-gray-700">
            Recebemos sua aplicação para o Programa de Influenciadores do Posta Links Auto.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Nossa equipe vai analisar seu perfil e entrar em contato em até 48h pelo e-mail cadastrado.
          </p>
          <div className="mt-6 rounded-lg bg-white p-4 text-left text-xs text-gray-600">
            <p className="font-semibold text-gray-900">Próximos passos:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4">
              <li>Análise do seu perfil e alcance</li>
              <li>Aprovação e envio do kit de mídia exclusivo</li>
              <li>Acesso ao painel VIP com comissão de 40%</li>
              <li>Suporte dedicado via WhatsApp</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Programa VIP</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold">Programa de Influenciadores Posta Links Auto</h1>
            <p className="mt-3 text-base text-blue-100">
              Ganhe 40% de comissão recorrente, acesso antecipado a recursos e suporte dedicado. 
              Junte-se aos maiores criadores de conteúdo de marketing de afiliados do Brasil.
            </p>
          </div>
          <Star className="h-20 w-20 opacity-20" />
        </div>
      </div>

      {/* Benefícios */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Benefícios Exclusivos</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">40% de Comissão</h3>
            <p className="mt-1 text-sm text-gray-600">
              Maior taxa do mercado. Ganhe 40% recorrente em todas as assinaturas
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">Acesso Antecipado</h3>
            <p className="mt-1 text-sm text-gray-600">
              Teste novos recursos antes de todo mundo e dê feedback direto ao time
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">Kit de Mídia</h3>
            <p className="mt-1 text-sm text-gray-600">
              Banners, vídeos, copys prontas e artes exclusivas pra divulgar
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">Suporte VIP</h3>
            <p className="mt-1 text-sm text-gray-600">
              Gerente de conta dedicado via WhatsApp pra tirar dúvidas 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Requisitos */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Requisitos para Participar</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">+10k seguidores</p>
              <p className="text-sm text-gray-600">No Instagram, YouTube, TikTok ou Twitter combinados</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">Nicho relacionado</p>
              <p className="text-sm text-gray-600">Marketing digital, afiliados, empreendedorismo ou tecnologia</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">Conteúdo ativo</p>
              <p className="mt-1 text-sm text-gray-600">Pelo menos 3 posts por semana nos últimos 30 dias</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">Engajamento real</p>
              <p className="mt-1 text-sm text-gray-600">Taxa de engajamento mínima de 2% nos posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Inscrição */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-1 text-lg font-bold text-gray-900">Candidate-se Agora</h2>
        <p className="mb-6 text-sm text-gray-600">
          Preencha o formulário abaixo e nossa equipe vai analisar seu perfil
        </p>

        <form onSubmit={enviarInscricao} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                NOME COMPLETO *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                E-MAIL *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                INSTAGRAM
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@seuusuario"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                YOUTUBE
              </label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="youtube.com/@seucanal"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                TIKTOK
              </label>
              <input
                type="text"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="@seuusuario"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                TOTAL DE SEGUIDORES *
              </label>
              <select
                value={seguidores}
                onChange={(e) => setSeguidores(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione</option>
                <option value="10k-50k">10k - 50k</option>
                <option value="50k-100k">50k - 100k</option>
                <option value="100k-500k">100k - 500k</option>
                <option value="500k+">500k+</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                NICHO PRINCIPAL *
              </label>
              <select
                value={nicho}
                onChange={(e) => setNicho(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione</option>
                <option value="marketing-digital">Marketing Digital</option>
                <option value="afiliados">Marketing de Afiliados</option>
                <option value="empreendedorismo">Empreendedorismo</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="financas">Finanças / Investimentos</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                POR QUE VOCÊ QUER SER INFLUENCIADOR DO POSTA LINKS AUTO?
              </label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Conte um pouco sobre seu público e como pretende divulgar o Posta Links Auto..."
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-4">
            <button
              type="submit"
              disabled={enviando ||!nome ||!email ||!seguidores ||!nicho}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Send size={16} />
              {enviando? "Enviando..." : "Enviar Inscrição"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}