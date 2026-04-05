"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);
  }

  return (
    <main className="min-h-screen px-6 py-10 text-white">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Entrar na plataforma
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Acesse seu painel e controle toda a sua operação.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Gerencie links, acompanhe cliques, faça upgrade, envie para Telegram
            e automatize seus melhores produtos.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-950/85 p-6 shadow-2xl shadow-black/30">
          <div className="rounded-[24px] border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="mt-2 text-sm text-slate-400">
              Use seu email e senha para entrar.
            </p>

            <form onSubmit={login} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@email.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
