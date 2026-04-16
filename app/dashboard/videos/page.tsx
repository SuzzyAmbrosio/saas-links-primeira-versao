"use client"

import { useState } from "react"
import { Play, Eye, ThumbsUp, Clock, AlertTriangle, Mail } from "lucide-react"
import Image from "next/image"

type Tab = "tutoriais" | "influenciadores"

type Video = {
  id: string
  titulo: string
  descricao: string
  thumbnail: string
  duracao: string
  views: number
  likes: number
  youtubeId?: string
}

// PLACEHOLDERS - Troque pelos seus vídeos depois
const videosTutoriais: Video[] = [
  {
    id: "1",
    titulo: "Como conectar WhatsApp no Posta Links Auto",
    descricao: "Tutorial completo de como conectar seu WhatsApp e começar a enviar ofertas automaticamente",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Tutorial+WhatsApp",
    duracao: "8:45",
    views: 1243,
    likes: 156
  },
  {
    id: "2",
    titulo: "Configurando seu primeiro bot do Telegram",
    descricao: "Aprenda a criar e configurar seu bot do Telegram em menos de 5 minutos",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Tutorial+Telegram",
    duracao: "6:12",
    views: 982,
    likes: 134
  },
  {
    id: "3",
    titulo: "Importando 1000 produtos da Shopee de uma vez",
    descricao: "Veja como usar a importação em massa pra cadastrar centenas de produtos automaticamente",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Importação+Massa",
    duracao: "12:30",
    views: 2341,
    likes: 289
  },
  {
    id: "4",
    titulo: "Automação completa: do zero às primeiras vendas",
    descricao: "Guia completo pra configurar o Posta Links Auto e fazer sua primeira venda como afiliado",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Guia+Completo",
    duracao: "25:18",
    views: 5621,
    likes: 712
  },
  {
    id: "5",
    titulo: "Como criar artes automáticas com IA",
    descricao: "Configure templates de posts e deixe a IA criar artes profissionais pra cada produto",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Artes+com+IA",
    duracao: "9:55",
    views: 1876,
    likes: 243
  },
  {
    id: "6",
    titulo: "Programa de Afiliados: ganhe 30% recorrente",
    descricao: "Entenda como funciona o programa de afiliados e comece a indicar o Posta Links Auto hoje",
    thumbnail: "https://placehold.co/400x225/1e40af/ffffff.png?text=Afiliados+30%",
    duracao: "7:22",
    views: 3421,
    likes: 456
  }
]

const videosInfluenciadores: Video[] = [
  {
    id: "7",
    titulo: "Faturei R$ 5 mil em 30 dias com Posta Links Auto",
    descricao: "@mariashoppe conta como automatizou as vendas e escalou os ganhos como afiliada",
    thumbnail: "https://placehold.co/400x225/7c3aed/ffffff.png?text=Case+Maria",
    duracao: "15:42",
    views: 12453,
    likes: 1823
  },
  {
    id: "8",
    titulo: "De 0 a 100 vendas/dia: minha estratégia completa",
    descricao: "@joaoafiliado revela o passo a passo que usou pra escalar com o Posta Links Auto",
    thumbnail: "https://placehold.co/400x225/7c3aed/ffffff.png?text=Case+João",
    duracao: "18:30",
    views: 8921,
    likes: 1243
  },
  {
    id: "9",
    titulo: "Como eu uso o Posta Links Auto no meu Instagram",
    descricao: "@anadicas mostra na prática como automatiza posts e Stories pro Instagram",
    thumbnail: "https://placehold.co/400x225/7c3aed/ffffff.png?text=Case+Ana",
    duracao: "11:15",
    views: 6734,
    likes: 892
  },
  {
    id: "10",
    titulo: "Telegram + Posta Links Auto = R$ 10k/mês",
    descricao: "@pedrotech explica como criou um canal no Telegram que vende no automático",
    thumbnail: "https://placehold.co/400x225/7c3aed/ffffff.png?text=Case+Pedro",
    duracao: "14:08",
    views: 10234,
    likes: 1567
  }
]

export default function VideosPage() {
  const [tabAtiva, setTabAtiva] = useState<Tab>("tutoriais")
  const [videoSelecionado, setVideoSelecionado] = useState<Video | null>(null)

  const videos = tabAtiva === "tutoriais" ? videosTutoriais : videosInfluenciadores

  return (
    <div className="space-y-6">
      {/* Banner INICIANTES */}
      <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="flex-1 text-sm">
            <p className="font-semibold text-yellow-900">
              Atenção: Você está utilizando o plano INICIANTES (7 dias grátis), que possui limitações como marca d'água nos posts e suporte a afiliados reduzido.
            </p>
            <p className="mt-1 text-yellow-800">
              Para desbloquear todos os recursos, considere fazer um upgrade para um plano premium!
            </p>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <a
            href="/dashboard/assinatura"
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
          >
            Upgrade Agora →
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTabAtiva("tutoriais")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition ${
              tabAtiva === "tutoriais"
               ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Play size={16} />
            Tutoriais YouTube
          </button>
          <button
            onClick={() => setTabAtiva("influenciadores")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition ${
              tabAtiva === "influenciadores"
               ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Play size={16} />
            Vídeos dos Influenciadores
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Novo</span>
          </button>
        </div>

        {/* Grid de Vídeos */}
        <div className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setVideoSelecionado(video)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={video.thumbnail}
                    alt={video.titulo}
                    width={400}
                    height={225}
                    className="aspect-video w-full object-cover transition group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100">
                      <Play className="h-6 w-6 text-blue-600" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
                    {video.duracao}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    {video.titulo}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                    {video.descricao}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {video.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={12} />
                      {video.likes}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Box Seu Vídeo Aqui */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold">Seu vídeo aqui!</p>
            <p className="mt-1">
              Tem um vídeo tutorial sobre o Posta Links Auto? Envie seu link para suporte@postalinksauto.com.br que teremos o prazer de divulgá-lo aqui.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Player */}
      {videoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoSelecionado(null)}
        >
          <div
            className="w-full max-w-4xl rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{videoSelecionado.titulo}</h2>
                <p className="mt-1 text-sm text-gray-600">{videoSelecionado.descricao}</p>
              </div>
              <button
                onClick={() => setVideoSelecionado(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-video w-full rounded-lg bg-gray-900">
              <Image
                src={videoSelecionado.thumbnail}
                alt={videoSelecionado.titulo}
                width={1280}
                height={720}
                className="h-full w-full rounded-lg object-cover"
                unoptimized
              />
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {videoSelecionado.views.toLocaleString()} visualizações
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} />
                {videoSelecionado.likes} curtidas
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {videoSelecionado.duracao}
              </span>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              💡 Em produção: substitua os placeholders pelos seus vídeos reais do YouTube/Vimeo
            </p>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">© 2026</p>
    </div>
  )
}