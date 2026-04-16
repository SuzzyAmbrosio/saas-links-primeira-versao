"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

const affiliatePlatforms = [
  {
    id: "aliexpress",
    name: "Afiliados AliExpress",
    logo: "/logo-aliexpress.png",
    fields: [
      { name: "ALIEXPRESS APP KEY", type: "text" },
      { name: "ALIEXPRESS SECRET", type: "text" },
      { name: "ALIEXPRESS TRACKING ID", type: "text" },
    ],
    helpText: "Dúvidas? CLIQUE AQUI"
  },
  {
    id: "amazon",
    name: "Afiliados Amazon",
    logo: "/logo-amazon.png",
    fields: [
      { name: "AMAZON ACCESS KEY", type: "text" },
      { name: "AMAZON SECRET KEY", type: "text" },
      { name: "AMAZON ASSOCIATE TAG", type: "text" },
    ],
    helpText: "Dúvidas? CLIQUE AQUI"
  },
  {
    id: "shopee",
    name: "Afiliados SHOPEE",
    logo: "/logo-shopee.png",
    fields: [
      { name: "SHOPEE ID DE AFILIADO", type: "text"},
      { name: "SHOPEE APP KEY", type: "text"},
    ],
    helpText: "Dúvidas? CLIQUE AQUI",
  },
  {
    id: "mercadolivre",
    name: "Afiliados Mercado Livre",
    logo: "/logo-mercadolivre.png",
    fields: [
      { name: "LINK DE AFILIADO MERCADO LIVRE", type: "text" },
      { name: "CÓDIGO DO MERCADO LIVRE", type: "textarea" },
    ],
    helpBox: {
      title: "Como obter suas credenciais",
      steps: [
        "1. Link de Afiliado: Acesse sua conta de afiliado do Mercado Livre > Clique em 'Meus Links' > 'Compartilhar' ou copie qualquer link de produto. Cole o link completo no campo ao lado. O sistema irá automaticamente extrair sua Tag.",
        "2. Código do Mercado Livre: Acesse sua conta de afiliado do Mercado Livre. Procure por 'ID de Afiliado' ou 'Código de Afiliado'. Na página de 'Anúncios' > 'Meus Links' > 'Gerar Link' > 'Personalizado'. Em 'Recomendados' > 'Busca' > 'Copiar'.",
        "⚠️ Importante: Use o código apenas se não conseguir o link acima. Se a tag já estiver presente no link, o sistema irá priorizá-la."
      ],
      videoButton: "Dúvidas? CLIQUE AQUI VEJA O VÍDEO"
    }
  },
  {
    id: "shein",
    name: "Afiliados Shein",
    logo: "/logo-shein.png", // Logo que você enviou
    fields: [
      { name: "SHEIN CÓDIGO DE AFILIADO", type: "text" },
      { name: "SHEIN TRACKING ID", type: "text" },
    ],
    helpText: "Dúvidas? CLIQUE AQUI"
  },
]

export default function ConfigAfiliadosPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {affiliatePlatforms.map((platform) => (
          <div key={platform.id} className="rounded-lg border border-gray-200 bg-white p-5">
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <Image 
                src={platform.logo} 
                alt={platform.name} 
                width={40} 
                height={40} 
                className="rounded object-contain" 
                unoptimized
              />
              <h3 className="font-semibold text-gray-900">{platform.name}</h3>
            </div>

            {/* Warning */}
            {platform.warning && (
              <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                ⚠️ {platform.warning}
              </div>
            )}

            {/* Note */}
            {platform.note && (
              <div className="mb-4 text-xs text-gray-600">
                {platform.note}
              </div>
            )}

            {/* Fields */}
            <div className="space-y-3">
              {platform.fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                    {field.name}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <button className="mt-4 w-full rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Salvar
            </button>

            {/* Help Box */}
            {platform.helpBox && (
              <div className="mt-4 rounded bg-blue-50 p-4 text-xs text-gray-700">
                <p className="mb-2 font-semibold">💡 {platform.helpBox.title}</p>
                {platform.helpBox.steps.map((step, i) => (
                  <p key={i} className="mb-2">{step}</p>
                ))}
                {platform.helpBox.videoButton && (
                  <button className="mt-2 flex items-center gap-1 text-blue-600 hover:underline">
                    <ExternalLink size={14} />
                    {platform.helpBox.videoButton}
                  </button>
                )}
              </div>
            )}

            {/* Program Box */}
            {platform.programBox && (
              <div className="mt-4 rounded bg-blue-50 p-3 text-xs text-gray-700">
                {platform.programBox}
              </div>
            )}

            {/* Help Text */}
            {platform.helpText && (
              <div className="mt-4 rounded bg-blue-50 p-3 text-center text-xs text-blue-600">
                💡 {platform.helpText}
              </div>
            )}

            {/* Footer Link */}
            {platform.footerLink && (
              <div className="mt-3 text-center text-xs text-gray-600">
                {platform.footerLink}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}