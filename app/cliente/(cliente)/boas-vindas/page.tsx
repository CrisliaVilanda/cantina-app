"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClient } from "@/app/cliente/(cliente)/context/ClientContext";

export default function ClientPage() {
  const router = useRouter();

  const {
    nomeCliente,
    setNomeCliente,
  } = useClient();

  const [nome, setNome] = useState(nomeCliente);

  function handleFazerPedido() {
    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      return;
    }

    setNomeCliente(nomeLimpo);

    router.push("/cliente/menu");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          Bem-vindo à Cantina José
        </h1>

        <div className="mt-10 w-full max-w-md">
          <div className="space-y-6">
            <p className="text-2xl">
              Como você se chama?
            </p>

            <input
              value={nome}
              onChange={(event) =>
                setNome(event.target.value)
              }
              className="w-full rounded-md border bg-secondary px-4 py-3"
              type="text"
              placeholder="Seu nome"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFazerPedido();
                }
              }}
            />

            <button
              type="button"
              onClick={handleFazerPedido}
              disabled={!nome.trim()}
              className="w-full rounded-md bg-blue-500 px-4 py-4 font-bold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Fazer Pedido
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}