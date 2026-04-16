"use client"

import { useState } from "react"
import { Send, Bot, CheckCircle2, AlertCircle, ExternalLink, Copy, Check } from "lucide-react"

export default function ConfigTelegramPage() {
  const [botToken, setBotToken] = useState("")
  const [chatId, setChatId] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [copied, setCopied] = useState(false)

  const webhookUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/api/telegram/webhook`
    : "https://seusite.com/api/telegram/webhook"

  async function salvarConfig() {
    // Aqui você chama sua API pra salvar o token
    // await fetch("/api/telegram/save", { method: "POST", body: JSON.stringify({ botToken, chatId }) })
    setIsConnected(true)
  }

  async function testarConexao() {
    setIsTesting(true)
    // await fetch("/api/telegram/test", { method: "POST" })
    setTimeout(() => {
      setIsTesting(false)
      alert("Mensagem de teste enviada com sucesso!")
    }, 1500)
  }

  function copiarWebhook() {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuração Telegram</h1>
        <p className="mt-1 text-sm text-gray-600">
          Conecte seu bot do Telegram ao Posta Links Auto para enviar ofertas automaticamente para seus canais e grupos.
        </p>
      </div>

      {/* Cards de Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status do Bot</p>
              <p className="mt-1 text-2xl font-bold">
                {isConnected ? (
                  <span className="text-green-600">Conectado</span>
                ) : (
                  <span className="text-red-600">Desconectado</span>
                )}
              </p>
            </div>
            {isConnected ? (
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            ) : (
              <Bot className="h-10 w-10 text-gray-400" />
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mensagens Enviadas</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">3,847</p>
            </div>
            <Send className="h-10 w-10 text-blue-600" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Últimos 30 dias</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Canais Ativos</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">5</p>
            </div>
            <Bot className="h-10 w-10 text-purple-600" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Configure em Canais/Grupos</p>
        </div>
      </div>

      {/* Passo a Passo */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Como criar seu Bot do Telegram</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <p className="font-semibold text-gray-900">Abra o Telegram e procure por @BotFather</p>
              <p className="mt-1 text-sm text-gray-600">
                Esse é o bot oficial do Telegram para criar novos bots.
              </p>
              <a 
                href="https://t.me/botfather" 
                target="_blank" 
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                Abrir @BotFather <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>
            <div>
              <p className="font-semibold text-gray-900">Envie /newbot e siga as instruções</p>
              <p className="mt-1 text-sm text-gray-600">
                Escolha um nome para seu bot (ex: Posta Links Auto Bot) e um username terminado em "bot" (ex: posta_links_auto_bot).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              3
            </div>
            <div>
              <p className="font-semibold text-gray-900">Copie o Token do seu bot</p>
              <p className="mt-1 text-sm text-gray-600">
                O BotFather vai te enviar um token parecido com: <code className="rounded bg-gray-100 px-1">123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11</code>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              4
            </div>
            <div>
              <p className="font-semibold text-gray-900">Cole o token abaixo e salve</p>
              <p className="mt-1 text-sm text-gray-600">
                Depois adicione seu bot como administrador nos canais/grupos onde quer postar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Configuração */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Configurar Bot</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
              BOT TOKEN
            </label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Cole aqui o token que o @BotFather te enviou
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
              CHAT ID (Opcional)
            </label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="-1001234567890"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              ID do canal/grupo principal. Deixe vazio para configurar depois em Canais/Grupos
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
              WEBHOOK URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                readOnly
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600"
              />
              <button
                onClick={copiarWebhook}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Configure essa URL no seu bot se quiser receber comandos
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
              MENSAGEM PADRÃO DE OFERTA
            </label>
            <textarea
              defaultValue="🔥 {{titulo}}\n\n💰 De R$ {{preco_antigo}} por R$ {{preco}}\n\n👉 {{link}}\n\n⏰ Oferta por tempo limitado!"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              rows={5}
            />
            <p className="mt-1 text-xs text-gray-500">
              Use {"{{titulo}}"}, {"{{preco}}"}, {"{{preco_antigo}}"}, {"{{link}}"} para dados dinâmicos
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={salvarConfig}
              disabled={!botToken}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Salvar Configuração
            </button>
            <button
              onClick={testarConexao}
              disabled={!isConnected || isTesting}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isTesting ? "Enviando..." : "Testar Envio"}
            </button>
          </div>
        </div>
      </div>

      {/* Status de Conexão */}
      {isConnected && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Bot Conectado com Sucesso!</p>
            <p className="text-sm text-green-700">
              Seu bot está pronto para enviar ofertas. Configure os canais em Canais/Grupos.
            </p>
          </div>
        </div>
      )}

      {/* Aviso */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">⚠️ Importante:</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Adicione seu bot como administrador nos canais/grupos onde quer postar</li>
              <li>Dê permissão de "Postar mensagens" para o bot funcionar</li>
              <li>O plano INICIANTE permite até 500 envios/dia. Faça upgrade para ilimitado</li>
              <li>Respeite os limites do Telegram para não ter o bot bloqueado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}