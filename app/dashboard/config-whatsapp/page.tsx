"use client"

import { useState } from "react"
import { QrCode, Smartphone, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function ConfigWhatsAppPage() {
  const [status, setStatus] = useState<"desconectado" | "conectando" | "conectado">("desconectado")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  async function conectarWhatsApp() {
    setStatus("conectando")
    // Aqui você chama sua API real pra gerar o QR Code
    // const res = await fetch("/api/whatsapp/qr")
    // const data = await res.json()
    // setQrCodeUrl(data.qrCode)
    
    // Mock pra teste:
    setTimeout(() => {
      setQrCodeUrl("https://placehold.co/256x256/000000/FFFFFF.png?text=QR+CODE")
    }, 1500)
  }

  async function desconectarWhatsApp() {
    setStatus("desconectado")
    setQrCodeUrl("")
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuração WhatsApp</h1>
        <p className="mt-1 text-sm text-gray-600">
          Conecte seu WhatsApp ao Posta Links Auto para enviar ofertas automaticamente para seus grupos e contatos.
        </p>
      </div>

      {/* Cards de Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status da Conexão</p>
              <p className="mt-1 text-2xl font-bold">
                {status === "conectado" && <span className="text-green-600">Conectado</span>}
                {status === "conectando" && <span className="text-yellow-600">Conectando...</span>}
                {status === "desconectado" && <span className="text-red-600">Desconectado</span>}
              </p>
            </div>
            {status === "conectado" && <CheckCircle2 className="h-10 w-10 text-green-600" />}
            {status === "conectando" && <Loader2 className="h-10 w-10 animate-spin text-yellow-600" />}
            {status === "desconectado" && <XCircle className="h-10 w-10 text-red-600" />}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mensagens Enviadas</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">1,284</p>
            </div>
            <Smartphone className="h-10 w-10 text-blue-600" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Últimos 30 dias</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Grupos Ativos</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">8</p>
            </div>
            <QrCode className="h-10 w-10 text-purple-600" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Configure em Canais/Grupos</p>
        </div>
      </div>

      {/* Card de Conexão */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {status === "desconectado" && (
          <>
            <div className="mb-6 flex items-start gap-4 rounded-lg bg-blue-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold">Como conectar seu WhatsApp:</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4">
                  <li>Clique no botão "Conectar WhatsApp" abaixo</li>
                  <li>Abra o WhatsApp no seu celular</li>
                  <li>Toque em Menu ⋮ ou Configurações e selecione "Aparelhos conectados"</li>
                  <li>Toque em "Conectar um aparelho" e aponte para a tela pra escanear o QR Code</li>
                </ol>
              </div>
            </div>

            <button
              onClick={conectarWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700"
            >
              <Smartphone size={18} />
              Conectar WhatsApp
            </button>
          </>
        )}

        {status === "conectando" && (
          <div className="text-center">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Escaneie o QR Code com seu WhatsApp
            </h3>
            
            <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {qrCodeUrl ? (
                <Image src={qrCodeUrl} alt="QR Code" width={256} height={256} unoptimized />
              ) : (
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              )}
            </div>

            <p className="text-sm text-gray-600">
              O QR Code expira em 20 segundos. Aguardando leitura...
            </p>

            <button
              onClick={desconectarWhatsApp}
              className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        )}

        {status === "conectado" && (
          <div>
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 p-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">WhatsApp Conectado com Sucesso!</p>
                <p className="text-sm text-green-700">
                  Número: +55 11 9XXXX-1234 • Dispositivo: Posta Links Auto Bot
                </p>
              </div>
            </div>

            <div className="space-y-4">
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

              <div className="flex gap-3">
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Salvar Mensagem
                </button>
                <button
                  onClick={desconectarWhatsApp}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Desconectar WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Aviso */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        <p className="font-semibold">⚠️ Importante:</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Mantenha seu celular conectado à internet para o Posta Links Auto funcionar</li>
          <li>Não use o WhatsApp Web em outro computador enquanto estiver conectado aqui</li>
          <li>Evite enviar mensagens em massa para não ser bloqueado pelo WhatsApp</li>
          <li>O plano INICIANTE permite até 100 envios/dia. Faça upgrade para ilimitado</li>
        </ul>
      </div>
    </div>
  )
}