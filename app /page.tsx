export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-6 inline-block rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
          SaaS de Links
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Crie, acompanhe e venda links com visual profissional
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Um painel estilo SaaS para encurtar links, contar cliques e preparar
          sua plataforma para planos pagos.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/dashboard"
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950"
          >
            Abrir dashboard
          </a>

          <a
            href="#recursos"
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold"
          >
            Ver recursos
          </a>
        </div>
      </section>
    </main>
  );
}
