"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Search, ChevronDown, Send, AlertTriangle, Mail } from "lucide-react"

type Categoria = 
  | "Perguntas Gerais"
  | "Programas de Afiliados" 
  | "WhatsApp"
  | "Instagram"
  | "Telegram"
  | "Assinatura e Pagamento"
  | "Recursos Avançados"
  | "Problemas Técnicos"
  | "Seja Afiliado PostaLinksAuto"

type Pergunta = {
  pergunta: string
  resposta: string
}

const faqs: Record<Categoria, Pergunta[]> = {
  "Perguntas Gerais": [
    {
      pergunta: "O que é o Posta Links Auto?",
      resposta: "O Posta Links Auto é uma plataforma completa de automação para afiliados. Você cadastra seus links de afiliado e o sistema envia ofertas automaticamente para seus canais do Telegram, grupos do WhatsApp e Instagram com posts personalizados, cupons e horários programados."
    },
    {
      pergunta: "Como funciona o Posta Links Auto?",
      resposta: "1. Conecte suas contas: Telegram, WhatsApp e Instagram\n2. Configure seus programas de afiliado: Shopee, Amazon, Mercado Livre\n3. Adicione produtos manualmente ou importe em massa\n4. O Posta Links Auto cria artes automáticas e dispara nos horários que você escolher"
    },
    {
      pergunta: "Quais são os principais benefícios?",
      resposta: "Automação 24/7, posts com IA, importação em massa, múltiplos canais, cupons automáticos, relatórios de cliques, programa de afiliados com 30% recorrente e muito mais."
    },
    {
      pergunta: "Preciso de conhecimento técnico para usar?",
      resposta: "Não! O Posta Links Auto foi feito pra ser simples. Se você sabe usar WhatsApp e Instagram, consegue usar o Posta Links Auto. Temos tutoriais em vídeo pra cada função."
    },
    {
      pergunta: "Quais plataformas de envio/publicação são suportadas?",
      resposta: "Telegram (canais e grupos), WhatsApp (grupos), Instagram (posts no feed e Stories). Em breve: TikTok e Facebook."
    },
    {
      pergunta: "Como adicionar um produto automaticamente?",
      resposta: "Vá em 'Importar Produtos', cole o link do produto da Shopee/Amazon/ML e o Posta Links Auto busca título, preço, imagem e gera o link de afiliado automaticamente."
    },
    {
      pergunta: "Os produtos são atualizados automaticamente?",
      resposta: "Sim! O sistema verifica preços e estoque a cada 6 horas e atualiza seus posts automaticamente. Se o produto esgotar, pausamos os envios."
    }
  ],
  "Programas de Afiliados": [
    {
      pergunta: "Quais programas de afiliados são suportados?",
      resposta: "Shopee, Amazon, Mercado Livre, AliExpress, Magalu, Natura, TERA BYTE SHOP e AWIN. Estamos sempre adicionando novos."
    },
    {
      pergunta: "Como configurar meus links de afiliado?",
      resposta: "Vá em Config Afiliados, selecione a plataforma e cole seu ID de afiliado ou token. O Posta Links Auto usa suas credenciais pra gerar links comissionados em todos os produtos."
    },
    {
      pergunta: "Onde encontro meu ID de afiliado da Shopee?",
      resposta: "Acesse o Painel do Afiliado Shopee > Minha Conta > ID de Afiliado. Copie o número e cole em Config Afiliados > Shopee."
    },
    {
      pergunta: "Posso usar múltiplos programas ao mesmo tempo?",
      resposta: "Sim! Configure todos os programas que você participa. O Posta Links Auto identifica automaticamente qual link gerar baseado na origem do produto."
    },
    {
      pergunta: "Como cadastrar produtos via importação em massa na Shopee?",
      resposta: "Vá em Migração de Produtos > Selecione Shopee > Cole os links dos produtos (um por linha) ou faça upload de planilha CSV. O sistema importa tudo de uma vez."
    },
    {
      pergunta: "Como configurar afiliados da Amazon?",
      resposta: "Você precisa do Access Key, Secret Key e Associate Tag. Encontre em Amazon Associates > Ferramentas > Product Advertising API."
    }
  ],
  "WhatsApp": [
    {
      pergunta: "Como conectar meu WhatsApp?",
      resposta: "Vá em Config WhatsApp > Clique em Conectar > Escaneie o QR Code com seu celular em WhatsApp > Aparelhos Conectados > Conectar um aparelho."
    },
    {
      pergunta: "Posso enviar para grupos e canais?",
      resposta: "Sim! Adicione os grupos em Canais/Grupos. O bot precisa ser admin do grupo pra conseguir enviar mensagens."
    },
    {
      pergunta: "Meu WhatsApp desconectou. O que fazer?",
      resposta: "Acesse Config WhatsApp e clique em Reconectar. Escaneie o QR Code novamente. Isso acontece se você ficar muito tempo offline ou usar WhatsApp Web em outro lugar."
    },
    {
      pergunta: "Vou ser banido do WhatsApp por usar automação?",
      resposta: "Se usar com moderação, não. Recomendamos: máximo 100 envios/dia no INICIANTES, intervalos de 30s entre mensagens e não enviar spam. O Posta Links Auto já aplica delays automáticos."
    },
    {
      pergunta: "Como enviar produtos manualmente?",
      resposta: "Vá em Meus Links > Clique em Telegram ou WhatsApp no link desejado. A mensagem é enviada na hora pro canal/grupo configurado."
    }
  ],
  "Instagram": [
    {
      pergunta: "Como conectar meu Instagram?",
      resposta: "Vá em Config Instagram > Conectar Conta > Faça login com Facebook (sua conta do Instagram precisa ser comercial ou criador de conteúdo)."
    },
    {
      pergunta: "Posso agendar posts no Instagram?",
      resposta: "Sim! Ao criar um produto, ative 'Postar no Instagram' e escolha data/hora. O Posta Links Auto posta automaticamente no feed ou Stories."
    },
    {
      pergunta: "O sistema responde comentários automaticamente?",
      resposta: "Sim, no plano PRO. Configure respostas automáticas em Config Instagram > Automação. Ex: se alguém comentar 'preço', o bot responde com o link."
    },
    {
      pergunta: "Como personalizar o template de Stories?",
      resposta: "Vá em Config Instagram > Templates. Escolha cores, fonte, posição do preço e logo. O Posta Links Auto aplica em todos os Stories."
    },
    {
      pergunta: "Como funciona a automação de Stories no Instagram?",
      resposta: "O Posta Links Auto cria um Story com imagem do produto, preço, cupom e swipe up pro seu link. Você define quantos Stories por dia em Config Instagram."
    }
  ],
  "Telegram": [
    {
      pergunta: "Como conectar meu Telegram?",
      resposta: "Vá em Config Telegram > Crie um bot com @BotFather > Cole o token aqui. Depois adicione o bot como admin dos seus canais."
    },
    {
      pergunta: "Como adicionar canais e grupos?",
      resposta: "Vá em Canais/Grupos > Adicionar Canal > Cole o @username do canal ou ID do grupo. O bot precisa ser admin pra postar."
    },
    {
      pergunta: "Como vincular o Telegram ao Posta Links Auto?",
      resposta: "Após criar o bot e colar o token em Config Telegram, adicione o bot como administrador em todos os canais onde quer postar. Pronto!"
    }
  ],
  "Assinatura e Pagamento": [
    {
      pergunta: "Quais são os planos disponíveis?",
      resposta: "INICIANTES: 7 dias grátis, depois R$ 0/mês com limitações. PRO: R$ 49,90/mês com envios ilimitados. NEGÓCIOS: R$ 149,90/mês com API e multi-usuário."
    },
    {
      pergunta: "Quais formas de pagamento são aceitas?",
      resposta: "Cartão de crédito, PIX e boleto bancário. Processamento via Mercado Pago."
    },
    {
      pergunta: "Como funciona o período de teste?",
      resposta: "7 dias grátis no plano INICIANTES com recursos limitados. Após 7 dias, você escolhe: continuar no FREE limitado ou assinar PRO/NEGÓCIOS."
    },
    {
      pergunta: "Como cancelar minha assinatura?",
      resposta: "Vá em Assinatura > Cancelar Plano. Você mantém acesso até o fim do período pago. Sem multa ou fidelidade."
    },
    {
      pergunta: "Como usar cupom de desconto?",
      resposta: "Na tela de checkout, clique em 'Tem um cupom?' e digite o código. O desconto é aplicado na hora."
    }
  ],
  "Recursos Avançados": [
    {
      pergunta: "Como funciona o domínio próprio/site no Posta Links Auto?",
      resposta: "No plano NEGÓCIOS você pode usar seu próprio domínio. Configure em Meus Dados > Domínio Personalizado. Apontamos seu domínio pro seu catálogo de ofertas."
    },
    {
      pergunta: "Como funciona o programa de influenciadores?",
      resposta: "Influenciadores com +10k seguidores ganham 40% de comissão, acesso antecipado a recursos e suporte VIP. Inscreva-se em Programa Influenciadores."
    },
    {
      pergunta: "Como funciona o site/catálogo de produtos?",
      resposta: "Todo usuário tem um site automático em postalinksauto.com/seuusuario com todos seus links organizados por categoria. Ative em Meus Dados."
    },
    {
      pergunta: "Como integrar o Posta Links Auto ao WordPress?",
      resposta: "Plano NEGÓCIOS inclui API. Vá em Meus Dados > API Key e use nosso plugin WordPress pra exibir ofertas automaticamente no seu blog."
    }
  ],
  "Problemas Técnicos": [
    {
      pergunta: "O produto não está sendo enviado. O que fazer?",
      resposta: "Verifique: 1) WhatsApp/Telegram conectado? 2) Canal/grupo ativo? 3) Produto tem estoque? 4) Horário de envio configurado? Se tudo ok, fale com suporte."
    },
    {
      pergunta: "O link de afiliado não está sendo gerado.",
      resposta: "Confirme que suas credenciais estão salvas em Config Afiliados. Teste criando um produto manualmente. Se não gerar, o ID/token pode estar inválido."
    },
    {
      pergunta: "A arte gerada está com erro ou sem imagem.",
      resposta: "Algumas lojas bloqueiam imagens. Tente reimportar o produto ou faça upload manual da imagem em Meus Links > Editar."
    },
    {
      pergunta: "Como reportar um bug ou erro?",
      resposta: "Use o formulário 'Não encontrou sua resposta?' abaixo ou chame no WhatsApp de suporte em Assinatura > Suporte Prioritário."
    },
    {
      pergunta: "Por que a postagem automática foi desabilitada sozinha?",
      resposta: "Segurança: se o WhatsApp desconectar 3x seguidas, pausamos envios automáticos pra evitar ban. Reconecte em Config WhatsApp."
    }
  ],
  "Seja Afiliado PostaLinksAuto": [
    {
      pergunta: "O que é o programa Seja Afiliado do Posta Links Auto?",
      resposta: "Você indica o Posta Links Auto e ganha 30% de comissão recorrente sobre cada assinatura paga. O indicado usa seu link e você ganha todo mês enquanto ele for cliente."
    },
    {
      pergunta: "Quais são os 3 níveis de comissão?",
      resposta: "Nível 1: 30% direto. Nível 2: 5% se seu indicado indicar alguém. Nível 3: 2% do indicado do indicado. Ganhos em rede!"
    },
    {
      pergunta: "Como me cadastrar no programa de afiliados?",
      resposta: "Vá em Afiliados > Copie seu link único > Compartilhe. Não precisa aprovação, já está ativo pra todos os usuários."
    },
    {
      pergunta: "Como compartilhar meu link de indicação?",
      resposta: "Vá em Afiliados > Copiar Link. Compartilhe no WhatsApp, Instagram, YouTube. Quem assinar pelo seu link vira sua comissão."
    },
    {
      pergunta: "Como acompanho minhas indicações?",
      resposta: "Em Afiliados você vê lista completa: nome, email, plano, data e quanto de comissão cada um gerou pra você."
    },
    {
      pergunta: "Como recebo minhas comissões?",
      resposta: "Configure seu PIX em Meus Dados > Pagamento. Saques a partir de R$ 50, pagos todo dia 15."
    },
    {
      pergunta: "Preciso ser assinante do Posta Links Auto para ser afiliado?",
      resposta: "Não! Qualquer usuário pode indicar, mesmo no plano gratuito. Mas você ganha mais credibilidade usando o produto."
    }
  ]
}

export default function FAQPage() {
  const { data: session } = useSession()
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>("Perguntas Gerais")
  const [busca, setBusca] = useState("")
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null)
  const [enviandoDuvida, setEnviandoDuvida] = useState(false)
  
  // Form dúvida
  const [assuntoDuvida, setAssuntoDuvida] = useState("")
  const [textoDuvida, setTextoDuvida] = useState("")

  const categorias: Categoria[] = [
    "Perguntas Gerais",
    "Programas de Afiliados",
    "WhatsApp",
    "Instagram",
    "Telegram",
    "Assinatura e Pagamento",
    "Recursos Avançados",
    "Problemas Técnicos",
    "Seja Afiliado PostaLinksAuto"
  ]

  const perguntasFiltradas = faqs[categoriaAtiva].filter(p => 
    p.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
    p.resposta.toLowerCase().includes(busca.toLowerCase())
  )

  async function enviarDuvida(e: React.FormEvent) {
    e.preventDefault()
    setEnviandoDuvida(true)
    
    // await fetch("/api/suporte/duvida", { method: "POST", body: JSON.stringify({ assunto: assuntoDuvida, texto: textoDuvida }) })
    
    setTimeout(() => {
      alert("Dúvida enviada! Responderemos em até 24h no seu e-mail.")
      setAssuntoDuvida("")
      setTextoDuvida("")
      setEnviandoDuvida(false)
    }, 1000)
  }

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

      {/* Título */}
      <div>
        <p className="text-xs text-gray-500">Ajuda</p>
        <h1 className="text-2xl font-bold text-gray-900">Perguntas Frequentes (FAQ)</h1>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar no FAQ..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Layout 2 colunas */}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Menu Categorias */}
        <div className="space-y-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaAtiva(cat)
                setPerguntaAberta(null)
                setBusca("")
              }}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                categoriaAtiva === cat
                ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Perguntas */}
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-4 py-3">
              <h2 className="font-semibold text-gray-900">{categoriaAtiva}</h2>
            </div>

            {perguntasFiltradas.length === 0? (
              <div className="p-8 text-center text-sm text-gray-600">
                Nenhuma pergunta encontrada com "{busca}"
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {perguntasFiltradas.map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => setPerguntaAberta(perguntaAberta === idx? null : idx)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{item.pergunta}</span>
                      <ChevronDown 
                        size={16} 
                        className={`flex-shrink-0 text-gray-400 transition ${perguntaAberta === idx? "rotate-180" : ""}`}
                      />
                    </button>
                    {perguntaAberta === idx && (
                      <div className="bg-gray-50 px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
                        {item.resposta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulário Dúvida */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="bg-blue-600 px-4 py-3">
              <h3 className="font-semibold text-white">Não encontrou sua resposta?</h3>
            </div>
            <form onSubmit={enviarDuvida} className="p-4 space-y-3">
              <p className="text-xs text-gray-600">
                Envie sua dúvida diretamente para nossa equipe de suporte!
              </p>
              
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Assunto *
                </label>
                <input
                  type="text"
                  value={assuntoDuvida}
                  onChange={(e) => setAssuntoDuvida(e.target.value)}
                  required
                  placeholder="Ex: Problema ao conectar WhatsApp"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Sua dúvida *
                </label>
                <textarea
                  value={textoDuvida}
                  onChange={(e) => setTextoDuvida(e.target.value)}
                  required
                  placeholder="Descreva sua dúvida com o máximo de detalhes possível..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Quanto mais detalhes você fornecer, mais rápido podemos ajudá-lo
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-xs">
                <div className="flex items-center gap-2 text-blue-900">
                  <Mail size={14} />
                  <span className="font-medium">Seu e-mail: {session?.user?.email}</span>
                </div>
                <p className="mt-1 text-blue-700">
                  As respostas serão enviadas para este email
                </p>
              </div>

              <button
                type="submit"
                disabled={enviandoDuvida ||!assuntoDuvida ||!textoDuvida}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Send size={16} />
                {enviandoDuvida? "Enviando..." : "Enviar Dúvida"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}