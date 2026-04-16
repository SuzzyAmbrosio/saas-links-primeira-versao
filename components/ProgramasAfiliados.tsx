"use client"

import { ShoppingBag, Package, Truck, Heart, Shirt } from "lucide-react"

const programasAfiliados = [
  {
    nome: "Shopee Afiliados",
    descricao: "Gere links de afiliado Shopee automaticamente e dispare para seus grupos",
    icone: ShoppingBag,
    cor: "bg-orange-100 text-orange-600",
    recursos: [
      "Links automáticos",
      "Cupons de desconto", 
      "Cashback integrado"
    ]
  },
  {
    nome: "Amazon Associados",
    descricao: "Integração completa com Amazon Associados Brasil para afiliados",
    icone: Package,
    cor: "bg-yellow-100 text-yellow-700",
    recursos: [
      "Tag ID automática",
      "Comissões até 15%",
      "Múltiplos produtos"
    ]
  },
  {
    nome: "AliExpress",
    descricao: "Automação completa para afiliados AliExpress no Brasil",
    icone: Truck,
    cor: "bg-red-100 text-red-600",
    recursos: [
      "Comissões até 20%",
      "Produtos importados",
      "Rastreamento automático"
    ]
  },
  {
    nome: "Mercado Livre",
    descricao: "Divulgue produtos do Mercado Livre com links de afiliados automáticos",
    icone: Heart,
    cor: "bg-yellow-100 text-yellow-600",
    recursos: [
      "Milhões de produtos",
      "Frete grátis",
      "Ofertas relâmpago"
    ]
  },
  {
    nome: "Shein",
    descricao: "Nova integração! Extraia dados automaticamente e publique ofertas da Shein",
    icone: Shirt,
    cor: "bg-purple-100 text-purple-600",
    destaque: true,
    recursos: [
      "Extração automática",
      "Comissões até 15%",
      "Fast-fashion/Estoque"
    ]
  }
]

export default function ProgramasAfiliados() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Programas de Afiliados Integrados
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Suporte completo aos principais programas de afiliados do Brasil
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programasAfiliados.map((programa) => {
            const Icon = programa.icone
            return (
              <div
                key={programa.nome}
                className={`relative rounded-lg border bg-white p-6 ${
                  programa.destaque ? "border-purple-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {programa.destaque && (
                  <div className="absolute -top-3 right-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    Novo
                  </div>
                )}
                
                <div className={`inline-flex rounded-lg p-3 ${programa.cor}`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-gray-900">{programa.nome}</h3>
                <p className="mt-2 text-sm text-gray-600">{programa.descricao}</p>
                
                <ul className="mt-4 space-y-2">
                  {programa.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {recurso}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50">
            🎁 Testar Todos os Programas Grátis Por 7 Dias
          </button>
        </div>
      </div>
    </section>
  )
}