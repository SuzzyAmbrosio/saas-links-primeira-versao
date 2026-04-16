import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

type Article = {
  id: string
  title: string
  description: string
  category: string
  date: string
  image: string
  slug: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "Contato",
    description: "Caso você esteja com problema e não ache a solução aqui, entre em contato conosco e será um prazer lhe ajudar na resolução do mesmo.",
    category: "Contato",
    date: "01/01/2025",
    image: "https://placehold.co/600x400/EEE/31343C.png?text=Contato",
    slug: "contato"
  },
  {
    id: "2",
    title: "Novidade: Envio Automático para WhatsApp Channels (Canais/Newsletters)",
    description: "O Posta Links Auto acaba de lançar uma funcionalidade revolucionária: envio automático de ofertas para Canais do...",
    category: "WhatsApp",
    date: "16/03/2025",
    image: "https://placehold.co/600x400/4CAF50/FFFFFF.png?text=WhatsApp",
    slug: "envio-automatico-whatsapp"
  },
  {
    id: "3",
    title: "Como permitir acesso a mensagens no Instagram erro 200",
    description: "Se você se deparar com a mensagem 'ID já existe' ou algo do tipo ao tentar acesso as mensagens...",
    category: "Instagram",
    date: "16/03/2025",
    image: "https://placehold.co/600x400/E4405F/FFFFFF.png?text=Instagram",
    slug: "instagram-erro-200"
  },
  {
    id: "4",
    title: "Como solicitar API de Afiliados da Shopee 2025",
    description: "Neste conteúdo da Ajuda, como solicitar sua API de afiliados da Shopee: https://www.youtube.com/watch/...",
    category: "Shopee",
    date: "23/03/2025",
    image: "https://placehold.co/600x400/EE4D2D/FFFFFF.png?text=Shopee+API",
    slug: "api-afiliados-shopee-2025"
  },
  {
    id: "5",
    title: "Como conectar seu WhatsApp no Posta Links Auto pelo Celular",
    description: "1. Clique nos ícones de 3 tracinhos na parte superior direita da tela inicial...",
    category: "WhatsApp",
    date: "31/03/2025",
    image: "https://placehold.co/600x400/25D366/FFFFFF.png?text=WhatsApp",
    slug: "conectar-whatsapp-celular"
  },
  {
    id: "6",
    title: "Como adicionar produtos do Mercado Livre no Posta Links Auto",
    description: "https://www.youtube.com/...",
    category: "Mercado Livre",
    date: "27/03/2025",
    image: "https://placehold.co/600x400/FFE600/333333.png?text=Mercado+Livre",
    slug: "produtos-mercado-livre"
  },
]

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-posta-links-auto.png" alt="Posta Links Auto" width={32} height={32} className="rounded" />
              <span className="text-lg font-semibold text-gray-900">Posta Links Auto - Ajuda</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/ajuda" className="text-sm font-medium text-gray-900">Todos posts</Link>
              <Link href="/categorias" className="text-sm text-gray-600 hover:text-gray-900">Categorias</Link>
              <Link href="/contato" className="text-sm text-gray-600 hover:text-gray-900">Contato</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Search size={20} />
            </button>
            <Link href="/login" className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">Ajuda do Posta Links Auto</h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-600">
          Esse site está em construção, mas estamos aqui todos os dias para te ajudar na configuração e dúvidas relacionadas ao uso do Posta Links Auto
        </p>
      </section>

      {/* Banner Image */}
      <div className="relative h-64 w-full bg-blue-500">
        <Image 
          src="https://placehold.co/1920x400/0EA5E9/FFFFFF.png?text=Banner+Posta+Links+Auto" 
          alt="Banner" 
          fill 
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">CATEGORIAS</h2>
          <Link href="/categorias" className="rounded border border-purple-600 px-4 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50">
            VER TODAS
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative h-48 w-full bg-gray-100">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <div className="mb-1 text-xs font-medium text-gray-500">{article.category}</div>
                <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-900">
                  {article.title}
                </h3>
                <div className="mb-2 text-xs text-gray-500">
                  {article.date} • {article.category}
                </div>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {article.description}
                </p>
                <Link 
                  href={`/ajuda/${article.slug}`} 
                  className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Ler Mais
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Paginação */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button className="h-8 w-8 rounded bg-blue-600 text-sm font-medium text-white">1</button>
          <button className="h-8 w-8 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">2</button>
          <button className="h-8 w-8 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">3</button>
          <button className="h-8 w-8 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">4</button>
          <button className="h-8 w-8 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">5</button>
          <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">Next →</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-xs text-gray-500">
        <p>Não encontrou sua busca? Entre em contato com nosso suporte</p>
        <p className="mt-2">https://www.youtube.com/@postalinksauto</p>
        <p className="mt-4">© 2026 Posta Links Auto - Ajuda</p>
      </footer>
    </div>
  )
}