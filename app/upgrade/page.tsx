"use client";

import { useState } from "react";

export default function UpgradePage() {
  const [qr, setQr] = useState("");
  const [valor, setValor] = useState("");

  async function gerarPix() {
    const res = await fetch("/api/payment/pix", {
      method: "POST",
    });

    const data = await res.json();

    setQr(data.qrCode);
    setValor(data.valor);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">🚀 Upgrade para PRO</h1>

        <p className="mt-4 text-slate-400">
          Desbloqueie recursos ilimitados:
        </p>

        <ul className="mt-4 space-y-2">
          <li>✔ Links ilimitados</li>
          <li>✔ Automação completa</li>
          <li>✔ Mais performance</li>
        </ul>

        <button
          onClick={gerarPix}
          className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-semibold"
        >
          Gerar PIX
        </button>

        {qr && (
          <div className="mt-6 rounded-xl bg-slate-900 p-4">
            <p className="text-sm text-slate-400">
              Valor: R$ {valor}
            </p>

            <textarea
              value={qr}
              readOnly
              className="mt-3 w-full rounded-lg bg-black p-3 text-xs"
            />

            <button
              onClick={() => navigator.clipboard.writeText(qr)}
              className="mt-3 rounded-lg bg-emerald-500 px-4 py-2"
            >
              Copiar código PIX
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
