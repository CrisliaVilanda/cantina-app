"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function handleFazerPedido() {
    const nomeCliente = nome.trim();

    if (nomeCliente.length < 2) {
      setErro("Informe seu nome ou como você gostaria de ser chamado.");
      return;
    }

    sessionStorage.setItem("clienteNome", nomeCliente);

    router.push("/cliente/menu");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <main className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          Bem-vindo à Cantina José
        </h1>

        <div className="mt-10 flex w-full max-w-md flex-col gap-8">
          <div className="space-y-4">
            <p className="text-2xl">
              Como você se chama?
            </p>

            <p className="text-muted-foreground">
              Informe seu nome ou como você gostaria de ser chamado.
            </p>

            <input
              type="text"
              value={nome}
              onChange={(event) => {
                setNome(event.target.value);
                setErro("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFazerPedido();
                }
              }}
              placeholder="Seu nome"
              maxLength={80}
              autoComplete="name"
              className="w-full rounded-md border bg-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {erro && (
              <p className="text-sm text-red-500">
                {erro}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleFazerPedido}
            className="w-full rounded-md bg-blue-500 px-4 py-4 font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Fazer Pedido
          </button>
        </div>
      </main>
    </div>
  );
}