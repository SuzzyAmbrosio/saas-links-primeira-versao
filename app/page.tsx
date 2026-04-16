import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="container-app px-4 py-6 md:px-6 md:py-10">
        <header className="card mb-6 flex items-center justify-between px-5 py-4">
          <div>
            <div className="text-lg font-bold">PostaLinksAuto</div>
            <div className="text-sm text-[var(--muted)]">
              Links, automação e tráfego em um só painel
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/login" className="btn btn-secondary">
              Entrar
            </Link>
            <Link href="/dashboard" className="btn btn-primary">
              Abrir painel
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-8">
            <span className="badge badge-blue">Plataforma estilo SaaS para afiliados</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Crie, encurte, distribua e automatize seus links em um painel profissional.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--muted)]">
              Organize campanhas, acompanhe cliques, envie para Telegram, monetize com plano PRO
              e transforme divulgação manual em operação automática.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard" className="btn btn-primary">
                Ir para o dashboard
              </Link>
              <Link href="/upgrade" className="btn btn-secondary">
                Ver plano PRO
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="card-soft p-4">
                <div className="text-sm text-[var(--muted)]">Encurtador</div>
                <div className="mt-2 text-xl font-bold">Links rápidos</div>
              </div>
              <div className="card-soft p-4">
                <div className="text-sm text-[var(--muted)]">Automação</div>
                <div className="mt-2 text-xl font-bold">Telegram + campanhas</div>
              </div>
              <div className="card-soft p-4">
                <div className="text-sm text-[var(--muted)]">Monetização</div>
                <div className="mt-2 text-xl font-bold">FREE / PRO</div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-4 text-sm font-bold text-[var(--muted)]">Visão geral</div>

            <div className="space-y-4">
              <div className="rounded-xl bg-[#f8fbff] p-4">
                <div className="text-sm text-[var(--muted)]">Painel principal</div>
                <div className="mt-2 text-2xl font-bold">Online 24h</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--line)] p-4">
                  <div className="text-sm text-[var(--muted)]">Cliques</div>
                  <div className="mt-2 text-2xl font-bold">12.480</div>
                </div>
                <div className="rounded-xl border border-[var(--line)] p-4">
                  <div className="text-sm text-[var(--muted)]">Links ativos</div>
                  <div className="mt-2 text-2xl font-bold">128</div>
                </div>
                <div className="rounded-xl border border-[var(--line)] p-4">
                  <div className="text-sm text-[var(--muted)]">Telegram</div>
                  <div className="mt-2 text-2xl font-bold">Auto</div>
                </div>
                <div className="rounded-xl border border-[var(--line)] p-4">
                  <div className="text-sm text-[var(--muted)]">Plano</div>
                  <div className="mt-2 text-2xl font-bold">PRO</div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] p-4">
                <div className="text-sm text-[var(--muted)]">Top campanha</div>
                <div className="mt-2 text-xl font-bold">Air Fryer Turbo 5L</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
