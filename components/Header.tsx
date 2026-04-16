"use client"

import { useState, useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import { Mail, User, LogOut, Bell } from "lucide-react"
import Link from "next/link"

type Notificacao = {
  id: string
  titulo: string
  descricao: string
  data: string
  lida: boolean
}

const mockNotificacoes: Notificacao[] = [
  {
    id: "1",
    titulo: "#instagram_createMediaContainer",
    descricao: "Instagram: <a>...",
    data: "04/04/2026 16:08",
    lida: false
  },
  {
    id: "2",
    titulo: "#instagram_createMediaContainer",
    descricao: "Instagram: <a>...",
    data: "04/04/2026 20:08",
    lida: false
  },
  {
    id: "3",
    titulo: "#instagram_createMediaContainer",
    descricao: "Instagram: <a>...",
    data: "05/04/2026 16:08",
    lida: false
  },
  {
    id: "4",
    titulo: "#instagram_createMediaContainer",
    descricao: "Instagram: <a>...",
    data: "05/04/2026 09:07",
    lida: true
  }
]

export default function Header() {
  const { data: session } = useSession()
  const [showNotificacoes, setShowNotificacoes] = useState(false)
  const [showPerfil, setShowPerfil] = useState(false)
  const [notificacoes] = useState<Notificacao[]>(mockNotificacoes)
  
  const notificacoesRef = useRef<HTMLDivElement>(null)
  const perfilRef = useRef<HTMLDivElement>(null)

  const naoLidas = notificacoes.filter(n =>!n.lida).length
  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "U"
  const userEmail = session?.user?.email || ""

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificacoesRef.current &&!notificacoesRef.current.contains(event.target as Node)) {
        setShowNotificacoes(false)
      }
      if (perfilRef.current &&!perfilRef.current.contains(event.target as Node)) {
        setShowPerfil(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-22 items-center justify-end gap-4 border-b border-gray-200 bg-white px-6">
      {/* Notificações */}
      <div className="relative" ref={notificacoesRef}>
        <button
          onClick={() => {
            setShowNotificacoes(!showNotificacoes)
            setShowPerfil(false)
          }}
          className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          <Mail size={40} />
          {naoLidas > 0 && (
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text- font-bold text-white">
              {naoLidas}
            </span>
          )}
        </button>

        {showNotificacoes && (
          <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notificacoes.length === 0? (
                <div className="p-8 text-center text-sm text-gray-600">
                  Nenhuma notificação
                </div>
              ) : (
                notificacoes.map((notif) => (
                  <div
                    key={notif.id}
                    className={`border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 ${
                     !notif.lida? "bg-blue-50" : ""
                    }`}
                  >
                    <p className="font-medium text-gray-900">{notif.titulo}</p>
                    <p className="mt-0.5 text-gray-600">{notif.descricao}</p>
                    <p className="mt-1 text-xs text-gray-500">{notif.data}</p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-200 p-3">
              <Link
                href="/dashboard/notificacoes"
                className="block w-full rounded-lg bg-blue-50 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-100"
                onClick={() => setShowNotificacoes(false)}
              >
                Ver todas as notificações
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Perfil Usuário */}
      <div className="relative" ref={perfilRef}>
        <button
          onClick={() => {
            setShowPerfil(!showPerfil)
            setShowNotificacoes(false)
          }}
          className="flex items-center gap-2 rounded-full bg-gray-900 px-1 py-1 pr-3 text-white hover:bg-gray-800"
        >
          <div className="flex h-10 w-20 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold">
            {userInitial}
          </div>
          <div className="relative">
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500"></span>
          </div>
        </button>

        {showPerfil && (
          <div className="absolute right-0 mt-5 w-72 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {session?.user?.name || "Usuário"}
                  </p>
                  <p className="truncate text-xs text-gray-600">{userEmail}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <Link
                href="/dashboard/meus-dados"
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowPerfil(false)}
              >
                <User size={25} />
                Meu Perfil
              </Link>
              
              <div className="my-1 border-t border-gray-100"></div>
              
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut size={25} />
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}