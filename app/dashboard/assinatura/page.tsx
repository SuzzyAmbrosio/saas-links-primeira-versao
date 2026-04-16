"use client"

import { useState } from "react"
import { Check, Crown, Zap, Rocket, Star } from "lucide-react"
import { useSession } from "next-auth/react"

type Plano = {
  id: string
  nome: string
  preco: number
  periodo: string
  destaque?: boolean
  recursos: string[]
  limiteEnvios: string
  limiteProdutos: string
  icon: any
}

const planos: Plano[] = [
  {
    id: "iniciante",
    nome: "INICIANTE",
    preco: 0,
    periodo: "7 dias grátis",
    recursos: [
      "Até 5 links ativos",
      "100 envios/dia WhatsApp",
      "500 envios/dia Telegram",
      "1 canal/grupo",
      "Marca d'água nos posts",
      "Suporte por e-mail"
    ],
    limiteEnvios: "100/dia",
    limiteProdutos: "50",
    icon: Zap
  },
  {
    id: "pro",
    nome: "PRO",
    preco: 49.90,
    periodo: "por mês",
    destaque: true,
    recursos: [
      "Links ilimitados",
      "1.000 envios/dia WhatsApp",
      "5.000 envios/dia Telegram",
      "10 canais/grupos",
      "Sem marca d'água",
      "Importação em massa",
      "Suporte prioritário WhatsApp"
    ],
    limiteEnvios: "1.000/dia",
    limiteProdutos: "1.000",
    icon: Crown
  },
  {
    id: "negócios",
    nome: "NEGÓCIOS",
    preco: 149.90,
    periodo: "por mês",
    recursos: [
      "Tudo do PRO +",
      "Envios ilimitados WhatsApp",
      "Envios ilimitados Telegram",
      "Canais/grupos ilimitados",
      "API de integração",
      "Múltiplos usuários",
      "Relatórios avançados",
      "Gerente de conta dedicado"
    ],
    limiteEnvios: "Ilimitado",
    limiteProdutos: "Ilimitado",
    icon: Rocket
  }
]

export default function AssinaturaPage() {
  const { data: session } = useSession()
  const [planoAtual] = useState("iniciante") // Pega do session depois
  const [carregando, setCarregando] = useState<string | null>(null)

  async function fazerUpgrade(planoId: string) {
    setCarregando(planoId)
    // Aqui você integra com Stripe/Mercado Pago
    // const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ planoId }) })
    // const { url } = await res.json()
    // window.location.href = url
    
    setTimeout(() => {
      alert(`Redirecionando para pagamento do plano ${planoId.toUpperCase()}`)
      setCarregando(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assinatura</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie seu plano do Posta Links Auto e desbloqueie todos os recursos
        </p>
      </div>

      {/* Plano Atual */}
      <div className="rounded-lg border-2 border-blue-600 bg-blue-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-semibold text-blue-900">PLANO ATUAL</p>
            </div>
            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {planos.find(p => p.id === planoAtual)?.nome}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Usuário: <strong>{session?.user?.email}</strong>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Válido até</p>
            <p className="text-lg font-bold text-gray-900">19/04/2026</p>
            <p className="mt-1 text-xs text-blue-600">5 dias restantes no trial</p>
          </div>
        </div>
      </div>

      {/* Aviso Trial */}
      {planoAtual === "iniciante" && (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold">Você está no período de teste gratuito!</p>
              <p className="mt-1">
                Aproveite 7 dias grátis com recursos limitados. Faça upgrade para o PRO e remova a marca d'água, 
                desbloqueie envios ilimitados e muito mais!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Planos */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Escolha seu plano</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((plano) => {
            const Icon = plano.icon
            const isAtual = plano.id === planoAtual
            
            return (
              <div
                key={plano.id}
                className={`relative rounded-lg border-2 bg-white p-6 ${
                  plano.destaque
                   ? "border-blue-600 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plano.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    MAIS POPULAR
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    plano.id === "iniciante"? "bg-gray-100" :
                    plano.id === "pro"? "bg-blue-100" : "bg-purple-100"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      plano.id === "iniciante"? "text-gray-600" :
                      plano.id === "pro"? "text-blue-600" : "text-purple-600"
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plano.nome}</h3>
                    <p className="text-sm text-gray-600">{plano.periodo}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-600">R$</span>
                    <span className="text-4xl font-bold text-gray-900">{plano.preco.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-6 space-y-2 border-y border-gray-200 py-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envios/dia:</span>
                    <span className="font-semibold text-gray-900">{plano.limiteEnvios}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produtos:</span>
                    <span className="font-semibold text-gray-900">{plano.limiteProdutos}</span>
                  </div>
                </div>

                <ul className="mb-6 space-y-2">
                  {plano.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>

                {isAtual? (
                  <button
                    disabled
                    className="w-full rounded-lg bg-gray-100 py-3 text-sm font-medium text-gray-500"
                  >
                    Plano Atual
                  </button>
                ) : (
                  <button
                    onClick={() => fazerUpgrade(plano.id)}
                    disabled={carregando === plano.id}
                    className={`w-full rounded-lg py-3 text-sm font-medium text-white transition ${
                      plano.destaque
                       ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    } disabled:cursor-not-allowed disabled:bg-gray-300`}
                  >
                    {carregando === plano.id? "Processando..." : "Fazer Upgrade"}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Perguntas Frequentes</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-gray-900">Posso cancelar a qualquer momento?</p>
            <p className="mt-1 text-gray-600">
              Sim! Não há fidelidade. Você pode cancelar sua assinatura quando quiser sem multa.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">O que acontece quando o trial acaba?</p>
            <p className="mt-1 text-gray-600">
              Sua conta volta para o plano FREE com limitações. Seus links continuam funcionando, mas com marca d'água.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Quais formas de pagamento aceitam?</p>
            <p className="mt-1 text-gray-600">
              Cartão de crédito, PIX e boleto bancário. Pagamentos processados pelo Mercado Pago.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}