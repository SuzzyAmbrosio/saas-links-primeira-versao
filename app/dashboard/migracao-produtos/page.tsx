"use client"

import { useState } from "react"
import { Upload, FileSpreadsheet, ArrowRightLeft, CheckCircle2, AlertCircle, Download, X } from "lucide-react"

type ImportStatus = "aguardando" | "processando" | "concluido" | "erro"

type ImportHistory = {
  id: string
  arquivo: string
  origem: string
  produtos: number
  status: ImportStatus
  data: string
  erros?: number
}

const historicoMock: ImportHistory[] = [
  {
    id: "1",
    arquivo: "",
    origem: "Shopee",
    produtos: "",
    status: "aguardando",
    data: ""
  },
  {
    id: "2", 
    arquivo: "",
    origem: "Amazon",
    produtos: "",
    status: "concluido",
    data: "11/04/2026 09:15"
  },
  {
    id: "3",
    arquivo: "",
    origem: "Mercado Livre",
    produtos: "",
    status: "erro",
    data: "10/04/2026 16:40",
    erros: 23
  }
]

export default function MigracaoProdutosPage() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)
  const [origem, setOrigem] = useState("shopee")
  const [importando, setImportando] = useState(false)
  const [historico, setHistorico] = useState<ImportHistory[]>(historicoMock)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setArquivoSelecionado(e.target.files[0])
    }
  }

  async function iniciarImportacao() {
    if (!arquivoSelecionado) return
    
    setImportando(true)
    
    // Aqui você chama sua API real
    // const formData = new FormData()
    // formData.append("file", arquivoSelecionado)
    // formData.append("origem", origem)
    // await fetch("/api/produtos/importar", { method: "POST", body: formData })
    
    // Mock:
    setTimeout(() => {
      const novoImport: ImportHistory = {
        id: Date.now().toString(),
        arquivo: arquivoSelecionado.name,
        origem: origem.charAt(0).toUpperCase() + origem.slice(1),
        produtos: Math.floor(Math.random() * 1000) + 100,
        status: "concluido",
        data: new Date().toLocaleString("pt-BR")
      }
      setHistorico([novoImport,...historico])
      setArquivoSelecionado(null)
      setImportando(false)
    }, 3000)
  }

  function baixarModelo() {
    // Link pro modelo de planilha
    const link = document.createElement("a")
    link.href = "/modelo_importacao_posta_links_auto.xlsx"
    link.download = "modelo_importacao_posta_links_auto.xlsx"
    link.click()
  }

  const totalProdutos = historico
   .filter(h => h.status === "concluido")
   .reduce((acc, h) => acc + h.produtos, 0)

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Migração de Produtos</h1>
        <p className="mt-1 text-sm text-gray-600">
          Importe seus produtos de outras plataformas para o Posta Links Auto em massa via planilha CSV ou XLSX
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Produtos Importados</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalProdutos.toLocaleString()}</p>
            </div>
            <ArrowRightLeft className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Importações Realizadas</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{historico.length}</p>
            </div>
            <FileSpreadsheet className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taxa de Sucesso</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {Math.round((historico.filter(h => h.status === "concluido").length / historico.length) * 100)}%
              </p>
            </div>
            <CheckCircle2 className="h-10 w-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Card de Importação */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Nova Importação</h2>

        {/* Passo 1: Baixar Modelo */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-900">Baixe o modelo de planilha</p>
              <p className="mt-1 text-sm text-blue-800">
                Use nosso modelo padrão com as colunas corretas: título, preço_antigo, link, imagem, categoria
              </p>
              <button
                onClick={baixarModelo}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Download size={16} />
                Baixar Modelo XLSX
              </button>
            </div>
          </div>
        </div>

        {/* Passo 2: Upload */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Selecione a origem e envie o arquivo</p>
              
              <div className="mt-3 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                    ORIGEM DOS PRODUTOS
                  </label>
                  <select
                    value={origem}
                    onChange={(e) => setOrigem(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="shopee">Shopee</option>
                    <option value="amazon">Amazon</option>
                    <option value="mercadolivre">Mercado Livre</option>
                    <option value="aliexpress">AliExpress</option>
                    <option value="magalu">Magalu</option>
                    <option value="outro">Outro / Manual</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-700">
                    ARQUIVO CSV/XLSX
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50">
                      <Upload size={18} />
                      {arquivoSelecionado? arquivoSelecionado.name : "Clique para selecionar arquivo"}
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {arquivoSelecionado && (
                      <button
                        onClick={() => setArquivoSelecionado(null)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Máximo 10MB. Formatos aceitos:.csv,.xlsx,.xls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Importar */}
        <button
          onClick={iniciarImportacao}
          disabled={!arquivoSelecionado || importando}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {importando? "Importando produtos..." : "Iniciar Importação"}
        </button>

        {importando && (
          <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            <p className="font-semibold">⏳ Processando arquivo...</p>
            <p className="mt-1">Isso pode levar alguns minutos dependendo do tamanho da planilha.</p>
          </div>
        )}
      </div>

      {/* Histórico */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Histórico de Importações</h2>
        </div>

        {historico.length === 0? (
          <div className="p-12 text-center text-sm text-gray-600">
            Nenhuma importação realizada ainda
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3">Arquivo</th>
                  <th className="px-6 py-3">Origem</th>
                  <th className="px-6 py-3">Produtos</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900">{item.arquivo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.origem}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.produtos.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {item.status === "concluido" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          <CheckCircle2 size={12} />
                          Concluído
                        </span>
                      )}
                      {item.status === "erro" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                          <AlertCircle size={12} />
                          Erro ({item.erros} falhas)
                        </span>
                      )}
                      {item.status === "processando" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                          Processando...
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Avisos */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        <p className="font-semibold">⚠️ Dicas importantes:</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Use o modelo de planilha para evitar erros de importação</li>
          <li>Links de afiliado serão gerados automaticamente com suas credenciais</li>
          <li>Produtos duplicados serão atualizados, não duplicados</li>
          <li>O plano INICIANTE permite até 1.000 produtos. Faça upgrade para ilimitado</li>
        </ul>
      </div>
    </div>
  )
}