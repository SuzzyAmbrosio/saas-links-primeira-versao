"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqsLanding = [
  {
    pergunta: "Como funciona o período grátis?",
    resposta: "Você tem 7 dias totalmente grátis para testar todos os recursos do plano INICIANTES. Não é necessário cartão de crédito."
  },
  {
    pergunta: "Posso cancelar a qualquer momento?",
    resposta: "Sim! Não há fidelidade ou multa. Você pode cancelar sua assinatura quando quiser e manter acesso até o fim do período pago."
  },
  {
    pergunta: "Quais programas de afiliados são suportados?",
    resposta: "Shopee, Amazon, AliExpress, Mercado Livre e Shein. Todos com integração completa e links automáticos."
  },
  {
    pergunta: "Preciso ter conhecimento técnico?",
    resposta: "Não! O Posta Links Auto foi criado pra ser simples. Se você sabe usar WhatsApp e Instagram, consegue usar a plataforma sem dificuldade."
  },
  {
    pergunta: "Como funciona a automação do Instagram?",
    resposta: "Conecte sua conta comercial, configure os templates e horários. O Posta Links Auto cria e posta Stories e Feed automaticamente com seus links de afiliado."
  },
  {
    pergunta: "O sistema funciona com WhatsApp?",
    resposta: "Sim! Conecte via QR Code e o Posta Links Auto envia ofertas automaticamente para seus grupos. Aplicamos delays seguros pra evitar bloqueio."
  }
]

export default function FAQLanding() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Tire suas dúvidas sobre o Posta Links Auto
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqsLanding.map((faq, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200">
              <button
                onClick={() => setAberta(aberta === idx ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.pergunta}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-blue-600 transition ${
                    aberta === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {aberta === idx && (
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-700">
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}