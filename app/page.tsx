export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 backdrop-blur">
          <div>
            <div className="text-lg font-bold tracking-wide">LinkPro</div>
            <div className="text-xs text-slate-400">
              Links, automação e tráfego em um só painel
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Entrar
            </a>
            <a
              href="/dashboard"
              className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Abrir painel
            </a>
          </div>
        </header>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              Plataforma estilo SaaS para afiliados
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Crie, encurte, distribua e automatize seus links em um painel
              profissional.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Organize campanhas, acompanhe cliques, envie para Telegram,
              monetize com plano PRO e transforme divulgação manual em operação
              automática.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="rounded-2xl bg-blue-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-90"
              >
                Ir para o dashboard
              </a>

              <a
                href="/upgrade"
                className="rounded-2xl border border-slate-700 px-6 py-4 font-semibold text-slate-200 hover:bg-slate-900"
              >
                Ver plano PRO
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="text-sm text-slate-400">Encurtador</div>
                <div className="mt-2 text-2xl font-bold">Links rápidos</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="text-sm text-slate-400">Automação</div>
                <div className="mt-2 text-2xl font-bold">Telegram + cron</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="text-sm text-slate-400">Monetização</div>
                <div className="mt-2 text-2xl font-bold">FREE / PRO</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-[24px] border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Visão geral</div>
                  <div className="mt-1 text-xl font-bold">Painel principal</div>
                </div>
                <div className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300">
                  Online 24h
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs text-slate-400">Cliques</div>
                  <div className="mt-2 text-2xl font-bold">12.480</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs text-slate-400">Links ativos</div>
                  <div className="mt-2 text-2xl font-bold">128</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs text-slate-400">Telegram</div>
                  <div className="mt-2 text-2xl font-bold">Auto</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs text-slate-400">Plano</div>
                  <div className="mt-2 text-2xl font-bold">PRO</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="text-sm font-semibold">Top campanha</div>
                <div className="mt-2 text-sm text-slate-400">
                  Air Fryer Turbo 5L
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-4/5 rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
