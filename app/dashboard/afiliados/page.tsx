"use client"

import { useState } from "react"
import { Share2, DollarSign, Users, TrendingUp, Copy, Check, ExternalLink, Wallet } from "lucide-react"

type Indicacao = {
  id: string
  nome: string
  email: string
  plano: string
  dataCadastro: string
  comissaoGerada: number
  status: "ativo" | "cancelado" | "trial"
}

const mockIndicacoes: Indicacao[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@email.com",
    plano: "PRO",
    dataCadastro: "05/04/2026",
    comissaoGerada: 14.97,
    status: "ativo"
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria@email.com",
    plano: "PRO",
    dataCadastro: "02/04/2026",
    comissaoGerada: 14.97,
    status: "ativo"
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro@email.com",
    plano: "NEGÓCIOS",
    dataCadastro: "28/03/2026",
    comissaoGerada: 44.97,
    status: "ativo"
  },
  {
    id: "4",
    nome: "Ana Oliveira",
    email: "ana@email.com",
    plano: "INICIANTES",
    dataCadastro: "10/04/2026",
    comissaoGerada: 0,
    status: "trial"
  },
]

export default function AfiliadosPage() {
  const [indicacoes] = useState<Indicacao[]>(mockIndicacoes)
  const [copied, setCopied] = useState(false)
  
  const linkAfiliado = typeof window!== "undefined"
   ? `${window.location.origin}/ref/seu-codigo-aqui`
    : "https://postalinksauto.com/ref/seu-codigo-aqui"

  const totalIndicacoes = indicacoes.length
  const indicacoesAtivas = indicacoes.filter(i => i.status === "ativo").length
  const comissaoTotal = indicacoes.reduce((acc, i) => acc + i.comissaoGerada, 0)
  const saldoDisponivel = 89.82

  function copiarLink() {
    navigator.clipboard.writeText(linkAfiliado)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function solicitarSaque() {
    alert("Solicitação de saque enviada! Você receberá em até 5 dias úteis.")
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Programa de Afiliados</h1>
        <p className="mt-1 text-sm text-gray-600">
          Indique o Posta Links Auto e ganhe 30% de comissão recorrente sobre cada assinatura
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Indicações</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalIndicacoes}</p>
            </div>
            <Users className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos Pagantes</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{indicacoesAtivas}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Comissão Total</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">R$ {comissaoTotal.toFixed(2)}</p>
            </div>
            <DollarSign className="h-10 w-10 text-yellow-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Saldo Disponível</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">R$ {saldoDisponivel.toFixed(2)}</p>
            </div>
            <Wallet className="h-10 w-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Link de Afiliado */}
      <div className="rounded-lg border-2 border-blue-600 bg-blue-50 p-6">
        <div className="flex items-start gap-3">
          <Share2 className="h-6 w-6 flex-shrink-0 text-blue-600" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">Seu Link de Afiliado</h2>
            <p className="mt-1 text-sm text-gray-700">
              Compartilhe este link e ganhe 30% de comissão recorrente em todas as assinaturas
            </p>
            
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={linkAfiliado}
                readOnly
                className="flex-1 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-900"
              />
              <button
                onClick={copiarLink}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {copied? <Check size={16} /> : <Copy size={16} />}
                {copied? "Copiado!" : "Copiar"}
              </button>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Conheça o Posta Links Auto! Automação completa para afiliados: ${linkAfiliado}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Compartilhar no WhatsApp
                <ExternalLink size={14} />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(linkAfiliado)}&text=${encodeURIComponent("Conheça o Posta Links Auto!")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                Compartilhar no Telegram
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Como Funciona */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Como funciona o programa</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <p className="font-semibold text-gray-900">Compartilhe seu link</p>
              <p className="mt-1 text-sm text-gray-600">
                Divulgue seu link único em redes sociais, grupos ou site
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>
            <div>
              <p className="font-semibold text-gray-900">Pessoa assina o plano</p>
              <p className="mt-1 text-sm text-gray-600">
                Quando alguém assinar PRO ou NEGÓCIOS pelo seu link
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              3
            </div>
            <div>
              <p className="font-semibold text-gray-900">Você ganha 30% sempre</p>
              <p className="mt-1 text-sm text-gray-600">
                Comissão recorrente enquanto a pessoa mantiver a assinatura
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Indicações */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Suas Indicações</h2>
        </div>

        {indicacoes.length === 0? (
          <div className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-600">
              Você ainda não tem indicações. Compartilhe seu link para começar!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3">Usuário</th>
                  <th className="px-6 py-3">Plano</th>
                  <th className="px-6 py-3">Data Cadastro</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Comissão</th>
                </tr>
              </thead>
              <tbody>
                {indicacoes.map((ind) => (
                  <tr key={ind.id} className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{ind.nome}</p>
                        <p className="text-xs text-gray-600">{ind.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ind.plano === "PRO"? "bg-blue-100 text-blue-700" :
                        ind.plano === "NEGÓCIOS"? "bg-purple-100 text-purple-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {ind.plano}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{ind.dataCadastro}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ind.status === "ativo"? "bg-green-100 text-green-700" :
                        ind.status === "trial"? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {ind.status === "ativo" && "Ativo"}
                        {ind.status === "trial" && "Em teste"}
                        {ind.status === "cancelado" && "Cancelado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      R$ {ind.comissaoGerada.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Card de Saque */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Saldo Disponível para Saque</h3>
            <p className="mt-1 text-3xl font-bold text-green-600">R$ {saldoDisponivel.toFixed(2)}</p>
            <p className="mt-1 text-xs text-gray-600">
              Valor mínimo para saque: R$ 50,00 • Pagamentos até dia 15
            </p>
          </div>
          <button
            onClick={solicitarSaque}
            disabled={saldoDisponivel < 50}
            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Solicitar Saque
          </button>
        </div>
      </div>
    </div>
  )
}