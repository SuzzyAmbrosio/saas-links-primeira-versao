"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  Settings,
  Send,
  MessageCircle,
  Users,
  ArrowRightLeft,
  User,
  CreditCard,
  Share2,
  Star,
  HelpCircle,
  Play,
  Menu,
  X,
} from "lucide-react"
import Header from "@/components/Header"

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "CONFIGURAÇÃO",
    type: "section"
  },
  {
    label: "Config Afiliados",
    href: "/dashboard/config-afiliados",
    icon: Settings
  },
  {
    label: "Config Telegram",
    href: "/dashboard/config-telegram",
    icon: Send
  },
  {
    label: "Config WhatsApp",
    href: "/dashboard/config-whatsapp",
    icon: MessageCircle
  },
  {
    label: "Canais/Grupos",
    href: "/dashboard/canais-grupos",
    icon: Users
  },
  {
    label: "Migração de Produtos",
    href: "/dashboard/migracao-produtos",
    icon: ArrowRightLeft
  },
  {
    label: "Meus Dados",
    href: "/dashboard/meus-dados",
    icon: User
  },
  {
    label: "Assinatura",
    href: "/dashboard/assinatura",
    icon: CreditCard
  },
  {
    label: "Afiliados",
    href: "/dashboard/afiliados",
    icon: Share2
  },
  {
    label: "Vídeos",
    href: "/dashboard/videos",
    icon: Play
  },
  {
    label: "Programa Influenciadores",
    href: "/dashboard/programa-influenciadores",
    icon: Star
  },
  {
    label: "FAQ",
    href: "/dashboard/faq",
    icon: HelpCircle
  },
  {
    label: "Ajuda",
    href: "/dashboard/ajuda",
    icon: HelpCircle
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = session?.user?.name || "Usuário"
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* Logo MAIOR + NOME */}
          <div className="flex h-22 justify-center items- gap-3 border-b border-gray-200 px-5">
            <img 
              src="/logo-posta-links-auto.png" 
              alt="Posta Links Auto" 
              className="h-21 w-auto"
            />
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems.map((item, idx) => {
                if (item.type === "section") {
                  return (
                    <li key={idx} className="px-3 pb-2 pt-4">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        {item.label}
                      </p>
                    </li>
                  )
                }

                const Icon = item.icon!
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                        isActive
                         ? "bg-blue-600 font-bold text-white"
                          : "font-medium text-black hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{userName}</p>
                <p className="truncate text-xs text-gray-600">Plano INICIANTES</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white">
            <div className="flex h-full flex-col">
              {/* Logo + Close */}
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo-posta-links-auto.png" 
                    alt="Posta Links Auto" 
                    className="h-10 w-auto"
                  />
                  <span className="text-xl font-bold text-gray-900">Posta Links Auto</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Mobile */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {menuItems.map((item, idx) => {
                    if (item.type === "section") {
                      return (
                        <li key={idx} className="px-3 pb-2 pt-4">
                          <p className="text-xs font-semibold uppercase text-gray-500">
                            {item.label}
                          </p>
                        </li>
                      )
                    }

                    const Icon = item.icon!
                    const isActive = pathname === item.href

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href!}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                            isActive
                             ? "bg-blue-600 font-bold text-white"
                              : "font-medium text-black hover:bg-gray-100"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Header />

        {/* Botão Menu Mobile */}
        <div className="border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Menu size={20} />
            Menu
          </button>
        </div>

        {/* Conteúdo da Página */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}