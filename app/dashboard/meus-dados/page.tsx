"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { User, Lock, CreditCard, Save, Eye, EyeOff } from "lucide-react"

export default function MeusDadosPage() {
  const { data: session } = useSession()
  
  const [activeTab, setActiveTab] = useState<"perfil" | "senha" | "pagamento">("perfil")
  const [showSenhaAtual, setShowSenhaAtual] = useState(false)
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState("")

  // Estados do formulário
  const [nome, setNome] = useState(session?.user?.name || "")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [telefone, setTelefone] = useState("")
  const [cpf, setCpf] = useState("")
  
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  async function salvarPerfil(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMensagem("")
    
    // await fetch("/api/user/update", { method: "POST", body: JSON.stringify({ nome, email, telefone, cpf }) })
    
    setTimeout(() => {
      setMensagem("Dados atualizados com sucesso!")
      setSalvando(false)
    }, 1000)
  }

  async function alterarSenha(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMensagem("")
    
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem")
      setSalvando(false)
      return
    }
    
    // await fetch("/api/user/change-password", { method: "POST", body: JSON.stringify({ senhaAtual, novaSenha }) })
    
    setTimeout(() => {
      setMensagem("Senha alterada com sucesso!")
      setSenhaAtual("")
      setNovaSenha("")
      setConfirmarSenha("")
      setSalvando(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Dados</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie suas informações pessoais, senha e dados de pagamento do Posta Links Auto
        </p>
      </div>

      {mensagem && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
          {mensagem}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "perfil"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <User size={16} />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab("senha")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "senha"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Lock size={16} />
            Senha
          </button>
          <button
            onClick={() => setActiveTab("pagamento")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              activeTab === "pagamento"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <CreditCard size={16} />
            Pagamento
          </button>
        </div>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {activeTab === "perfil" && (
          <form onSubmit={salvarPerfil} className="space-y-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Informações Pessoais</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  NOME COMPLETO
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  E-MAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  TELEFONE / WHATSAPP
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  CPF
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button
                type="submit"
                disabled={salvando}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Save size={16} />
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "senha" && (
          <form onSubmit={alterarSenha} className="space-y-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Alterar Senha</h2>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                SENHA ATUAL
              </label>
              <div className="relative">
                <input
                  type={showSenhaAtual ? "text" : "password"}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showSenhaAtual ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                NOVA SENHA
              </label>
              <div className="relative">
                <input
                  type={showNovaSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNovaSenha(!showNovaSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                CONFIRMAR NOVA SENHA
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Digite novamente a nova senha"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800">
              <p className="font-semibold">Dicas de segurança:</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                <li>Use pelo menos 8 caracteres</li>
                <li>Combine letras maiúsculas, minúsculas, números e símbolos</li>
                <li>Não use a mesma senha de outros sites</li>
              </ul>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button
                type="submit"
                disabled={salvando || !senhaAtual || !novaSenha || !confirmarSenha}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Lock size={16} />
                {salvando ? "Alterando..." : "Alterar Senha"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "pagamento" && (
          <div className="space-y-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Dados de Pagamento</h2>
            
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-semibold">💳 Receba suas comissões</p>
              <p className="mt-1">
                Configure seus dados bancários ou PIX para receber automaticamente as comissões das vendas geradas pelo Posta Links Auto.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  TIPO DE CHAVE PIX
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option>CPF</option>
                  <option>CNPJ</option>
                  <option>E-mail</option>
                  <option>Telefone</option>
                  <option>Chave Aleatória</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  CHAVE PIX
                </label>
                <input
                  type="text"
                  placeholder="Digite sua chave PIX"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                  NOME DO TITULAR
                </label>
                <input
                  type="text"
                  placeholder="Nome completo do titular da conta"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <Save size={16} />
                Salvar Dados PIX
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
              <p className="font-semibold text-gray-900">Próximo pagamento:</p>
              <p className="mt-1">Comissões são pagas todo dia 15. Valor mínimo para saque: R$ 50,00</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}