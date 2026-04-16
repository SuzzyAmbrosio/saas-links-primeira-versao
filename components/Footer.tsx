import { Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white">Posta Links Auto</h3>
            <p className="mt-3 text-sm">
              A plataforma completa de automação para afiliados. Venda mais, trabalhe menos.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Produto</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/recursos" className="hover:text-white">Recursos</Link></li>
              <li><Link href="/planos" className="hover:text-white">Planos</Link></li>
              <li><Link href="/teste-gratis" className="hover:text-white">Teste Grátis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Suporte</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white">Central de Ajuda</Link></li>
              <li><Link href="/planos" className="hover:text-white">Comparar Planos</Link></li>
              <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/termos" className="hover:text-white">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-white">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2026 Posta Links Auto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}