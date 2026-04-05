export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="min-h-screen border-r border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">SaaS Links</h2>
          <nav className="mt-8 space-y-2 text-slate-300">
            <a className="block rounded-lg bg-slate-800 px-4 py-3" href="/dashboard">
              Dashboard
            </a>
            <a className="block rounded-lg px-4 py-3 hover:bg-slate-800" href="/">
              Início
            </a>
          </nav>
        </aside>

        <section className="p-6 md:p-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Visão geral da sua plataforma.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Total de links</div>
              <div className="mt-2 text-3xl font-bold">0</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Cliques</div>
              <div className="mt-2 text-3xl font-bold">0</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">Plano</div>
              <div className="mt-2 text-3xl font-bold">FREE</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
